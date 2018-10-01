function copy_state(state) {
	var new_state = {};
	for (var threadId in state) {
		new_state[threadId] = {
			title: state[threadId].title,
			messages: state[threadId].messages && Array.from(state[threadId].messages),
      currentMessage: state[threadId].currentMessage,
      settings: state[threadId].settings
		}
	}
	return new_state;
}

export function threads(state = null, action) {
	var new_state = copy_state(state);
  switch (action.type) {
  	case 'SET_THREADS':
  		for (var i = 0; i < action.threads.length; i++) {
  			var t = action.threads[i];
  			new_state[t._id] = new_state[t.id] || {};
  			new_state[t._id].title = t.title;
  		}
      return new_state;
    case 'ADD_THREAD':
    	new_state[action.id] = new_state[action.id] || {};
			new_state[action.id].title = action.title;
      return new_state;
    case 'REMOVE_THREAD':
      delete new_state[action.id];
      return new_state;
    case 'SET_MESSAGES':
    	new_state[action.threadId].messages = action.messages;
      return new_state;
    case 'ADD_MESSAGE':
    	new_state[action.threadId].messages.push(action.message);
      return new_state;
    case 'SET_CURRENT':
      new_state[action.threadId].currentMessage = action.message;
      return new_state;
    case 'TOGGLE_SETTINGS':
      new_state[action.threadId].settings = !new_state[action.threadId].settings;
      return new_state;
    case 'CLEAR_THREADS':
      return null;
    default:
      return state;
  }
}