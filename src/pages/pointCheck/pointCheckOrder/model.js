<<<<<<< HEAD
import { getListForUnprocessed } from './service'

const Model = {
  namespace: 'pointCheck',
  state: {
    ponitChecklist:[]
  },
  effects: {
    *fetch(_, { call, put }) {
      const res = yield call(getListForUnprocessed)  //异步请求
      yield put({
        type: 'save',
        payload: {
          ponitChecklist: res.data
        }
      })
    }
  },
  reducers: {
    save(state, {payload}) {
      return { ...state, ...payload }
    }
  },
};
export default Model;

// dispatch=>effects(异步请求)=>actions=>reducers=>state
=======
import { getListForUnprocessed } from './service';
import { getListForprocessed } from './service';
import { getListForUnfinished } from './service';
import { getListForFinished } from './service';

const Model = {
  namespace: 'pointCheck',
  state: {
    unprocessedList: [],
    processedList: [],
    unfinishedList: [],
    finishedList: [],
  },
  effects: {
    *fetchUnprocessedList(_, { call, put }) {
      const res = yield call(getListForUnprocessed);
      yield put({
        type: 'save',
        payload: {
          unprocessedList: res.map(t => ({ ...t, key: t.id })),
        },
      });
    },
    *fetchProcessedList(_, { call, put }) {
      const res = yield call(getListForprocessed);
      yield put({
        type: 'save',
        payload: {
          processedList: res.map(t => ({ ...t, key: t.id })),
        },
      });
    },
    *fetchUnfinishedList(_, { call, put }) {
      const res = yield call(getListForUnfinished);
      yield put({
        type: 'save',
        payload: {
          unfinishedList: res.map(t => ({ ...t, key: t.id })),
        },
      });
    },
    *fetchFinishedList(_, { call, put }) {
      const res = yield call(getListForFinished);
      yield put({
        type: 'save',
        payload: {
          finishedList: res.map(t => ({ ...t, key: t.id })),
        },
      });
    },
  },
  reducers: {
    save(state, { payload, callback }) {
      if (callback) callback();
      return { ...state, ...payload };
    },
  },
};
export default Model;
>>>>>>> 最终提交
