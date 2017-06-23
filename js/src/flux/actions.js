import { addFilterLayer, displayAll, fetchAll, filterStrikes, removeFilterLayer, removeAllFilters, toggleFilterMenuVisibility } from './reducers';

export const actions = {
	'ADD_LAYER' 			: (oldStore, options) => addFilterLayer(oldStore, options),
	'ADD_AND_FILTER_LAYER' 	: (oldStore, options) => addFilterLayer(oldStore, options).then(newState => filterStrikes(newState, options)),
	'DISPLAY_ALL'			: (oldStore) => displayAll(oldStore),
	'REMOVE_ALL_FILTERS'	: (oldStore) => removeAllFilters(oldStore),
	'FETCH_ALL_DATA' 		: (oldStore, options) => fetchAll(oldStore, options),
	'FILTER_STRIKES' 		: (oldStore, options) => filterStrikes(oldStore, options),
	'REMOVE_LAYER' 			: (oldStore, options) => removeFilterLayer(oldStore, options),
	'TOGGLE_FILTER_MENU_VISIBILITY' : (oldStore, options) => toggleFilterMenuVisibility(oldStore, options),
}
