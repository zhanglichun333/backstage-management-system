<<<<<<< HEAD
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { connect } from 'dva'
import { Radio, Table, Icon, Tag, Modal, Select, Card, Form, message } from 'antd'
import FilterForm from '../../../components/FilterForm'
const { Option } = Select

@Form.create()
@connect(({ upKeep, user, loading }) => ({
  upKeep,
  user,
  loading: loading.effects['upKeep/fetch'],
}))
export default class UpKeepOrder extends Component {
  state = {
    page: 1,    //当前页数
    pageSize: 7,//当前条数
    visible: false,
    orderType: 1
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'upKeep/fetch'
    })
    dispatch({
      type: 'user/fetchStaff'
    })
  }

  // FilterForm的查询功能
  filterSearch = (values) => {
    console.log(values)
  }
  // radio value值的改变 请求数据/改变columns
  radioValueChange = e => {
    console.log('e', e)
    this.setState({
      orderType: e.target.value
    })
    // switch (e.target.value) {
    //   case 1:
    //     return 
    //   case 2:
    //     return
    //   case 3:
    //     return 
    //   case 4:
    //     return 
    // }
  }
  // 一键派单
  modalShow = () => {
    this.setState({
      visible: true,
    })
  }
  sendOrder = () => {
    this.props.form.validateFields((err, values) => {
      console.log(err, values)
    })
    this.setState({
      visible: false
    })
    message.success('派单成功')
  }

  render() {
    const { upKeep: {upKeeplist}, form: {getFieldDecorator}, user: {staffList} } = this.props
    const pagination = {
      total: upKeeplist.length,
      defaultCurrent: 1,
      defaultPageSize: 7,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: total => `总共 ${total} 条`,
      onChange: (page) => { this.setState({ page }) },
      onShowSizeChange: (current, pageSize) => { this.setState({ page: 1, pageSize }) }
    }
    const columns1 = [{
      title: '所在系统/区域',
      dataIndex: 'systemName',
    }, {
      title: '设备类型',
      align: 'center',
      dataIndex: 'deviceTypeName',
    }, {
      title: '工单号',
      align: 'center',
      dataIndex: 'orderNumber',
    }, {
      title: '工单名称',
      align: 'center',
      dataIndex: 'orderName',
      render: (text, record) => <Tag color={record.checkClass === 'A' ? 'blue' : record.checkClass === 'B' ? 'red' : record.checkClass === 'C' ? 'orange' : ''}>{text}</Tag>
    }, {
      title: '检查形式',
      align: 'center',
      dataIndex: 'period',
      render: (text, record) => {
        let config = {
          '0': '日检',
          '1': '月检'
        }
        return config[text]
      }
    }, {
      title: '工单生成时间',
      align: 'center',
      dataIndex: 'date',
    }, {
      title: '一键派单',
      align: 'center',
      render: () => <a title='派單' onClick={this.modalShow}><Icon type='user' /></a>
    }]
    const columns2 = [{
      title: '所在系统/区域',
      dataIndex: 'systemName',
    }, {
      title: '设备类型',
      align: 'center',
      dataIndex: 'deviceTypeName',
    }, {
      title: '工单号',
      align: 'center',
      dataIndex: 'orderNumber',
    }, {
      title: '工单名称',
      align: 'center',
      dataIndex: 'orderName',
      render: (text, record) => <Tag color={record.checkClass === 'A' ? 'blue' : record.checkClass === 'B' ? 'red' : record.checkClass === 'C' ? 'orange' : ''}>{text}</Tag>
    }, {
      title: '检查形式',
      align: 'center',
      dataIndex: 'period',
      render: (text, record) => {
        let config = {
          '0': '日检',
          '1': '月检'
        }
        return config[text]
      }
    }, {
      title: '工单生成时间',
      align: 'center',
      dataIndex: 'date',
    }, {
      title: '执行人',
      align: 'center',
      dataIndex: 'executive',
    }]
    const columns3 = [
      {
        title: '所在系统/区域',
        dataIndex: 'systemName',
      },
      {
        title: '设备编号/区域',
        align: 'center',
        dataIndex: 'deviceSn',
        render: (text, record) => record.deviceSn || record.areaName
      }, {
        title: '工单号',
        align: 'center',
        dataIndex: 'orderNumber',
      }, {
        title: '工单名称',
        align: 'center',
        dataIndex: 'orderName',
        render: (text, record) => <Tag color={record.checkClass === 'A' ? 'blue' : record.checkClass === 'B' ? 'red' : record.checkClass === 'C' ? 'orange' : ''}>{text}</Tag>
      }, {
        title: '检查形式',
        align: 'center',
        dataIndex: 'period',
        render: (text, record) => {
          let config = {
            '0': '日检',
            '1': '月检'
          }
          return config[text]
        }
      }, {
        title: '派单时间',
        align: 'center',
        dataIndex: 'sendTime',
      }, {
        title: '执行人',
        align: 'center',
        dataIndex: 'executive',
      }]
    const columns4 = [{
      title: '区域',
      dataIndex: 'systemName',
    }, {
      title: '设备编号/区域',
      align: 'center',
      dataIndex: 'deviceSn',
      render: (text, record) => record.deviceSn || record.areaName
    }, {
      title: '工单号',
      align: 'center',
      dataIndex: 'orderNumber',
    }, {
      title: '工单名称',
      align: 'center',
      dataIndex: 'orderName',
      render: (text, record) => <Tag color={record.checkClass === 'A' ? 'blue' : record.checkClass === 'B' ? 'red' : record.checkClass === 'C' ? 'orange' : ''}>{text}</Tag>
    }, {
      title: '检查形式',
      align: 'center',
      dataIndex: 'period',
      render: (text, record) => {
        let config = {
          '0': '日检',
          '1': '月检'
        }
        return config[text]
      }
    }, {
      title: '开始时间',
      align: 'center',
      dataIndex: 'createTime',
    }, {
      title: '执行人',
      align: 'center',
      dataIndex: 'executive',
    }, {
      title: '结束时间',
      align: 'center',
      dataIndex: 'updateTime',
    }]
    const { orderType } = this.state
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
    return (
      <PageHeaderWrapper>
        <Card>
          <FilterForm formType="filter" filterSearch={this.filterSearch} />
        </Card>
        <Card>
          <Radio.Group defaultValue={1} buttonStyle="solid" onChange={this.radioValueChange} style={{ marginBottom: 10 }}>
            <Radio.Button value={1}>待派工单</Radio.Button>
            <Radio.Button value={2}>已派工单</Radio.Button>
            <Radio.Button value={3}>未完成工单</Radio.Button>
            <Radio.Button value={4}>已完成工单</Radio.Button>
          </Radio.Group>
          <Table
            bordered
            dataSource={upKeeplist}
            columns={orderType === 1 ? columns1 : orderType === 2 ? columns2 : orderType === 3 ? columns3 : columns4}
            pagination={pagination}
          />
          <Modal
            title="派单"
            centered
            visible={this.state.visible}
            onOk={this.sendOrder}
            onCancel={() => { this.setState({ visible: false }) }}
          >
            <Form {...formItemLayout}>
              <Form.Item label="请选择维修人">
                {getFieldDecorator('maintenance')(
                  <Select style={{ width: 130 }}>
                    {staffList.map((item, i) => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
                  </Select>
                )}
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    )
  }
}


=======
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Radio, Table, Icon, Tag, Modal, Select, Card, Form, message, Drawer } from 'antd';
import FilterForm from '../../../components/FilterForm';
const { Option } = Select;

