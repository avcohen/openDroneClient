import request from 'superagent';

// pass in length of filtered data, append num to layer
export function addFilterLayer(oldState, layerParams){
    const updatedLayerArray = oldState.filterLayers.concat([Object.assign({},layerParams)])
    return new Promise((resolve, reject) => {
        resolve({...oldState,
                    filterLayers : updatedLayerArray,
                    displayAll : false,
                })
    })
};

export function displayAll(oldState){
    return new Promise((resolve, reject) => {
        resolve({...oldState, displayAll : !oldState.displayAll })
    })
};

export function removeAllFilters(oldState){
    return new Promise((resolve, reject) => {
        resolve({...oldState,
                    filterLayers : [],
                    filteredResults : [],
                    displayAll : true,
                })
    })
};

const values = require('object.values')
export function fetchAll(oldState, options) {
    // console.log('returning all data from api')
    return new Promise((resolve, reject) => {
        request
            .get('http://api.dronemappr.com/api/v1/')
            .end((err,res)=>{
                if (err || !res.ok){
                    reject(err)
                    return;
                }
                const jsonData = JSON.parse(res.text);
                const arrayResults = values(jsonData);
                resolve(Object.assign({}, oldState, {
                    cachedResults : arrayResults
                }))
            })
    })
    .catch(e => console.log(e));
};

export function filterStrikes(oldState, filterParams) {
        return new Promise((resolve, reject) => {
            const filteredStrikes = oldState.cachedResults.filter((strike) => {
                                        return  strike.country.toUpperCase() === filterParams.country.toUpperCase()
                                    });
            resolve({...oldState, filteredResults : filteredStrikes });
        })
        .catch(e => console.log(e));
};

/**
 * removeFilterLayer - removes a specfic filter by index from Layers component
 *
 * @param  {object} oldState old app state (props) before changes
 * @param  {number} index    index of item to be deleted
 * @return {object}          new app state with changes
 */

export function removeFilterLayer(oldState, index){
    const { filterLayers, filteredResults } = oldState;
    const updatedLayerArray = [...filterLayers.slice(0, index), ...filterLayers.slice(index+1)]
    const fitlerCritera = filterLayers[index];

    const updatedFilteredResults = filteredResults.filter((curr) => {
        return curr.country === fitlerCritera.country
                && curr.year === fitlerCritera.year
    });

    const noFiltersToDisplay = updatedLayerArray.length === 0 ? true : false;

    return new Promise((resolve, reject) => {
        resolve({...oldState,
                    filterLayers : updatedLayerArray,
                    filteredResults : updatedFilteredResults,
                    displayAll : noFiltersToDisplay,
                });
    })
    .catch(e => console.log(e));
};

export function toggleFilterMenuVisibility(oldState, options){
    return new Promise((resolve, reject) => {
        console.log(options)
        resolve({...oldState, filterMenuVisible : options });
    })
    .catch(e => console.log(e));
};


// possibly uneeded ???
// export function updateFilterState(oldState, options) {
//     return new Promise((resolve, reject) => {
//         const {country, year, filterByRadius, radius, origin} = options;
//         const {lat, lng} = options.origin;
//         const baseUrl = 'http://localhost:8443/api/v1/country/'+country;
//         reqGET(baseUrl).then(data => {
//             resolve(Object.assign({}, oldState, {
//                 searchOptions : {
//                     country,
//                     year,
//                     filterByRadius,
//                     radius,
//                     origin: {
//                         lat,
//                         lng
//                     }
//                 },
//                 filteredResults: data,
//             }))
//         })
//     })
//     .catch(e => console.log(e));
// };
