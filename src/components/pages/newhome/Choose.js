import React, { Component } from 'react';
import $ from "jquery";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import q1  from '../../images/q1.png';
import q2  from '../../images/q2.png';
import q3  from '../../images/q3.png';
import q4  from '../../images/q4.png';
import q5  from '../../images/q5.png';
import p1  from '../../images/p1.png';
import p2  from '../../images/p2.png';
import p3  from '../../images/p3.png';
import p4  from '../../images/p4.png';
import p5  from '../../images/p5.png';
import p6  from '../../images/p6.png';
import p7  from '../../images/p7.png';
import p8  from '../../images/p8.png';
import p9  from '../../images/p9.png';
import p10  from '../../images/p10.png';
import p11  from '../../images/p11.png';
import p12  from '../../images/p12.png';
import nfarm  from '../../images/nfarm.png';
import nsale  from '../../images/nsale.png';






class Ecosystem extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	
	  }
	  componentDidMount = () =>{
            
	  }
	  
  render() {
	 return (
		 <div>
			 <Header />
	 <div className='ecosystembg'>
          <div className="main-container">
          <div className='container-fluid'>
			  <div className='ecosystem-main-wrap'>
				  <div className='ecosystem-heading'>
					  <h3>NFT ECOSYSTEM</h3>
				  </div>

                 <div className='row'>
					 <div className='col-lg-6'>
						 <div className='eco-left'>
							 <div className='eco-l-cont'>
								 <h3>nft farm</h3>
								 <div className='stake-nft-but'>
									 <a href='/stake'>Stake your nft</a>
								 </div>
							 </div>
						 </div>
					 </div>
					 <div className='col-lg-6'>
						 <div className='eco-right'>
						 <div className='eco-l-cont'>
								 <h3>nft sale</h3>
								 <div className='stake-nft-but'>
									 <a href='/buy'>Buy your nft</a>
								 </div>
							 </div>
						 </div>
					 </div>
				 </div>

			  </div>
		  </div>
          </div>
	 </div>
	 <Footer />
		 </div>
    );
  }
}

export default Ecosystem;