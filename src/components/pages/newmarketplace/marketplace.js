import React, { Component,useState,useEffect } from 'react';
import {Link,useParams, Router} from 'react-router-dom';

import $ from "jquery";
import thumb from '../../images/thumb.png'
// import approve from '../../images/approve.png'

import backicon  from '../../images/backicon.png';
import ConnectHead from '../ConnectHead';
import MarketplaceSingle from './MarketplaceSingl';
import WARRIOR_ABI from '../../../Config/WARRIOR_ABI.json'
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json'

import Web3 from 'web3';
import Config, { MARKETPLACE, TOKEN, WARRIORS } from '../../../Config';
import { useWallet } from '@binance-chain/bsc-use-wallet';

const marketplace = () => {
	const wallet = useWallet() ; 
	const {tab} = useParams() ; 
    const [counter,setCounter] = useState([]) ; 
  const [soldTrades,setSoldTrades] = useState([]) ;
  const [cancelledTrades,setCancelledTrades] = useState([]) ;
  const [userTrades,setUserTrades] = useState([]) ;

    const [tradeCounter,setTradeCounter] = useState([]) ; 
    
	let web3Provider ; 
  let counterDisp = 0 ;
  let counterDispMyTrades = 0 ;
  
  const tabArray  = [
    {
      tabname : "open", tabDisplay: "Open Trades"
    },
    {
      tabname : "my-trades", tabDisplay: "My Trades"
    },
    {
      tabname : "my-collection", tabDisplay: "My Collection"
    },

    
  ];
    useEffect(() => {
		if(window.ethereum){
			web3Provider = window.ethereum ;
		}
		else{
			web3Provider = Config.RPC_URL ; 
		}

	})

    // useEffect(() => {

    //   $('.tabs6').on('click','a',function(e){
    //     e.preventDefault();
    //     var tabId = $(this).attr('data-tab');
    //     $(this).closest('.tabs6').find('a').removeClass('active');
    //     $(this).addClass('active');
    //     $('.tab-panel').removeClass('active');
    //     $('#'+tabId).addClass('active');
    //   });
 
    //   $('.btn').on('click', function() {
    //     var $this = $(this);
    //   $this.button('loading');
    //     setTimeout(function() {
    //        $this.button('reset');
    //    }, 8000);
    // });

    // });


    useEffect(() => {
      if(wallet.account){
          getDragons();

      }
  },[wallet.account])

  async function getDragons(){
  let _web3 = new Web3(web3Provider);
  
  const _warriorsContract = new _web3.eth.Contract(WARRIOR_ABI,Config.WARRIORS);
  const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,Config.MARKETPLACE);

   
  let _dragons =  await _warriorsContract.methods.getHeroesByOwner(wallet.account,false).call() ; 
      setCounter(_dragons); 
      
      let _count =  await _marketPlaceContract.methods.getTradeCount().call() ;

      let _userTrades = await _marketPlaceContract.methods.getTradesOfUser(wallet.account).call() ;
      let _soldTrades = await _marketPlaceContract.methods.getSoldTrades().call() ;
      let _cancelledTrades = await _marketPlaceContract.methods.getCancelledTrades().call() ;
      setCancelledTrades(_cancelledTrades)
      setUserTrades(_userTrades)
          // if(_userTrades != ""){
          //   setUserTrades(_userTrades.split(','))
          // }
          // console.log("UT" , _soldTrades);
          setSoldTrades(_soldTrades)


      console.log(_count);
       let rows = [];
      for (let i = 0; i < _count; i++) {
       rows.push({count : 1}) ;
      }
     //  alert(rows);
      setTradeCounter(rows); 

  //     let rows = [];
  //     for (let i = 0; i < _balance; i++) {
  //      rows.push({count : 1}) ;
  //     }
  //    //  alert(rows);
  //     setCounter(rows); 
  
     
}

