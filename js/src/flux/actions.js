import { updateIndex } from './reducers';

export const actions = {
	'UPDATE_IDX': (oldStore, options) => updateIndex(oldStore, options),
}
