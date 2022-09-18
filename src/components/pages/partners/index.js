import React, { Component } from 'react';
import $ from "jquery";
import marlinpartimg  from '../../images/marlinpartimg.png';
import part1  from '../../images/part1.svg';
import part2  from '../../images/part2.svg';






class Marlinpartner extends Component {
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
	 <div className='marlinpartnerbg'>
         <div className="main-container">
		 <div className='container-fluid'>
         <div className="container-border">
			  <div className='marlinpartner-main-wrap'>
				  <div className='row'>
                      <div className='col-lg-12'>
                      <div className='marlinpartner-heading'>
					  <h3>OUR PARTNERS</h3>
				       </div>
                       <div className='marlinpartner-logoimg'>
                           <ul className='partnerlogoimg'>
                               <li>
                                   <div className='part-logo-wrap'>
                                   <div className='part-logo'>
                                   <a href='https://crodex.app/' target="_blank"><img src={part2}></img></a>
                                   </div>
                                   <div className='part-logo'>
                                   <a href='https://www.crystl.finance/' target="_blank"><img src={part1}></img></a>
                                   </div>
                               
                                   </div>
                               </li>
                              
                           </ul>
                       </div>
                      </div>
                       
                       <div className='col-lg-0'>
                           {/* <div className='marlin-p-img'>
                               <img src={marlinpartimg}></img>
                           </div> */}
                       </div>

                  </div>

                 
            </div>
			  </div>
		  </div>
		 </div>
	 </div>
		 </div>
    );
  }
}

export default Marlinpartner;