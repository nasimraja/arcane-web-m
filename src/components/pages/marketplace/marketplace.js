import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import $ from "jquery";

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import wizaartimg  from '../../images/wizaart-img.gif';
import check from '../../images/check.png';
import acc from '../../images/acc.png';
import CollectionBanner1 from '../../images/CollectionBanner1.jpg';
import CollectionBanner2 from '../../images/CollectionBanner2.jpg';
import BigFootBanner from '../../images/BigFootBannerS.jpg';
import BeyondtheMacrosS from '../../images/BeyondtheMacrosS.png';
import GluckS from '../../images/GluckS.png';
import NutritionS from '../../images/NutritionS.png';
import PageLadderS from '../../images/PageLadderS.png';
import ReignS from '../../images/ReignS.png';
import SabersS from '../../images/SabersS.png';
import SystemS from '../../images/SystemS.png';
// import CollectionBanner1 from '../../images/acc.png';
import Explore from '../explore/Explore.js';
import TopPicks from '../explore/TopPicks.js';
import TopSellers from '../explore/TopSellers.js';
import ExploreNew from '../explore/ExploreNew.js';
import BABA from '../../images/BabaS.png';
import Wolf from '../../images/WolfdeS.png';
import DEAP from '../../images/DEAPS.png';
import EIGHT from '../../images/EIGHTS.png';
import LNB from '../../images/LNBS.png';
import CustomHappyS from '../../images/CustomHappyS.png';

import mo4 from '../../images/mkc1.png';
import mo5 from '../../images/mkc2.png';
import mo6 from '../../images/mkc3.png';
import mo7 from '../../images/mkc4.png';
import mo8 from '../../images/mkc5.png';

