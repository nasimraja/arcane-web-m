import React, { Component } from 'react';
import {Link, Router} from 'react-router-dom';
import { useState , useEffect} from 'react';
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";

import $ from "jquery";
import thumb from '../../images/iconlogo.png'

// import approve from '../../images/approve.png'

import backicon  from '../../images/backicon.png';
import bankimg  from '../../images/bankimg.png';
import RENEW  from '../../images/RENEW.png';
import CANCEL  from '../../images/CANCEL2.png';
import SOLDOUT  from '../../images/SOLDOUT.png';

import ConnectHead from '../ConnectHead';
import sellicon  from '../../images/sell.png';

import { useWallet } from '@binance-chain/bsc-use-wallet';
import Config, { TOKEN , MARKETPLACE, WARRIORS} from '../../../Config';
import PRICE_ABI from '../../../Config/PRICE_ABI.json'
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json'
import NFT_ABI from '../../../Config/NFT_ABI.json'
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json'
import WARRIORS_ABI from '../../../Config/WARRIOR_ABI.json'

import DRAGON_ABI from '../../../Config/DRAGON_ABI.json'
import WARRIOR_ABI from '../../../Config/WARRIOR_ABI.json'
import Web3 from 'web3';

const MarketplaceSingle = (props) => {
  const [auctionToken , setAuctionToken] = useState(null) ;

  const wallet = useWallet() ; 
  const [media, setMedia] = useState(false);
const [name, setName] = useState(false);
const [ee, setEe] = useState(0);
const [bp, setBp] = useState(0);
const [fee, setFee] = useState(0);
const [tokenAddress,settokenAddress] = useState(null) ;
const [symbol,setSymbol] = useState(null) ;
// const [media,setMedia] = useState(null) ;

const [progress, setProgress] = useState(0);

const [errorMessage, setErrorMessage] = useState(false);
const [renewSaleModal, setRenewSaleModal] = useState(false);
const renewSaleToggle = () => setRenewSaleModal(!renewSaleModal);

const [notbuyNftModal, setNotBuyNftModal] = useState(false);
const notbuyNftToggle = () => setNotBuyNftModal(!notbuyNftModal);



const [saleModal, setSaleModal] = useState(false);
const saleToggle = () => setSaleModal(!saleModal);



const [approved, setApproved] = useState(false);
const [expedite, setExpedite] = useState(false);
  const [day,setDay] = useState(null);
  const [hour,setHour] = useState(null);
  const [minute,setMinute] = useState(null);
  const [second,setSecond] = useState(null);
  const [hero,setHero] = useState(null);
  const [modal, setModal] = useState(false);
  const [tokenApproved, setTokenApproved] = useState(false);
  const toggle = () => setModal(!modal);
  const [newPrice,setNewPrice] = useState(0) ;
  const [price,setPrice] = useState(0) ;
  const [seller,setSeller] = useState('') ;
  const [buyer,setBuyer] = useState('') ;
  
  const [salePrice,setSalePrice] = useState(0) ;
  const [canBuy,setCanBuy] = useState(false) ;

  
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
      getDragon() ; 
      getApproval() ;
  },[])

  const handleNewPriceChange = (e) => {
    setNewPrice(e.target.value) ;
   

}

const handlePriceChange = (e) => {
  setPrice(e.target.value) ;
 

}

async function renewSale(){
  setErrorMessage(false)
  if(newPrice <= 0){
    setErrorMessage("Amount must be Greater than 0");
    return false;

  }
  let _web3 = new Web3(web3Provider);
  const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
  let _newPrice = _web3.utils.toWei(newPrice.toString()) ; 
  setModal(!modal);
  _marketPlaceContract.methods.renewInstantSellAuction(props.tradeId,_newPrice).send({
      from: wallet.account
  }).on('receipt', function(receipt){
      setModal(modal);
      setRenewSaleModal(!renewSaleModal)
      window.location.reload() ;

  }).on('error', function(receipt){
      setModal(modal);

  })
  
}


