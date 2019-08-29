import React, {Component, Fragment} from 'react';
import './App.css';
import Home from './components/Home';

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
      }
    }
  }

  componentDidMount(){
    console.log("did mount");
    //const radioUrl = "http://s2.voscast.com:8162/;&type=mp3";

    setInterval(() => {this.getRadioTitle();}, 1000);
  }

  test = ()=>{
    let count = 0;
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
    console.log("did update");
    let track = prevState.radioUrl;
    if(track){

    }
  }

  handlePlayback = (signal, live) => {
    console.log("click");
    this.setState({
      signal: signal,
      isLive: live
    });
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

  render(){
    const {signalTitle, playback, controls, isLive, playerStatus} = this.state;
    return (
      <Fragment>
        <header className="app_header">
          <h1 className="app_title">NoFM Radio</h1>
          <audio ref={ref => this.player = ref}/>
        </header>
        <Home title={signalTitle} playback={playback} controls={controls} isLive={isLive} playerStatus={playerStatus}/>
      </Fragment>
    );
  }

}

export default App;