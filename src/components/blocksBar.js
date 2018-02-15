//package imports
import React from 'react';

//CSS imports
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//app imports
import { ShowActiveSideBarListLink } from './activeLinks';

//Block Details API Call to: https://restcountries.eu/rest/v2/regionalbloc/
const listOfBlocs = ["EU", //European Union
                    "EFTA", //European Free Trade Association
                    "CARICOM", //Caribbean Community
                    "PA", //Pacific Alliance
                    "AU", //African Union
                    "USAN", //Union of South American Nations
                    "EEU", //Eurasian Economic Union
                    "AL", //Arab League
                    "ASEAN", //Association of Southeast Asian Nations
                    "CAIS", //Central American Integration System
                    "CEFTA", //Central European Free Trade Agreement
                    "NAFTA", //North American Free Trade Agreement
                    "SAARC" //South Asian Association for Regional Cooperation
                    ];

function mapListOfBlocksNavBar(blocObject, arrayIndex) {
    return (
        <li className="filter-nav-entry" key={"blockNavigation" + arrayIndex}><button key={"blockNavigation" + arrayIndex}>{blocObject}</button></li>
    );
}

function mapListOfBlocksNavBarWithLINK(blocObject, arrayIndex) {
    return (
        <ShowActiveSideBarListLink label={blocObject.toString()} to={"/" + blocObject.toString()} activeOnlyWhenExact={true} arrayIndex={arrayIndex} key={"economicBlocsListItem" + arrayIndex}/>
    );
}

export function DisplayListOfBlocks()
{
    return (
        <div>
            <h6>Regional Blocks</h6>
            { listOfBlocs.map(mapListOfBlocksNavBarWithLINK) }
        </div>
    )
}