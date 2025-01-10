import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  token: localStorage.getItem('token') || null,  // null ekledim
  tokenExpireTime: localStorage.getItem('tokenExpireTime') || null,  // null ekledim
  auth: localStorage.getItem('auth') === 'true',  // string to boolean dönüşümü
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      if (!!rest.token) {
        const tokenExpireTime = new Date().getTime() + (1000 * 60 * 60);//1second * 60 = 1 minutu => * 60 = 1 hour
        return { ...state, ...rest, tokenExpireTime };
      }
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)

store.subscribe(() => {
  const state = store.getState();

  // Eğer değerler null ise localStorage'dan sil, değilse güncelle
  if (state.token === null) {
    localStorage.removeItem('token');
  } else {
    localStorage.setItem('token', state.token);
  }

  if (state.tokenExpireTime === null) {
    localStorage.removeItem('tokenExpireTime');
  } else {
    localStorage.setItem('tokenExpireTime', state.tokenExpireTime);
  }

  if (state.auth === false) {
    localStorage.removeItem('auth');
  } else {
    localStorage.setItem('auth', state.auth);
  }
});

// Token süresini kontrol et
const checkTokenExpiration = () => {
  const state = store.getState();
  if (state.tokenExpireTime && new Date().getTime() > state.tokenExpireTime) {
    // Tüm değişiklikleri tek bir dispatch ile yap
    store.dispatch({
      type: 'set',
      token: null,
      tokenExpireTime: null,
      auth: false
    });

  }
};

setInterval(checkTokenExpiration, 10000);

export default store