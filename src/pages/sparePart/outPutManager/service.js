import request from '@/utils/request';

export async function getOutPutList() {
  return request('/toolManager/outPutList');
}
