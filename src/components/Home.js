import React, {Component, Fragment} from 'react';
import playButton from '../images/play_nofm.svg';
import pauseButton from '../images/pause_nofm.svg';

export default class Home extends Component{
	
	render(){
		const {title, playback, controls, isLive, playerStatus, playlist} = this.props;
		let btnPlayback;
		let fnPlayback;
		switch(playerStatus){
			case "stopped":
				btnPlayback = playButton;
				fnPlayback = controls.play;
			break;
			case "playing":
				btnPlayback = pauseButton;
				fnPlayback = controls.pause;
			break;
			default: btnPlayback = playButton;
		}
		return(
			<Fragment>
				<section className="section_wrapper">
					<figure className="f_container">
						<img src="http://localhost/~rizika/nofm-radio.com/wp-content/uploads/2019/07/nofm_logo_elipse.jpg" alt="Fondo de pantalla"/>
						<figcaption className="f_caption">
							<h1 className="f_title">{title}</h1>
						</figcaption>
					</figure>
					<div className="bottom_wrapper">
						<picture className="play_button" width="144px" height="144px">
							<button onClick={fnPlayback}>
								<img src={btnPlayback} alt="Play Pause button" />
							</button>
						</picture>

						<ul className="signal_switch">
							<li className={isLive ? 'signal_item signal_selected' : 'signal_item'}>
								<button onClick={ () => playback("http://s2.voscast.com:8162/;&type=mp3", true) }>EN VIVO</button>
							</li>
							<li className={isLive ? 'signal_item' : 'signal_item signal_selected'}>
								<button onClick={ () => playback(playlist, false) } >ARCHIVO</button>
							</li>
						</ul>
						
						<ul className="social_buttons">
							<li className="social_item">
								<a href="https://www.facebook.com/todomenosmiedo/" title="Social button Facebook">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58" width="24" height="24" fill="#ffffff">
										<path className="cls-fb-w" d="M53.85,0H3.15A3.15,3.15,0,0,0,0,3.15v50.7A3.15,3.15,0,0,0,3.15,57h27.3V35H23V26.33h7.41V20c0-7.37,4.49-11.38,11.06-11.38A62.15,62.15,0,0,1,48.15,9v7.69H43.61c-3.57,0-4.26,1.69-4.26,4.18v5.5H47.9L46.79,35H39.35V57h14.5A3.15,3.15,0,0,0,57,53.85V3.15A3.15,3.15,0,0,0,53.85,0Z"></path>
									</svg>
								</a>
							</li>
							<li className="social_item Twitter">
								<a href="https://twitter.com/nofm_radio" title="Social button">
									<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="931 512.833 58 56">
										<path fill="#FFFFFF" d="M949.239,564.398c21.889,0,33.858-18.135,33.858-33.859c0-0.514,0-1.028-0.035-1.538c2.329-1.685,4.34-3.77,5.938-6.16c-2.171,0.962-4.475,1.593-6.835,1.873c2.485-1.488,4.343-3.827,5.232-6.582c-2.336,1.385-4.893,2.362-7.557,2.889c-4.508-4.792-12.046-5.025-16.837-0.517c-3.09,2.906-4.401,7.237-3.443,11.37c-9.567-0.48-18.481-4.999-24.524-12.433c-3.159,5.436-1.545,12.392,3.684,15.884c-1.894-0.055-3.747-0.566-5.401-1.489c0,0.049,0,0.101,0,0.151c0.001,5.664,3.995,10.542,9.547,11.665c-1.752,0.478-3.591,0.548-5.374,0.203c1.559,4.848,6.026,8.168,11.117,8.266c-4.212,3.311-9.419,5.109-14.777,5.102c-0.947,0-1.893-0.059-2.833-0.17c5.442,3.491,11.774,5.344,18.239,5.336"></path>
									</svg>
								</a>
							</li>
							<li className="social_item">
								<a href="http://feeds.feedburner.com/nofm-radio/HgNX" title="Social button FeedBurner">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff">
										<path fill="none" d="M0 0h24v24H0z"></path>
										<circle cx="6.18" cy="17.82" r="2.18"></circle>
										<path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"></path>
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</section>
			</Fragment>
		);
	}
}