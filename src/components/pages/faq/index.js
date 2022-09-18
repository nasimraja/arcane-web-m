import React, { Component } from 'react';
import $ from "jquery";

import q1 from '../../images/q1.png';
import q2 from '../../images/q2.png';
import q3 from '../../images/q3.png';
import q4 from '../../images/q4.png';
import q5 from '../../images/q5.png';
import p1 from '../../images/p1.png';
import p2 from '../../images/p2.png';
import p3 from '../../images/p3.png';
import p4 from '../../images/p4.png';
import p5 from '../../images/p5.png';
import p6 from '../../images/p6.png';
import p7 from '../../images/p7.png';
import p8 from '../../images/p8.png';
import p9 from '../../images/p9.png';
import p10 from '../../images/p10.png';
import p11 from '../../images/p11.png';
import p12 from '../../images/p12.png';
import Footer from '../footer';
import Header from '../header';
class faq extends Component {
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
				<section id="faq-section">
					<div className="main-container">
						<div className="container-fluid">
						<div className="container-border">
							<div className="head-faq">
								<h3>FAQ</h3>
							</div>
							<div className="wrp-faq">
								<div className="row">
									<div className="col-lg-12">
										<div class="wrapper">
											<div class="block one">
												<div class="block__item block__items2">
													<div class="block__title">Q: WHAT IS ARCANE?</div>
													<div class="block__text">
													ARCANE is the premier gaming NFT Token on CRONOS  that will allow you to control an infinite supply of Protonium.<br></br>
													Gather Protonium and become the most powerful Arcane of all time.<br></br>
													ARCANE has one purpose: Unite the cybertornian army to protect the cronos  ecosystem.
													</div>
												</div>
												<div class="block__item block__items2">
													<div class="block__title">Q: WHAT ARE THE BENEFITS OF HOLDING ARCANE?</div>
													<div class="block__text">
													ARCANE  will be providing UNIQUE NFT’s with use cases to improve the traditional DeFi structure.<br></br>
													$ARCANE will be used in the NFT marketplace and is the only token that provides access to purchasing exclusive, valuable and high utility NFT’s from the ARCANE Marketplace.<br></br>
													ARCANE will have a P2E and P2U game, “Infinity realm” which will allow players to earn value (whether this be in the form of $ARCANE or other unlockables) while having fun!
													The $ARCANE token is also the backbone of the ARCANE “Infinity Pool” system, unlocking access to all sorts of explorations activities, NFT Mining, and token minting power.
													
													</div>
												</div> 
												<div class="block__item block__items2">
													<div class="block__title">Q: WHAT IS IAO?</div>
													<div class="block__text">
													An Initial Arcane Offering (IAO) is the practice of funding a blockchain game by raising small amounts of money (fiat or cryptocurrency) from a large number of people in exchange for in-game blockchain assets.
													</div>
												</div>
												<div class="block__item block__items2">
													<div class="block__title">Q: WHAT IS AN ARCANE WORKSHOP?</div>
													<div class="block__text">
													Arcane workshop is an amazing place where you can Stake your parts, weapons, gems, matter, crafts , Drones , Dedux core, weapons and even protonium, Forge God tier Arcanes or Ancient weapons. Who knows you will be able to unlock a mysteriou planet from the Ancient Arcanes!
													</div>
												</div>
												<div class="block__item block__items2">
													<div class="block__title">Q: WHAT IS CYBERTOPIANS VS DEDRUX?</div>
													<div class="block__text">
													An onchain game where the cybertopians of Army army fight against the Hunters of Dedrux to save the crybertopia. 
													</div>
												</div>

											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
						</div>
					</div>
				</section>

				<Footer />

			</div>

		);
	}
}

export default faq;