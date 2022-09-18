import React, { Component, useEffect, useState } from 'react';

import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";

import {Link, Router} from 'react-router-dom';
import $ from "jquery";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import ConnectHead from '../../pages/ConnectHead.js';
import logo  from '../../images/logo.png';
import connect  from '../../images/connect.png';
import claimbtn  from '../../images/claimbtn.png';
import buybtn  from '../../images/buybtn.png';
import Dragon  from '../../images/Dragon.png';
import Incobators  from '../../images/Incobators.png';
import Marketplace  from '../../images/Marketplace.png';
import GameLog  from '../../images/GameLog.png';
import Booster  from '../../images/Booster.png';
import btns6  from '../../images/btns6.png';
import MintDragon1  from '../../images/MintDragon1.png';
import fightbox  from '../../images/fight2.png';
import gitbooks  from '../../images/gitbooks.png';
// import video5  from '../../video/5.mp4';
import backicon  from '../../images/backicon.png';

import { useWallet } from '@binance-chain/bsc-use-wallet';
import Config, { TOKEN, WARRIORS, VIEWER } from '../../../Config';
import DRAGON_ABI from '../../../Config/DRAGON_ABI.json'
import WARRIOR_ABI from '../../../Config/WARRIOR_ABI.json'
import VIEWER_ABI from '../../../Config/VIEWER_ABI.json'
import Web3 from 'web3';

