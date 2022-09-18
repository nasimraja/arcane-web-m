import React, { Component, useEffect, useState } from 'react';
import {Link, Router,useLocation} from 'react-router-dom';
import DataTable from 'datatables.net';
import $ from "jquery";
import Header from '../header.js';
import Footer from '../footer.js';
import ConnectHead from '../ConnectHead.js';
import backicon  from '../../images/backicon.png';

import { useWallet } from '@binance-chain/bsc-use-wallet';
import Config, { DRAGONS, TOKEN, WARRIORS } from '../../../Config';
import PRICE_ABI from '../../../Config/PRICE_ABI.json'
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json'
import DRAGON_ABI from '../../../Config/DRAGON_ABI.json'
import WARRIOR_ABI from '../../../Config/WARRIOR_ABI.json'
import NFT_ABI from '../../../Config/NFT_ABI.json'
import Web3 from 'web3';
import Novak from '../../images/Novak.png';
import Hengist from '../../images/Hengist.png';
import Vesper from '../../images/Vesper.png';
import Xadrian from '../../images/Xadrian.jpg';
import Zayfir from '../../images/Zayfir.png';


const GamelogRows = (props) => { 
  const wallet = useWallet() ;
  const [name,setName] = useState(null);
  
  const enemy = [
    {name : "Novak" ,  image : Novak  },
    {name : "Hengist" ,  image : Hengist  },
    {name : "Vesper" ,  image : Vesper  },
    {name : "Xadrian" ,  image : Xadrian  },
    {name : "Zayfir" ,  image : Zayfir  },
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
  console.log(props.data);
  if(props.data.event == "Fight"){
    getHero(props.data.returnValues._attackingHero) ; 
  }
  else if(props.data.event == "BoostDragon"){
    getHero(props.data.returnValues._heroId) ; 
  }
},[])


async function getHero(_hero){
  let _web3 = new Web3(web3Provider);
  
 
  let _nftContract = new _web3.eth.Contract(NFT_ABI,DRAGONS);
  let _mediaURI = await _nftContract.methods.tokenURI(_hero).call() ;
  _mediaURI = await fetch(_mediaURI) ;
  _mediaURI = await _mediaURI.json() ;
  setName(_mediaURI.name);
 

  // }


 
}
 

 

		return(

                                              <tr>
                                                <td>{props.data.transactionHash.substring(0, 3)+"..."+props.data.transactionHash.substring(props.data.transactionHash.length - 3)}</td>
                                                <td>{props.data.event} {props.data.event == "Fight" ? props.data.returnValues.xpGained == "1" ? "(WON)" : "(LOST)" : "" }</td>
                                                <td>{name ? name : "NA"}</td>
                                                <td>{props.data.event == "Fight" ? enemy[props.data.returnValues.enemyType].name : "NA" }</td>
                                                <td>{props.data.event == "Fight" ? parseFloat(props.data.returnValues.rewards/1e18).toFixed(4) : props.data.event == "ClaimedRewards"  ? parseFloat(props.data.returnValues.amount/1e18).toFixed(4) : 0  }</td>
                                                <td>{props.data.event == "Fight" ? props.data.returnValues.hpLoss  : 0 }</td>
                                                <td>{props.data.event == "Fight" ? props.data.returnValues.xpGained == "1" ? "-100" : "-200"  : 0}</td>
                                            </tr>
                                        
		);
}
export default GamelogRows;