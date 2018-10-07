export function createSocket() {
  return {
    type: 'CREATE_SOCKET'
  };
}

export function clearSocket() {
	return {
		type: 'CLEAR_SOCKET'
	}
}