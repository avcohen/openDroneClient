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
    console.log(oldState , options);
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
    return new Promise((resolve, reject) => {
        request
            .get('http://localhost:8001/api/')
            .end((err,res)=>{
                if (err || !res.ok){
                    reject(err)
                    return;
                }
                resolve(Object.assign({}, oldState, {
                    searchResults : JSON.parse(res.text)
                }))
            })
    })
    .catch(e => console.log(e));
}
