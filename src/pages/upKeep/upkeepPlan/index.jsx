<<<<<<< HEAD
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Table } from 'antd'
import FilterForm from '../../../components/FilterForm'
const { Column, ColumnGroup } = Table

export default class UpKeepPlan extends Component {
  // FilterForm的查询功能
  filterSearch = (values) => {
    console.log(values)
  }
  render() {
    const columns = [
      { title: '设备类型', dataIndex: 'deviceTypeName' },
      { title: '季检', children: [{ title: '总工单', dataIndex: 'monthlyTest' }, { title: '未完成', dataIndex: 'Unfinish' }] },
      { title: '半年检', children: [{ title: '总工单', dataIndex: 'deviceTypeName' }, { title: '未完成', dataIndex: 'deviceTypeName' }] },
      { title: '年检', children: [{ title: '总工单', dataIndex: 'deviceTypeName' }, { title: '未完成', dataIndex: 'deviceTypeName' }] }
    ]
    return (
      <PageHeaderWrapper>
        <Card>
          <FilterForm filterType={2} filterSearch={this.filterSearch} />
        </Card>
      </PageHeaderWrapper>
    )
  }
}
=======
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Tag } from 'antd';
import FilterForm from '../../../components/FilterForm';

export default class UpKeepPlan extends Component {
  state = {
    page: 1,
    pageSize: 7,
  };

  // FilterForm的查询功能
  filterSearch = values => {
    console.log(values);
  };

  render() {
    const column = [
      {
        title: '月检',
        name: 'month',
        all: 'allMonthOrderCnt',
        unfinished: 'notFinishMonthOrderCnt',
      },
      {
        title: '季检',
        name: 'quarter',
        all: 'allQuarterOrderCnt',
        unfinished: 'notFinishQuarterOrderCnt',
      },
      {
        title: '半年检',
        name: 'halfyear',
        all: 'allHalfYearOrderCnt',
        unfinished: 'notFinishHalfYearOrderCnt',
      },
      { title: '年检', name: 'year', all: 'allYearOrderCnt', unfinished: 'notFinishYearOrderCnt' },
    ];
    const columns = column.map((item, i) => ({
      title: item.title,
      children: [
        {
          title: '总工单',
          align: 'center',
          dataIndex: item.all,
          render: (text, record) =>
            record[item.name][item.all] ? (
              <p>{record[item.name][item.all]}</p>
            ) : (
              <p>{`本设备暂无${item.title}计划`}</p>
            ),
        },
        {
          title: '未完成',
          align: 'center',
          dataIndex: item.unfinished,
          render: (text, record) => (
            <Tag color="red">
              {record[item.name][item.unfinished] ? record[item.name][item.unfinished] : null}
            </Tag>
          ),
        },
      ],
    }));
    const columnss = [
      { title: '设备类型', dataIndex: 'deviceTypeName', render: (text, record) => <a>{text}</a> },
      ...columns,
    ];
    const data = [
      {
        month: {
          allMonthOrderCnt: 7,
          notFinishMonthOrderCnt: 7,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '冷冻主机',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 6,
          notFinishMonthOrderCnt: 6,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '冷冻水泵',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 2,
          notFinishMonthOrderCnt: 2,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '冷却水塔（系统一）',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 4,
          notFinishMonthOrderCnt: 4,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '冷却水塔（系统二）',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 10,
          notFinishMonthOrderCnt: 10,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '冷凝水泵',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 92,
          notFinishMonthOrderCnt: 92,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: 'AHU风柜',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 221,
          notFinishMonthOrderCnt: 221,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '排风扇',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 135,
          notFinishMonthOrderCnt: 135,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '冷气盘管风机',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 175,
          notFinishMonthOrderCnt: 175,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: 'VRV多联机组',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 51,
          notFinishMonthOrderCnt: 51,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '分体机',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 6,
          notFinishMonthOrderCnt: 6,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '加药泵',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '公众区域温度（数据）',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 7,
          notFinishMonthOrderCnt: 7,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '冷冻主机运行数据',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 122,
          notFinishMonthOrderCnt: 122,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: 'IAF(JF)排风机',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
      {
        month: {
          allMonthOrderCnt: 0,
          notFinishMonthOrderCnt: 0,
        },
        year: {
          notFinishYearOrderCnt: 0,
          allYearOrderCnt: 0,
        },
        halfyear: {
          notFinishHalfYearOrderCnt: 0,
          allHalfYearOrderCnt: 0,
        },
        deviceTypeName: '空调管道状况及设备清洁',
        quarter: {
          notFinishQuarterOrderCnt: 0,
          allQuarterOrderCnt: 0,
        },
      },
    ];
    const dataSource = data.map((t, i) => ({ ...t, key: i }));
    const pagination = {
      total: dataSource.length,
      current: this.state.page,
      pageSize: this.state.pageSize,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: total => `总共 ${total} 条`,
      onChange: page => {
        this.setState({ page });
        this.cancel;
      },
      onShowSizeChange: (current, pageSize) => {
        this.setState({ page: 1, pageSize });
      },
    };
    return (
      <PageHeaderWrapper>
        <Card>
          <FilterForm filterType={2} filterSearch={this.filterSearch} />
        </Card>
        <Card>
          <Table bordered columns={columnss} dataSource={dataSource} pagination={pagination} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
>>>>>>> 最终提交