@Form.create()
@connect(({ upKeep, user, loading }) => ({
  upKeep,
  user,
  loading: loading.effects['upKeep/fetchUnprocessedList'],
}))
export default class UpKeepOrder extends Component {
  state = {
    page: 1, //当前页数
    pageSize: 7, //当前条数
    visible: false,
    orderType: 1,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.queryData();
    dispatch({
      type: 'user/fetchStaff',
    });
  }

  // FilterForm的查询功能
  filterSearch = values => {
    console.log(values);
  };
  // radio value值的改变 请求数据/改变columns
  radioValueChange = e => {
    this.setState(
      {
        orderType: e.target.value,
      },
      () => {
        this.queryData();
      },
    );
  };
  // 轮询
  queryData = () => {
    const { orderType } = this.state;
    const { dispatch } = this.props;
    switch (orderType) {
      case 2:
        return dispatch({
          type: 'upKeep/fetchProcessedList',
        });
      case 3:
        return dispatch({
          type: 'upKeep/fetchUnfinishedList',
        });
      case 4:
        return dispatch({
          type: 'upKeep/fetchFinishedList',
        });
      default:
        return dispatch({
          type: 'upKeep/fetchUnprocessedList',
        });
    }
  };
  // 一键派单
  modalShow = record => {
    this.setState({
      visible: true,
      sendData: record,
    });
  };
  sendOrder = () => {
    let {
      upKeep: { unprocessedList },
    } = this.props;
    let { sendData } = this.state;
    this.props.form.validateFields((err, values) => {
      console.log(err, values);
      console.log(this.state.sendData);
      let index = unprocessedList.findIndex(item => item === sendData);
      unprocessedList.splice(index, 1);
      this.setState({
        visible: false,
        newSendData: { ...sendData, ...values },
      });
      message.success('派单成功');
    });
    this.props.form.resetFields();
  };
  // 抽屉
  openDrawer = (record, event) => {
    let parentNode = event.target.parentNode;
    if (record.errorFlag) {
      this.setState(
        {
          drawerVisible: true,
          drawerData: record,
          drawerNode: parentNode,
        },
        () => {
          parentNode.style['zIndex'] = 10001;
          parentNode.style['position'] = 'relative';
          parentNode.style['backgroundColor'] = '#fff';
          parentNode.style['boxShadow'] = '-2px 0 8px rgba(0, 0, 0, 0.15)';
        },
      );
    }
  };
  closeDrawer = () => {
    let { drawerNode } = this.state;
    this.setState(
      {
        drawerVisible: false,
      },
      () => {
        drawerNode.style['zIndex'] = 0;
        drawerNode.style['position'] = '';
        drawerNode.style['backgroundColor'] = '';
        drawerNode.style['boxShadow'] = '';
      },
    );
  };

