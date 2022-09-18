import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from "jquery";
import socialcharacter1 from '../images/socialcharacter.png';
import twitter2  from '../images/twitter.png';
import telegram3  from '../images/telegram.png';
import Subtraction4  from '../images/Subtraction.png';
import discord from '../images/discord.png';
class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	
	  }
	  componentDidMount = () =>{

	  }
	  
  render() {
	 return (
		 <div>
			 <div className="bg-footer">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<ul className="socila-list">
								<li><a href="https://discord.gg/ajesZGddzV" target="_blank"><img src={discord} /></a></li>
								<li><a href="https://www.reddit.com/r/arcanenft/" target="_blank"><img src={socialcharacter1} /></a></li>
								<li><a href="https://twitter.com/thearcanefi" target="_blank"><img src={twitter2} /></a></li>
								<li><a href="https://t.me/arcanenftfinancial" target="_blank"><img src={telegram3} /></a></li>
								<li><a href="https://medium.com/@arcanefinancial" target="_blank"><img src={Subtraction4 } /></a></li>
							</ul>
							<p className="socila-list-text">© 2022 Arcane. All rights reserved.</p>
						</div>
					</div>
				</div>
			 </div>
		 </div>

    );
  }
}

export default Footer;