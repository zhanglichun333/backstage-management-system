<<<<<<< HEAD
import { queryDeviceBasicList } from './service'
import { queryDeviceCheckList } from './service'
import { queryDeviceKeepList } from './service'
import { queryDeviceContextList } from './service'
import { queryToolContextList } from './service'

const Model = {
  namespace: 'standingAndbasic',
  state: {
    deviceBasicList: [],
    deviceCheckList: [],
    deviceKeepList: [],
    deviceContextList: [],
    toolContextList: []
  },
  effects: {
    *fetchDeviceBasic(_, { call, put }) {
      console.log(1)
      const res = yield call(queryDeviceBasicList)
      yield put({
        type: 'save',
        payload: {
          deviceBasicList: res.map(t => ({...t, key: t.id })),
        },
      })
    },
    *fetchDeviceCheck(_, { call, put }) {
      const res = yield call(queryDeviceCheckList)
      yield put({
        type: 'save',
        payload: {
          deviceCheckList: res.map(t => ({...t, key: t.id })),
        },
      })
    },
    *fetchDeviceKeep(_, { call, put }) {
      const res = yield call(queryDeviceKeepList)
      yield put({
        type: 'save',
        payload: {
          deviceKeepList: res.map(t => ({ ...t, key: t.id })),
        },
      })
    },
    *fetchDeviceContex(_, { call, put }) {
      const res = yield call(queryDeviceContextList)
      yield put({
        type: 'save',
        payload: {
          deviceContextList: res.map(t => ({...t, key: t.id })),
        },
      })
    },
    *fetchToolContext(_, { call, put }) {
      const res = yield call(queryToolContextList)
      yield put({
        type: 'save',
        payload: {
          toolContextList: res.map(t => ({...t, key: t.id }))
        },
      })
    }
  },
  reducers: {
    save(state, { payload, callback }) {
      if (callback) callback()
      return { ...state, ...payload }
    },
  },
};
=======
import { queryDeviceBasicList } from './service'
import { queryDeviceCheckList } from './service'
import { queryDeviceKeepList } from './service'
import { queryDeviceContextList } from './service'
import { queryToolContextList } from './service'

const Model = {
  namespace: 'standingAndbasic',
  state: {
    deviceBasicList: [],
    deviceCheckList: [],
    deviceKeepList: [],
    deviceContextList: [],
    toolContextList: []
  },
  effects: {
    *fetchDeviceBasic(_, { call, put }) {
      console.log(1)
      const res = yield call(queryDeviceBasicList)
      yield put({
        type: 'save',
        payload: {
          deviceBasicList: res.map(t => ({...t, key: t.id })),
        },
      })
    },
    *fetchDeviceCheck(_, { call, put }) {
      const res = yield call(queryDeviceCheckList)
      yield put({
        type: 'save',
        payload: {
          deviceCheckList: res.map(t => ({...t, key: t.id })),
        },
      })
    },
    *fetchDeviceKeep(_, { call, put }) {
      const res = yield call(queryDeviceKeepList)
      yield put({
        type: 'save',
        payload: {
          deviceKeepList: res.map(t => ({ ...t, key: t.id })),
        },
      })
    },
    *fetchDeviceContex(_, { call, put }) {
      const res = yield call(queryDeviceContextList)
      yield put({
        type: 'save',
        payload: {
          deviceContextList: res.map(t => ({...t, key: t.id })),
        },
      })
    },
    *fetchToolContext(_, { call, put }) {
      const res = yield call(queryToolContextList)
      yield put({
        type: 'save',
        payload: {
          toolContextList: res.map(t => ({...t, key: t.id }))
        },
      })
    }
  },
  reducers: {
    save(state, { payload, callback }) {
      if (callback) callback()
      return { ...state, ...payload }
    },
  },
};
>>>>>>> 最终提交
export default Model;