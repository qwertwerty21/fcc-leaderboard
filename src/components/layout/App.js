import React, { Component } from 'react';
//import logo from '../../images/logo.svg';
import './App.scss';

import Leaders from '../containers/Leaders'
import axios from 'axios';

class App extends Component {
  constructor( props ){
    super(props);

    this.state = {
      'allTimeLeaders': [],
      'last30DayLeaders': [],
      'currentView': 'allTimeLeaders'
    };

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e){
    console.log('now change state of App to: ',e.target.value);
    this.setState({
      currentView: e.target.value
    });
  }

  fetchAllTimeLeaders(){
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  fetchlast30DayLeaders(){
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }
  
  componentWillMount(){
    
    axios.all( [ this.fetchAllTimeLeaders(), this.fetchlast30DayLeaders() ] )
      
      .then(axios.spread( (allTimeLeaders, last30DayLeaders) => {
        
        this.setState({
          allTimeLeaders: allTimeLeaders.data,
          last30DayLeaders: last30DayLeaders.data
        });
        
      }));
  }

  render() {
    return (
      <div className="app-container container-fluid">
        
            <div className="row text-center header-row">

              <div className="col-xl-12">
                <h1>
                  Free Code Camp Leaderboard
                  <i className="fa fa-free-code-camp"></i>
                </h1>
                <h4>Currently Showing {this.state.currentView}</h4>
              </div>

              <div className="col-xl-12">
                <button onClick={this.handleClick} value="allTimeLeaders" className="btn btn-info show-leader-btn">Show All Time Leaders</button>
                <button onClick={this.handleClick} value="last30DayLeaders" className="btn btn-info show-leader-btn">Show Last 30 Days Leaders</button>
              </div>
              
            </div>{/* end inner row containing h1 and buttons div */}
            

            <Leaders leaders={this.state[this.state.currentView]}/>
        

        
      </div>
    );
  }
}

export default App;
