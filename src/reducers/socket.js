export function socket(state = null, action) {
  switch (action.type) {
  	case 'CREATE_SOCKET':
      return window.socketCluster.connect({
        hostname: 'localhost',
        secure: false,
        port: 8000
      });
      // return window.socketCluster.connect({
      //   hostname: 'sockets-app.herokuapp.com',
      //   secure: true,
      //   port: 443
      // });
    case 'CLEAR_SOCKET':
      state.destroy();
      return null;
    default:
      return state;
  }
}