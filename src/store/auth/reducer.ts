// authReducer.js (example of another reducer)
const initialAuthState = { user: null, token: null };

//@ts-ignore
export function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case 'auth/LOGIN':
      return { ...state, user: action.payload.user, token: action.payload.token };
    case 'auth/LOGOUT':
      return { ...state, user: null, token: null };
    default:
      return state;
  }
}