import { queryCurrent, query as queryUsers, querystaff } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    staffList: []
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetchStaff(_, { call, put }) {
      const response = yield call(querystaff);
      yield put({
        type: 'saveStaff',
        payload: {
          staffList: response.data
        },
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },

    saveStaff(state, { payload }) {
      return { ...state, ...payload}
    }
  },
};
export default UserModel;
