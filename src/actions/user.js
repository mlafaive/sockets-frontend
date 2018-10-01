export function setUser(email, token) {
  return {
    type: 'SET_USER',
    email: email,
    token: token
  };
}

export function clearUser() {
	return {
		type: 'CLEAR_USER'
	}
}