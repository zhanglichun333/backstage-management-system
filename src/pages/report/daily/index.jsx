<<<<<<< HEAD
import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Row, Col, DatePicker, Icon, Divider, List, Button } from 'antd'
import Cards from '../../../components/Cards'
import ExportJsonExcel from "js-export-excel"

@connect(({ global }) => ({
  global
}))
export default class Daily extends Component {
  exportDaily = (cardsData) => {
    const { global: { dailyList } } = this.props
    const columns = [
      {
        title: '名称',
        dataIndex: 'name'
      },
      {
        title: '总额',
        dataIndex: 'total'
      },
      {
        title: '已完成',
        dataIndex: 'finished'
      },
      {
        title: '未完成',
        dataIndex: 'unfinished'
      },
    ]
    const option = {}
    option.fileName = '每日统计表'
    option.datas = [
      {
        sheetData: cardsData,
        sheetName: '每日统计表',
        sheetFilter: columns.map(item => item.dataIndex),
        sheetHeader: columns.map(item => item.title),
        columnWidths: columns.map(() => 10),
      },
    ]
    const toExcel = new ExportJsonExcel(option)
    toExcel.saveExcel()
  }
  // 根据日期搜索工作汇报
  datePicker = (data, dataString) => {
    console.log(data, dataString)
  }
  render() {
    const { global: { dailyList }} = this.props
    return (
      <Row gutter={40}>
        <Col span={7}>
          <Cards title="每日统计" extra="导出日报" width="100%" exportDaily={this.exportDaily}/>
        </Col>
        <Col span={17}>
          <Card title="每日汇报" extra={<DatePicker onChange={this.datePicker} placeholder="请选择日期" />}>
            {
              dailyList !== [] ?
                (<List
                  locale
                  dataSource={dailyList}
                  renderItem={item => (
                    <List.Item>
                      <Card
                        title={item.title}
                        headStyle={{ backgroundColor: '#F9F8D6' }}
                        style={{ width: '100%' }}
                      >
                        <ul>
                          {item.names.map((name, i) => (
                            <li key={i} style={{ fontSize: 16, marginBottom: 12, borderBottom: '1px solid #f6f6f6' }}>
                              <span style={{ marginRight: 20 }}>{i + 1}.</span>
                              {name}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </List.Item>
                  )}
                />) :
                (<div style={{ fontSize: 18 }}>
                  <Icon type="exclamation-circle" theme="twoTone" twoToneColor="orange" />
                  <Divider type='vertical' />
                  当前时间暂无工作汇报数据
              </div>)
            }

          </Card>
        </Col>
      </Row>
    )
  }
}

=======
import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Row, Col, DatePicker, Icon, Divider, List, Button } from 'antd'
import Cards from '../../../components/Cards'
import ExportJsonExcel from "js-export-excel"

@connect(({ global }) => ({
  global
}))
export default class Daily extends Component {
  exportDaily = (cardsData) => {
    const { global: { dailyList } } = this.props
    const columns = [
      {
        title: '名称',
        dataIndex: 'name'
      },
      {
        title: '总额',
        dataIndex: 'total'
      },
      {
        title: '已完成',
        dataIndex: 'finished'
      },
      {
        title: '未完成',
        dataIndex: 'unfinished'
      },
    ]
    const option = {}
    option.fileName = '每日统计表'
    option.datas = [
      {
        sheetData: cardsData,
        sheetName: '每日统计表',
        sheetFilter: columns.map(item => item.dataIndex),
        sheetHeader: columns.map(item => item.title),
        columnWidths: columns.map(() => 10),
      },
    ]
    const toExcel = new ExportJsonExcel(option)
    toExcel.saveExcel()
  }
  // 根据日期搜索工作汇报
  datePicker = (data, dataString) => {
    console.log(data, dataString)
  }
  render() {
    const { global: { dailyList }} = this.props
    return (
      <Row gutter={40}>
        <Col span={7}>
          <Cards title="每日统计" extra="导出日报" width="100%" exportDaily={this.exportDaily}/>
        </Col>
        <Col span={17}>
          <Card title="每日汇报" extra={<DatePicker onChange={this.datePicker} placeholder="请选择日期" />}>
            {
              dailyList !== [] ?
                (<List
                  locale
                  dataSource={dailyList}
                  renderItem={item => (
                    <List.Item>
                      <Card
                        title={item.title}
                        headStyle={{ backgroundColor: '#F9F8D6' }}
                        style={{ width: '100%' }}
                      >
                        <ul>
                          {item.names.map((name, i) => (
                            <li key={i} style={{ fontSize: 16, marginBottom: 12, borderBottom: '1px solid #f6f6f6' }}>
                              <span style={{ marginRight: 20 }}>{i + 1}.</span>
                              {name}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </List.Item>
                  )}
                />) :
                (<div style={{ fontSize: 18 }}>
                  <Icon type="exclamation-circle" theme="twoTone" twoToneColor="orange" />
                  <Divider type='vertical' />
                  当前时间暂无工作汇报数据
              </div>)
            }

          </Card>
        </Col>
      </Row>
    )
  }
}

>>>>>>> 最终提交
