import { combineReducers } from 'redux';

import { threads } from './threads';
import { user } from './user';
import { socket } from './socket';

const reducer = combineReducers({
  threads,
  user,
  socket
})

export default reducer;