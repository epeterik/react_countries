//package imports
import axios from 'axios';

//app imports
import { SET_TRACKED_COUNTRY,
         UNSET_TRACKED_COUNTRY,
         UPDATE_ECONOMIC_COUNTRY_BLOCK_LIST } from './types';

export function updateTrackedCountriesList(trackedCountryList) {
    return {
        type: SET_TRACKED_COUNTRY,
        payload: trackedCountryList
    }
}

export function untrackedCountryData(untrackedCountryData) {
    return {
        type: UNSET_TRACKED_COUNTRY,
        payload: untrackedCountryData
    }
}

export function updateEconomicBlockList(blockCountryList) {
    return {
        type: UPDATE_ECONOMIC_COUNTRY_BLOCK_LIST,
        payload: blockCountryList
    }
}

export function getListEconomicBlockNations (econBlocName, waitFlag, errorFunction)
{
    console.log("Entering getListEconomicBlockNations");

    //specify local RestCountries.eu API path for obtaining a regional blocks data
    //   Docs @: https://restcountries.eu/#api-endpoints-regional-bloc
    let mockAPIPath = "https://restcountries.eu/rest/v2/regionalbloc/";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.get(mockAPIPath + econBlocName)
            .then((response) => {
                //Success!! :)
                console.log("getListEconomicBlockNations - response for " + econBlocName + ": ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(updateEconomicBlockList(response.data));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getListEconomicBlockNations :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting list of member countries in economic block from RESTCountries API , Try Again'));
            })

    } //end return

} //end of getListEconomicBlockNations


export function getCountryData (countryName, waitFlag, errorFunction, foundCountryData)
{
    console.log("Entering getCountryData");

    //specify local RestCountries.eu API path for obtaining specific country data
    //   Docs @: https://restcountries.eu/rest/v2/name/aruba?fullText=true
    let mockAPIPath = "https://restcountries.eu/rest/v2/name/";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.get(mockAPIPath + countryName + "?fullText=true")
            .then((response) => {
                //Success!! :)
                console.log("getCountryData - response for " + countryName + ": ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(() => foundCountryData(response.data));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getCountryData :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting country data from RESTCountriesAPI, Try Again'));
            })

    } //end return

} //end of getCountryData

export function setCountryAsTracked (countryName, countryCode, alpha3Code, waitFlag, errorFunction)
{
    console.log("Entering getCountryData");

    //specify local MockAPI Path for storing countries to track
    let mockAPIPath = "http://5a84b18b3015220012486c2d.mockapi.io/reactTrackedCountryList";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //create local country object to send to MockAPI
        let localCountryObject = {
            countryName: countryName,
            numericCode: countryCode,
            alpha3Code: alpha3Code
        }

        //lets get that list of notes!
        axios.post(mockAPIPath, localCountryObject)
            .then((response) => {
                //Success!! :)
                console.log("setCountryAsTracked - response for " + countryName + ": ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(getTrackedCountriesList (waitFlag, errorFunction));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to setCountryAsTracked :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error sending country data to MockAPI, Try Again'));
            })

    } //end return

} //end of setCountryAsTracked

export function getTrackedCountriesList (waitFlag, errorFunction, optionalSuccessFunction)
{
    console.log("Entering getTrackedCountriesList");

    //specify local MockAPI Path for storing countries to track
    let mockAPIPath = "http://5a84b18b3015220012486c2d.mockapi.io/reactTrackedCountryList";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.get(mockAPIPath)
            .then((response) => {
                //Success!! :)
                console.log("getTrackedCountriesList - response: ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(updateTrackedCountriesList(response.data));

                console.log(optionalSuccessFunction);
                //if supplied with an optional success function, call with returned data
                //  this is needed for the tracked countries page
                if (optionalSuccessFunction !== undefined)
                {
                    dispatch(getListOfTrackedNations(response.data, waitFlag, errorFunction));
                }
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getTrackedCountriesList :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting tracked country data from MockAPI, Try Again'));
            })

    } //end return

} //end of getTrackedCountriesList

export function untrackACountry (deleteId, waitFlag, errorFunction)
{
    console.log("Entering untrackACountry");

    //specify local MockAPI Path for storing countries to track
    let mockAPIPath = "http://5a84b18b3015220012486c2d.mockapi.io/reactTrackedCountryList";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.delete(mockAPIPath + "/" + deleteId)
            .then((response) => {
                //Success!! :)
                console.log("untrackACountry - response for deletion ID " + deleteId + ": ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(getTrackedCountriesList (waitFlag, errorFunction));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to untrackACountry :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error deleting a country from MockAPI, Try Again'));
            })

    } //end return

} //end of untrackACountry

export function getListOfTrackedNations (trackedNationList, waitFlag, errorFunction)
{
    console.log("Entering getListOfTrackedNations");

    //specify local RestCountries.eu API path for obtaining a regional blocks data
    //   Docs @: https://restcountries.eu/#api-endpoints-name
    let mockAPIPath = "https://restcountries.eu/rest/v2/alpha?codes=";
    let mockAPIPathForCall = mockAPIPath + trackedNationList.map((arrObject) => {return arrObject.alpha3Code}).join(";");

    console.log(mockAPIPathForCall);

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of notes!
        axios.get(mockAPIPathForCall)
            .then((response) => {
                //Success!! :)
                console.log("getListOfTrackedNations : ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(untrackedCountryData(response.data));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getListOfTrackedNations :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting list of tracked countries from RESTCountries API , Try Again'));
            })

    } //end return

} //end of getListEconomicBlockNations
