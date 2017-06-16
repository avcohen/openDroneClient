import request from 'superagent';

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

export function filterStrikes(oldState, filterParams) {
        return new Promise((resolve, reject) => {
            // NEEDS ADDITION OF DISTANCE BY KM CALCULATING RADIUS
            const filteredStrikes = oldState.cachedResults.filter((strike) => {
                                        return strike.country.toUpperCase() === filterParams.country.toUpperCase()
                                    });
            resolve(Object.assign({}, oldState, {
                filteredResults : filteredStrikes
            }));
        })
        .catch(e => console.log(e));
};

//not maiking it to the props...
//
export function updateFilterState(oldState, options) {
    return new Promise((resolve, reject) => {
        console.log('update fulter state', options)
        const {country, year, filterByRadius, radius, origin} = options;
        const {lat, lng} = options.origin;
        const baseUrl = 'http://localhost:8001/api/country?q='+country;
        reqGET(baseUrl).then(data => {
            console.log('1111', data, oldState);
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
