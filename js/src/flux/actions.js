import { updateIndex, fetchAll } from './reducers';

export const actions = {
	'UPDATE_IDX': (oldStore, options) => updateIndex(oldStore, options),
	'FETCH_ALL_DATA' : (oldStore, options) => fetchAll(oldStore, options),
}
