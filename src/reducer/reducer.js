//app imports
import { SET_TRACKED_COUNTRY, 
         UNSET_TRACKED_COUNTRY,
         UPDATE_ECONOMIC_COUNTRY_BLOCK_LIST } from '../actions/types';

export const reducer = (state, action) => {

    console.log("Entering Reducer");

    switch (action.type) {
    case SET_TRACKED_COUNTRY: 
        console.log("reducer - SET_TRACKED_COUNTRY");
        state = {...state, 
                 listOfTrackedCountries: action.payload};
        return state; 
    case UNSET_TRACKED_COUNTRY: 
        console.log("reducer - UNSET_TRACKED_COUNTRY");
        state = {...state, 
                 listOfTrackedCountriesData: action.payload};
        return state; 
    case UPDATE_ECONOMIC_COUNTRY_BLOCK_LIST: 
        console.log("reducer - UPDATE_ECONOMIC_COUNTRY_BLOCK_LIST");
        state = {...state, 
                 listOfEconomicBlockMemberCountries: action.payload};
        return state; 
    default: //if no case is caught, return the current unmodified state
        console.log("reducer - default");
        return state; 

    } //end switch

} //end of reducer

//only exporting one element as the default element
export default reducer;