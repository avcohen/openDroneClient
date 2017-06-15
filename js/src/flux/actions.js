import { fetchAll, filterStrikes, updateFilterState } from './reducers';

export const actions = {
	'FETCH_ALL_DATA' : (oldStore, options) => fetchAll(oldStore, options),
	'FILTER_STRIKES' : (oldStore, options) => filterStrikes(oldStore, options),
	'UPDATE_FILTERS' : (oldStore, options) => updateFilterState(oldStore, options),
}
