import React, { Component, useEffect, useState } from 'react';
import {Link, Router,useLocation} from 'react-router-dom';
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";



import $ from "jquery";
import Header from '../header.js';
import Footer from '../footer.js';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import ConnectHead from '../ConnectHead.js';
import backicon  from '../../images/backicon.png';
import fightbtn  from '../../images/fightbtn.png';
import boostbtn  from '../../images/boost.png';

import { useWallet } from '@binance-chain/bsc-use-wallet';
import Config, { TOKEN, WARRIORS } from '../../../Config';
import PRICE_ABI from '../../../Config/PRICE_ABI.json'
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json'
import DRAGON_ABI from '../../../Config/DRAGON_ABI.json'
import WARRIOR_ABI from '../../../Config/WARRIOR_ABI.json'
import Web3 from 'web3';

import Berserker  from '../../images/Berserker.png';
import Goresaber  from '../../images/Goresaber.png';
import HeavyCrusher  from '../../images/HeavyCrusher.png';
import Hellwraith  from '../../images/Hellwraith.png';
import Mastodon  from '../../images/Mastodon.png';
import { AutoPlayStrategy } from 'react-alice-carousel';
import lefticons  from '../../images/lefticons.png';
import righticons  from '../../images/righticons.png';
import dol  from '../../images/dol.png';
import dol2  from '../../images/dol2.png';
import like  from '../../images/like.png';

