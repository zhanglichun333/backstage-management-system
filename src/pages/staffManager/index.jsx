import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Map, Marker, Polygon } from 'react-amap';
import { Card, Table, DatePicker, Row, Col, Input, Button } from 'antd';

export default class StaffManager extends Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      data: [
        {
          key: 1,
          name: '张寒',
          userid: '231350120726853027',
          className: null,
          todayTotalOrder: 11,
          todayFinishOrder: 0,
          workStatus: '-',
          userCoordinateList: null,
          position: {
            id: 45070,
            userid: '231350120726853027',
            longitude: '113.58148816955567',
            latitude: '22.16103698506339',
            className: null,
            createTime: '2020-01-08 15:51:22',
            updateTime: null,
            createBy: null,
            updateBy: null,
          },
          path: [
            { longitude: '113.58087126148224', latitude: '22.160569979686215' },
            { longitude: '113.58174029720307', latitude: '22.15995392766816' },
            { longitude: '113.58187977207184', latitude: '22.160003609382578' },
            { longitude: '113.5828990114975', latitude: '22.160569979686468' },
            { longitude: '113.58148816955567', latitude: '22.16103698506339' },
          ],
        },
        {
          key: 2,
          name: '刘贺',
          userid: '231350120726853027',
          className: null,
          todayTotalOrder: 9,
          todayFinishOrder: 1,
          workStatus: '超过工作区域内',
          userCoordinateList: null,
          position: {
            id: 45070,
            userid: '231350120726853027',
            longitude: '113.57741121185303',
            latitude: '22.159765136993318',
            className: null,
            createTime: '2020-01-08 15:51:22',
            updateTime: null,
            createBy: null,
            updateBy: null,
          },
          path: [
            { longitude: '113.57930485141755', latitude: '22.160957494896664' },
            { longitude: '113.57844654453278', latitude: '22.161066793865633' },
            { longitude: '113.57769552600861', latitude: '22.160709087833958' },
            { longitude: '113.57741121185303', latitude: '22.159765136993318' },
          ],
        },
        {
          key: 3,
          name: '吴科',
          userid: '231350120726853027',
          className: null,
          todayTotalOrder: 9,
          todayFinishOrder: 1,
          workStatus: '-',
          userCoordinateList: null,
          position: {
            id: 45070,
            userid: '231350120726853027',
            longitude: '113.58094099891663',
            latitude: '22.161593414976977',
            className: null,
            createTime: '2020-01-08 15:51:22',
            updateTime: null,
            createBy: null,
            updateBy: null,
          },
          path: [
            { longitude: '113.58274344337464', latitude: '22.161017112524444' },
            { longitude: '113.58201388252259', latitude: '22.16056004338332' },
            { longitude: '113.58094099891663', latitude: '22.161593414976977' },
          ],
        },
        {
          key: 4,
          name: '张磊',
          userid: '231350120726853027',
          className: null,
          todayTotalOrder: 9,
          todayFinishOrder: 1,
          workStatus: '-',
          userCoordinateList: null,
          position: {
            id: 45070,
            userid: '231350120726853027',
            longitude: '113.58276490104676',
            latitude: '22.159943991321693',
            className: null,
            createTime: '2020-01-08 15:51:22',
            updateTime: null,
            createBy: null,
            updateBy: null,
          },
          path: [
            { longitude: '113.58323696983338', latitude: '22.160818386993505' },
            { longitude: '113.58177784812928', latitude: '22.16075876927944' },
            { longitude: '113.58276490104676', latitude: '22.159943991321693' },
          ],
        },
      ],
      get paths() {
        return this.data;
      },
    };
    this.markerEvents = {
      click: e => {
        if (this.state.name === e.target.B.title) {
          this.setState({ name: null });
          return;
        }
        this.setState({ name: e.target.B.title });
      },
    };
  }

  inputChange = e => {
    console.log(e.target.value);
    let { data, timer } = this.state;
    let newData = data.filter(item => item.name === e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.setState({
        paths: newData,
        data: newData,
      });
    }, 1000);
  };
  dataChange = (date, dateString) => {
    console.log(date, dateString);
  };
  clickCell = record => {
    console.log(record);
    let { data } = this.state;
    this.setState({
      paths: data.filter(item => item.name === record.name),
    });
  };
  reset = () => {
    let { data } = this.state;
    this.setState({
      paths: data,
    });
  };

  render() {
    const { data, name, paths } = this.state;
    const plugins = [
      {
        name: 'ToolBar',
        options: {
          visible: true, // 不设置该属性默认就是 true
          onCreated(ins) {
            console.log(ins);
          },
        },
      },
    ];
    const styleC = {
      background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '30px',
      height: '40px',
      color: '#000',
      textAlign: 'center',
      lineHeight: '40px',
    };
    const columns = [
      { title: '姓名', dataIndex: 'name' },
      { title: '今日工单', align: 'center', dataIndex: 'todayTotalOrder' },
      { title: '已完成工单', align: 'center', dataIndex: 'todayFinishOrder' },
      {
        title: '在岗状态',
        align: 'center',
        dataIndex: 'workStatus',
        render: (text, record) => (
          <span style={{ color: text === '超过工作区域内' ? 'red' : '' }}>{text}</span>
        ),
      },
    ];
    return (
      <PageHeaderWrapper>
        <Row gutter={16} style={{ padding: 20, backgrundColor: '#fff' }}>
          <Col span={16}>
            <Card
              extra={
                <Button type="primary" onClick={this.reset}>
                  重置图标
                </Button>
              }
            >
              <div style={{ height: 550 }}>
                <Map
                  zoom={17}
                  center={{ longitude: 113.58063519, latitude: 22.1602615772 }}
                  plugins={plugins}
                >
                  {paths.map(item => (
                    <Marker
                      position={{
                        longitude: item.position.longitude,
                        latitude: item.position.latitude,
                      }}
                      title={item.name}
                      events={this.markerEvents}
                      key={item.key}
                    >
                      {item.workStatus === '-' ? null : <div style={styleC}></div>}
                    </Marker>
                  ))}
                  {paths.map(item =>
                    item.name === name ? (
                      <Polygon
                        path={item.path}
                        style={{
                          strokeColor: item.workStatus === '-' ? '#2F9BFD' : '#FF3333',
                          fillColor: item.workStatus === '-' ? '#A3CCFF' : '#F7AE9E',
                        }}
                        key={item.key}
                      />
                    ) : null,
                  )}
                </Map>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 660 }}>
              <Input
                placeholder="请选择姓名"
                onChange={this.inputChange}
                style={{ width: 120, marginBottom: 20 }}
              />
              <DatePicker onChange={this.dataChange} style={{ width: 120, float: 'right' }} />
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                onRow={record => {
                  return {
                    onClick: () => {
                      this.clickCell(record);
                    }, // 点击行
                  };
                }}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
