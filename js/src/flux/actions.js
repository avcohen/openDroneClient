import { addFilterLayer, displayAll, fetchAll, filterStrikes, removeFilterLayer, toggleFilterMenuVisibility } from './reducers';

export const actions = {
	'ADD_LAYER' 			: (oldStore, options) => addFilterLayer(oldStore, options),
	'ADD_AND_FILTER_LAYER' 	: (oldStore, options) => addFilterLayer(oldStore, options).then(newState => filterStrikes(newState, options)),
	'DISPLAY_ALL'			: (oldStore) => displayAll(oldStore),
	'DELETE_FILTERED_DATA'	: (oldStore) => deleteFilteredData(oldStore),
	'FETCH_ALL_DATA' 		: (oldStore, options) => fetchAll(oldStore, options),
	'FILTER_STRIKES' 		: (oldStore, options) => filterStrikes(oldStore, options),
	'REMOVE_LAYER' 			: (oldStore, options) => removeFilterLayer(oldStore, options),
	'TOGGLE_FILTER_MENU_VISIBILITY' : (oldStore, options) => toggleFilterMenuVisibility(oldStore, options),
}
