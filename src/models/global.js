import { queryNotices } from '@/services/user';
import { queryFormList } from '@/services/common';
const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    systemList: [],
    deviceList: [],
    areaList: [],
    gengList: [],
    dailyList: [],
  },
  effects: {
    *fetchFormList(_, { call, put }) {
      const res = yield call(queryFormList)  //异步请求
      yield put({
        type: 'saveFormList',
        payload: res
      })
    },

    *fetchNotices(_, { call, put, select }) {   //action  payload 形参
      const data = yield call(queryNotices);
      yield put({                               //触发modelaction
        type: 'saveNotices',  
        payload: data,
      })
      const unreadCount = yield select(         //从state获取数据
        state => state.global.notices.filter(item => !item.read).length,
      )
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    
    *clearNotices({ payload }, { put, select }) {
      // payload  notification message event
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },

    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },
  reducers: {
    saveFormList(state, { payload }) {
      return { ...state, ...payload }
    },

    saveDailyList(state, {payload}) {
      console.log('payload',payload)
      return { ...state, ...payload }
    },

    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },

    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default GlobalModel;
