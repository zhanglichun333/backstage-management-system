import { stringify } from 'querystring';
import router from 'umi/router';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log('response', response)
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); 
      // Login successfully
      if (response.status === 'ok') {
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery(); //parse(window.location.href.split('?')[1])
        // let { redirect } = params;
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);

        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);

        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = '/';
        //     return;
        //   }
        // }

        router.replace(redirect || '/');
      }
    },

    // *getCaptcha({ payload }, { call }) {
    //   yield call(getFakeCaptcha, payload);
    // },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note   
      console.log(redirect)  //undefined
      if (window.location.pathname !== '/user/login' && !redirect) {
        // router.replace({
        //   pathname: '/user/login',
        //   search: stringify({
        //     redirect: window.location.href,
        //   }),
        // });
        router.replace('/user/login')
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
