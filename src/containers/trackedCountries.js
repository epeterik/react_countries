//app imports
import React, { Component } from 'react';
import { connect } from "react-redux";

//css imports
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { getListOfTrackedNations,
         getTrackedCountriesList } from '../actions/actions';
import Country from './country';

class TrackedCountries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        //console.log("Entering noteEntry.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        //console.log("Leaving noteEntry.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        //console.log("Entering noteEntry.handleError"); //debug
        
        //update error state if an error was encountered during the axios call
        this.setState({errorText: errorEncountered});
        
        //console.log("Leaving noteEntry.handleError"); //debug
    }

    componentDidMount() {
        console.log("TrackedCountries - componentDidMount");

        this.props.listOfTrackedCountries(this.handleWaitSpinner, this.handleError, this.props.listOfTrackedCountriesData);
    }

    componentDidUpdate(prevProps) {
        //console.log("TrackedCountries - componentDidUpdate - New Props:", prevProps, "Current Props: ", this.props);
    }

    mapMyEconomicBlockCountries(countryObject, arrayIndex) {
        return (
            <div key={"countryRow" + arrayIndex}>{countryObject.name}</div>
        ); 
    }

    mapMyTrackedCountires(countryObject, arrayIndex) {
        return (
            <tr key={"blockMemberRowFor" + countryObject.name}>
                <td key={"blockMemberDataFor" + countryObject.name}>
                    <Country blocCountryData={countryObject} key={"TrackedCountries" + countryObject.name} canUntrack={true} />
                </td>
            </tr>
        ); 
    }


    render() {
        //debug
        //console.log("TrackedCountries Props: ", this.props); //comenting out as this triggers on every keystroke

        //Error handling, check to see if the notes array has been loaded
        if (this.props.trackedCountries.length === 0)
        {
            return <div>No tracked countries to display.</div>
        }

        return (
            
            <div className="card padding-medium">
                {this.state.showWaitSpinner ?
                    <div className="text-center">
                        <h3>Getting List of Tracked Countries!!</h3>
                        <WaitSpinner />
                        <h4>Please be patient</h4>
                    </div>
                    :
                    <div>
                        <h1 className="text-center">{this.props.match.params.economicBlock}</h1>
                        <table className="table scrollable">
                            <tbody style={{height: "500px"}}>
                                { this.props.listOfTrackedCountriesMembers.map(this.mapMyTrackedCountires) }
                            </tbody>
                        </table>
                    </div>
                }
            </div>

        ); //end return

    } //end render

} //end NoteEntry

const mapStateToProps = (state) => {
    return {
        listOfTrackedCountriesMembers: state.listOfTrackedCountriesData,
        trackedCountries: state.listOfTrackedCountries
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            listOfTrackedCountriesData: (trackedCountriesLIst, waitCallback, errorCallBack) => {
                dispatch(getListOfTrackedNations(trackedCountriesLIst, waitCallback, errorCallBack))
            } ,
            listOfTrackedCountries: (waitFlag, errorFunction, successFunction) => {
                dispatch(getTrackedCountriesList(waitFlag, errorFunction, successFunction))
            }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TrackedCountries);