  render() {
    const { orderType, newSendData, drawerData } = this.state;
    const {
      upKeep: { unprocessedList, processedList, unfinishedList, finishedList },
      form: { getFieldDecorator },
      user: { staffList },
    } = this.props;
    newSendData ? processedList.unshift(newSendData) : null;
    let processedLists = Array.from(new Set(processedList));
    const pagination = {
      total:
        orderType === 1
          ? unprocessedList.length
          : orderType === 2
          ? processedLists.length
          : orderType === 3
          ? unfinishedList.length
          : finishedList.length,
      defaultCurrent: 1,
      defaultPageSize: 7,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: total => `总共 ${total} 条`,
      onChange: page => {
        this.setState({ page });
      },
      onShowSizeChange: (current, pageSize) => {
        this.setState({ page: 1, pageSize });
      },
    };
    const columns1 = [
      {
        title: '所在系统/区域',
        dataIndex: 'systemName',
      },
      {
        title: '设备类型',
        align: 'center',
        dataIndex: 'deviceTypeName',
      },
      {
        title: '工单号',
        align: 'center',
        dataIndex: 'orderNumber',
      },
      {
        title: '工单名称',
        align: 'center',
        dataIndex: 'orderName',
        render: (text, record) => (
          <Tag
            color={
              record.checkClass === 'A'
                ? 'blue'
                : record.checkClass === 'B'
                ? 'red'
                : record.checkClass === 'C'
                ? 'orange'
                : ''
            }
          >
            {text}
          </Tag>
        ),
      },
      {
        title: '检查形式',
        align: 'center',
        dataIndex: 'period',
        render: (text, record) => {
          let config = {
            '0': '日检',
            '1': '月检',
          };
          return config[text];
        },
      },
      {
        title: '工单生成时间',
        align: 'center',
        dataIndex: 'date',
      },
      {
        title: '一键派单',
        align: 'center',
        render: (text, record) => (
          <a title="派單" onClick={() => this.modalShow(record)}>
            <Icon type="user" />
          </a>
        ),
      },
    ];
    const columns2 = [
      {
        title: '所在系统/区域',
        dataIndex: 'systemName',
      },
      {
        title: '设备类型',
        align: 'center',
        dataIndex: 'deviceTypeName',
      },
      {
        title: '工单号',
        align: 'center',
        dataIndex: 'orderNumber',
      },
      {
        title: '工单名称',
        align: 'center',
        dataIndex: 'orderName',
        render: (text, record) => (
          <Tag
            color={
              record.checkClass === 'A'
                ? 'blue'
                : record.checkClass === 'B'
                ? 'red'
                : record.checkClass === 'C'
                ? 'orange'
                : ''
            }
          >
            {text}
          </Tag>
        ),
      },
      {
        title: '检查形式',
        align: 'center',
        dataIndex: 'period',
        render: (text, record) => {
          let config = {
            '0': '日检',
            '1': '月检',
          };
          return config[text];
        },
      },
      {
        title: '工单生成时间',
        align: 'center',
        dataIndex: 'date',
      },
      {
        title: '执行人',
        align: 'center',
        dataIndex: 'executive',
      },
    ];
    const columns3 = [
      {
        title: '所在系统/区域',
        dataIndex: 'systemName',
      },
      {
        title: '设备编号/区域',
        align: 'center',
        dataIndex: 'deviceSn',
        render: (text, record) => record.deviceSn || record.areaName,
      },
      {
        title: '工单号',
        align: 'center',
        dataIndex: 'orderNumber',
      },
      {
        title: '工单名称',
        align: 'center',
        dataIndex: 'orderName',
        render: (text, record) => (
          <Tag
            color={
              record.checkClass === 'A'
                ? 'blue'
                : record.checkClass === 'B'
                ? 'red'
                : record.checkClass === 'C'
                ? 'orange'
                : ''
            }
          >
            {text}
          </Tag>
        ),
      },
      {
        title: '检查形式',
        align: 'center',
        dataIndex: 'period',
        render: (text, record) => {
          let config = {
            '0': '日检',
            '1': '月检',
          };
          return config[text];
        },
      },
      {
        title: '派单时间',
        align: 'center',
        dataIndex: 'sendTime',
      },
      {
        title: '执行人',
        align: 'center',
        dataIndex: 'executive',
      },
    ];
    const columns4 = [
      {
        title: '区域',
        dataIndex: 'systemName',
      },
      {
        title: '设备编号/区域',
        align: 'center',
        dataIndex: 'deviceSn',
        render: (text, record) => record.deviceSn || record.areaName,
      },
      {
        title: '工单号',
        align: 'center',
        dataIndex: 'orderNumber',
        render: (text, record) => (
          <a
            style={{ color: record.errorFlag === 1 ? 'red' : '', display: 'block' }}
            onClick={() => this.openDrawer(record, event)}
          >
            {record.orderNumber}
          </a>
        ),
      },
      {
        title: '工单名称',
        align: 'center',
        dataIndex: 'orderName',
        render: (text, record) => (
          <Tag
            color={
              record.checkClass === 'A'
                ? 'blue'
                : record.checkClass === 'B'
                ? 'red'
                : record.checkClass === 'C'
                ? 'orange'
                : ''
            }
          >
            {text}
          </Tag>
        ),
      },
      {
        title: '检查形式',
        align: 'center',
        dataIndex: 'period',
        render: (text, record) => {
          let config = {
            '0': '日检',
            '1': '月检',
          };
          return config[text];
        },
      },
      {
        title: '开始时间',
        align: 'center',
        dataIndex: 'createTime',
      },
      {
        title: '执行人',
        align: 'center',
        dataIndex: 'executive',
      },
      {
        title: '结束时间',
        align: 'center',
        dataIndex: 'updateTime',
      },
    ];
    const detailsColumn = [
      { title: '名称', dataIndex: 'name' },
      {
        title: '',
        dataIndex: 'value',
        render: (text, record) => (
          <span style={{ color: record.errorFlag === 1 ? 'red' : '' }}>{record.value}</span>
        ),
      },
      { title: '单位', dataIndex: 'unit' },
    ];
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <PageHeaderWrapper>
        <Card>
          <FilterForm formType="filter" filterSearch={this.filterSearch} />
        </Card>
        <Card>
          <Radio.Group
            defaultValue={1}
            buttonStyle="solid"
            onChange={this.radioValueChange}
            style={{ marginBottom: 10 }}
          >
            <Radio.Button value={1}>待派工单</Radio.Button>
            <Radio.Button value={2}>已派工单</Radio.Button>
            <Radio.Button value={3}>未完成工单</Radio.Button>
            <Radio.Button value={4}>已完成工单</Radio.Button>
          </Radio.Group>
          <Table
            bordered
            dataSource={
              orderType === 1
                ? unprocessedList
                : orderType === 2
                ? processedLists
                : orderType === 3
                ? unfinishedList
                : finishedList
            }
            columns={
              orderType === 1
                ? columns1
                : orderType === 2
                ? columns2
                : orderType === 3
                ? columns3
                : columns4
            }
            pagination={pagination}
          />
          <Modal
            title="派单"
            centered
            visible={this.state.visible}
            onOk={this.sendOrder}
            onCancel={() => {
              this.setState({ visible: false });
            }}
          >
            <Form {...formItemLayout}>
              <Form.Item label="请选择维修人">
                {getFieldDecorator('executive')(
                  <Select style={{ width: 130 }}>
                    {staffList.map((item, i) => (
                      <Select.Option value={item.name} key={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Form>
          </Modal>
          <Drawer
            title="检查内容信息"
            placement="right"
            closable={false}
            onClose={this.closeDrawer}
            visible={this.state.drawerVisible}
            width="420"
          >
            <h4 style={{ color: 'red', marginBottom: 20 }}>
              设备编号：{drawerData ? drawerData.deviceSn : null}
            </h4>
            <Table
              columns={detailsColumn}
              dataSource={drawerData ? drawerData.keepRecord : null}
              pagination={false}
              rowKey={record => record.id}
              size="middle"
            />
          </Drawer>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
>>>>>>> 最终提交
