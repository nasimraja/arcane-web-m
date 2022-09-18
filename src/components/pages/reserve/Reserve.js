import React, { Component, useEffect, useState } from 'react';
import {Link, Router} from 'react-router-dom';

import $ from "jquery";
import Header from '../header.js';
import Footer from '../footer.js';

import ConnectHead from '../ConnectHead.js';
import backicon  from '../../images/backicon.png';


import { useWallet } from '@binance-chain/bsc-use-wallet';
import Config, { TOKEN, WARRIORS } from '../../../Config';
import PRICE_ABI from '../../../Config/PRICE_ABI.json'
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json'
import DRAGON_ABI from '../../../Config/DRAGON_ABI.json'
import WARRIOR_ABI from '../../../Config/WARRIOR_ABI.json'
import Web3 from 'web3';
import ReserveBox from './ReservBox.js';

const Reserve = () => { 
	const wallet = useWallet() ; 
	
    const [counter,setCounter] = useState([]) ; 
 
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
            getDragons();

        }
    },[wallet.account])

    async function getDragons(){
		let _web3 = new Web3(web3Provider);
		
		const _warriorsContract = new _web3.eth.Contract(WARRIOR_ABI,Config.WARRIORS);

		 
		let _dragons =  await _warriorsContract.methods.getHeroesByOwner(wallet.account,false).call() ; 
        setCounter(_dragons); 
        
    //     let rows = [];
    //     for (let i = 0; i < _balance; i++) {
    //      rows.push({count : 1}) ;
    //     }
    //    //  alert(rows);
    //     setCounter(rows); 
	  
		   
	}

 

		return(
			<div>
                <section id="fight-bg">
                   
                    <div className="main-box">
                   
                    <div className="container-fluid">
                    <div className="back-p2"> <Link to="/battle"> <p><span><img src={backicon} /> </span> Back</p></Link></div>
                    <ConnectHead />
                    </div>
                        <div className="container">
                            <div className="head-reserve">
                                <h3>My dragon</h3>
                            </div>
							<div className="row">
                                
                                {
                                    counter.length > 0 && counter.map((v,i) => {
                                         
                                                return(
                                                    <ReserveBox data={v} />
                                                )
                                                
                                        })
                                }
                                {
                                    counter.length == 0 &&
                                    <div className="col-lg-12 card card-heading text-center p-5 mt-2">
                                    <h4>No Dragons</h4>
                                    </div>

                                }
                                
                            </div>
                           
						</div>
                    </div>
                </section>
			</div>
		);
 

}
export default Reserve;