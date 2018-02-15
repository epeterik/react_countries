//package imports
import React, { Component } from 'react';
import { 
    BrowserRouter,
    Route
    } from 'react-router-dom';

//css imports
import './ui-toolkit/css/nm-cx/main.css';
import './css/custom.css';

//app imports
import { DisplayListOfBlocks } from './components/blocksBar';
import { AppIntroInfo } from './components/appIntro';
import TrackedCountries from './containers/trackedCountries';
import BlockMemberDisplay from './containers/blocMembers';
import CountryDetail from './containers/countryDetails';
import { NavigationBar } from './components/navBar';

class App extends Component {
  render() {
    return (
      <div className="bg-off-white padding-medium">
          <h1 className="padding-bottom-medium">React Countries</h1>
          <BrowserRouter>
            <div className="card padding-none">
                <div className="row padding-horiz-medium">
                    <div className="columns small-2 padding-top-medium">
                        <ul className="filter-nav vertical">
                            <Route path="/" component={ NavigationBar } />
                            <Route exact path="/" component={ DisplayListOfBlocks } />
                            <Route exact path="/:economicBlock" component={ DisplayListOfBlocks } />                            
                        </ul>
                    </div>
                    <div className="columns small-10 padding-vert-medium">    
                        <Route exact path="/" component={ AppIntroInfo } />            
                        <Route exact path="/:economicBlock" component={ BlockMemberDisplay } />
                        <Route exact path="/countries/:countryName" component={ CountryDetail } />
                        <Route exact path="/tracking/countries" component={ TrackedCountries } />                        
                    </div>
                </div>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
