import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Redirect} from 'react-router-dom';
import './App.css';
import Home from './components/pages/home/home.js';
import Tokenomic from './components/pages/tokenomic/Tokenomic.js';
import Explore from './components/pages/explore/Explore.js';
import Product from './components/pages/product/Product.js';
import Farm from './components/pages/home2/Farm.js';
import Pools from './components/pages/home2/Pools.js';
import Choose from './components/pages/newhome/Choose.js';
import Stake from './components/pages/newhome/Stake.js';
import NFTBuy from './components/pages/newhome/NFTBuy.js';
import multiple from './components/pages/multiple/multiple.js';
import single from './components/pages/single/single.js';
import create from './components/pages/create/create.js';
import marketplace from './components/pages/marketplace/marketplace.js';
import Header from './components/pages/header';
import Footer from './components/pages/footer';
// import wizgame from './components/pages/wizgame/wizgame';
import faq from './components/pages/faq';
import partners from './components/pages/partners';
import games from './components/pages/games/index';
import ViewProfile from './components/pages/profile/viewProfile';
import Profile from './components/pages/profile/profile';
import ExploreNew from './components/pages/explore/ExploreNew';
import Collection from './components/pages/explore/Collection';
// import Stakew from './components/pages/ido/Stakew';
import Wizardinfo from './components/pages/ido/Wizardinfo';
import Tires from './components/pages/ido/Tires';
// import Pools2 from './components/pages/ido/Pools2';
import MultiStake from './components/pages/newhome/MultiStake';
import Battle from './components/pages/battle/Battle';
import upgrade from './components/pages/upgrade/upgrade';
import Booster from './components/pages/booster/Booster';
import Gamelog from './components/pages/gamelog/Gamelog'
import newmarketplace from './components/pages/newmarketplace/marketplace'
import Reserve from './components/pages/reserve/Reserve';
import Fight from './components/pages/fight/Fight';

// import Createpresale from './components/pages/createpresale/Createpresale';
// import Padchain from './components/pages/padchain/Padchain';
// import Paddetails from './components/pages/padchain/Paddetails';
// import Oldpaddetails from './components/pages/padchain/Oldpaddetails';



const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
	  localStorage.getItem('ACCESS_ID') != null ? <Redirect to='/' /> : <Component {...props} />
	)} />
  )
class App extends Component {

  render() {
    return (
	<Router>
		<div>		
			
			<Route exact path="/" name="Home Page" component = {Home} />
			<Route exact path="/tokenomic" name="Tokenomic Page" component = {Tokenomic} />
			<Route exact path="/profile" name="Profile Page" component = {Profile} />
			<Route exact path="/profile/view/:account" name="View Profile Page" component = {ViewProfile} />
			<Route exact path="/product/:tradeid" name="Product Page" component = {Product} />
			<Route exact path="/farm" name="Farm Page" component = {Farm} />
			<Route exact path="/pools" name="Pools Page" component = {Pools} />
			<Route exact path="/choose" name="Choose Page" component = {Choose} />
			<Route exact path="/stake" name="Stake Page" component = {Stake} />
			<Route exact path="/buy" name="Newpage2 Page" component = {NFTBuy} />
			<Route exact path="/multiple" name="multiple Page" component = {multiple} />
			<Route exact path="/single" name="single Page" component = {single} />
			<Route exact path="/create" name="create Page" component = {create} />
			<Route exact path="/marketplace" name="marketplace Page" component = {marketplace} />
			<Route exact path="/collection"  >
				<Redirect to="/marketplace" />
			</Route>
			<Route exact path="/collection/:address" name="collection Page" component = {Collection} />
			{/* <Route exact path="/wizgame" name="wizgame Page" component = {wizgame} /> */}
			<Route exact path="/faq" name="faq Page" component = {faq} />
			<Route exact path="/partners" name="partners Page" component = {partners} />
			<Route exact path="/games" name="games Page" component = {games} />
			{/* <Route exact path="/iwo/stake/:index" name="stake Page" component = {Stakew} /> */}
			<Route exact path="/iwo/participate/:index" name="participate Page" component = {Wizardinfo} />
			<Route exact path="/tiers" name="tiers Page" component = {Tires} />
			{/* <Route exact path="/iwo/test" name="iwo Page" component = {Pools2} /> */}
			<Route exact path="/multistake" name="games Page" component = {MultiStake} />
			<Route exact path="/battle" name="games Page" component = {Battle} />
			<Route exact path="/mint" name="upgrade Page" component = {upgrade} />
			<Route exact path="/booster" name="Booster Page" component = {Booster} />
			<Route exact path="/gamelog" name="Gamelog Page" component = {Gamelog} />
			<Route exact path="/marketplace2" >
				<Redirect to="/marketplace2/open" />
				</Route>
			<Route exact path="/marketplace2/:tab" name="marketplace Page" component = {newmarketplace} />
			<Route exact path="/reserve" name="Reserve Page" component = {Reserve} />
			<Route exact path="/fight" name="Fight Page" component = {Fight} />


			{/* <Route exact path="/createpresale" name="Createpresale Page" component = {Createpresale} /> */}
			{/* <Route exact path="/iwo/list" name="Padchain Page" component = {Padchain} /> */}
			{/* <Route exact path="/iwo/details/:slug" component={Paddetails} />
			<Route exact path="/paddetails/:slug" component={Oldpaddetails} /> */}
			
		</div>
	</Router>
    );
  }
}

export default App;
