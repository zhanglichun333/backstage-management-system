<<<<<<< HEAD
import { getToolList } from './service'

const Model = {
  namespace: 'toolManager',
  state: {
    toolList: []
  },
  effects: {
    *fetch(_, { call, put }) {
      const res = yield call(getToolList)
      yield put({
        type: 'save',
        payload: {
          toolList: res.data
        }
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
};
export default Model
=======
import { getToolList } from './service';

const Model = {
  namespace: 'toolManager',
  state: {
    toolList: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const res = yield call(getToolList);
      yield put({
        type: 'save',
        payload: {
          toolList: res.map(t => ({ ...t, key: t.id })),
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
>>>>>>> 最终提交
