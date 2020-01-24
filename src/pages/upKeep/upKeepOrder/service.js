<<<<<<< HEAD
import request from '@/utils/request';

export async function getListForUnprocessed() {
  return request('/upKeep/listForUnprocessed')
}
=======
import request from '@/utils/request';

export async function getListForUnprocessed() {
  return request('/upKeep/unprocessedList');
}

export async function getListForprocessed() {
  return request('/upKeep/processedList');
}

export async function getListForUnfinished() {
  return request('/upKeep/unfinishedList');
}

export async function getListForFinished() {
  return request('/upKeep/finishedList');
}
>>>>>>> 最终提交