async function cancelSale(){

  let _web3 = new Web3(web3Provider);
  const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);

  setModal(!modal);
  _marketPlaceContract.methods.cancelInstantSellAuction(props.tradeId).send({
      from: wallet.account
  }).on('receipt', function(receipt){
      setModal(modal);
      window.location.reload() ;

  }).on('error', function(receipt){
      setModal(modal);

  })
  
}

async function putOnSale(){
  setErrorMessage(false)
  if(price <= 0){
    setErrorMessage("Amount must be Greater than 0");
    return false;
  }
  let _web3 = new Web3(web3Provider);

  const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
  let _newPrice = _web3.utils.toWei(price.toString()) ; 
 
  setModal(!modal);

  let _title = 'NA' ; 
  console.log(hero,price,auctionToken,_title);
  _marketPlaceContract.methods.openInstantSellAuction(hero,_newPrice,auctionToken,_title).send({
      from: wallet.account
  }).on('receipt', function(receipt){
      setModal(modal);

      
      window.location.reload() ;

  }).on('error', function(receipt){
      setModal(modal);

  })
  
}

  async function getDragon(){
  let _web3 = new Web3(web3Provider);
  
  const _nftContract = new _web3.eth.Contract(DRAGON_ABI,Config.DRAGONS);
  const _warriorsContract = new _web3.eth.Contract(WARRIORS_ABI,Config.WARRIORS);
      // console.log(props)
      const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);

      let _token = await _marketPlaceContract.methods.getApprovedToken(0).call() ;
      setAuctionToken(_token[2]);
      setFee(parseFloat(_token[1]/100).toFixed(2));

      if(props.data){
        let _data = props.data.toString();
        // alert(typeof _data)
  
         _data = _data.split(',');
         setHero(_data[7])
         let _mediaURI = await _nftContract.methods.tokenURI(_data[7]).call() ;
         try{
             _mediaURI = await fetch(_mediaURI) ;
             _mediaURI = await _mediaURI.json() ;
             setMedia(encodeURI(_mediaURI.image));
             setName(_mediaURI.name);
         
             
         }
         catch{
             alert("Some Error Occured. Please try Again")
  
         }
         if(_data[0] == 21){
             setExpedite(true);
             let _endTime = new Date().getTime() + _data[8]*1e3 ; 
             setInterval(() => {
                 
                startTimer(_endTime);
                
             }, 1000);
             
         }
         else{
            setEe(_data[6]);
            setBp(_data[2]);
            setProgress(parseFloat(_data[2]*100/6000));
  
         }
      }
      if(props.tradeId != null ){
      // alert(props.tradeId);

        let _trade =  await _marketPlaceContract.methods.getTrade(props.tradeId).call() ;
        let _fullTrade =  await _marketPlaceContract.methods.getFullTrade(props.tradeId).call() ;
        console.log(_fullTrade);

        let _token = _fullTrade[5];

        settokenAddress(_token);
        let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_token);
        let _symbol = await _tokenContract.methods.symbol().call() ;
        setSymbol(_symbol);
        let _nftToken =  _trade.nftadd    ;
        let _nftTokenId =  _trade.nftid    ;
        let _dragon =  await _warriorsContract.methods.getHero(_nftTokenId,false).call() ; 
        setEe(_dragon.hp);
        setBp(_dragon.xp);
        setProgress(parseFloat(_dragon.xp*100/6000));
        let _nftContract = new _web3.eth.Contract(NFT_ABI,_nftToken);
        let _mediaURI = await _nftContract.methods.tokenURI(_nftTokenId).call() ;
        _mediaURI = await fetch(_mediaURI) ;
        _mediaURI = await _mediaURI.json() ;
        setMedia( encodeURI(_mediaURI.image));
        setName(_mediaURI.name);
        setSeller(_fullTrade.lister);
        setBuyer(_fullTrade.buyer);
        
        let _slprice = _web3.utils.fromWei(_fullTrade.nftTokenPrice);
        _slprice = parseFloat(_slprice).toFixed(2);
        setSalePrice(_slprice);
        if(wallet.account){
        let _balance = await _nftContract.methods.balanceOf(wallet.account).call() ;
            if(_balance < 2 ){
                setCanBuy(true);
            }
          const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,Config.TOKEN);
          let _allowance = await _tokenContract.methods.allowance(wallet.account,Config.MARKETPLACE).call() ;
                if(_allowance > _fullTrade.nftTokenPrice){
                  setTokenApproved(true);
                }
              }
      }
    
   

      //  alert(_data[7])
    // let _getLatest = await _nftContract.methods.tokenOfOwnerByIndex(wallet.account,_data[6]).call() ; 
  
  


 

  
     
}




