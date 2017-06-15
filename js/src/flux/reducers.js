import request from 'superagent';


export function filterStrikes(oldState, filterParams) {
    console.log('ok')
        return new Promise((resolve, reject) => {

            // NEEDS ADDIIOTN OF DISTANCE BY KM CALCULATING RADIUS
            const filteredStrikes = oldState.cachedResults.filter((strike) => {
                                        return strike.country.toUpperCase() === filterParams.country.toUpperCase()
                                    });
            console.log(filteredStrikes)
            resolve(Object.assign({}, oldState, {
                filteredResults : filteredStrikes
            }));
        })
        .catch(e => console.log(e));
};

export function updateFilterState(oldState, options) {
    return Promise.resolve().then( _ => {
        return Object.assign({}, oldState, {
            searchOptions : options
        })
    })
};

export function fetchAll(oldState, options) {
    console.log('returning all data from api')
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
