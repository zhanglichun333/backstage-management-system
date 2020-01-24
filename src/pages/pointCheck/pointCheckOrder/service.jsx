<<<<<<< HEAD
import request from '@/utils/request';

export async function getListForUnprocessed() {
  return request('/CheckOrder/listForUnprocessed')
}
=======
import request from '@/utils/request';

export async function getListForUnprocessed() {
  return request('/CheckOrder/unprocessedList');
}

export async function getListForprocessed() {
  return request('/CheckOrder/processedList');
}

export async function getListForUnfinished() {
  return request('/CheckOrder/unfinishedList');
}

export async function getListForFinished() {
  return request('/CheckOrder/finishedList');
}
>>>>>>> 最终提交
