import React, { Component, useEffect, useState } from 'react';
import {Link, Router} from 'react-router-dom';
import DataTable from 'datatables.net';
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
import Novak from '../../images/Novak.png';
import Hengist from '../../images/Hengist.png';
import Vesper from '../../images/Vesper.png';
import Xadrian from '../../images/Xadrian.jpg';
import Zayfir from '../../images/Zayfir.png';
import GamelogRows from './Rows.js';


const Gamelog = () => { 
  const wallet = useWallet() ;
  const [rows,setRows] = useState([]);
  const [maxCount,setMaxCount] = useState(0);
  const [currentCount,setCurrentCount] = useState(0);
  
  const enemy = [
    {name : "Novak" ,  image : Novak  },
    {name : "Hengist" ,  image : Hengist  },
    {name : "Vesper" ,  image : Vesper  },
    {name : "Xadrian" ,  image : Xadrian  },
    {name : "Zayfir" ,  image : Zayfir  },
  ];

  
  let web3Provider ; 
  let _counter = 0;
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
  getLog(0) ; 
},[])


async function getLog(_page){
  let _web3 = new Web3(web3Provider);
  	let _blockNumber  = await _web3.eth.getBlockNumber() ;
  let _startBlockNumber = 13271925 ; 
  let _difference = _blockNumber - _startBlockNumber ; 
  let _count = Math.ceil(_difference/5000) ; 
  setCurrentCount(_page);

  setMaxCount(_count)

  let _temp = [] ; 
  // let _snumber = 13341820 ;
  // let _enumber = 13346820 ;
  // for(let i = 0; i < 6; i++ ){
  let _endBlockNumber  = _blockNumber - 5000*_page  ;

  let _enumber = _endBlockNumber;
  let _snumber = _endBlockNumber - 5000 ; 
  // console.log(_endBlockNumber);

  try{
  console.log(_endBlockNumber);

  let _rows = await fetch("https://address-marketplace.herokuapp.com/api/test/"+_snumber+"/"+_enumber+"")
  _rows = await _rows.json() ; 
  console.log(_rows);

  let _tempRows = _rows.reverse();
  console.log(_rows);
  // if(i == 5 ){
      setRows(_tempRows);
  // }
  
 }
  catch {

  }
// }
}

 
	// use = () =>{

  //       $("#zero-config").DataTable({
  //           oLanguage: {
  //             oPaginate: {
  //               sPrevious:
  //                 '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
  //               sNext:
  //                 '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
  //             },
  //             sInfo: "Showing page _PAGE_ of _PAGES_",
  //             sSearch:
  //               '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
  //             sSearchPlaceholder: "Search...",
  //             sLengthMenu: "Results :  _MENU_",
  //           },
  //           stripeClasses: [],
  //           lengthMenu: [19, 30, 50],
  //           pageLength: 19,
  //         });
      
	//   }

 

		return(
			<div>
                <section id="game-bg">
                   
                    <div className="main-box">
                   
                    <div className="container-fluid">
                    <div className="back-p2"> <Link to="/"> <p><span><img src={backicon} /> </span> Back</p></Link></div>
                    <ConnectHead />
                    </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="table-wraps">
                                    <div className="table-responsive">
                                  <h5 className=" mb-2"> Latest 5000 Blocks Data (Approx. 4 hours) </h5>
                           
                                <table
                                        id="zero-config"
                                        className="table table-hover"
                                        
                                    >
                                    <thead>
                                        <tr>
                                            <th>Txn Hash</th>
                                            <th>Action</th>
                                            <th>Dragon</th>
                                            <th>Alien</th>
                                            <th>Rewards</th>          
                                            <th>BP Gain</th>
                                            <th>EE </th>
                                          
                                            
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                          rows.length > 0 && rows.map((v,i) => {
                                       
                                            // if(v.event == "Fight"){
                                             
                                              
                                              if( v.returnValues.player  == wallet.account){
                                              _counter++
                                            return(
                                             <GamelogRows data={v} />
                                            )
                                            // }
                                          }


                                            if(i== (rows.length -1) && _counter == 0){
                                              return(
                                                <tr>
                                                  <td colSpan="7" className="text-center">No Recent Activities</td>
                                                  </tr>
                                              )
                                            }


                                          })
                                        }
                                   
                                   
                                        </tbody>
                                    </table>
                                    {/* {
                                      currentCount < maxCount && 
                                      <button onClick={() => getLog(currentCount+1)} >Load Old Activities</button>
                                    } */}
                                </div>
                                    </div>
                                </div>
                            </div>
						          </div>
                    </div>
                </section>
			</div>
		);
}
export default Gamelog;