<<<<<<< HEAD
import React, { Component } from 'react'
import { Card } from 'antd'
import FilterForm from '../../../components/FilterForm'

export default class PointCheckPlan extends Component {
  // FilterForm的查询功能
  filterSearch = (values) => {
    console.log(values)
  }
  render() {
    return (
      <Card>
        <FilterForm filterType={2} filterSearch={this.filterSearch}/>
      </Card>
    )
  }
}
=======
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import FilterForm from '../../../components/FilterForm';

export default class PointCheckPlan extends Component {
  // FilterForm的查询功能
  filterSearch = values => {
    console.log(values);
  };
  render() {
    return (
      <PageHeaderWrapper>
        <Card>
          <FilterForm filterType={2} filterSearch={this.filterSearch} />
        </Card>
        <Card>
          <Grouped />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

class Grouped extends React.Component {
  render() {
    const arr = [
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '冷冻主机',
        day: {
          notFinishDayOrderCnt: 12,
          allDayOrderCnt: 21,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '冷冻水泵',
        day: {
          notFinishDayOrderCnt: 9,
          allDayOrderCnt: 18,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '冷却水塔（系统一）',
        day: {
          notFinishDayOrderCnt: 5,
          allDayOrderCnt: 6,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '冷却水塔（系统二）',
        day: {
          notFinishDayOrderCnt: 5,
          allDayOrderCnt: 12,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '冷凝水泵',
        day: {
          notFinishDayOrderCnt: 18,
          allDayOrderCnt: 30,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: 'AHU风柜',
        day: {
          notFinishDayOrderCnt: 23,
          allDayOrderCnt: 92,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '排风扇',
        day: {
          notFinishDayOrderCnt: 0,
          allDayOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '冷气盘管风机',
        day: {
          notFinishDayOrderCnt: 0,
          allDayOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: 'VRV多联机组',
        day: {
          notFinishDayOrderCnt: 0,
          allDayOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '分体机',
        day: {
          notFinishDayOrderCnt: 0,
          allDayOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '加药泵',
        day: {
          notFinishDayOrderCnt: 0,
          allDayOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '公众区域温度（数据）',
        day: {
          notFinishDayOrderCnt: 30,
          allDayOrderCnt: 50,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '冷冻主机运行数据',
        day: {
          notFinishDayOrderCnt: 0,
          allDayOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: 'IAF(JF)排风机',
        day: {
          notFinishDayOrderCnt: 0,
          allDayOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        deviceTypeName: '空调管道状况及设备清洁',
        day: {
          notFinishDayOrderCnt: 0,
          allDayOrderCnt: 0,
        },
      },
    ];
    const data = arr.map(item => ({
      label: item.deviceTypeName,
      allDayOrderCnt: item.day.allDayOrderCnt,
      notFinishDayOrderCnt: item.day.notFinishDayOrderCnt,
    }));
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'rename',
      map: {
        allDayOrderCnt: '所有工單數',
        notFinishDayOrderCnt: '未完成工單數',
      },
    });

    dv.transform({
      type: 'fold',
      fields: ['所有工單數', '未完成工單數'],
      key: 'type',
      value: 'value',
    });
    return (
      <div>
        <Chart height={720} padding={['auto', 'auto', 'auto', 180]} data={dv} forceFit>
          <Legend />
          <Coord transpose scale={[1, -1]} />
          <Axis
            name="label"
            label={{
              offset: 20,
              textStyle: {
                textAlign: 'end', // 文本对齐方向，可取值为： start center end
                fill: '#404040', // 文本的颜色
                fontSize: '12', // 文本大小
                fontWeight: 700, // 文本粗细
                textBaseline: 'middle', // 文本基准线，可取 top middle bottom，默认为middle
              },
            }}
          />
          <Axis name="value" position={'right'} />
          <Tooltip />
          <Geom
            type="interval"
            position="label*value"
            color={['type', ['#49C1F7', '#FFCDCA']]}
            adjust={[
              {
                type: 'dodge',
                marginRatio: 1 / 32,
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}
>>>>>>> 最终提交
