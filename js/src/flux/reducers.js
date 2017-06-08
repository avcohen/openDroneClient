import request from 'superagent';

export function updateIndex(oldState, options) {
    const {index} = oldState;
    return Promise.resolve().then(_ => {
        return Object.assign({}, oldState, {
            index: index + 1,
        });
    });
}

export function fetchAll(oldState, options) {
    return Promise.resolve().then(_ => {
        console.log(options)
        request
            .get('http://localhost:8001/api/')
            .end((err,res)=>{
                if (err || !res.ok){
                    console.error(err)
                    return;
                }
                return Object.assign({}, oldState, {
                    searchResults : JSON.parse(res.text)
                })
            })
    })
    .catch(e => console.log(e));
}
