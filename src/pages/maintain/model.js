<<<<<<< HEAD
import { queryMaintainList, queryUnProcessedList } from './service'

const Model = {
  namespace: 'maintainAndmanager',
  state: {
    maintainList: [],
    unProcessedList: []
  },
  effects: {
    *fetchMaintainList(_, { call, put }) {
      const res = yield call(queryMaintainList)
      yield put({
        type: 'save',
        payload: {
          maintainList: res
        }
      })
    },
    *fetchUnProcessedList(_, { call, put }) {
      const res = yield call(queryUnProcessedList)
      yield put({
        type: 'save',
        payload: {
          unProcessedList: res
        }
      })
    }
  },
  reducers: {
    save(state, { payload, callback}) {
      callback && callback()
      return { ...state, ...payload }
    }
  },
};
export default Model;

=======
import { queryMaintainList, queryUnProcessedList } from './service'

const Model = {
  namespace: 'maintainAndmanager',
  state: {
    maintainList: [],
    unProcessedList: []
  },
  effects: {
    *fetchMaintainList(_, { call, put }) {
      const res = yield call(queryMaintainList)
      yield put({
        type: 'save',
        payload: {
          maintainList: res
        }
      })
    },
    *fetchUnProcessedList(_, { call, put }) {
      const res = yield call(queryUnProcessedList)
      yield put({
        type: 'save',
        payload: {
          unProcessedList: res
        }
      })
    }
  },
  reducers: {
    save(state, { payload, callback}) {
      callback && callback()
      return { ...state, ...payload }
    }
  },
};
export default Model;

>>>>>>> 最终提交
// dispatch=>effects(异步请求)=>actions=>reducers=>state