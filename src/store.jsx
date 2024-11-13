import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  token: localStorage.getItem('token') || null,
  auth: localStorage.getItem('auth') === 'true',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      console.log("enes");
      return { ...state, ...rest }
    default:
      console.log("korhan");
      return state
  }
}

const store = createStore(changeState)

// Store'un güncellenmesi durumunda localStorage'a da yansıtalım
store.subscribe(() => {
  localStorage.setItem('token', store.getState().token);
  localStorage.setItem('auth', store.getState().auth);
});

export default store
