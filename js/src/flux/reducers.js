import request from 'superagent';

export function updateIndex(oldStore, options) {
    const {index} = oldStore;
    return Promise.resolve().then(_ => {
        return Object.assign({}, oldStore, {
            index: index + 1,
        });
    });
}

export function fetchAll(oldStore, options) {
    return Promise.resolve().then(_ => {
        request
            .get('http://localhost:8001/api/')
            .end((err,res)=>{
                if (err || !res.ok){
                    console.error(err)
                } else {
                    let results = JSON.parse(res.text)
                    return Object.assign({}, oldStore, {
                        searchResults : results
                    })
                }
            })
    })
    .catch(e => console.error(e));
}
