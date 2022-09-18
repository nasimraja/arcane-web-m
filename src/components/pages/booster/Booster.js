import React, { Component, useEffect, useState, useRef } from 'react';
import { Link, Router, useLocation } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";


import $ from "jquery";
import Header from '../header.js';
import Footer from '../footer.js';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import ConnectHead from '../ConnectHead.js';
import backicon from '../../images/backicon.png';
import fightbtn from '../../images/boost.png';
import ar1 from '../../images/a1.png';
import ar2 from '../../images/a2.png';
import Approve from '../../images/Approve.png';

import { useWallet } from '@binance-chain/bsc-use-wallet';
import Config, { TOKEN, WARRIORS } from '../../../Config';
import PRICE_ABI from '../../../Config/PRICE_ABI.json'
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json'
import DRAGON_ABI from '../../../Config/DRAGON_ABI.json'
import WARRIOR_ABI from '../../../Config/WARRIOR_ABI.json'


import Web3 from 'web3';
import lefticons from '../../images/lefticons.png';
import righticons from '../../images/righticons.png';
import BoosterClaim from '../../images/BoosterClaim.png';
const Booster = () => {
  const wallet = useWallet();
  const location = useLocation();
  const [media, setMedia] = useState(false);
  const [name, setName] = useState(false);
  const [speed, setSpeed] = useState(false);
  const [dragon, setDragon] = useState(null);
  const interval = useRef(null)

  // const [dragonIndex,setDragonIndex] = useState(null) ; 
  const [modal, setModal] = useState(false);
  const [xp, setXp] = useState(false);
  const [ee, setEe] = useState(false);
  const [price, setPrice] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [booster, setBooster] = useState(1);
  const [expedite, setExpedite] = useState(false);
  const [canBoost, setCanBoost] = useState(true);
  const [approval, setApproval] = useState(false);
  const [claim, setClaim] = useState(false);
  const [dragonIndex, setDragonIndex] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);

  const [dayUser, setDayUser] = useState(null);
  const [hourUser, setHourUser] = useState(null);
  const [minuteUser, setMinuteUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);

  const [noApprovalModal, setApprovalModal] = useState(false);
  const noApproval = () => setApprovalModal(!noApprovalModal);

  const toggle = () => setModal(!modal);

  let web3Provider;

  useEffect(() => {
    if (window.ethereum) {
      web3Provider = window.ethereum;
    }
    else {
      web3Provider = Config.RPC_URL;
    }

  })

  useEffect(() => {
    const queryP = new URLSearchParams(location.search);
    const d = queryP.get('d');
    // alert(d);
    if (d != null) {
      setDragonIndex(d);
    }



  }, [])

  useEffect(() => {
    if (wallet.account) {


      getDragon()

    }

  }, [dragonIndex, wallet.account])


  async function getDragon() {

    let _web3 = new Web3(web3Provider);
    let _dragon = dragonIndex;
    const _nftContract = new _web3.eth.Contract(DRAGON_ABI, Config.DRAGONS);
    const _priceContract = new _web3.eth.Contract(PRICE_ABI, Config.PRICE_ORACLE);
    let _balance = await _nftContract.methods.balanceOf(wallet.account).call();

    if (_balance > 0) {
      let _index = parseInt(_balance) - 1;


      setMaxIndex(_index);

      if (_dragon == null) {

        setDragonIndex(_index);

        _dragon = await _nftContract.methods.tokenOfOwnerByIndex(wallet.account, _index).call();

        setDragon(_dragon);




      }
      else {
        _dragon = await _nftContract.methods.tokenOfOwnerByIndex(wallet.account, _dragon).call();
        // setDragonIndex(_dragon);
        setDragon(_dragon);

      }
    }
    else {
      window.location.replace('/mint')
    }
    let _details = await _nftContract.methods.getHero(_dragon, false).call();

    let _getPrice = await _priceContract.methods.getBoosterPrice().call();

    let _getShowPrice = _web3.utils.fromWei(_getPrice);
    _getShowPrice = parseFloat(_getShowPrice).toFixed(2)

    setPrice(_getShowPrice);
    setSpeed(_details[5]);
    setXp(_details[2]);
    setEe(_details[6]);

    if (_details[0] == 21) {
      // setDragon(dragon)
      setExpedite(true);
      //      let _endTime = new Date().getTime() + _data[8]*1e3 ; 
      //      setInterval(() => {

      //         startTimer(_endTime);

      //      }, 1000);

      //  }
      //  else{
      //     setEe(_data[6])

    }
    else {
      setExpedite(false);

    }


    let _mediaURI = await _nftContract.methods.tokenURI(_dragon).call();
    try {
      _mediaURI = await fetch(_mediaURI);
      _mediaURI = await _mediaURI.json();
      setMedia(encodeURI(_mediaURI.image));
      setName(_mediaURI.name);


    }
    catch {
      //  alert("Some Error Occured. Please try Again")

    }

    if (wallet.account) {
      const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, Config.TOKEN);
      const _warriorsContract = new _web3.eth.Contract(WARRIOR_ABI, Config.WARRIORS);
      const _dragonContract = new _web3.eth.Contract(DRAGON_ABI, Config.DRAGONS);
      let _getapproval = await _tokenContract.methods.allowance(wallet.account, Config.WARRIORS).call();
      let _getBalance = await _tokenContract.methods.balanceOf(wallet.account).call();
      _getBalance = _web3.utils.fromWei(_getBalance);
      _getPrice = _web3.utils.fromWei(_getPrice);
      // alert(_getPrice*booster);

      let _timelimit = await _warriorsContract.methods.timelimitFreeBooster().call();
      let _timeClaimed = await _warriorsContract.methods.lastFreeBoosterClaim(_dragon).call();

      let _difference = new Date().getTime() / 1e3 - parseInt(_timeClaimed);
      // alert(_difference);
      if (_difference >= _timelimit) {
        setClaim(true);
      }
      else {
        setClaim(false);

        let _timer = setInterval(() => {
          startTimerUser(parseInt(_timeClaimed) + parseInt(_timelimit));
        }, 1000);
        setTimerInterval(_timer);
      }

      if (parseInt(_getBalance) < parseInt(_getPrice * parseFloat(booster))) {
        setCanBoost(false);
      }
      else {
        setCanBoost(true);
      }
      // _getapproval = _web3.utils.fromWei(_getapproval) ; 




      if (parseInt(_getapproval) > parseInt(_getPrice)) {
        setApproval(true)
      }

    }

  }

  const nextDragon = () => {
    // clearInterval(timerInterval);
    window.location.replace("/booster?d=" + (dragonIndex + 1))
  }

  const prevDragon = () => {
    // clearInterval(timerInterval);
    // setDragonIndex(dragonIndex-1)
    window.location.replace("/booster?d=" + (dragonIndex - 1))

  }

  const upBooster = () => {
    clearInterval(timerInterval);
    setBooster(booster + 1);
    getDragon();

  }

  const downBooster = () => {
    if (booster > 1) {
      clearInterval(timerInterval);
      setBooster(booster - 1);
      getDragon();
    }
  }



  async function claimBoost() {
    let _web3 = new Web3(web3Provider);

    setModal(!modal);

    const _warriorContract = new _web3.eth.Contract(WARRIOR_ABI, Config.WARRIORS);
    // alert(dragon);
    // alert(booster);
    _warriorContract.methods.claimFreeDragonBooster(dragon).send({ from: wallet.account }).on('receipt', function (receipt) {
      getDragon();
      setModal(modal);
      //  openDragonModal() ; 

    })

      .on('error', function (error, receipt) {
        setModal(modal);

      });

  }


  async function boostDragon() {
    let _web3 = new Web3(web3Provider);

    setModal(!modal);

    const _warriorContract = new _web3.eth.Contract(WARRIOR_ABI, Config.WARRIORS);
    // alert(dragon);
    // alert(booster);
    _warriorContract.methods.boostDragon(dragon, booster).send({ from: wallet.account }).on('receipt', function (receipt) {
      getDragon();
      setModal(modal);
      //  openDragonModal() ; 

    })

      .on('error', function (error, receipt) {
        setModal(modal);

      });

  }

  async function approveToken() {
    let _web3 = new Web3(web3Provider);

    setModal(!modal);

    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, Config.TOKEN);
    const _amount = _web3.utils.toWei('100000000000000000000000000000000000');
    _tokenContract.methods.approve(Config.WARRIORS, _amount).send({ from: wallet.account }).on('receipt', function (receipt) {
      getDragon();
      setModal(modal);

    })

      .on('error', function (error, receipt) {
        setModal(modal);

      });

  }


  const startTimerUser = (_t) => {
    // alert(_t)
    const countDate = new Date(_t * 1e3);
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
    if (gap < 0) {
      setDayUser("0d");
      setHourUser("0h");
      setMinuteUser("0m");
      setSecondUser("0s");
    } else {
      setDayUser(textDay + "d");
      setHourUser(textHour + "h");
      setMinuteUser(textMinute + "m");
      setSecondUser(textSecond + "s");
    }

  }

  return (
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
                <div class="tab-pane4 booster-p mb-5">
                  <div class="tab-panel4 active" id="tab1">
                    <div className="row">
                      <div className="col-lg-4"></div>


                      <div className="col-lg-4">
                        <div className="wrp-slidebox ">


                          <div className="fight-b-content">
                            <h3>EE BOOSTER</h3>
                            <div className="fight-c-wrp">
                              <div className="fight-child1">
                                <img src={media} />
                              </div>

                              {
                                dragonIndex != 0 &&
                                <div className="wrp-slide-icons">
                                  <div className="slideicons">
                                    <a href="javascript:void" onClick={prevDragon}  ><img src={lefticons} /></a>
                                  </div>
                                </div>
                              }
                              {
                                dragonIndex != maxIndex &&
                                <div className="wrp-slide-icons2">

                                  <div className="slideicons">
                                    <a href="javascript:void" onClick={nextDragon}><img src={righticons} /></a>
                                  </div>
                                </div>
                              }
                            </div>

                            <div className="fight-b-content">

                              <h3 className="mt-2">{name}</h3>
                            </div>
                            {
                              !expedite &&
                              <>
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

                                </div>
                                <div className="fight-bottom-c">
                                  <h4>BOOSTING RATE</h4>
                                  <p>{price} $DRAG per 100 EE</p>
                                  <div className="value-box-wrp">
                                    <div className="value-box">{booster * 100}</div>
                                    <div className="arrow-box">
                                      <div className="arowimg1" onClick={upBooster} ><img src={ar2} /></div>
                                      <div className="arowimg2" onClick={downBooster} ><img src={ar1} /></div>
                                    </div>

                                  </div>
                                  <p>Cost: {parseFloat(booster * price).toFixed(2)} $DRAG</p>

                                  {
                                    approval ?
                                      canBoost ?
                                        <div className="fight-btn">
                                          <a href="javascript:void" onClick={boostDragon}><img src={fightbtn} /></a>
                                        </div>

                                        :
                                        <>
                                          <p className="text-white mt-2">Insufficient $DRAG Balance</p>

                                        </>
                                      :
                                      <div className="fight-btn">
                                        <a href="javascript:void" onClick={approveToken}><img src={Approve} /></a>
                                        <a href="javascript:void" onClick={boostDragon} ><img src={fightbtn} /></a>
                                      </div>

                                  }


                                </div>
                              </>
                            }
                            {
                              expedite &&
                              <div className="fight-bottom-c pr-5 pl-5">
                                <p>Not Available.<br />Please wait for Dragon to Arrive or Expedite in Dungen.</p>
                              </div>
                            }
                            <div className="fight-bottom-c text-center">

                              {
                                claim ?
                                  <>
                                    <p>Free Claim 1000EE</p>
                                    <img style={{ "width": "100px" }} onClick={claimBoost} src={BoosterClaim} />

                                  </>
                                  :
                                  <div className="fight-bottom-c-wrp justify-content-between godWar" >
                                    <p>Free Claim 1000EE In</p>
                                    <p>{hourUser} : {minuteUser} : {secondUser}</p>
                                  </div>
                              }


                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-4"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={modal} toggle={toggle} centered={true}>


        <ModalBody>
          <div className="modaltext text-center mt-4" >Transaction is Processing...</div>

        </ModalBody>
        <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>

      </Modal>


      <Modal isOpen={noApprovalModal} toggle={noApproval} centered={true}>


        <ModalBody>
          <div className="modaltext text-center mt-4" >Please Approve First.</div>

        </ModalBody>
        <Button className="depositButton mr-auto ml-auto mb-5" onClick={noApproval}>Close</Button>

      </Modal>


    </div>
  );


}
export default Booster;