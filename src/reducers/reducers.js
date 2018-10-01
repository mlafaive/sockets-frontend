import { combineReducers } from 'redux';

import { threads } from './threads';
import { user } from './user';

const reducer = combineReducers({
  threads,
  user
})

export default reducer;