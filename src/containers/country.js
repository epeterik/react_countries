import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//package imports
import { connect } from "react-redux";
import { 
    Link
    } from 'react-router-dom';

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { setCountryAsTracked,
         untrackACountry } from '../actions/actions';

class Country extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleTrackCountryClick = this.handleTrackCountryClick.bind(this);
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        //console.log("Entering Country.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        //console.log("Leaving Country.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        //console.log("Entering Country.handleError"); //debug
        
        //update error state if an error was encountered during the axios call
        this.setState({errorText: errorEncountered});
        
        //console.log("Leaving Country.handleError"); //debug
    }

    handleTrackCountryClick() {
        console.log("Entering handleTrackCountryClick");
        this.props.trackCountry(this.props.blocCountryData.name, this.props.blocCountryData.numericCode, this.props.blocCountryData.alpha3Code, this.handleWaitSpinner, this.handleError);
        console.log("Leaving handleTrackCountryClick");
    }

    handleUNTrackCountryClick(idToDelete) {
        console.log("Entering handleUNTrackCountryClick");
        this.props.stopTrackingACountry(idToDelete, this.handleWaitSpinner, this.handleError);
        console.log("Leaving handleUNTrackCountryClick");
    }

    render() {
        //debug
        //console.log("Country Object Props: ", this.props); //comenting out as this triggers on every keystroke

        //store local value for easier typing
        let localCountryObject = this.props.blocCountryData;

        //lets check if this country is a tracked country
        let trackedContryMockAPIKey = this.props.trackedCountries.find((countryObject) => countryObject.numericCode === localCountryObject.numericCode)
        //console.log("trackedContryMockAPIKey value: ", trackedContryMockAPIKey); //debug

        return (
            
            <div className="card padding-medium" key={"countryObjectRenderCard" + localCountryObject.numericCode} >
                {this.state.showWaitSpinner ?
                    <div className="text-center">
                        <h3>Logging Updated Country Tracking Status</h3>
                        <WaitSpinner />
                        <h4>Please be patient</h4>
                    </div>
                    :
                    <div> 
                        <div className="row">
                            <div className="small-3 columns tableDiv">
                                <img alt={localCountryObject.name + " flag"} src={localCountryObject.flag} height="150" width="255" border="1"/>
                            </div>
                            <div className="small-9 columns tableDiv">
                                <div className="row">
                                    <div className="small-3 columns">
                                        Country Name: 
                                    </div>
                                    <div className="small-9 columns">
                                        <Link to={"/countries/" + localCountryObject.name}>{ localCountryObject.name }</Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-9 columns">
                                        <div className="row">
                                            <div className="small-3 columns">
                                                Capital: 
                                            </div>
                                            <div className="small-9 columns">
                                                { localCountryObject.capital }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="small-3 columns">
                                                Population: 
                                            </div>
                                            <div className="small-9 columns">
                                                { localCountryObject.population.toLocaleString() }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="small-3 columns">
                                        {trackedContryMockAPIKey === undefined ?
                                            <button className="button btn-cta success small" onClick={this.handleTrackCountryClick}>Track</button>
                                         :
                                            <button className="button btn-cta warning small" onClick={() => this.handleUNTrackCountryClick(trackedContryMockAPIKey.id)} disabled={!this.props.canUntrack}>Untrack</button>
                                        }
                                    </div>
                                </div>
                                {/*<Link to={"/notes/" + localNoteObject.id}>{localNoteObject.note}</Link>*/}
                            </div>
                        </div>
                    </div>
                }
            </div>

        ); //end return

    } //end render

} //end NoteEntry

const mapStateToProps = (state) => {
    return {
        trackedCountries: state.listOfTrackedCountries
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            trackCountry: (countryName, countryCode, alpha3Code, waitFlag, errorFunction) => {
                dispatch(setCountryAsTracked (countryName, countryCode, alpha3Code, waitFlag, errorFunction))
            },
            stopTrackingACountry: (deleteId, waitFlag, errorFunction) => {
                dispatch(untrackACountry (deleteId, waitFlag, errorFunction))
            }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Country);