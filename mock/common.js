<<<<<<< HEAD
const systemList = [
  { value: 1, text: '空調及機械通風系統' },
  { value: 2, text: '電力系統' },
  { value: 3, text: '照明系統' },
  { value: 4, text: '通訊系統' },
  { value: 5, text: '消防系统' },
  { value: 6, text: '保安系統' },
  { value: 7, text: '繫泊及登船系統' },
  { value: 8, text: '供水及排水系統' },
  { value: 9, text: '升降機類設備' },
  { value: 10, text: '行李處理系統' },
  { value: 11, text: '石油氣系統' },
  { value: 12, text: '其他基礎設施' }
]
const deviceList = [
  { value: 1, text: '冷凍主機' },
  { value: 2, text: '冷凍水泵' },
  { value: 3, text: '冷卻水塔' },
  { value: 4, text: '冷凝水泵' },
  { value: 5, text: 'AHU風櫃' },
  { value: 6, text: '排風扇' },
  { value: 7, text: '冷氣盤管風機' },
  { value: 8, text: 'DX多聯機組"' },
  { value: 9, text: '分體機' },
  { value: 10, text: '加藥泵' }
]
const areaList = [
  { value: 1, text: '1區' },
  { value: 2, text: '2區' },
  { value: 3, text: '3區' },
  { value: 4, text: '4區' },
  { value: 18, text: '5-1區' },
  { value: 19, text: '5-2區' },
  { value: 20, text: '6-1區' },
  { value: 21, text: '6-2區' },
  { value: 7, text: '7區' },
  { value: 8, text: '8區' },
  { value: 9, text: '9區' },
  { value: 10, text: '10區' },
  { value: 11, text: '11區' },
  { value: 12, text: '12區' },
  { value: 13, text: '13區' },
  { value: 22, text: '14-1區' },
  { value: 23, text: '14-2區' },
  { value: 15, text: '15區' },
  { value: 16, text: '16區' },
  { value: 17, text: '17區' },
]
const gengList = [{ value: 1, text: 'A' }, { value: 2, text: 'B' }, { value: 3, text: 'C' }]
const formList = {
  systemList,
  deviceList,
  areaList,
  gengList
}
export default {
  'GET /api/formList': formList,
=======
const systemList = [
  { value: 1, text: '空調及機械通風系統' },
  { value: 2, text: '電力系統' },
  { value: 3, text: '照明系統' },
  { value: 4, text: '通訊系統' },
  { value: 5, text: '消防系统' },
  { value: 6, text: '保安系統' },
  { value: 7, text: '繫泊及登船系統' },
  { value: 8, text: '供水及排水系統' },
  { value: 9, text: '升降機類設備' },
  { value: 10, text: '行李處理系統' },
  { value: 11, text: '石油氣系統' },
  { value: 12, text: '其他基礎設施' }
]
const deviceList = [
  { value: 1, text: '冷凍主機' },
  { value: 2, text: '冷凍水泵' },
  { value: 3, text: '冷卻水塔' },
  { value: 4, text: '冷凝水泵' },
  { value: 5, text: 'AHU風櫃' },
  { value: 6, text: '排風扇' },
  { value: 7, text: '冷氣盤管風機' },
  { value: 8, text: 'DX多聯機組"' },
  { value: 9, text: '分體機' },
  { value: 10, text: '加藥泵' }
]
const areaList = [
  { value: 1, text: '1區' },
  { value: 2, text: '2區' },
  { value: 3, text: '3區' },
  { value: 4, text: '4區' },
  { value: 18, text: '5-1區' },
  { value: 19, text: '5-2區' },
  { value: 20, text: '6-1區' },
  { value: 21, text: '6-2區' },
  { value: 7, text: '7區' },
  { value: 8, text: '8區' },
  { value: 9, text: '9區' },
  { value: 10, text: '10區' },
  { value: 11, text: '11區' },
  { value: 12, text: '12區' },
  { value: 13, text: '13區' },
  { value: 22, text: '14-1區' },
  { value: 23, text: '14-2區' },
  { value: 15, text: '15區' },
  { value: 16, text: '16區' },
  { value: 17, text: '17區' },
]
const gengList = [{ value: 1, text: 'A' }, { value: 2, text: 'B' }, { value: 3, text: 'C' }]
const formList = {
  systemList,
  deviceList,
  areaList,
  gengList
}
export default {
  'GET /api/formList': formList,
>>>>>>> 最终提交
}