const marketplace = () =>  { 
 

	const responsive = {
		superLargeDesktop: {
		  // the naming can be any, depends on you.
		  breakpoint: { max: 4000, min: 3000 },
		  items: 5,
		  slidesToSlide: 5
		},
		desktop: {
		  breakpoint: { max: 3000, min: 1024 },
		  items: 5,
		  slidesToSlide: 5
		},
		tablet: {
		  breakpoint: { max: 1024, min: 992 },
		  items: 3
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 1
		}
	  };
	  

 
		return(
            <div>
                <Header />
           
			<div className="marketplace-bg">
		 
                <div className="main-container">
                <section className="marketplace-sec2">
                    <div className="container-fluid">
                    
                    <div className="marketplacenfthome">
							<div className="marketplace-child1">
								<h3>nft marketplace</h3>
							</div>
							<div className="marketplacechild2">
								<a href="#">CREATE NFT</a>
							</div>
						</div>
                        <div className="container-border">
                        <div className="wrp-head-marketplace">
                            <div className="head-marketchild2">
                                <h3>TOP PICKS</h3>
                            </div>
                            
                        </div>
                        <div className="row">
                            <TopPicks />
                    </div>
                    </div>
                    </div>
                </section> 
               <section className="pt-5">
                <div className="container-fluid">
               
                            <div className="head-m-features">
                                <h3>FEATURED COLLECTIONS</h3>
                            </div>
                            <div className="row">
                            <div className="col-lg-6">
                                <a href="/collection/0x1b8d0e5095bF368A962DF1222282720fA33c60de#">
                                    <div className="collection-b">
                                       <div className="shadow-div">
                                            <div className="collect-content">
                                                <div className="ect-box"><a href="/collection/0x1b8d0e5095bF368A962DF1222282720fA33c60de#">COLLECTION</a></div>
                                                <h3>Arcane official</h3>
                                                <p>Collection Wizard Officil Welcome to Arcane, a world of unique 
													experience and magic never before available on the blockchin.</p>
                                                <div className="view-btn">
                                                    <a href="/collection/0x1b8d0e5095bF368A962DF1222282720fA33c60de#">vIEW ITEMS ON SALE</a>
                                                      <a href="#" className="visit-website">VISIT WEBSITE</a>  
                                                </div>
                                            </div>
                                       </div>
                                    </div>
                                </a>
                            </div>

                            <div className="col-lg-6">
                                <ul className="featured-list mrt-featured">
                                    <li className='featured-list1'>
                                        <div className="wrp-featured-list">
                                            <div className="featuredlist-img" style={{backgroundImage: Wolf}}>
                                          
                                            </div>
                                            <div className="featuredlist-content">
                                                <div className="ect-box">
                                                    <a href="/collection/0x004C431a93Bd7a862C049bF5356c5Ad21d7aecCc">COLLECTION</a>
                                                    <h3>Arcane official </h3>
                                                    <div className="view-item">
                                                        <a href="/collection/0x004C431a93Bd7a862C049bF5356c5Ad21d7aecCc" >vIEW ITEMS ON SALE</a>
                                                        <a href="#" className="visit-website">VISIT WEBSITE</a>  
                                                    </div>
                                                     
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='featured-list2'>
                                        <div className="wrp-featured-list">
                                            <div className="featuredlist-img featuredlist-img2" style={{backgroundImage: BABA}}>
                                           
                                            </div>
                                            <div className="featuredlist-content">
                                                <div className="ect-box">
                                                    <a href="/collection/0x3c63dA61B23eC4Ad5c4196a8DAe74aa88268213a">COLLECTION</a>
                                                    <h3>Arcane official </h3>
                                                    <div className="view-item">
                                                        <a href="/collection/0x3c63dA61B23eC4Ad5c4196a8DAe74aa88268213a">vIEW ITEMS ON SALE</a>
                                                        <a href="#" className="visit-website">VISIT WEBSITE</a>
                                                    </div>
                                                   
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
			{/* <Carousel responsive={responsive}
			transitionDuration={1000}
			itemClass="carousel-item-margin-40-px">	
              <div>
				
                <a href="/collection/0x903BC3810E404E71C479A4E53bFb415c433b026c"><img src={mo4} className="slide-img" /></a>
			</div>
            <div>
				
                <a href="/collection/0x93f25B36Ba668a66927b233F0263D7d5CC0ef03F"><img src={mo5} className="slide-img" /></a>
			</div>
			<div>
				<a href="/collection/0x4054ae4f4C5db663E38FfeBc5B4aE14383B9be59"><img src={mo6} className="slide-img" /></a>
			 
			</div>
            <div>
                
				<a href="/collection/0x60150e683C081c113ff776f16096F1a3CB064e05"><img src={mo7} className="slide-img" /></a>
			</div>
			<div>
                
				<a href="/collection/0x65726303Fdc3932c4eB90f62f41f139D100797bC"><img src={mo8} className="slide-img" /></a>
			</div>
            <div>
				<a href="/collection/0xaab2Be0b3Fd73b6bDF509C50c434FC0b2b1CEe89"><img src={NutritionS} className="slide-img" /></a>
				
                
			</div>
			<div>
				<a href="/collection/0x8A83dce4bb96548499fd2aAf45F0c2Ef6d9Af063"><img src={ReignS} className="slide-img" /></a>
			
            </div>
			<div>
				<a href="/collection/0x6127c6180A5Dd538ab224f4179FC76eD56268AD6"><img src={SystemS} className="slide-img" /></a>
				 
			</div>
            <div>
				
                <a href="/collection/0x1926f0fd85CF2eC6B93dD9392e04FC337209Ae47"><img src={SabersS} className="slide-img" /></a>
			</div>
            <div>
				
                <a href="/collection/0xE7d93EB6bF80c0E44B8AC7d119686b71d2AD6DaA"><img src={CustomHappyS} className="slide-img" /></a>
			</div>
            <div>
				
                <a href="/collection/0x3707B21D7E3cbf338849C2E8C6D50670445ce83B"><img src={DEAP} className="slide-img" /></a>
			</div>

			</Carousel> */}
            </div>

		</section>
                
                <div className="container-border1">
                    <TopSellers />
                 
                    <ExploreNew />
                    </div>
                </div>
           
            </div>
            <Footer />
            </div>
		);
 

}
export default marketplace;