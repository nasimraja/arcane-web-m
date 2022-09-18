import React, { Component, useEffect, useState } from 'react';
import {Link, Router} from 'react-router-dom';
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";

 

import $ from "jquery";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import ConnectHead from '../../pages/ConnectHead.js';
// import slide1  from '../../images/slide1.png';
import Approve  from '../../images/Approve.png';
import mint  from '../../images/mint.png';
import backicon  from '../../images/backicon.png';
import arcanelogo from '../../images/arcanelogo.png'


import { useWallet } from '@binance-chain/bsc-use-wallet';
import Config, { TOKEN } from '../../../Config';
import PRICE_ABI from '../../../Config/PRICE_ABI.json'
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json'
import DRAGON_ABI from '../../../Config/DRAGON_ABI.json'
import WARRIOR_ABI from '../../../Config/WARRIOR_ABI.json'
import Web3 from 'web3';

const upgrade = () => { 
	const wallet = useWallet() ; 

	const [price, setPrice]  = useState(0) ; 
	const [approval, setApproval] = useState(false);
	const [media, setMedia] = useState(false);
	const [name, setName] = useState(false);
	const [showDragon, setShowDragon] = useState(false);
	const [canMint, setCanMint] = useState(true);
 
	const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

	const [dragonModal, setDragonModal] = useState(false);
    const dragonToggle = () => setDragonModal(!dragonModal);

	const [noApprovalModal, setApprovalModal] = useState(false);
    const noApproval = () => setApprovalModal(!noApprovalModal);
	

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
		getPriceApproval() ;

	 },3000)
		
	},[wallet.account] )

	const getPriceApproval = async () => {
		let _web3 = new Web3(web3Provider);
		const _priceContract = new _web3.eth.Contract(PRICE_ABI,Config.PRICE_ORACLE);
	 
	 

		let _getPrice = await _priceContract.methods.getCharacterPrice().call() ; 
		 
		_getPrice = _web3.utils.fromWei(_getPrice) ; 
		_getPrice = parseFloat(_getPrice).toFixed(2)

		setPrice(_getPrice); 
	 
		if(wallet.account){
			const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,Config.TOKEN);
			const _dragonContract = new _web3.eth.Contract(DRAGON_ABI,Config.DRAGONS);
	  		let _getapproval = await _tokenContract.methods.allowance(wallet.account,Config.WARRIORS).call() ; 
	  		let _getBalance = await _dragonContract.methods.balanceOf(wallet.account).call() ; 
	  		let _getlimit = await _dragonContract.methods.characterLimit().call() ; 
			if(_getBalance >= _getlimit){
				setCanMint(false);
			}
			  _getapproval = _web3.utils.fromWei(_getapproval) ; 

			  setCanMint


			if(parseFloat(_getapproval) > parseFloat(_getPrice)){
				setApproval(true)
			} 

		}


	}

	
	 
	async function mintDragon(){
		let _web3 = new Web3(web3Provider);
	 
		setModal(!modal);
	 
		const _warriorContract = new _web3.eth.Contract(WARRIOR_ABI,Config.WARRIORS);
	 	_warriorContract.methods.createNewDragon().send({from: wallet.account}).on('receipt', function(receipt){
			getPriceApproval();          
			 setModal(modal);
			 openDragonModal() ; 
	
		})
	  
		.on('error', function(error, receipt) {
		setModal(modal);
			
		});
		   
	}

	async function approveToken(){
		let _web3 = new Web3(web3Provider);
	 
		setModal(!modal);
	 
		const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,Config.TOKEN);
		const _amount = _web3.utils.toWei('100000000000000000000000000000000000') ;
		_tokenContract.methods.approve(Config.WARRIORS,_amount).send({from: wallet.account}).on('receipt', function(receipt){
			getPriceApproval();          
			 setModal(modal);
	
		})
	  
		.on('error', function(error, receipt) {
		setModal(modal);
			
		});
		   
	}

	async function openDragonModal(){
		let _web3 = new Web3(web3Provider);
		
		const _nftContract = new _web3.eth.Contract(DRAGON_ABI,Config.DRAGONS);

		setShowDragon(false)

		let _balance =  await _nftContract.methods.balanceOf(wallet.account).call() ; 
		if(_balance > 0 ){
			let _index = _balance - 1 ; 
			let _getLatest = await _nftContract.methods.tokenOfOwnerByIndex(wallet.account,_index).call() ; 
			let _mediaURI = await _nftContract.methods.tokenURI(_getLatest).call() ;
			try{
				_mediaURI = await fetch(_mediaURI) ;
				_mediaURI = await _mediaURI.json() ;
				setMedia(encodeURI(_mediaURI.image));
				setName(_mediaURI.name);
				setDragonModal(!dragonModal);
				setTimeout(() => {
					setShowDragon(true);
				}, 3000);
			}
			catch{
				alert("Some Error Occured. Please try Again")

			}
		


		}
		else{
			openDragonModal() ; 
		}

	  
		   
	}

	
	async function testDragonModal(){
		
		setShowDragon(false)
	 
		 	let _mediaURI = '//s3.amazonaws.com/drachon.api/Drake.json' ;
			try{
				_mediaURI = await fetch(_mediaURI) ;
				_mediaURI = await _mediaURI.json() ;
				setMedia(encodeURI(_mediaURI.image));
				setName(_mediaURI.name);
				setDragonModal(!dragonModal);
				setTimeout(() => {
					setShowDragon(true);
				}, 3000);
			}
			catch{
				alert("Some Error Occured. Please try Again")
			}
		

 

	  
		   
	}

	
	function gotoMarketPlace(){
		window.location.href = "/marketplace"
	}
	function gotoDungen(){
		window.location.href = "/reserve"
	}
	

		return(
			<div>
                <section id="upgrade-bg">
                   
                    <div className="main-box">
                        <div className="container-fluid">
						<div className="back-p2"> <Link to="/battle"> <p><span><img src={backicon} /> </span> Back</p></Link></div>
							<ConnectHead />
						</div>
						<div className="container">
						<div className="row">
								<div className="col-lg-12">
										<div className="slide-wrps">
										<div className="slide-bg">
											
													<div className="slides-l2">
														<h4>MINT DRAGON</h4>
														<img src={arcanelogo} alt="slideimg" />
														<div className="slide-caption">
															<h4>MINT DRAGON EGG</h4>
															<p>{price} $DRAG TO MINT DRAGON EGG</p>
															
																{
																	approval ?
																	canMint ?
																	<div className="bnkbtn">
																	<a href="javascript:void" onClick={mintDragon}><img src={arcanelogo} /></a>
																	</div>

																	:
																	<>
																	<p className="text-white mt-2">You can't mint more Dragons as you already  have maximum allowed Dragons. Sell them on Marketplace to mint more.</p>
																	
   																	<Button className="depositButton mb-3" onClick={gotoDungen}>Go to Dungen</Button>
																	
																	</>
																	:
																	<div className="bnkbtn">
																	<a href="javascript:void" onClick={approveToken}><img src={Approve} /></a>
																	<a href="javascript:void" onClick={noApproval} ><img src={mint} /></a>
																	</div>

																}
																<p className="text-white mt-2">You can also buy more Dragons from Marketplace offered by other users.</p>
																	
																	<Button className="depositButton mb-3" onClick={gotoMarketPlace}>Go to Marketplace</Button>
																 
														</div>
													</div>
										
										</div>
									</div>
								</div>
							</div>
						</div>
                    </div>
                </section>

						         
   <Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>

 <Modal isOpen={noApprovalModal} toggle={noApproval}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Please Approve First.</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={noApproval}>Close</Button>
    
 </Modal>

 <Modal isOpen={dragonModal} toggle={dragonToggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >
	   {
		   showDragon ?
			<>
			<h3 className="mt-1 mb-2">Congratulations!!! <br /> You have minted a Dragon</h3>
	   <img src={media} width="100%" />
	   <h3 className="mt-1">{name}</h3>
	   </>
	   :
	//    <img src={EGGBALL} width="100%" />
	<h5 className="mt-1 mb-2">Minted!!! <br /> Your egg is getting hatched now.</h5>
	   }
  		 
	   </div>      

   </ModalBody>
   	{
		showDragon &&
		<>
   		<Button className="depositButton mr-auto ml-auto mb-5" onClick={dragonToggle}>Close</Button>
   		<Button className="depositButton mr-auto ml-auto mb-5" onClick={gotoDungen}>Go to Dungen</Button>
		</>
	}
    
 </Modal>


			</div>
		);
	}


export default upgrade;