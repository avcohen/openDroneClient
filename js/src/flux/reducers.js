import request from 'superagent';


// improve promisified GET
const reqGET = (url) => new Promise((resolve, reject) => {
    request
        .get(url)
        .end((err,res)=>{
            if (err) {
                reject(err);
            }

            try {
                resolve(JSON.parse(res.text));
            }
            catch (e) {
                reject(e);
            }
        });
});

export function addFilterLayer(oldState, layerParams){
    const updatedLayerArray = oldState.filterLayers.concat([Object.assign({},layerParams)])
    return new Promise((resolve, reject) => {
        resolve({...oldState, filterLayers : updatedLayerArray, displayAll : false })
    })
};


export function displayAll(oldState){
    return new Promise((resolve, reject) => {
            resolve({...oldState, displayAll : !oldState.displayAll })
    })

};

export function filterStrikes(oldState, filterParams) {
        return new Promise((resolve, reject) => {
            // NEEDS ADDITION OF DISTANCE BY KM CALCULATING RADIUS
            const filteredStrikes = oldState.cachedResults.filter((strike) => {
                                        return strike.country.toUpperCase() === filterParams.country.toUpperCase()
                                    });
            resolve({...oldState, filteredResults : filteredStrikes });
        })
        .catch(e => console.log(e));
};

export function updateFilterState(oldState, options) {
    return new Promise((resolve, reject) => {
        // console.log('update fulter state', options)
        const {country, year, filterByRadius, radius, origin} = options;
        const {lat, lng} = options.origin;
        const baseUrl = 'http://localhost:8001/api/country?q='+country;
        reqGET(baseUrl).then(data => {
            resolve(Object.assign({}, oldState, {
                searchOptions : {
                    country,
                    year,
                    filterByRadius,
                    radius,
                    origin: {
                        lat,
                        lng
                    }
                },
                filteredResults: data,
            }))
        })
    })
    .catch(e => console.log(e));
};


export function fetchAll(oldState, options) {
    // console.log('returning all data from api')
    return new Promise((resolve, reject) => {
        request
            .get('http://localhost:8001/api/')
            .end((err,res)=>{
                if (err || !res.ok){
                    reject(err)
                    return;
                }
                const jsonData = JSON.parse(res.text);
                const arrayResults = Object.values(jsonData);
                resolve(Object.assign({}, oldState, {
                    cachedResults : arrayResults
                }))
            })
    })
    .catch(e => console.log(e));
};


/**
 * removeFilterLayer - removes a specfic filter from Layers component
 *
 * @param  {object} oldState old app state (props) before changes
 * @param  {number} index    index of item to be deleted
 * @return {object}          new app state with changes
 */

export function removeFilterLayer(oldState, index){
    const {filterLayers} = oldState;
    const updatedLayerArray = [...filterLayers.slice(0, index), ...filterLayers.slice(index+1)]
    return new Promise((resolve, reject) => {
        resolve({...oldState, filterLayers : updatedLayerArray })
    })
};
