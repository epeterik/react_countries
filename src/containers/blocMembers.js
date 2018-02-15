//app imports
import React, { Component } from 'react';
import { connect } from "react-redux";

//css imports
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { getListEconomicBlockNations,
         getTrackedCountriesList } from '../actions/actions';
import Country from './country';

class BlockMemberDisplay extends Component {
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
        console.log("BlockMemberDisplay - componentDidMount");

        //If sent to this page with no props (no :economicBlock) do not perform lookup (lookup will fail with no val)
        if (this.props.match.params.economicBlock.trim() !== "")
        {
            this.props.listOfTrackedCountries(this.handleWaitSpinner, this.handleError);
            this.props.listOfEconBlockMembers(this.props.match.params.economicBlock, this.handleWaitSpinner, this.handleError);
        }
    }

    componentDidUpdate(prevProps) {
        //console.log("BlockMemberDisplay - componentDidUpdate - New Props:", prevProps, "Current Props: ", this.props);
        if (prevProps.match.params.economicBlock.trim() !== this.props.match.params.economicBlock.trim())
        {
            //debug
            console.log("BlockMemberDisplay - Props changed from: ", prevProps.match.params.economicBlock, "to: ", this.props.match.params.economicBlock);
            //If sent to this page with no props (no :economicBlock) do not perform lookup (lookup will fail with no val)
            if (prevProps.match.params.economicBlock.trim() !== "")
            {
                this.props.listOfTrackedCountries(this.handleWaitSpinner, this.handleError);
                this.props.listOfEconBlockMembers(this.props.match.params.economicBlock, this.handleWaitSpinner, this.handleError);
            }
        }
    }

    mapMyEconomicBlockCountries(countryObject, arrayIndex) {
        return (
            <div key={"countryRow" + arrayIndex}>{countryObject.name}</div>
        ); 
    }

    mapMyEconomicBlockCountriesToCard(countryObject, arrayIndex) {
        return (
            <tr key={"blockMemberRowFor" + countryObject.name}>
                <td key={"blockMemberDataFor" + countryObject.name}>
                    <Country blocCountryData={countryObject} key={"blockMemberCardFor" + countryObject.name} canUntrack={false} />
                </td>
            </tr>
        ); 
    }


    render() {
        //debug
        //console.log("BlockMemberDisplay Props: ", this.props); //comenting out as this triggers on every keystroke

        //Error handling, check to see if the notes array has been loaded
        if (this.props.match.params.economicBlock.length === 0)
        {
            return <div>No economic bloc to display, please select an economic bloc.</div>
        }

        return (
            
            <div className="card padding-medium">
                {this.state.showWaitSpinner ?
                    <div className="text-center">
                        <h3>Updating Note With Vote!!</h3>
                        <WaitSpinner />
                        <h4>Please be patient</h4>
                    </div>
                    :
                    <div>
                        <h1 className="text-center">{this.props.match.params.economicBlock}</h1>
                        <table className="table scrollable">
                            <tbody style={{height: "500px"}}>
                                { this.props.economicBlockMembers.map(this.mapMyEconomicBlockCountriesToCard) }
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
        economicBlockMembers: state.listOfEconomicBlockMemberCountries
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            listOfEconBlockMembers: (economicBlockCountries, waitCallback, errorCallBack) => {
                dispatch(getListEconomicBlockNations(economicBlockCountries, waitCallback, errorCallBack))
            } ,
            listOfTrackedCountries: (waitFlag, errorFunction) => {
                dispatch(getTrackedCountriesList(waitFlag, errorFunction))
            }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(BlockMemberDisplay);
