import { addFilterLayer, displayAll, fetchAll, filterStrikes, removeFilterLayer, updateFilterState } from './reducers';

export const actions = {
	'FETCH_ALL_DATA' 	: (oldStore, options) => fetchAll(oldStore, options),
	'FILTER_STRIKES' 	: (oldStore, options) => filterStrikes(oldStore, options),
	'UPDATE_FILTERS' 	: (oldStore, options) => updateFilterState(oldStore, options),
	'ADD_LAYER' 		: (oldStore, options) => addFilterLayer(oldStore, options),
	'REMOVE_LAYER' 		: (oldStore, options) => removeFilterLayer(oldStore, options),
	'DISPLAY_ALL'		: (oldStore) => displayAll(oldStore),
}
