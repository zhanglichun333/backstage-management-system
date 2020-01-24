<<<<<<< HEAD
import mockjs from 'mockjs'
const toolList = {
  "code": 200,
  "message": "操作成功",
  "data|15": [
    {
      "id|+1": 1,
      "key|+1": 1,
      "date": "@date",
      "toolName": "扳手",
      "count|1-100": 5,
      "unit": '个',
      "useTime": '@time',
      "useByName": '@cname',
      "returnTime": '@time',
      "remark": ''
    },
  ]
}
export default {
  'GET /toolManager/toolList': mockjs.mock(toolList)
}
=======
import mockjs from 'mockjs';
const toolList = [
  {
    id: 1,
    name: '木工修边机',
    specification: 'MT370',
    count: 1,
    unit: '台',
    brand: null,
    remark: null,
    createTime: '2019-10-08 16:53:04',
    updateTime: null,
    createBy: null,
    updateBy: null,
  },
  {
    id: 2,
    name: '手电钻',
    specification: 'GBM10RE',
    count: 12,
    unit: '把',
    brand: null,
    remark: null,
    createTime: '2019-10-08 16:53:29',
    updateTime: '2019-10-15 14:43:45',
    createBy: null,
    updateBy: null,
  },
  {
    id: 3,
    name: '扳手',
    specification: 'GBM10RE',
    count: 12,
    unit: '把',
    brand: null,
    remark: null,
    createTime: '2019-10-08 16:53:29',
    updateTime: '2019-10-15 14:43:45',
    createBy: null,
    updateBy: null,
  },
];
export default {
  'GET /toolManager/toolList': mockjs.mock(toolList),
};
>>>>>>> 最终提交
