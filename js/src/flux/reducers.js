export function updateIndex(oldStore, options) {
    const {index} = oldStore;
    return Promise.resolve().then(_ => {
        return Object.assign({}, oldStore, {
            index: index + 1,
        });
    });
}