const startTimer = (_t) => {
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
  
  setDay(textDay+"d");
  setHour(textHour+"h");
  setMinute(textMinute+"m");
  setSecond(textSecond+"s");
    }

          

          
 
async function expediteNow(){
  let _web3 = new Web3(web3Provider);
 
  setModal(!modal);
 
  const _warriorContract = new _web3.eth.Contract(WARRIOR_ABI,Config.WARRIORS);
   _warriorContract.methods.expediteDragon(hero).send({from: wallet.account}).on('receipt', function(receipt){
    window.location.reload();          
     setModal(modal);
    
           

  })
  
  .on('error', function(error, receipt) {
  setModal(modal);
    
  });
     
}



async function buyNft(){

  let _web3 = new Web3(web3Provider);
  const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);

  setModal(!modal);
  _marketPlaceContract.methods.buyNft(props.tradeId).send({
      from: wallet.account
  }).on('receipt', function(receipt){
      setModal(modal);
      window.location.reload();          

  }).on('error', function(receipt){
      setModal(modal);

  })
  
}
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

    const getApproval = async () => {
      let _web3 = new Web3(web3Provider);
      let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
      let _nft = await _marketPlaceContract.methods.nftAddress().call() ;
     
      let _nftContract = new _web3.eth.Contract(NFT_ABI,_nft);
      let _approevd  = await _nftContract.methods.isApprovedForAll(wallet.account,MARKETPLACE).call();
      setApproved(_approevd);
      }

      
      const approveBuyToken = async () => {
        let _web3 = new Web3(web3Provider);
        let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,TOKEN);
  
        setModal(true);

  const _amount = _web3.utils.toWei('100000000000000000000000000000000000') ;
  _tokenContract.methods.approve(Config.MARKETPLACE,_amount).send({
             from: wallet.account
            }).on('receipt', function(receipt){
                setModal(false);

                window.location.reload() ;
            }).on('error', function(receipt){
             
                setModal(false);

             })
       
        }
      const approveToken = async () => {
        let _web3 = new Web3(web3Provider);
        let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
        let _nft = await _marketPlaceContract.methods.nftAddress().call() ;
      
        let _nftContract = new _web3.eth.Contract(NFT_ABI,_nft);
        setModal(true);

         _nftContract.methods.setApprovalForAll(MARKETPLACE,true).send({
             from: wallet.account
            }).on('receipt', function(receipt){
                setModal(false);

                window.location.reload() ;
            }).on('error', function(receipt){
             
                setModal(false);

             })
       
        }

    return(
      <div className="col-lg-4 mt-5">
      <div className="wrp-marketmain">
      <div className="marketplace-box">
         <div>
           <div className="market-img">
             <div className="marketimg-content">
               <p>{name}</p>
               <img src={media} />
               <div className="progressbar-container">
              
                 {
                   progress > 100 ?
                   <>
                 <div className="progressbar" style={{width: "100%"}}></div>
                 <p>BP: {bp}</p>
                 </>
                  :
                  <>
                 <div className="progressbar" style={{width: progress+"%"}}></div>
                 <p>BP: {bp}/6000</p>
                  </>
                 }
                 
               </div>
               {
                 !props.collection ?
                 <div className="wrp-dollar">
                 <div className="dollarbox">
                     <h4>Seller</h4>
                     <p>{seller.substring(0, 3)+"..."+seller.substring(seller.length - 3)}</p>
                 </div>
                 <div className="dollarbox">
                     <h4>Price</h4>
                     <p>{salePrice} $DRAG</p>
                 </div>
                 <div className="dollarbox">
                     <h4>EE</h4>
                     <p>{ee}</p>
                 </div>
               </div>
               :
               ""
               }
             
             
             </div>
           </div>
           {
             props.collection ?
             approved ?
             <div className="approve-btns">
             <a href="javascript:void" onClick={saleToggle} >
                 <img src={sellicon} />
             </a>
         </div>
         :
         <div className="approve-btns">
         <a href="javascript:void" onClick={approveToken}>
             <img src={bankimg} />
         </a>
     </div>
         :
         tokenApproved  ?
          buyer == "0x0000000000000000000000000000000000000000"  ?
          seller != wallet.account && salePrice > 0 ?
          canBuy ?
         <div className="approve-btns">
         <a href="javascript:void" onClick={buyNft} >
             <img src={approve} />
         </a>
     </div>
     :
     <div className="approve-btns">
         <a href="javascript:void" onClick={notbuyNftToggle} >
             <img src={approve} />
         </a>
     </div>
     :
     ""
     :
     <div className="approve-btns">
         <a href="javascript:void"  >
             <img src={SOLDOUT} />
         </a>
     </div>
     :
     <div className="approve-btns">
     <a href="javascript:void" onClick={approveBuyToken}>
         <img src={bankimg} />
     </a>
 </div>
           }

           {
             seller == wallet.account && buyer == "0x0000000000000000000000000000000000000000" &&
             <>
<div className="approve-btns">
     <a href="javascript:void" onClick={renewSaleToggle}>
         <img src={RENEW} />
     </a>
 </div>
 <div className="approve-btns">
     <a href="javascript:void" onClick={cancelSale}>
         <img src={CANCEL} />
     </a>
 </div>
             </>
           }
        
         </div>
         
         {/* <div className="marketplace-content">
           <h4>unlock</h4>
           
         </div> */}
       </div>
      </div>


      <Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>

 
<Modal isOpen={saleModal} toggle={saleToggle}  centered={true}>

 
<ModalBody className="popup">
   
  <label><br />Enter Price Amount in $DRAG </label>
  <input className="form-control popup" onChange={handlePriceChange} type="text" value={price} />
  <small>Platform Commission: {fee > 0 ? fee+"%" : "No Commission" }</small>
  {
    errorMessage &&
    <p><small>Error : {errorMessage}</small></p>

  }
</ModalBody>
<ModalFooter>
   
       <Button className="depositButton mr-3" onClick={putOnSale}>Put On Sale</Button>

    
  <Button className="depositButton" onClick={saleToggle}>Cancel</Button>
</ModalFooter>
</Modal>

<Modal isOpen={notbuyNftModal} toggle={notbuyNftToggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >You already have 2 dragons in your wallet which is maximum one can poses within a wallet.</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={notbuyNftToggle}>Close</Button>
    
 </Modal>

<Modal isOpen={renewSaleModal} toggle={renewSaleToggle}  centered={true}>

 
<ModalBody className="popup">
   
  <label><br />Enter New Price Amount $DRAG </label>
  <input className="form-control popup" onChange={handleNewPriceChange} type="text" value={newPrice} />
  <small>Platform Commission: {fee > 0 ? fee+"%" : "No Commission" }</small>
  {
    errorMessage &&
    <p><small>Error : {errorMessage}</small></p>


  }
</ModalBody>
<ModalFooter>
   
       <Button className="depositButton mr-3" onClick={renewSale}>Renew Sale</Button>

    
  <Button className="depositButton" onClick={renewSaleToggle}>Cancel</Button>
</ModalFooter>
</Modal>


     </div> 
    );
 

}
export default MarketplaceSingle;