const Battle = () =>  { 
	const [poolBalance, setPoolBalance]  = useState(0) ; 
	const [bnbRewarded, setBnbRewarded]  = useState(0) ; 
	const [bnbClaimed, setBnbClaimed]  = useState(0) ; 
	const [BNBPrice, setBNBPrice]  = useState(0) ; 
	
	const [minted, setMinted]  = useState(0) ; 
	const [won, setWon]  = useState(null) ; 
 
	let web3Provider ; 

	useEffect(() => {
		if(window.ethereum){
			web3Provider = window.ethereum ;
		}
		else{
			web3Provider = Config.RPC_URL ; 
		}

	})

	useEffect(() => {
		setInterval(() => {
			getBalances() ;
			
		}, 1000);
		getPrice() ; 
	},[] )

	const getPrice = async () => {
		let _bnbPrice = await fetch('https://api.bscscan.com/api?module=stats&action=bnbprice');
		_bnbPrice = await _bnbPrice.json() ;
		console.log(_bnbPrice)
		setBNBPrice(_bnbPrice.result.ethusd);
	}
		const getBalances = async () => {
		let _web3 = new Web3(web3Provider);
		// alert('jkjkn')

		const _nftContract = new _web3.eth.Contract(DRAGON_ABI,Config.DRAGONS);
		const _warriorsContract = new _web3.eth.Contract(WARRIOR_ABI,WARRIORS);
		const _viewerContract = new _web3.eth.Contract(VIEWER_ABI,VIEWER);
		let _getPoolBalance = await _web3.eth.getBalance(Config.POOL);		; 
		// alert(_getPoolBalance)
		_getPoolBalance = _web3.utils.fromWei(_getPoolBalance) ; 
		_getPoolBalance = parseFloat(_getPoolBalance).toFixed(2)

		setPoolBalance(_getPoolBalance); 

		let _getClaimed = await _warriorsContract.methods.bnbRewarded().call() ; 
		let _getMinted = await _nftContract.methods.totalSupply().call() ; 
		// let _totalReward = await _viewerContract.methods.totalReward().call() ; 
		let _totalReward = 153.23 ; 
		// _totalReward = _web3.utils.fromWei(_totalReward) ; 
		_totalReward = parseFloat(_totalReward).toFixed(2)
		let _totalRewardWon = await _warriorsContract.methods.totalRewardWon().call() ; 
		_totalRewardWon = _web3.utils.fromWei(_totalRewardWon) ; 
		_totalRewardWon = parseFloat(_totalRewardWon).toFixed(2)

		let _won = 0 ; 
		
		let _counter  = Math.ceil(_getMinted/100);
		setMinted(_getMinted);
		_getClaimed = _web3.utils.fromWei(_getClaimed) ; 
		_getClaimed = parseFloat(_getClaimed).toFixed(2)

		let _totalClaimed = 80.18 ; 
		// _totalReward = _web3.utils.fromWei(_totalReward) ; 
		_totalClaimed = parseFloat(_totalClaimed).toFixed(2)

		// _getClaimed = parseFloat(parseFloat(80.18).toFixed(2)  + parseInt(_getClaimed);
		setBnbRewarded(parseFloat(_totalRewardWon) + parseFloat(_totalReward) ); 
		setBnbClaimed(parseFloat(_totalClaimed)+ parseFloat(_getClaimed) - 587 ); 
		 
	 
		

		//  _warriorsContract.events.allEvents({
		// 	fromBlock: 'latest',
		// }, function(error, event){ console.log(event); })
		// .on('data', function(event){
		// 	console.log(event); // same results as the optional callback above
		// })

		let _getFightWon = await _warriorsContract.methods.totalFightsWon().call() ; 
		let _getFight = await _warriorsContract.methods.totalFights().call() ; 
		// setWon(11241+parseFloat(_getFightWon) +" out of "+(11241+parseFloat(_getFight))) ;
		setWon(11241+parseFloat(_getFightWon)) ;

		// for(let i = 0 ; i < _counter ; i++){
		// 	// console.log(100*i)
		// 	// console.log(_counter*(i+1))
		// 	let _start = i*100 ; 
		// 	let _end = 100*(i+1) ;
		// 	if(_counter == (i+1)){
		// 		_end = _getMinted  -1;
		// 	}

		// 	let _getFight = await _viewerContract.methods._getData(_start,_end).call() ; 
		// 	_won += parseInt(_getFight);
		// 	console.log(_won);
		// 	 if(i == (_counter - 1)){
		// 		let _getFightWon = await _warriorsContract.methods.totalFightsWon().call() ; 
		// 		setWon(_won+parseFloat(_getFightWon));
		// 	 }
		// }

	}

		
		return(
			<div>
			<section id="banner-sec2">
				<div className="main-box">
				
					<div className="container-fluid">
					<div className="back-p2"> <Link to="/"> <p><span><img src={backicon} /> </span> Back</p></Link></div>
						<ConnectHead />
						
						<div className="main-wrp-claimbox">
							
							<div className="wrp-epich-list">
								<ul className="epich-list">
									{/* <li>
										<div className="w-epichlist-content">
											<div className="epichlist-child">
												<p>BNB Pool</p>
											</div>
											<div className="epichlist-child">
												<p><span>{poolBalance} ~ ${parseFloat(BNBPrice*poolBalance).toFixed(2)}</span></p>
											</div>
										</div>
									</li> */}
									<li>
										<div className="w-epichlist-content">
											<div className="epichlist-child">
												<p>BNB Rewarded</p>
											</div>
											<div className="epichlist-child">
												<p><span>{parseFloat(bnbRewarded).toFixed(2)} ~ ${parseFloat(BNBPrice*bnbRewarded).toFixed(2)}</span></p>
											</div>
										</div>
									</li>
									<li>
										<div className="w-epichlist-content">
											<div className="epichlist-child">
												<p>BNB Claimed</p>
											</div>
											<div className="epichlist-child">
												<p><span>{parseFloat(bnbClaimed).toFixed(2)} ~ ${parseFloat(BNBPrice*bnbClaimed).toFixed(2)}</span></p>
											</div>
										</div>
									</li>
									<li>
										<div className="w-epichlist-content">
											<div className="epichlist-child">
												<p>Total Egg Minted</p>
											</div>
											<div className="epichlist-child">
												<p><span>{minted}</span></p>
											</div>
										</div>
									</li>
									<li>
										<div className="w-epichlist-content">
											<div className="epichlist-child">
												<p>Total Fights Won</p>
											</div>
											<div className="epichlist-child">
												{
													won ?
													<p><span>{won}</span> </p>
													:
													<p><span>Calculating...</span> </p>
												}
											</div>
										</div>
									</li>
									
									<li className="mb-2"> 
										<div className="w-epichlist-content">
											<div className="epichlist-child">
												<p>Total Dragon Incubated</p>
											</div>
											<div className="epichlist-child">
												<p><span>Pending...</span> </p>
											</div>
										</div>
									</li>
								{/* <small className="text-white mt-5">**Data Updated on Daily or 12 Hourly basis</small> */}

								</ul>
							</div>
							<div className="fight-box">
								<Link to="/reserve"><img src={fightbox} /></Link>
								<div className="gitbook-box">
								<a href="https://drachenlord.gitbook.io/drachen/" target="_blank"><img src={gitbooks} /></a>
								</div>
							</div>
                            
						</div>
						<div className="recuit-wrp">
								<div className="recuit-btn">
									<Link to="/mint"><img src={MintDragon1} alt="btn1" /></Link>
								</div>
								<div className="recuit-btn">
									<Link to="/reserve"><img src={Dragon} alt="btn1" /></Link>
								</div>
								<div className="recuit-btn">
									<Link to="/booster"><img src={Booster} alt="btn1" /></Link>
								</div>
								<div className="recuit-btn">
									<a href="#"><img src={Incobators} alt="btn1" /></a>
								</div>
								<div className="recuit-btn">
									<Link to="/marketplace2"><img src={Marketplace} alt="btn1" /></Link>
								</div>
								<div className="recuit-btn">
									<Link to="/gamelog"><img src={GameLog} alt="btn1" /></Link>
								</div>
							</div>
					</div>
				</div>
			</section>	
			</div>
		);
 

}
export default Battle;