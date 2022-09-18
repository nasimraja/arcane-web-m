import React, { Component, useEffect, useState } from 'react';
import {Link, Router} from 'react-router-dom';
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";

import $ from "jquery";
import connect  from '../images/connect.png';
import claimbtn  from '../images/claimbtn.png';
import buybtn  from '../images/buybtn.png';

import ConnectButton from './ConnectButton';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import Config, { PRICE_ORACLE, TOKEN, WARRIORS } from '../../Config';
import TOKEN_ABI from '../../Config/TOKEN_ABI.json'
import WARRIOR_ABI from '../../Config/WARRIOR_ABI.json'
import PRICE_ABI from '../../Config/PRICE_ABI.json'
import Web3 from 'web3';

const ConnectHead = () => { 
	const wallet = useWallet() ; 
	const [balance, setBalance]  = useState(0) ; 
	const [reward, setReward]  = useState(0) ; 
	const [fee, setFee]  = useState(0) ; 
	const [feeday, setFeeDays]  = useState(0) ; 
	const [claimable, setClaimable]  = useState(true) ; 
	const [rewardBNB, setRewardBNB]  = useState(0) ; 
	
	const [day,setDay] = useState(null);
    const [hour,setHour] = useState(null);
    const [minute,setMinute] = useState(null);
    const [second,setSecond] = useState(null);
   
    const [modal, setModal] = useState(false);
   
    const toggle = () => setModal(!modal);
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
		if(wallet.account){
			setInterval(() => {
			getBalances() ;
				
			}, 3000);
		}
	},[wallet.account] )

	const getBalances = async () => {
		let _web3 = new Web3(web3Provider);
		const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,TOKEN);
		const _warriorsContract = new _web3.eth.Contract(WARRIOR_ABI,WARRIORS);
		const _priceContract = new _web3.eth.Contract(PRICE_ABI,PRICE_ORACLE);
		let _getPrice = await _priceContract.methods.getTokenPrice().call() ; 
		let _getBalance = await _tokenContract.methods.balanceOf(wallet.account).call() ; 
		console.log(_getBalance)
		_getBalance = _web3.utils.fromWei(_getBalance) ; 
		setBalance(parseFloat(_getBalance).toFixed(2)); 

		let _getReward = await _warriorsContract.methods.getRewardBalance(wallet.account).call() ; 
		let _getUnlock = await _warriorsContract.methods.getUnclockTime(wallet.account).call() ; 
		let _getFee = await _warriorsContract.methods.tax().call() ; 
		let _getFeeDay = await _warriorsContract.methods.taxdays().call() ; 
		let _timespan = new Date().getTime()/1e3 - _getUnlock ; 
		let _taxFee = 0 ;
		let _tax = _getFee ;
		if (_timespan < _getUnlock) {
            _taxFee = _tax - Math.round(_timespan/86400) ;
			setFee(_taxFee);
			setFeeDays(Math.round(_getFeeDay/86400) - Math.round(_timespan/86400));
        }
		

		if(_getUnlock > new Date().getTime()/1e3){
			setClaimable(false);
			 
			setInterval(() => {
				startTimer(_getUnlock*1e3);
			}, 1000);

		}
		_getReward = _web3.utils.fromWei(_getReward) ; 
		_getPrice = _web3.utils.fromWei(_getPrice) ; 
		_getReward = parseFloat(_getReward).toFixed(2);
		setRewardBNB(_getReward); 
		_getReward  = parseFloat(_getReward*parseFloat(_getPrice).toFixed(2)).toFixed(2)
		setReward(_getReward); 
	 

	}


	const startTimer = (_t) => {
		const countDate = new Date(_t);
		const now = new Date().getTime();
		const gap = countDate - now;
			
		const second = 1000,
		  minute = second * 60,
		  hour = minute * 60,
		  day = hour * 24;
	  
		const textDay = Math.floor(gap / day),
		  textHour = Math.floor((gap % day) / hour),
		  textMinute = Math.floor((gap % hour) / minute),
		  textSecond = Math.floor((gap % minute) / second);
	  
		setDay(textDay+"d");
		setHour(textHour+"h");
		setMinute(textMinute+"m");
		setSecond(textSecond+"s");
			}

		 
async function claimReward(){

    let _web3 = new Web3(web3Provider);
	const _warriorsContract = new _web3.eth.Contract(WARRIOR_ABI,WARRIORS);

    setModal(!modal);
    _warriorsContract.methods.claimRewards().send({
        from: wallet.account
    }).on('receipt', function(receipt){
        setModal(modal);
        getBalances() ; 
    }).on('error', function(receipt){
        setModal(modal);

    })
    
}
			

		return(
			<div>
                <div className="head-banner-wrp">
							
							<div className="head-box1">
							
								{
									wallet.account ?
									<div className="wallet-content"><p>{wallet.account}</p></div>
									:
								<div className="wallet-content"><p>No Wallet</p></div>
								}
							</div>
							
							<div className="head-box3">
								<div className="wrp-connects">
									<div className="wrp-cleaim-box">
									<div className="claim-box">
										<div className="bnb-img">
											<p>{reward} <span>$DRAG</span> ~ {rewardBNB} <span>BNB</span></p>									 
										</div>
										 
										<div className="claim-btn">
											{
												claimable ?
												reward > 0 ?
												<>
												<a href="javascript:void" onClick={claimReward} ><p className="text-white mt-1">Fee: {fee}% <img src={claimbtn} alt="claimbtn" style={{width : "70px"}} /></p></a>
												
												{
													fee > 0 &&
													<p className="text-white mt-1">No fee After {feeday} days</p>
												}
												</>
												:
												<></>
												:
												<>
												<p className="text-white mt-1">{day} : {hour} : {minute} : {second} </p>
												<p className="text-white mt-1">To Claim</p>
												</>
											}
										</div>
									</div>
									<div className="claim-box">
										<div className="bnb-img2">
											<p>{balance} <span>$DRAG</span></p>
										</div>
										<div className="claim-btn buy-btn">
											<a href="https://pancakeswap.finance/swap?outputCurrency=0x239d4e702667f106950ab897ba17802b2d15cc3f"><img src={buybtn} alt="claimbtn" /></a>
										</div>
									</div>
								</div>
									<div className="connect-img">
										{
											!wallet.account &&
											<ConnectButton />
										}
									</div>
								</div>
							</div>
						</div>

						         
   <Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>

			</div>
		);
 

}
export default ConnectHead;