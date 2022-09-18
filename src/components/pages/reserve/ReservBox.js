import React, { Component, useEffect, useState } from 'react';
import { Link, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";

import $ from "jquery";
import Header from '../header.js';
import Footer from '../footer.js';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import ConnectHead from '../ConnectHead.js';
import backicon from '../../images/backicon.png';


import { useWallet } from '@binance-chain/bsc-use-wallet';
import Config, { TOKEN } from '../../../Config';
import PRICE_ABI from '../../../Config/PRICE_ABI.json'
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json'
import DRAGON_ABI from '../../../Config/DRAGON_ABI.json'
import WARRIOR_ABI from '../../../Config/WARRIOR_ABI.json'
import Web3 from 'web3';
// import { setAppElement } from 'react-modal';
// import { setSyntheticTrailingComments } from 'typescript';

const ReserveBox = (props) => {

    const wallet = useWallet();
    const [media, setMedia] = useState(false);
    const [name, setName] = useState(false);
    const [ee, setEe] = useState(0);
    const [expedite, setExpedite] = useState(false);
    const [day, setDay] = useState(null);
    const [hour, setHour] = useState(null);
    const [minute, setMinute] = useState(null);
    const [second, setSecond] = useState(null);
    const [hero, setHero] = useState(null);
    const [modal, setModal] = useState(false);
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
        getDragon();
    }, [])
    async function getDragon() {
        let _web3 = new Web3(web3Provider);

        const _nftContract = new _web3.eth.Contract(DRAGON_ABI, Config.DRAGONS);
        // alert(props.data)

        let _data = props.data.toString();
        // alert(typeof _data)

        _data = _data.split(',');
        setHero(_data[7])
        let _mediaURI = await _nftContract.methods.tokenURI(_data[7]).call();
        try {
            _mediaURI = await fetch(_mediaURI);
            _mediaURI = await _mediaURI.json();
            setMedia(encodeURI(_mediaURI.image));
            setName(_mediaURI.name);


        }
        catch {
            alert("Some Error Occured. Please try Again")

        }
        if (_data[0] == 21) {
            setExpedite(true);
            let _endTime = new Date().getTime() + _data[8] * 1e3;
            setInterval(() => {

                startTimer(_endTime);

            }, 1000);

        }
        else {
            setEe(_data[6])

        }

        //  alert(_data[7])
        // let _getLatest = await _nftContract.methods.tokenOfOwnerByIndex(wallet.account,_data[6]).call() ; 








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

        setDay(textDay + "d");
        setHour(textHour + "h");
        setMinute(textMinute + "m");
        setSecond(textSecond + "s");
    }





    async function expediteNow() {
        let _web3 = new Web3(web3Provider);

        setModal(!modal);

        const _warriorContract = new _web3.eth.Contract(WARRIOR_ABI, Config.WARRIORS);
        _warriorContract.methods.expediteDragon(hero).send({ from: wallet.account }).on('receipt', function (receipt) {
            window.location.reload();
            setModal(modal);



        })

            .on('error', function (error, receipt) {
                setModal(modal);

            });

    }
    return (
        <>
            <div className="col-lg-4">
                <a href="#">
                    <div className="reserve-box">
                        <img src={media} className="video-mint mb-3" />

                        {
                            expedite ?
                                <>
                                    <p className="text-white mt-1 mb-0 p-0">{day} : {hour} : {minute} : {second} </p>
                                    <p className="text-white mt-1 mb-0 p-0">To Available</p>
                                    <button className="expedButton" onClick={expediteNow} >Expedite Now</button>
                                </>
                                :
                                <div className="wrp-small-circle">

                                    <a href={"/mainfight?d=" + hero}> <div className="small-circle">Fight</div></a>
                                    <a href="javascript:void"> <div className="small-circle">{ee}</div></a>
                                    <a href="javascript:void"><div className="small-circle">Sell</div></a>
                                </div>
                        }


                    </div>
                </a>
            </div>


            <Modal isOpen={modal} toggle={toggle} centered={true}>


                <ModalBody>
                    <div className="modaltext text-center mt-4" >Transaction is Processing...</div>

                </ModalBody>
                <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>

            </Modal>
        </>
    );


}
export default ReserveBox;