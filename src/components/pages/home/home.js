import React, { Component } from 'react';
import { Link, Router } from 'react-router-dom';
import $ from "jquery";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import aboutc from '../../images/aboutc.gif';
import ExploreNew from '../explore/ExploreNew'
import Stake from '../newhome/Stake'
import { CHAIN_ID } from '../../../Config/index.js';

import playbtn from '../../images/playbtn.png';
import rightarow from '../../images/rightarow-icon.png';
import Mech_UN from '../../images/double-character.gif';
import roadmap_character from '../../images/Mech_Sniper14.png';
import hujgu from '../../images/hujgu12.gif';

import socialcharacter1 from '../../images/socialcharacter.png';
import twitter2 from '../../images/twitter.png';
import telegram3 from '../../images/telegram.png';
import Subtraction4 from '../../images/Subtraction.png';
import discord from '../../images/discord.png';
import Asset from '../../images/Asset.png';
import arcanelogo from '../../images/arcanelogo.png';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};

	}

	componentDidMount = () => {

		// faq open js

		$(document).ready(function () {
			$('.block__title').click(function (event) {
				if ($('.block').hasClass('one')) {
					$('.block__title').not($(this)).removeClass('active');
					$('.block__text').not($(this).next()).slideUp(300);
				}
				$(this).toggleClass('active').next().slideToggle(300);
			});

		});

		// closed faq js

	}

	render() {
		return (
			<div>
				<Header />
				<div id="banner-section">
					<div className="main-container2">
						<div className="container-fluid">
							<div className="banner-content-wrp">
								<div className="row">
									<div className="col-lg-4">
										<div className="banner-contents">
											<div className="play-btn">
												<a href=""><img src={playbtn} /></a>
											</div>
											<span>Welcome to</span>
											<h3>ARCANE</h3>
											<p>Your Journey to Cybertopia begins here</p>
											<div className="bnr-btns-wrp">
												<div className="bnr-btn"><a target={"_blank"} href="https://swap.crodex.app/#/swap?outputCurrency=0xf8bD0302E8E0b652DcD67D92CF42fbC5aFBdc127">Buy arcane</a></div>
												<div className="rightarow-btn"><a target={"_blank"} href="https://swap.crodex.app/#/swap?outputCurrency=0xf8bD0302E8E0b652DcD67D92CF42fbC5aFBdc127"><img src={rightarow} /></a></div>
												<div className="bnr-btn2"><Link to="/marketplace">Buy nft</Link></div>
											</div>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="bnr-img">
											<img src={Mech_UN} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="wrp-social-media menu-footer1">

						<div className="col-lg-12 socila-flex">
							<ul className="socila-list">
								<li><a href="https://discord.gg/ajesZGddzV" target="_blank"><img src={discord} /></a></li>
								<li><a href="https://www.reddit.com/r/arcanenft/" target="_blank"><img src={socialcharacter1} /></a></li>
								<li><a href="https://twitter.com/thearcanefi" target="_blank"><img src={twitter2} /></a></li>
								<li><a href="https://t.me/arcanenftfinancial" target="_blank"><img src={telegram3} /></a></li>
								<li><a href="https://medium.com/@arcanefinancial" target="_blank"><img src={Subtraction4} /></a></li>
							</ul>
							<p className="socila-list-text">© 2022 Arcane. All rights reserved.</p>
						</div>

					</div>
				</div>

				<section id="about-section">
					<div className="main-container">
						<div className="container-fluid">
							<div className="row">
								<div className="col-lg-4">
									<div className="about-img">
										<img src={aboutc} />
									</div>
								</div>
								<div className="col-lg-8">
									<div className="about-bordar">
										<div className="about-content">
											<div className="asset-img">
												<img src={arcanelogo} />
											</div>
											<h3>Join our <br></br> benefits</h3>
											<br></br>
											<p>Join the ARCANE army and be a part of Cybertopia,
												Make your allies,<br></br> Craft drones in your workshop.
												Modifying your body, adding fuel<br></br> boosters and guns
												and preparing for battle to save your planet cybertopia.<br></br>
												Win and collect protonium ( the most precious matter in the universe).
												Use<br></br> it to upgrade your mecha or Sell it to be a rich cybertopian.</p><br></br>
											<p>The goal of the Arcane army is to protect the cybertopia from dedreux attacks <br></br>
												( Hunters of the universe) gather the Weapons, Ancient Skills NFTs,<br></br> unique power cores and prepare for the battle to save the universe.</p><br></br>
											<p>To know more about this read Holographic text ( whitepaper below)<br></br></p>
											<a href="/ArcaneWhitepaper.pdf" target="_blank">WHITEPAPER</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section id="our-features-sec">
					<div className="main-container">
						<div className="container-fluid">
							<div className="container-border">
								<div className="our-features-head">
									<h3>OUR<br></br> ROADMAP</h3>
									<p>Join our great journey in search of power.</p>
								</div>
								<div>
									<div className="row">
										<div className="col-lg-8">
											<div className="faq-wrp">

												<div className="faq-child1">
													<p className="letter-spacing-text">Q1 <span>2022 - February</span></p>
													
													<div class="wrapper">
														<div class="block one">
															<div class="block__item1">
																<div class="block__title">1000 ARCANE members</div>
																<div class="block__text">
																Summoning the Mecha warriors
																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">Website V1</div>
																<div class="block__text">
																Call of flag and code of conduct

																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">Token Deployment</div>
																<div class="block__text">
																An ERC20 token with unlimited benefits
																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">Launch Platform Partnership Cordex our allies</div>
																<div class="block__text">
																	{/* Ans A fierce and brave warrior a protector */}
																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">Launch Marketplace</div>
																<div class="block__text">
																A place to trade your belongings


																</div>
															</div>
															

														</div>
													</div>
												</div>
												<div className="faq-child2">
													
														<p className="letter-spacing-text">Q2 <span>2022 - March</span></p>

													<div class="wrapper">
														<div class="block one">
															<div class="block__item1">
																<div class="block__title">Character sale</div>
																<div class="block__text">
																Character sale Chose your warrior and prepare for battle
 															
																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">Weapon Sale</div>
																<div class="block__text">
																 Weapon Sale It's time to raise your Guns and prepare your core

																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">Introduction On Chain Games (cybertopians vs Dedrux )</div>
																<div class="block__text">
																A Game in which Arcane Army will fight against Universe Hunters Dedrux protect your planet
																</div>
															</div>
														</div>
													</div>
												</div>

											</div>
											<div className="faq-wrp">

												<div className="faq-child1">
													<p className="letter-spacing-text">Q3 <span>2022 - April</span></p>
													
													<div class="wrapper">
														<div class="block one">
															<div class="block__item1">
																<div class="block__title">Introduction to NFT Sale</div>
																<div class="block__text">
																Introduction to Arcane Workshop ( NFT Ecosystem)Upgrade, Reborn, Recharge your weapons and characters
																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">P2E Introduction</div>
																<div class="block__text">
																Play the game for honor and Protonium 

																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">Pools and Farms Partnerships</div>
																<div class="block__text">
																Let's welcome more ALlies
																</div>
															</div>

														</div>
													</div>
												</div>
												<div className="faq-child2">
													<p className="letter-spacing-text">Q4 <span>2022 - May</span></p>
												
													<div class="wrapper">
														<div class="block one">
															<div class="block__item1">
																<div class="block__title">NFT Pass Sale </div>
																<div class="block__text">
																Join the Galactic army
																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">Launch Of Games</div>
																<div class="block__text">
																Launch Of Games Road to CronosAn Andoird and Ios based game with amazing graphics and gameplay- P2E and P2U
																Play to earn Protunium, NFTs , weapons, and much more

																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">NFT Utility Introduction</div>
																<div class="block__text">
																Build the base share the base and earn Protonium weapons and much more
																</div>
															</div>
															<div class="block__item1">
																<div class="block__title">Character sale- Weapon Sale</div>
																<div class="block__text">
																Introduction On Chain Games (cybertopians vs Dedrux )- Character sale - Weapon Sale - Introduction On Chain Games (cybertopians vs Dedrux )
																</div>
															</div>
															
															
														</div>
													</div>
												</div>

											</div>
										</div>
										<div className="col-lg-4">
											<div className="roadmap-right-img">
												<div className="roadmap_character-img">
													<img src={hujgu} />
												</div>
											</div>

										</div>
									</div>
								</div>

								<div className="about-content1">
									<a href="/ArcaneWhitepaper.pdf" target="_blank">WHITEPAPER</a>
								</div>
							</div>
						</div>
					</div>
				</section>


				<section id="marketplace-sec-home">
					<div className="main-container">
						<div className="container-fluid">
							<div className="container-border">
								<div className="marketplacenfthome">
									<div className="marketplace-child1">
										<h3>nft marketplace</h3>
									</div>
									<div className="marketplacechild2">
										<a href="#">CREATE NFT</a>
									</div>
								</div>
								<div className="marketpace-p">
									<p>Use $ARCANE  to purchase exclusive, valuable and high utility NFT’s, Trade your weapons, characters, spells and everything that makes sense! and wait you cannot only trade this world items but can literally trade and craft any world being. It's a magical world with endless possibilities.</p><br></br>
									<p>Trade your Missiles, rocket, guns, drones, power cores, special vision, Drones, Mechas and protonium and  everything that makes sense! and wait you cannot only trade this cybertopia item but can literally trade and craft any universal matter. </p>
								</div>
								<div className="scrollable mb-3">
									<ExploreNew />
								</div>
								<div className="about-content1">
									<a href="/ArcaneWhitepaper.pdf" target="_blank">WHITEPAPER</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				{
					CHAIN_ID == 56 &&
					<>

						<div className="scrollable">
							<Stake className="p-0" />

						</div>
					</>
				}




<Footer />

			</div >

		);
	}

}
export default Home;