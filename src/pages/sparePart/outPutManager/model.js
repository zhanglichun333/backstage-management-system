import { getOutPutList } from './service';

const Model = {
  namespace: 'outPutManager',
  state: {
    outPutList: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const res = yield call(getOutPutList);
      yield put({
        type: 'save',
        payload: {
          outPutList: res.data,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
