//package imports
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';

//app based imports
import reducer from '../reducer/reducer';

const initialState = {
    listOfTrackedCountries: [],
    listOfEconomicBlockMemberCountries: [],
    listOfTrackedCountriesData: []
}

export default createStore(
    reducer,  //local reducer from reducer
    initialState, //set initial state
    applyMiddleware(logger, thunk)
); //apply both the thunk and the redux logger middleware