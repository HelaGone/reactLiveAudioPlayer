import React, {Component, Fragment} from 'react';
import './App.css';
import Home from './components/Home';
import firebaseApp from './firebase';
import {getStorage, ref, listAll, getDownloadURL} from 'firebase/storage';

const signal = "https://s2.voscast.com:8163/stream";
// const signal = "http://s2.voscast.com:8162/;&type=mp3";

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      signal: signal,
      isLive:true,
      signalTitle:"NoFM",
      playerStatus: "stopped",
      playerManager: this.playerManager,
      switchSignal: this.switchSignal,
      archivo: ["default"]
    }
  }

  componentDidMount(){
    this.getArchiveFiles();
  }

  test = ()=>{
    console.log("test");
  }

  componentDidUpdate(prevProps, prevState){
    this.player.onended = ()=>{
      console.log("ended_DU");
      if(!this.state.isLive){

        const randomIndex = Math.floor( (Math.random() * this.state.archivo.length) + 0);
        const patt = /([\w\d]{1,}\.mp3)/gm;
        const songTitle = (this.state.archivo) ? this.state.archivo[randomIndex].match(patt) : null;
        const onDemandTrack = this.state.archivo[randomIndex];
        this.setState({
          isLive: false,
          signal: onDemandTrack,
          signalTitle: songTitle[0].replace(".mp3", ''),
          playerStatus: "playing"
        });

        this.player.src = this.state.signal;
        this.player.play();
      }
    }
  }

  playerManager = ()=>{
    if(this.player.src !== this.state.signal){
      this.player.src = this.state.signal;
    }

    if(this.player.paused){
      this.player.play();
      this.setState({playerStatus: "playing"});
    }else{
      this.player.pause();
      this.setState({
        playerStatus: "stopped"
      });
    }
  }

  fastForward = ()=>{
    if(this.player !== null){
      this.player.currentTime = this.player.currentTime + 30;
    }
  }

  rewind = () => {
    if(this.player !== null){
      this.player.currentTime = this.player.currentTime - 10;
    }
  }

  switchSignal = (isLive)=>{
    this.player.pause();
    this.setState({playerStatus: "paused"});

    if(isLive){
      this.setState({
        signal: "https://s2.voscast.com:8163/stream",
        isLive: true
      });
    }else{
      const randomIndex = Math.floor( (Math.random() * this.state.archivo.length) + 0);
      const patt = /([\w\d\D]{1,}\.mp3)/gm;
      const dirtyTitle = (this.state.archivo) ? decodeURI(this.state.archivo[randomIndex]).match(patt)[0] : null;
      const songTitle = dirtyTitle.replace("https://firebasestorage.googleapis.com/v0/b/nofmradio.appspot.com/o/", "");
      const onDemandTrack = this.state.archivo[randomIndex];
      this.player.currentTime = 0;
      this.setState({
        isLive: false,
        signal: onDemandTrack,
        signalTitle: songTitle.replace(".mp3", '')
      });
    }
  }


  getArchiveFiles = ()=>{
    const storage = getStorage(firebaseApp, "gs://nofmradio.appspot.com/");
    // console.log(storage);
    const listRef = ref(storage);
    // console.log(listRef);
    let archivo = [];
    // let listRef = storage.refFromURL("gs://nofmradio.appspot.com/");

    listAll(listRef)
      .then((res)=>{
        res.items.forEach((itemRef)=>{
          let itemPath = itemRef._location.path_;
          getDownloadURL(ref(storage, itemPath))
            .then( url => {
              archivo.push(url);
          }).catch((err)=>{
            console.error(err);
          });
        });
      }).catch((error)=>{
        console.error(error);
      });

    this.setState({
      archivo: archivo
    });

  }

  render(){
    const {signalTitle, isLive, playerStatus, playerManager, switchSignal} = this.state;

    return (
      <Fragment>
        <header className="app_header">
          <h1 className="app_title"><a href="https://nofm-radio.com/">TODO MENOS MIEDO</a></h1>
          <audio ref={ref => this.player = ref}/>
        </header>
        <Home
          title={signalTitle}
          switchSignal={switchSignal}
          playerManager={playerManager}
          isLive={isLive}
          fastForward={this.fastForward}
          rewind={this.rewind}
          playerStatus={playerStatus} />
      </Fragment>
    );
  }

}

export default App;
