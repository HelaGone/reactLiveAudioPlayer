import React, {Component, Fragment} from 'react';
import './App.css';
import Home from './components/Home';
import firebase from './firebase';
import '@firebase/storage';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      signal: "http://s2.voscast.com:8162/;&type=mp3",
      isLive:true,
      signalTitle:"",
      playerStatus: "stopped",
      playback: this.handlePlayback,
      controls: {
        play: this.playControl,
        pause: this.pauseControl
      },
      archivo: []
    }

    this.getArchiveFiles = this.getArchiveFiles.bind(this);

  }

  componentDidMount(){
    console.log("did mount");
    //const radioUrl = "http://s2.voscast.com:8162/;&type=mp3";

    //setInterval(() => {this.getRadioTitle();}, 1000);
    this.getRadioTitle();
    this.getArchiveFiles();
  }

  test = ()=>{
    let count = 0;
    console.log(count);
  }

  getRadioTitle = (url = "http://localhost/~rizika/nofm-radio.com/wp-json/react/v2/radio/") =>{
    fetch(url)
    .then(response => response.json())
    .then(data=>{
      const {title} = data;
      this.setState({
        signalTitle: title,
      });
      return title;
    })
    .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps, prevState){
    let track = prevState.radioUrl;
    if(track){

    }
  }

  handlePlayback = (signal, live) => {
    if(live !== this.state.isLive){
      this.player.pause();
      if(typeof signal == 'object'){
        
        let itemCount = Math.floor( (Math.random() * signal.length) + 0);
        this.player.src = signal[itemCount];
        const patt = /([\w\d]{1,}\.mp3)/gm;
        let songTitle = signal[itemCount].match(patt)
        console.log(songTitle[0]);
        this.setState({
          signalTitle: songTitle[0].replace(".mp3", '')
        });
        this.player.onended = ()=>{
          console.log("ended");
          itemCount = Math.floor( (Math.random() * signal.length) + 0);
          this.player.src = signal[itemCount];
        }
      }else{
        console.log('is not object');
        this.player.src = signal;
        this.getRadioTitle();
      }

      this.setState({
        signal: signal,
        isLive: live,
        playerStatus: "playing", 
      });
      this.player.play();
    }
    return true;
  }

  playControl = () =>{
    this.player.src = this.state.signal;
    this.player.play();

    this.setState({
      playerStatus: "playing"
    });
  }

  pauseControl = ()=>{
    this.player.pause();

    this.setState({
      playerStatus: "stopped"
    });
  }

  getArchiveFiles = ()=>{
    const storage = firebase.storage();
    let archivo = [];
    let listRef = storage.refFromURL("gs://nofmradio.appspot.com/");

    listRef.listAll().then(function(res){

      res.prefixes.forEach(function(folderRef){
        //console.log("Folder ref: ", folderRef);
      });

      res.items.forEach(function(itemRef){
        listRef.child(itemRef.location.path).getDownloadURL().then(function(url){
          // console.log(url);
          archivo.push(url);
        }).catch(function(err){
          console.error(err);
        });

      });

    }).catch(function(error){
      console.error(error);
    });

    this.setState({
      archivo: archivo
    });
  }

  render(){
    const {signalTitle, playback, controls, isLive, playerStatus, archivo} = this.state;
    return (
      <Fragment>
        <header className="app_header">
          <h1 className="app_title">NoFM Radio</h1>
          <audio ref={ref => this.player = ref}/>
        </header>
        <Home title={signalTitle} playback={playback} controls={controls} isLive={isLive} playerStatus={playerStatus} playlist={archivo}/>
      </Fragment>
    );
  }

}

export default App;