const Fight = () => { 
    const wallet = useWallet() ;
    const location = useLocation() ;
	const [maxIndex, setMaxIndex]  = useState(4) ; 
    const [dragon,setDragon] = useState(null) ; 
    const [reqHp,setReqHp] = useState(null) ; 
    const [baseReward,setBaseReward] = useState(null) ; 
    const [chance,setChance] = useState(null) ; 
    const [userLimit,setUserLimit] = useState(0) ; 
    const [dragonLimit,setDragonLimit] = useState(0) ; 
    const [dragonLimitPrice,setDragonLimitPrice] = useState(0) ; 
    const [rewardEarned,setRrewardEarned] = useState(0) ; 
    const [bpEarned,setBpEarned] = useState(0) ; 
    const [eeLoss,setEeLoss] = useState(0) ; 
    const [depositError,setDepositError] = useState(null) ; 
    
    const [dayUser,setDayUser] = useState(null);
    const [hourUser,setHourUser] = useState(null);
    const [minuteUser,setMinuteUser] = useState(null);
    const [secondUser,setSecondUser] = useState(null);
    const [damount, setdAmount] = useState(0);

    const [dayDragon,setDayDragon] = useState(null);
    const [hourDragon,setHourDragon] = useState(null);
    const [minuteDragon,setMinuteDragon] = useState(null);
    const [secondDragon,setSecondDragon] = useState(null);

    const [media, setMedia] = useState(false);
	const [name, setName] = useState(false);
	const [speed, setSpeed] = useState(false);
	const [xp, setXp] = useState(false);
	const [ee, setEe] = useState(false);
	const [enemyCur, setEnemyCurr] = useState(0);
    const [approval, setApproval] = useState(0) ;
   
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [txModal, setTxModal] = useState(false);
    const txtoggle = () => setTxModal(!txModal);

    const [winModal, setWinModal] = useState(false);
    const winToggle = () => setWinModal(!winModal);

    const [lostModal, setLostModal] = useState(false);
    const lostToggle = () => setLostModal(!lostModal);
    
    const [balance, setBalance] = useState(0);
    const [symbol,setSymbol] = useState(null) ;


    const [uDragonmodal, setuDragonmodal] = useState(false);
    const uDragontoggle = () => setuDragonmodal(!uDragonmodal);

    const [uWalletmodal, setuWalletmodal] = useState(false);
    const uWallettoggle = () => setuWalletmodal(!uWalletmodal);

    
    
    const enemy = [
        {name : "Berserker" ,  image : Berserker  },
        {name : "Goresaber" ,  image : Goresaber  },
        {name : "Heavy Crusher" ,  image : HeavyCrusher  },
        {name : "Hellwraith" ,  image : Hellwraith  },
        {name : "Mastodon" ,  image : Mastodon  },
    ];
    
	let web3Provider ; 

    useEffect(() => {
		if(window.ethereum){
			web3Provider = window.ethereum ;
		}
		else{
			web3Provider = Config.RPC_URL ; 
		}
		const web3 = new Web3(web3Provider);

	})

    useEffect(() => {
        const queryP = new URLSearchParams(location.search);
        const d= queryP.get('d');


      if(d){
        setDragon(d);
      }
  
    },[])

    useEffect(() => {
       if(dragon){
        getDragon()

       }
    },[dragon,enemyCur,wallet.account])

    

    async function getDragon(){
		let _web3 = new Web3(web3Provider);
		
		const _nftContract = new _web3.eth.Contract(DRAGON_ABI,Config.DRAGONS);
		const _warriorContract = new _web3.eth.Contract(WARRIOR_ABI,Config.WARRIORS);
        let _details = await _nftContract.methods.getHero(dragon,false).call() ;

        let _priceContract = new _web3.eth.Contract(PRICE_ABI,Config.PRICE_ORACLE);
        let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,Config.TOKEN);
        let _symbol = await _tokenContract.methods.symbol().call() ;
        setSymbol(_symbol);
      
        
        let _dlimitPrice = await _priceContract.methods.getLimitPrice().call() ;
        _dlimitPrice = parseFloat(_web3.utils.fromWei(_dlimitPrice)).toFixed(2);
        setDragonLimitPrice(_dlimitPrice);
        if(wallet.account){
            let _balance = await _tokenContract.methods.balanceOf(wallet.account).call() ;
            _balance = parseFloat(_web3.utils.fromWei(_balance)).toFixed(2);
            setBalance(_balance)

            let _limit = await _warriorContract.methods.fightLimit(wallet.account,dragon).call() ;
            let _restTime = await _warriorContract.methods.timelimitFight().call();

            let _approval = await _tokenContract.methods.allowance(wallet.account,Config.WARRIORS).call() ; 
            _approval = parseFloat(_web3.utils.fromWei(_approval)).toFixed(2);

            setApproval(_approval) 

            if(_limit[1] == 0 ){
                let _endTimeDragon = await _warriorContract.methods.lastFightDragon(dragon).call();
                _endTimeDragon = parseFloat(parseFloat(_endTimeDragon)*1e3) + parseFloat(_restTime*1e3) ; 
                 setInterval(() => {
                 
                    startTimerDragon(_endTimeDragon);
                    
                 }, 1000);
            }
            if(_limit[0] == 0 ){
                 let _endTimeUser = await _warriorContract.methods.lastFightUser(wallet.account).call();
                 _endTimeUser = parseFloat(parseFloat(_endTimeUser)*1e3) + parseFloat(_restTime*1e3) ; 

                setInterval(() => {
                 
                    startTimerUser(_endTimeUser);
                    
                 }, 1000);
            }
            setUserLimit(_limit[0]);
            setDragonLimit(_limit[1]);
        }

        let _enemyBaseBNB = await _nftContract.methods.baseBNBRewards(enemyCur).call() ;
        let _enemyBaseChances = await _nftContract.methods.baseChances(enemyCur).call() ;
        let _enemyBasehp = await _nftContract.methods.requiredHps(enemyCur).call() ;
        _enemyBaseBNB = _web3.utils.fromWei(_enemyBaseBNB);
        setReqHp(_enemyBasehp);
        setBaseReward(_enemyBaseBNB);
        let _chance = (_details[3]/_enemyBaseChances)*10 ; 
        // console.log(_chance);
        // _chance  = 100 - _chance  ; 
        _chance = parseInt(_chance) > 90 ? 90 : parseInt(_chance) < 50 ?  parseFloat(parseFloat(_chance) + parseFloat(50)).toFixed(2) : parseFloat(_chance).toFixed(2)
        setChance(_chance);
        
        setSpeed(_details[5]);
        setXp(_details[2]);
        setEe(_details[6]);
         let _mediaURI = await _nftContract.methods.tokenURI(dragon).call() ;
         try{
             _mediaURI = await fetch(_mediaURI) ;
             _mediaURI = await _mediaURI.json() ;
             setMedia(encodeURI(_mediaURI.image));
             setName(_mediaURI.name);
         
             
         }
         catch{
            //  alert("Some Error Occured. Please try Again")

         }
        //  if(_data[0] == 21){
        //      setExpedite(true);
        //      let _endTime = new Date().getTime() + _data[8]*1e3 ; 
        //      setInterval(() => {
                 
        //         startTimer(_endTime);
                
        //      }, 1000);
             
        //  }
        //  else{
        //     setEe(_data[6])

        //  }
  
		   
	}

    

	const startTimerUser = (_t) => {
		const countDate = new Date(_t);
		const now = new Date().getTime();
		const gap = countDate - now ;
			
		const second = 1000,
		  minute = second * 60,
		  hour = minute * 60,
		  day = hour * 24;
	  
		const textDay = Math.floor(gap / day),
		  textHour = Math.floor((gap % day) / hour),
		  textMinute = Math.floor((gap % hour) / minute),
		  textSecond = Math.floor((gap % minute) / second);
          if(gap < 0){
            setDayUser("0d");
            setHourUser("0h");
            setMinuteUser("0m");
            setSecondUser("0s");
        }else{
           	setDayUser(textDay+"d");
		setHourUser(textHour+"h");
		setMinuteUser(textMinute+"m");
		setSecondUser(textSecond+"s");
        }
	
			}

            
      async function approveToken(){
        let _web3 = new Web3(web3Provider);
     
        setTxModal(!txModal);
     
        const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,Config.TOKEN);
        const _amount = _web3.utils.toWei('10000000000000000000000') ;
        _tokenContract.methods.approve(Config.WARRIORS,_amount).send({from: wallet.account}).on('receipt', function(receipt){
            getDragon();          
             setTxModal(txModal);
    
        })
      
        .on('error', function(error, receipt) {
            setTxModal(txModal);
            
        });
           
    }
    
            
	const startTimerDragon = (_t) => {
		const countDate = new Date(_t);
		const now = new Date().getTime();
		const gap = countDate - now ;
			
		const second = 1000,
		  minute = second * 60,
		  hour = minute * 60,
		  day = hour * 24;
	  
		const textDay = Math.floor(gap / day),
		  textHour = Math.floor((gap % day) / hour),
		  textMinute = Math.floor((gap % hour) / minute),
		  textSecond = Math.floor((gap % minute) / second);
        if(gap < 0){
            setDayDragon("0d");
            setHourDragon("0h");
            setMinuteDragon("0m");
            setSecondDragon("0s");
        }else{
            setDayDragon(textDay+"d");
            setHourDragon(textHour+"h");
            setMinuteDragon(textMinute+"m");
            setSecondDragon(textSecond+"s");
        }
	
			}


    async function fight(){
		let _web3 = new Web3(web3Provider);
	 
		setModal(!modal);
	 
		const _warriorContract = new _web3.eth.Contract(WARRIOR_ABI,Config.WARRIORS);
        let _oldbalance = await _warriorContract.methods.getRewardBalance(wallet.account).call() ; 
        // alert(dragon)
	 	_warriorContract.methods.fight(dragon,enemyCur).send({from: wallet.account}).on('receipt', async function(receipt){
            setModal(modal);
            getDragon() ; 
            let _newbalance = await _warriorContract.methods.getRewardBalance(wallet.account).call() ; 
            if(_newbalance > _oldbalance){
                _newbalance = _web3.utils.fromWei(_newbalance);
                _oldbalance = _web3.utils.fromWei(_oldbalance);
            let _reward  = parseFloat(_newbalance) - parseFloat(_oldbalance) ;
                _reward = parseFloat(_reward).toFixed(2);
                setRrewardEarned(_reward);
                setEeLoss("-100");
                winToggle();
                // alert("Dragon Won!! Rewards Earned: "+_reward+" BNB");
            }
            else{
                setRrewardEarned(0);
                setEeLoss("-200");
                lostToggle();

                // alert("Dragon Lost!!! Alien Won.");
            //     _newbalance = _web3.utils.fromWei(_newbalance);
            //     _oldbalance = _web3.utils.fromWei(_oldbalance);
            // let _reward  = parseFloat(_newbalance) - parseFloat(_oldbalance) ;
            //     _reward = parseFloat(_reward).toFixed(2);
            //     alert("Dragon Won!! Rewards Earned: "+_reward+" BNB");
            }
		
			 
	
		})
	  
		.on('error', function(error, receipt) {
		setModal(modal);
        alert("Transaction Failed Try Again")
			
		});
		   
	}

    
    const nextEnemy = () => {
        setEnemyCurr(enemyCur+1)
      }
      
      const prevEnemy = () => {
        setEnemyCurr(enemyCur-1)
      }
        
      const handleDepositChange = (e) => {
       
        setdAmount(e.target.value) ;
    

    }
    const buyDlimit = () => {
       
        let _web3 = new Web3(web3Provider);
	 
        txtoggle();

	 
		const _warriorContract = new _web3.eth.Contract(WARRIOR_ABI,Config.WARRIORS);
 
	 	_warriorContract.methods.buyLimitDragon(dragon,damount).send({from: wallet.account}).on('receipt', async function(receipt){
      
            txtoggle();
            uDragontoggle();
             getDragon() ; 
			 
	
		})
	  
		.on('error', function(error, receipt) {
            txtoggle();
           alert("Transaction Failed Try Again")
			
		});
    

    }

    
    const buyUlimit = () => {
       
        let _web3 = new Web3(web3Provider);
	 
        txtoggle();

	 
		const _warriorContract = new _web3.eth.Contract(WARRIOR_ABI,Config.WARRIORS);
 
	 	_warriorContract.methods.buyLimitUser(damount).send({from: wallet.account}).on('receipt', async function(receipt){
      
            txtoggle();
            uWallettoggle();
             getDragon() ; 
			 
	
		})
	  
		.on('error', function(error, receipt) {
            txtoggle();
           alert("Transaction Failed Try Again")
			
		});
    

    }

		return(
			<div>
                <section id="fight-bg">
                   
                    <div className="main-box">
                   
                    <div className="container-fluid">
                    <div className="back-p2"> <Link to="/reserve"> <p><span><img src={backicon} /> </span> Back</p></Link></div>
                    <ConnectHead />
                    </div>
                        <div className="container">
							
							<div className="row">
                                <div className="col-lg-12">
                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div className="popop-content">
                                                        <p>In the process of Vikings training their dragon for the royal task given to them by Archion in 
                                                            order to be crowned the Dragon Lord, an unidentifiable being was seen in the forest with its
                                                             troops searching for life on Earth. It was later realized that these Aliens traveled the way
                                                             from the first galaxy to look for a planet which they can use as an extension to their
                                                              own world and are willing to do anything to take over.
                                                        </p>
                                                        <p>
                                                            Vikings knowing this and not having the stamina to face these beings goes 
                                                            into doom hiding, it’s left for their trained dragons to fight and conquer 
                                                            these Aliens.
                                                            After which they will go ahead and complete the royal task of 
                                                            battling among themselves and be crowned DragonLord. 

                                                        </p>
                                                        <p>Will the dragons be able to conquer the Aliens or will the Aliens gain
                                                             victory and find solace in Earth?. It’s left for the dragons to utilize 
                                                            their maximum strength and experience to Triumph.</p>
                                                    </div>
                                                </div>
                                                
                                                </div>
                                            </div>
                                            </div>
                                        <div class="tab-pane4">
                                            <div class="tab-panel4 active" id="tab1">
                                                <div className="row">
                                                    <div className="col-lg-1"></div>
                                                    <div className="col-lg-4">
                                                    <div className="wrp-slidebox">
                                                    
                                                        <div className="fight-b-content">
                                                        <h3>{name}</h3>
                                                        <div className="fight-c-wrp">
                                                        <div className="fight-child1">
                                                            <img src={media} />
                                                        </div>
                                                       
                                                        </div>
                                                    <div className="fight-bottom-c">
                                                     
                                                        <div className="fight-bottom-c-wrp">
                                                            <div className="fight-bottom-child1">
                                                                <div className="dol-wrp">
                                                                   
                                                                    <div className="dol-content">
                                                                        <h4>BP</h4>
                                                                        <p>{xp}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="winrate">
                                                                 <h4>FS</h4>
                                                                 <p>{speed}</p>
                                                            </div>
                                                            
                                                            <div className="fight-bottom-child1">
                                                                <div className="dol-wrp">
                                                                   
                                                                    <div className="dol-content">
                                                                        <h4>EE</h4>
                                                                        <p>{ee}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                        {
                                                                    parseInt(ee) < parseInt(reqHp) &&
                                                                    <div className="fight-btn">
																	<a href="/booster" ><img src={boostbtn} /></a>
																	</div>

                                                        }
                                                        <div className="dashed-border">
                                                        <div className="fight-bottom-c-wrp justify-content-between godWar">
                                                    
                                                                 <p>Dragon's Fight Limit</p>
                                                                 <p>{dragonLimit}</p>
                                                          
                                                     
                                                        	</div>
                                                            {
                                                                    parseInt(dragonLimit) == 0 &&
                                                                    <>
                                                                     <div className="fight-bottom-c-wrp justify-content-between godWar" >
                                                                     <p>Limit Reset in</p>
                                                                 <p>{hourDragon} : {minuteDragon} : {secondDragon}</p>
                                                               </div>
                                                                    {/* <div className="fight-bottom-c-wrp justify-content-center godWar">
                                                               
                                                                    <div className="updgrade-btn">
																	<a href="javascript:void" onClick={uDragontoggle} ><img src={Upgrade} /></a>
																	</div>
                                                                    </div> */}
                                                                    </>
                                                                    }
                                                                      
                                                                      </div>
                                                        <div className="dashed-border">
                                                            
                                                            <div className="fight-bottom-c-wrp justify-content-between godWar mt-3">

 
                                                                 <p>Wallet's Fight Limit</p>
                                                                 <p>{userLimit}</p>
                                                           
                                                            </div>
                                                       
                                                       
                                                        {
                                                                    parseInt(userLimit) == 0 &&
                                                                    <>
                                                                       <div className="fight-bottom-c-wrp justify-content-between godWar" >
                                                                     <p>Limit Reset In</p>
                                                                     <p>{hourUser} : {minuteUser} : {secondUser}</p>
                                                               </div>
                                                                    {/* <div className="fight-bottom-c-wrp justify-content-center godWar" >
                                                                    <div className="updgrade-btn">
                                                                    <a href="javascript:void" onClick={uWallettoggle} ><img src={Upgrade} /></a>

																	</div>
																	</div> */}
                                                                    </>

                                                        }
                                                                      </div>
                                                         
                                                         
                                                       
                                                    </div>
                                                </div>
                                                
                                                     
                                                        </div> 
                                                    </div>
                                                    <div className="col-lg-2">
                                                    <div className="wrp-tabs">
                                                        <ul class="tabs4">
                                                            <li class="tab-button">
                                                                <a href="#"  type="button" class="tab-link" data-toggle="modal" data-target="#exampleModal">
                                                                    <div className="tab-btn">
                                                                        <p className='plot-btns'>Plot</p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        
                                                        </ul>
                                                    </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                    <div className="wrp-slidebox">
                                                   
                                                        <div className="fight-b-content">
                                                        <h3>{enemy[enemyCur].name}</h3>
                                                        <div className="fight-c-wrp">
                                                        <div className="fight-child1">
                                                            <img src={enemy[enemyCur].image} />
                                                        </div>
                                                        {
                                                            enemyCur != 0 &&
                                                        <div className="wrp-slide-icons">
                                                          <div className="slideicons">
                                                              <a href="javascript:void" onClick={prevEnemy}  ><img src={lefticons} /></a>
                                                          </div>
                                                          </div>
                                                          }
                                                          {
                                                            enemyCur != maxIndex &&
                                                        <div className="wrp-slide-icons2">
                                                          
                                                          <div className="slideicons">
                                                              <a href="javascript:void" onClick={nextEnemy}><img src={righticons} /></a>
                                                          </div>
                                                          </div>
                                                      }
                                                        </div>
                                                        <div className="fight-bottom-c">
                                                        
                                                        <div className="fight-bottom-c-wrp">
                                                            <div className="fight-bottom-child1">
                                                                <div className="dol-wrp">
                                                                   
                                                                    <div className="dol-content">
                                                                        <h4>Based BNB</h4>
                                                                        <p>{baseReward}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="winrate">
                                                                 <h4>Win Rate</h4>
                                                                 <p>{chance}%</p>
                                                            </div>
                                                            <div className="fight-bottom-child1">
                                                                <div className="dol-wrp">
                                                                   
                                                                    <div className="dol-content">
                                                                        <h4>Required EE</h4>
                                                                        <p>{reqHp}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                        <p className="pr-5 pl-5 pt-3 pb-3 text-white">A limit of 60 seconds has been applied between two consecutive fight one can play.</p>

                                                        <div className="fight-btn">
                                                            {
                                                                    parseInt(ee) >= parseInt(reqHp)  ?
                                                                    parseInt(userLimit) > 0  ?
                                                                     parseInt(dragonLimit) > 0 ?
                                                                     <a href="javascript:void" onClick={fight} >
                                                                     <img src={fightbtn} />
                                                                 </a>
                                                                     :
                                                                     <h5 className="pr-5 pl-5 pt-3 pb-3 text-white">Please upgrade the fight limit of your dragon.</h5> 
                                                                :
                                                                <h5 className="pr-5 pl-5 pt-3 pb-3 text-white">Please upgrade the fight limit of your wallet.</h5>
                                                                :
                                                                <h5 className="pr-5 pl-5 pt-3 pb-3 text-white">Please upgrade the Dragon with booster to match with required EE</h5>
                                                            }
                                                               
                                                            </div>
                                                    </div>
                                                </div>
                                                
                                                        </div> 
                                                    </div>
                                                    <div className="col-lg-1"></div>
                                                </div>  
                                            </div>
                                            
                                        </div>
                                </div>
                            </div>
						</div>
                    </div>
                </section>

                			       
   <Modal isOpen={txModal} toggle={txtoggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={txtoggle}>Close</Button>
    
 </Modal>


   <Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >{name} is fighting with {enemy[enemyCur].name} in the BattleGround...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>
 
 <Modal isOpen={uWalletmodal} toggle={uWallettoggle}  centered={true}>
   
 
 
   <ModalBody>
           
           <div className="moveRight">
               
               <span> 
                  Your Balance<br />
                  {balance} {symbol}
               </span>
           </div>
          <label><br />Enter Limit to extend </label>
          <input className="form-control" onChange={handleDepositChange} type="text" value={damount} />
          
            <p className="info font-size-large mt-3" >Cost: {parseFloat(damount*dragonLimitPrice).toFixed(2)} {symbol}</p>
            
        
          {
              depositError &&
              <span className="error">{depositError}</span>
          }
        
        {
        parseFloat(damount*dragonLimitPrice).toFixed(2) > parseFloat(balance)  &&
        <span className="error">Error: Insufficient {symbol} Balance</span>
        
        }
        
          
         
        </ModalBody>
        <ModalFooter>
            {
               ( approval == 0 || approval < damount*dragonLimitPrice) &&
               <Button className="depositButton mr-3" onClick={approveToken}>Approve</Button>
            }
            {
               ( approval > 0 && approval >= damount*dragonLimitPrice) &&
               <Button className="depositButton mr-3" onClick={buyUlimit}>Buy Now</Button>
        
            }
          <Button className="depositButton " onClick={uWallettoggle}>Close</Button>
   
        </ModalFooter>
        </Modal>



 <Modal isOpen={uDragonmodal} toggle={uDragontoggle}  centered={true}>
   
 
 
<ModalBody>
        
        <div className="moveRight">
            
            <span> 
               Your Balance<br />
               {balance} {symbol}
            </span>
        </div>
       <label><br />Enter Limit to extend </label>
       <input className="form-control" onChange={handleDepositChange} type="text" value={damount} />
       
         <p className="info font-size-large mt-3" >Cost: {parseFloat(damount*dragonLimitPrice).toFixed(2)} {symbol}</p>
         
     
       {
           depositError &&
           <span className="error">{depositError}</span>
       }
     
     {
     parseFloat(damount*dragonLimitPrice).toFixed(2) > parseFloat(balance)  &&
     <span className="error">Error: Insufficient {symbol} Balance</span>
     
     }
     
       
      
     </ModalBody>
     <ModalFooter>
         {
            ( approval == 0 || approval < damount*dragonLimitPrice) &&
            <Button className="depositButton mr-3" onClick={approveToken}>Approve</Button>
         }
         {
            ( approval > 0 && approval >= damount*dragonLimitPrice) &&
            <Button className="depositButton mr-3" onClick={buyDlimit}>Buy Now</Button>
     
         }
       <Button className="depositButton " onClick={uDragontoggle}>Close</Button>

     </ModalFooter>
     </Modal>

     <Modal  isOpen={winModal} toggle={winToggle}  centered={true}>
   
 
 
   <ModalBody style={{backgroundColor: "#000" , padding: "0px" }}>
     <div className="dragon-pop-wr">
                                          <div className="dragon-pop-content">
                                              <div className="result-c">
                                                <p>Result</p>
                                                <h3>You Won</h3>
                                              </div>
                                              <ul className="list-reward">
                                                <li>
                                                  <div className="reward-wrp">
                                                     <div className="reward-c-child">
                                                        <h3><img src={dol} /> BNB EARNED</h3>
                                                     </div>
                                                     <div className="reward-c-child">
                                                        <h3>{rewardEarned} BNB EARNED </h3>
                                                     </div>
                                                  </div>
                                                </li>
                                               
                                                <li>
                                                  <div className="reward-wrp">
                                                     <div className="reward-c-child">
                                                        <h3><img src={like} /> EE LOSS</h3>
                                                     </div>
                                                     <div className="reward-c-child">
                                                        <h3>{eeLoss} EE </h3>
                                                     </div>
                                                  </div>
                                                </li>
                                              </ul>
                                          </div>
                                      </div>
</ModalBody>
<ModalFooter style={{backgroundColor: "#000" , justifyContent: "center" , border : "none" , padding: "0px" }}>
                                      <Button className="depositButton bg-dark" onClick={winToggle}>Close</Button>

</ModalFooter>
</Modal>


<Modal isOpen={lostModal} toggle={lostToggle}  centered={true}>
   
  
 
   <ModalBody style={{backgroundColor: "#000" , padding: "0px" }}>
   <div className="dragon-pop-wr dragon-pop-wr2">
                                          <div className="dragon-pop-content">
                                              <div className="result-c">
                                                <p>Result</p>
                                                <h3>You Lose</h3>
                                              </div>
                                              <ul className="list-reward">
                                                <li>
                                                  <div className="reward-wrp">
                                                     <div className="reward-c-child">
                                                        <h3><img src={dol} /> BNB EARNED</h3>
                                                     </div>
                                                     <div className="reward-c-child">
                                                        <h3>{rewardEarned} BNB EARNED </h3>
                                                     </div>
                                                  </div>
                                                </li>
                                               
                                               
                                                <li>
                                                  <div className="reward-wrp">
                                                     <div className="reward-c-child">
                                                        <h3><img src={like} /> EE LOSS</h3>
                                                     </div>
                                                     <div className="reward-c-child">
                                                        <h3>{eeLoss} EE </h3>
                                                     </div>
                                                  </div>
                                                </li>
                                              </ul>
                                          </div>
                                      </div>
</ModalBody>
<ModalFooter style={{backgroundColor: "#000" , justifyContent: "center" , border : "none" , padding: "0px" }}>
                                      <Button className="depositButton bg-dark" onClick={lostToggle}>Close</Button>

</ModalFooter>
</Modal>
			</div>
		);
	}
 
 
export default Fight;