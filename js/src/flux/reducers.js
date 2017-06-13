import request from 'superagent';

export function updateIndex(oldState, options) {
    const {index} = oldState;
    return Promise.resolve().then(_ => {
        return Object.assign({}, oldState, {
            index: index + 1,
        });
    });
}

export function updateFilterState(oldState, options) {
    const { country, administration, radius, filterByRadius} = oldState
    return Promise.resolve().then( _ => {
        return Object.assign({}, oldState, {
            country : options.country,
            administration : options.administration,
            radius : options.radius,
            filterByRadius : options.filterByRadius,
        })
    })
}

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
                    // cachedResults : JSON.parse(res.text)
                    cachedResults : arrayResults
                }))
            })
    })
    .catch(e => console.log(e));
}
