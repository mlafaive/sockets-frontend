export function user(state = {email: 'user@email.com'}, action) {
  switch (action.type) {
  	case 'SET_USER':
      return {
        email: action.email,
        token: action.token
      };
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
}