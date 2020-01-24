import moment from 'moment';
// mock data
const visitData = [];
const beginDay = new Date().getTime();
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];

for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];

for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [
  { x: '空调及机械通风系统', y: Math.random().toFixed(2) * 100 },
  { x: '电力系统', y: Math.random().toFixed(2) * 100 },
  { x: '照明系统', y: Math.random().toFixed(2) * 100 },
  { x: '通讯系统', y: Math.random().toFixed(2) * 100 },
  { x: '消防系统', y: Math.random().toFixed(2) * 100 },
  { x: '保安系统', y: Math.random().toFixed(2) * 100 },
  { x: '繫泊及登船系统', y: Math.random().toFixed(2) * 100 },
  { x: '供水及排水系统', y: Math.random().toFixed(2) * 100 },
  { x: '升降机类设备', y: Math.random().toFixed(2) * 100 },
  { x: '行李处理系统', y: Math.random().toFixed(2) * 100 },
  { x: '石油气系统', y: Math.random().toFixed(2) * 100 },
  { x: '其他基础设施', y: Math.random().toFixed(2) * 100 },
];

const searchData = [];

for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}

const systemTypeData = [
  {
    value: 1,
    text: '空调及机械通风系统',
    arrData: [
      { x: '电路故障', y: 2544 },
      { x: '电脑版损坏', y: 1321 },
      { x: '雪种流失', y: 913 },
      { x: '电路进水', y: 841 },
      { x: '零件老化', y: 631 },
      { x: '其他', y: 331 },
    ],
  },
  {
    value: 2,
    text: '电力系统',
    arrData: [
      { x: '电线损坏', y: 244 },
      { x: '跳闸', y: 321 },
      { x: '线路进水', y: 311 },
      { x: '维修断电', y: 41 },
      { x: '插座损坏', y: 121 },
      { x: '其他', y: 111 },
    ],
  },
  {
    value: 3,
    text: '照明系统',
    arrData: [
      { x: '电路故障', y: 99 },
      { x: '灯泡故障', y: 188 },
      { x: '灯泡老化', y: 344 },
      { x: '供电不稳', y: 255 },
      { x: '其他', y: 65 },
    ],
  },
  {
    value: 4,
    text: '通讯系统',
    arrData: [
      { x: '电路故障', y: 99 },
      { x: '灯泡故障', y: 188 },
      { x: '灯泡老化', y: 344 },
      { x: '供电不稳', y: 255 },
      { x: '其他', y: 65 },
    ],
  },
  {
    value: 5,
    text: '消防系统',
    arrData: [
      { x: '电路故障', y: 99 },
      { x: '灯泡故障', y: 188 },
      { x: '灯泡老化', y: 344 },
      { x: '供电不稳', y: 255 },
      { x: '其他', y: 65 },
    ],
  },
  {
    value: 6,
    text: '保安系统',
    arrData: [
      { x: '电路故障', y: 99 },
      { x: '灯泡故障', y: 188 },
      { x: '灯泡老化', y: 344 },
      { x: '供电不稳', y: 255 },
      { x: '其他', y: 65 },
    ],
  },
  {
    value: 7,
    text: '繫泊及登船系统',
    arrData: [
      { x: '电路故障', y: 99 },
      { x: '灯泡故障', y: 188 },
      { x: '灯泡老化', y: 344 },
      { x: '供电不稳', y: 255 },
      { x: '其他', y: 65 },
    ],
  },
  {
    value: 8,
    text: '供水及排水系统',
    arrData: [
      { x: '电路故障', y: 99 },
      { x: '灯泡故障', y: 188 },
      { x: '灯泡老化', y: 344 },
      { x: '供电不稳', y: 255 },
      { x: '其他', y: 65 },
    ],
  },
  {
    value: 9,
    text: '升降机类设备',
    arrData: [
      { x: '电路故障', y: 99 },
      { x: '灯泡故障', y: 188 },
      { x: '灯泡老化', y: 344 },
      { x: '供电不稳', y: 255 },
      { x: '其他', y: 65 },
    ],
  },
  {
    value: 10,
    text: '行李处理系统',
    arrData: [
      { x: '电路故障', y: 99 },
      { x: '灯泡故障', y: 188 },
      { x: '灯泡老化', y: 344 },
      { x: '供电不稳', y: 255 },
      { x: '其他', y: 65 },
    ],
  },
  {
    value: 11,
    text: '石油气系统',
    arrData: [
      { x: '电路故障', y: 99 },
      { x: '灯泡故障', y: 188 },
      { x: '灯泡老化', y: 344 },
      { x: '供电不稳', y: 255 },
      { x: '其他', y: 65 },
    ],
  },
  {
    value: 12,
    text: '其他基础设施',
    arrData: [
      { x: '电路故障', y: 99 },
      { x: '灯泡故障', y: 188 },
      { x: '灯泡老化', y: 344 },
      { x: '供电不稳', y: 255 },
      { x: '其他', y: 65 },
    ],
  },
];

const offlineData = [];

for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}

const offlineChartData = [];

for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];
const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});
const getFakeChartData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  systemTypeData,
  radarData,
};
export default {
  'GET  /api/fake_chart_data': getFakeChartData,
};
