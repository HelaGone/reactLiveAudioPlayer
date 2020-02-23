import React, {Component, Fragment} from 'react';
import playButton from '../images/play_nofm.svg';
import pauseButton from '../images/pause_nofm.svg';
import nofmradio from '../images/player.jpg';
import Transport from './widgets/Transport';
import Title from './widgets/Title';
import SocialButtons from './widgets/SocialButtons';

export default class Home extends Component{

	render(){
		const {title, switchSignal, playerManager, isLive, playerStatus, fastForward, rewind} = this.props;
		let btnPlayback;
		switch(playerStatus){
			case "stopped":
				btnPlayback = playButton;
			break;
			case "playing":
				btnPlayback = pauseButton;
			break;
			default: btnPlayback = playButton;
		}
		return(
			<Fragment>
				<section className="section_wrapper">
					<figure className="f_container">
						<img src={nofmradio} alt="Fondo de pantalla"/>
						<figcaption className="f_caption">
							{ isLive ? (<Title />) : (<h1 className="f_title">{title}</h1>) }
						</figcaption>
					</figure>
					<div className="bottom_wrapper">
						{
							!isLive &&
								<Transport isRWD="true" rewind={rewind} />
						}

						<picture className="play_button" width="144" height="144">
							<button onClick={playerManager}>
								<img src={btnPlayback} alt="Play Pause button" />
							</button>
						</picture>

						{
							!isLive &&
								<Transport isFF="true" fastForward={fastForward}/>
						}

						<ul className="signal_switch">
							<li className={isLive ? 'signal_item signal_selected' : 'signal_item'}>
								<button onClick={ () => switchSignal(true) }>EN VIVO</button>
							</li>
							<li className={isLive ? 'signal_item' : 'signal_item signal_selected'}>
								<button onClick={ () => switchSignal(false) } >AUDIOTECA</button>
							</li>
						</ul>

						<SocialButtons />
					</div>
				</section>
			</Fragment>
		);
	}
}