const goto = (_t) => {
  window.location.replace(_t)
}

    return(
      <div className="mrketplace-img-bg">
        <div className="main-box">
        <div className="container-fluid">
        <div className="back-p2"> <Link to="/battle"> <p><span><img src={backicon} /> </span> Back</p></Link></div>
        <ConnectHead />

        </div>
        <div className="container">
                        {/* <div className="wrp-head-marketplace">
                            <div className="head-marketchild2">
                                <h3>Latest Sold</h3>
                            </div>
                           
                        </div>
                        <marquee  direction="left" scrollamount="5">
                        <div className="trending-box2">
                            <ul className="trending-list">
                                <li><a href="#">#1120 <span>$Drag 10,000</span></a></li>
                                <li><a href="#">#1320 <span>$Drag 2000</span></a></li>
                                <li><a href="#">#1500 <span>$Drag 2500</span></a></li>
                                <li><a href="#">#3200 <span>$Drag 3500</span></a></li>
                                <li><a href="#">#2001 <span>$Drag 5400</span></a></li>
                                <li><a href="#">#3101 <span>$$Drag 4200</span></a></li>
                               
                            </ul>
                        </div>
                        </marquee> */}
          <div className="row">
              <div className="col-lg-12">
                <section id="product-tips">
                  {/* <div className="marketplace-head">
                    <h3>MARKETPLACE</h3>
                  </div> */}
                  <div className="wrp-hearoes">
                    <div className="marketplace-heads">
                    <h3>MARKETPLACE</h3>
                      
                    </div>
                    <div className="heroes-content1">
                       <img src={thumb} alt="thumb" />
                       
                    </div>
                  </div>
                  <div className="m-stoke"></div>
                <div className="main-marketplace">
                <div className="main-tab-box">
                <ul class="tabs7">
                  {
                    tabArray.map(function(v,i){
                      return (
                      <li class="tab-button"><a onClick={() => goto(v.tabname)} className={tab == v.tabname ?  "tab-link active" : "tab-link"} data-tab="onsale">{v.tabDisplay} </a></li>
                      )
                    })
                  }
              
                </ul>
                </div>
                <div class="tab-pane mt-4">
                {
                    tabArray.map(function(v,i){
                      return (
                  <div   className={tab == v.tabname ?  "tab-panel active" : "tab-panel"}   >
                  
                  <div className="row">
                  
                  {
                                    v.tabname ==  "open" && tradeCounter.length > 0 && tradeCounter.map((v,i) => {
                                         if(!soldTrades.includes(i.toString()) && !cancelledTrades.includes(i.toString())  ){
                                          counterDisp++ ; 
                                                return(
                                                  <MarketplaceSingle tradeId={i}  mytrade={true} />
                                                )
                                              }
                                              })

                  }
                 
                                                          {
                                   v.tabname ==  "open" && counterDisp == 0 && 
 
                                          <div className="p-5 mr-3 ml-3 card-heading card w-100">
                                            <h4>No Trades to Show</h4>
                                            
                                            </div>
                                         }
                                          {
                                    v.tabname ==  "my-trades" && tradeCounter.length > 0 && tradeCounter.map((v,i) => {
                                      if(userTrades.includes(i.toString()) ){
                                        counterDispMyTrades++ ;
                                                return(
                                                  <MarketplaceSingle tradeId={i}  mytrade={true} />

                                                )
                                                }
                                              })
                  }
                    {
                                   v.tabname ==  "my-trades" && counterDispMyTrades == 0 && 
 
                                          <div className="p-5 mr-3 ml-3 card-heading card w-100">
                                            <h4>No Trades to Show</h4>
                                            
                                            </div>
                                         }
                  {
                                    v.tabname ==  "my-collection" && counter.length > 0 && counter.map((v,i) => {
                                         
                                                return(
                                                  <MarketplaceSingle data={v} collection={true} />
                                                )})
                  }
                    {
                                   v.tabname ==  "my-collection" && counter.length == 0 && 
 
                                          <div className="p-5 mr-3 card-heading ml-3 card w-100">
                                            <h4>No Dragons to Show</h4>
                                            
                                            </div>
                                         }
                  </div>
                   
                  </div>
                      )
                    })
                  }
                 
               
 

                </div>
                </div>
                  
                </section>
              </div>
          </div>
          
        </div>
        </div>
       
      </div>
    );
 

}
export default marketplace;