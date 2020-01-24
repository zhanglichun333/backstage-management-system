<<<<<<< HEAD
import React, { Component } from 'react'
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Row, Radio, Table, Icon, Tag, Button, Modal, Select, Card, Divider, Form, Input, Popconfirm, message } from 'antd'
import FilterForm from '../../components/FilterForm'
import moment from 'moment'
import { getDuration } from '../../utils/utils'

// 编辑的那行
const EditableContext = React.createContext();
class EditableCell extends React.Component {
  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(<Input />)}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

@Form.create()
@connect(({ maintainAndmanager, user, loading }) => ({
  maintainAndmanager,
  user,
  loading: loading.effects['maintainAndmanager/fetchMaintainList'],
}))
export default class MaintainManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingKey: '',
      page: 1,    //当前页数
      pageSize: 7,//当前条数
      orderModel: false,
      imgModel: false,
      imgs: [],
      areaModel: false,
      areas: '',
      tableModel: false,
      orderType: 1,
      sendData: {},
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'maintainAndmanager/fetchUnProcessedList'
    })
    dispatch({
      type: 'user/fetchStaff'
    })
  }
  
  // FilterForm的查询功能
  filterSearch = (values) => {
    console.log(values)
  }
  // radio value值的改变 请求数据/改变columns及dataSource
  radioValueChange = e => {
    this.setState({
      orderType: e.target.value
    })
  }
  // 一键派单  model
  sendOrder = (record) => {
    this.setState({
      orderModel: true,
      sendData: record
    })
  }
  orderModelOk = () => {
    this.setState({
      orderModel: false
    })
    message.success('派单成功')
    // const {sendData} = this.state
    // const { form, dispatch, maintainAndmanager: {unProcessedList}, user: {staffList}} = this.props
    // form.validateFields((err, values) => {
    //   let newImportantFlag = values.importantFlag === 1 ? '重要' : '不重要'
    //   let newMaintaince = staffList.filter(item => item.id === values.maintenance)[0].name
    //   let newValues = { importantFlag: newImportantFlag, maintenance: newMaintaince}
    //   console.log(sendData)
    //   let newData = { ...sendData, ...newValues, orderTime: moment().format('YYYY-MM-DD hh:mm:ss')}
    //   unProcessedList.unshift(newData)
    //   dispatch({
    //     type: 'maintainAndmanager/save',
    //     payload: {
    //       unProcessedList: unProcessedList
    //     },
    //     callback: () => {
    //       this.setState({
    //         orderModel: false
    //       })
    //       message.success('派单成功')
    //     }
    //   })
    // })
  }
  // 查看图片
  openImg = (record) => {
    console.log(record)
    this.setState({
      imgModel: true,
      imgs: record
    }, () => {
      console.log(this.state.imgs)
    })
  }
  // 查看区域
  openMap = (record) => {
    console.log(record)
    this.setState({
      areaModel: true,
      areas: record
    })
  }
  handleCancel = () => {
    this.setState({
      orderModel: false,
      imgModel: false,
      areaModel: false
    })
  }
  //新增表单
  newModelShow = () => {
    this.setState({
      tableModel: true
    })
  }
  newAdd = () => {
    const { maintainAndmanager: { maintainList } } = this.props
    const { dispatch } = this.props
    let newCell = this.staffForm.props.form.getFieldsValue()
    maintainList.unshift(newCell)
    dispatch({
      type: 'maintainAndmanager/save',
      payload: {
        deviceBasicList: maintainList
      },
      callback: () => {
        this.setState({ tableModel: false })
        message.success('新增成功')
      }
    })
  }
  // 编辑功能
  edit(key) {
    this.setState({ editingKey: key })
  }
  isEditing = record => record.key === this.state.editingKey
  cancel() {
    this.setState({ editingKey: '' })
  }
  // 保存功能 
  save(form, key) {
    const { maintainAndmanager: { maintainList } } = this.props
    const { dispatch } = this.props
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      const { importantFlag, maintenance, ...newRow } = row
      const newData = [...maintainList]
      const index = newData.findIndex(item => key === item.key) //根据key值，找到编辑那行的index
      console.log(index)
      const item = newData[index]
      newData.splice(index, 1, {  //如果没改变，只有item, 如果改变row会把item覆盖， 采取这种方法是row!==item
        ...item,
        ...newRow,
      })
      this.setState({ editingKey: '' })
      dispatch({
        type: 'maintainAndmanager/save',
        payload: {
          maintainList: newData
        },
        callback: () => {
          message.success('修改成功')
        }
      })
    })
  }

  render() {
    const { orderModel, imgModel, areaModel, imgs, areas, orderType } = this.state
    const { maintainAndmanager: { maintainList, unProcessedList  }, user: { staffList }, form: { getFieldDecorator} } = this.props
    const columns1 = [{
      title: '所在系统/区域',
      dataIndex: 'systemName',
      editable: true,
      render: (text, record) => record.systemName || record.areaName
    }, {
      title: '设备编号',
      align: 'center',
      dataIndex: 'deviceSn',
      editable: true,
      render: text => text || '-'
    }, {
      title: '工单号',
      align: 'center',
      dataIndex: 'orderNumber',
      editable: true,
      render: (text, record) => <Tag color="#2db7f5">{record.orderNumber}</Tag>
    }, {
      title: '位置',
      align: 'center',
      dataIndex: 'position',
      editable: true
    }, {
      title: '报修情况',
      align: 'center',
      dataIndex: 'troubleDesc',
      editable: true
    }, {
      title: '报修人',
      align: 'center',
      dataIndex: 'executive',
      editable: true
    }, {
      title: '报修时间',
      align: 'center',
      dataIndex: 'sendTime',
      editable: true
    }, {
      title: '操作',
      align: 'center',
      width: 200,
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record)
        return (
          <>
            <a href="#" onClick={() => this.sendOrder(record)}><Icon type="user" /></a>
            <Divider type="vertical" />
            {record.imgUrl ? <Icon type="picture" theme="twoTone" onClick={() => this.openImg(record.imgUrl)} /> : <Icon type="picture" title="暂无图片" />}
            <Divider type="vertical" />
            {
              editable ?
                (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a onClick={() => this.save(form, record.key)} style={{ marginRight: 8 }}><Icon type="check" /></a>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)}>
                      <a><Icon type="close" /></a>
                    </Popconfirm>
                  </span>
                ) :
                (
                  <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}> <Icon type="edit" /></a>
                )
            }
            <Divider type="vertical" />
            {record.map ? <Icon type="eye" theme="twoTone" onClick={() => this.openMap(record.map)} /> : <Icon type="eye" title="暂无地图" />}
          </>
        )
      }
    }]
    const columns2 = [{
      title: '所在系统/区域',
      dataIndex: 'systemName',
      editable: true,
      render: (text, record) => record.systemName || record.areaName
    }, {
      title: '设备编号',
      align: 'center',
      dataIndex: 'deviceSn',
      editable: true,
      render: text => text || '-'
    }, {
      title: '工单号',
      align: 'center',
      dataIndex: 'orderNumber',
      editable: true,
      render: (text, record) => <Tag color="#2db7f5">{record.orderNumber}</Tag>
    }, {
      title: '位置',
      align: 'center',
      dataIndex: 'position',
      editable: true
    }, {
      title: '报修情况',
      align: 'center',
      dataIndex: 'troubleDesc',
      editable: true
    }, {
      title: '报修人',
      align: 'center',     
      dataIndex: 'executive',
      editable: true
    }, {
      title: '报修时间',
      align: 'center',
      dataIndex: 'sendTime',   
      editable: true
    }, {
      title: '派单时间',
      align: 'center',
      dataIndex: 'orderTime',
      editable: true
    }, {
      title: '是否重要',
      align: 'center',
      dataIndex: 'importantFlag',
      editable: true,
      render: text => text === 1? '重要': '不重要'
    }, {
      title: '维修人',
      align: 'center',
      dataIndex: 'maintenance',
      editable: true
    }, {
      title: '操作',
      align: 'center',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record)
        return (
          <>
            {record.imgUrl ? <Icon type="picture" theme="twoTone" onClick={() => this.openImg(record.imgUrl)} /> : <Icon type="picture" title="暂无图片" />}
          </>
        )
      }
    }]
    const columns3 = [{
      title: '所在系统/区域',
      dataIndex: 'systemName',
      editable: true,
      render: (text, record) => record.systemName || record.areaName
    }, {
      title: '设备编号',
      align: 'center',
      dataIndex: 'deviceSn',
      editable: true,
      render: text => text || '-'
    }, {
      title: '工单号',
      align: 'center',
      dataIndex: 'orderNumber',
      editable: true,
      render: (text, record) => <Tag color="#2db7f5">{record.orderNumber}</Tag>
    }, {
      title: '位置',
      align: 'center',
      dataIndex: 'position',
      editable: true
    }, {
      title: '报修情况',
      align: 'center',
      dataIndex: 'troubleDesc',
      editable: true
    }, {
      title: '报修人',
      align: 'center',
      dataIndex: 'executive',
      editable: true
    }, {
      title: '报修时间',
      align: 'center',
      dataIndex: 'sendTime',
      editable: true
    }, {
      title: '派单时间',
      align: 'center',
      dataIndex: 'orderTime',
      editable: true
    }, {
      title: '是否重要',
      align: 'center',
      dataIndex: 'importantFlag',
      editable: true,
      render: text => text === 1 ? '重要' : '不重要'
    }, {
      title: '维修人',
      align: 'center',
      dataIndex: 'maintenance',
      editable: true
    }, {
      title: '操作',
      align: 'center',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record)
        return (
          <>
            {record.imgUrl ? <Icon type="picture" theme="twoTone" onClick={() => this.openImg(record.imgUrl)} /> : <Icon type="picture" title="暂无图片" />}
          </>
        )
      }
    }]
    const columns4 = [{
      title: '所在系统/区域',
      dataIndex: 'systemName',
      editable: true,
      render: (text, record) => record.systemName || record.areaName
    }, {
      title: '设备编号',
      align: 'center',
      dataIndex: 'deviceSn',
      editable: true,
      render: text => text || '-'
    }, {
      title: '工单号',
      align: 'center',
      dataIndex: 'orderNumber',
      editable: true,
      render: (text, record) => <Tag color="#2db7f5">{record.orderNumber}</Tag>
    }, {
      title: '位置',
      align: 'center',
      dataIndex: 'position',
      editable: true
    }, {
      title: '报修情况',
      align: 'center',
      dataIndex: 'troubleDesc',
      editable: true
    }, {
      title: '报修人',
      align: 'center',
      dataIndex: 'executive',
      editable: true
    }, {
      title: '报修时间',
      align: 'center',
      dataIndex: 'sendTime',
      editable: true
    }, {
      title: '派单时间',
      align: 'center',
      dataIndex: 'orderTime',
      editable: true
    }, {
      title: '外派维修人',
      align: 'center',
      dataIndex: 'maintenance',
      editable: true
    }, {
      title: '联系方式',
      align: 'center',
      dataIndex: 'number',
      editable: true
    },{
      title: '操作',
      align: 'center',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record)
        return (
          <>
            {record.imgUrl ? <Icon type="picture" theme="twoTone" onClick={() => this.openImg(record.imgUrl)} /> : <Icon type="picture" title="暂无图片" />}
          </>
        )
      }
    }]
    const columns5 = [{
      title: '所在系统/区域',
      dataIndex: 'systemName',
      editable: true,
      render: (text, record) => record.systemName || record.areaName
    }, {
      title: '设备编号',
      align: 'center',
      dataIndex: 'deviceSn',
      editable: true,
      render: text => text || '-'
    }, {
      title: '工单号',
      align: 'center',
      dataIndex: 'orderNumber',
      editable: true,
      render: (text, record) => <Tag color="#2db7f5">{record.orderNumber}</Tag>
    }, {
      title: '位置',
      align: 'center',
      dataIndex: 'position',
      editable: true
    }, {
      title: '维修开始时间',
      align: 'center',
      dataIndex: 'createTime',
      editable: true
    }, {
      title: '维修结束时间',
      align: 'center',
      dataIndex: 'updateTime',
      editable: true
    }, {
      title: '维修时长',
      align: 'center',
      dataIndex: 'duration',
      editable: true,
      render: (text, record) => getDuration(record.createTime, record.updateTime)
    }, {
      title: '维修人',
      align: 'center',
      dataIndex: 'maintenance',
      editable: true
    }]
    const tableColumns = columns1.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    })
    const pagination = {
      total: maintainList.length,
      current: this.state.page,
      pageSize: this.state.pageSize,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: total => `总共 ${total} 条`,
      onChange: (page) => {
        this.setState({ page })
        this.cancel
      },
      onShowSizeChange: (current, pageSize) => { this.setState({ page: 1, pageSize }) }
    }
    const radios = (
      <Radio.Group defaultValue={1} buttonStyle="solid" onChange={this.radioValueChange} style={{ marginBottom: 10 }}>
        <Radio.Button value={1}>待派工单</Radio.Button>
        <Radio.Button value={2}>已派工单</Radio.Button>
        <Radio.Button value={3}>未完成工单</Radio.Button>
        <Radio.Button value={4}>外派工单</Radio.Button>
        <Radio.Button value={5}>完成工单</Radio.Button>
      </Radio.Group>
    )
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
    const orderForm = (
      <Form {...formItemLayout}>
        <Form.Item label="是否重要">
          {getFieldDecorator('importantFlag', {
            initialValue: 1
          })(
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="请选择维修人">
          {getFieldDecorator('maintenance')(
            <Select style={{ width: 130 }}>
              {staffList.map((item, i) => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
            </Select>
          )}
        </Form.Item>
      </Form>
    )
    const components = {
      body: {
        cell: EditableCell,
      },
    }
    return (
      <PageHeaderWrapper>
        <Card>
          <FilterForm formType="filter" filterType={1} filterSearch={this.filterSearch} /> 
        </Card>
        <Card title={radios} extra={<Button type="primary" icon="plus" onClick={this.newModelShow}>新增维修单</Button>}>
          <EditableContext.Provider value={this.props.form}>
            <Table
              components={components}
              bordered
              dataSource={unProcessedList }
              columns={orderType === 1 ? tableColumns : orderType === 2 ? columns2 : orderType === 3 ? columns3 : orderType === 4 ? columns4: columns5}
              rowClassName="editable-row"
              pagination={pagination}
            />
          </EditableContext.Provider>
          <Modal
            title="一键派单"
            center
            visible={orderModel}
            onOk={this.orderModelOk}
            onCancel={this.handleCancel}
          >
            {orderForm}
          </Modal>
          <Modal
            title="维修图片"
            center
            visible={imgModel}
            footer={null}
            onCancel={this.handleCancel}
          >
            {imgs.map((item, i) => <img width="200" height="auto" style={{marginRight: 20}} src={item} key={i}/>)}
          </Modal>
          <Modal
            title="区域图片"
            center
            visible={areaModel}
            onCancel={this.handleCancel}
            footer={null}
          >
            <img src={areas} width="100%"/>
          </Modal>
          <Modal
            title="新增维修单"
            visible={this.state.tableModel}
            onOk={this.newAdd}
            onCancel={() => { this.setState({ tableModel: false }) }}
          >
            <FilterForm layoutType={1} formType="maintain" wrappedComponentRef={(inst) => this.staffForm = inst} />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    )
  }
}
=======
import React, { Component } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Row,
  Radio,
  Table,
  Icon,
  Tag,
  Button,
  Modal,
  Select,
  Card,
  Divider,
  Form,
  Input,
  Popconfirm,
  message,
} from 'antd';
import FilterForm from '../../components/FilterForm';
import moment from 'moment';
import { getDuration } from '../../utils/utils';

// 编辑的那行
const EditableContext = React.createContext();
class EditableCell extends React.Component {
  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(<Input />)}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

@Form.create()
@connect(({ maintainAndmanager, user, loading }) => ({
  maintainAndmanager,
  user,
  loading: loading.effects['maintainAndmanager/fetchMaintainList'],
}))
export default class MaintainManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: '',
      page: 1, //当前页数
      pageSize: 7, //当前条数
      orderModel: false,
      imgModel: false,
      imgs: [],
      areaModel: false,
      areas: '',
      tableModel: false,
      orderType: 1,
      sendData: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'maintainAndmanager/fetchUnProcessedList',
    });
    dispatch({
      type: 'user/fetchStaff',
    });
  }

  // FilterForm的查询功能
  filterSearch = values => {
    console.log(values);
  };

  // radio value值的改变 请求数据/改变columns及dataSource
  radioValueChange = e => {
    this.setState({
      orderType: e.target.value,
    });
  };

  // 一键派单  model
  sendOrder = record => {
    this.setState({
      orderModel: true,
      sendData: record,
    });
  };

  orderModelOk = () => {
    this.setState({
      orderModel: false,
    });
    message.success('派单成功');
    // const {sendData} = this.state
    // const { form, dispatch, maintainAndmanager: {unProcessedList}, user: {staffList}} = this.props
    // form.validateFields((err, values) => {
    //   let newImportantFlag = values.importantFlag === 1 ? '重要' : '不重要'
    //   let newMaintaince = staffList.filter(item => item.id === values.maintenance)[0].name
    //   let newValues = { importantFlag: newImportantFlag, maintenance: newMaintaince}
    //   console.log(sendData)
    //   let newData = { ...sendData, ...newValues, orderTime: moment().format('YYYY-MM-DD hh:mm:ss')}
    //   unProcessedList.unshift(newData)
    //   dispatch({
    //     type: 'maintainAndmanager/save',
    //     payload: {
    //       unProcessedList: unProcessedList
    //     },
    //     callback: () => {
    //       this.setState({
    //         orderModel: false
    //       })
    //       message.success('派单成功')
    //     }
    //   })
    // })
  };

  // 查看图片
  openImg = record => {
    console.log(record);
    this.setState(
      {
        imgModel: true,
        imgs: record,
      },
      () => {
        console.log(this.state.imgs);
      },
    );
  };

  // 查看区域
  openMap = record => {
    console.log(record);
    this.setState({
      areaModel: true,
      areas: record,
    });
  };

  handleCancel = () => {
    this.setState({
      orderModel: false,
      imgModel: false,
      areaModel: false,
    });
  };

  //新增表单
  newModelShow = () => {
    this.setState({
      tableModel: true,
    });
  };

  newAdd = () => {
    const {
      maintainAndmanager: { maintainList },
    } = this.props;
    const { dispatch } = this.props;
    let newCell = this.staffForm.props.form.getFieldsValue();
    maintainList.unshift(newCell);
    dispatch({
      type: 'maintainAndmanager/save',
      payload: {
        deviceBasicList: maintainList,
      },
      callback: () => {
        this.setState({ tableModel: false });
        message.success('新增成功');
      },
    });
  };

  // 编辑功能
  edit = key => {
    this.setState({ editingKey: key });
  };

  isEditing = record => record.key === this.state.editingKey;

  cancel() {
    this.setState({ editingKey: '' });
  }

  // 保存功能
  save(form, key) {
    const {
      maintainAndmanager: { maintainList },
    } = this.props;
    const { dispatch } = this.props;
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const { importantFlag, maintenance, ...newRow } = row;
      const newData = [...maintainList];
      const index = newData.findIndex(item => key === item.key); //根据key值，找到编辑那行的index
      console.log(index);
      const item = newData[index];
      newData.splice(index, 1, {
        //如果没改变，只有item, 如果改变row会把item覆盖， 采取这种方法是row!==item
        ...item,
        ...newRow,
      });
      this.setState({ editingKey: '' });
      dispatch({
        type: 'maintainAndmanager/save',
        payload: {
          maintainList: newData,
        },
        callback: () => {
          message.success('修改成功');
        },
      });
    });
  }

  render() {
    const { orderModel, imgModel, areaModel, imgs, areas, orderType } = this.state;
    const {
      maintainAndmanager: { maintainList, unProcessedList },
      user: { staffList },
      form: { getFieldDecorator },
    } = this.props;
    const columns1 = [
      {
        title: '所在系统/区域',
        dataIndex: 'systemName',
        editable: true,
        render: (text, record) => record.systemName || record.areaName,
      },
      {
        title: '设备编号',
        align: 'center',
        dataIndex: 'deviceSn',
        editable: true,
        render: text => text || '-',
      },
      {
        title: '工单号',
        align: 'center',
        dataIndex: 'orderNumber',
        editable: true,
        render: (text, record) => <Tag color="#2db7f5">{record.orderNumber}</Tag>,
      },
      {
        title: '位置',
        align: 'center',
        dataIndex: 'position',
        editable: true,
      },
      {
        title: '报修情况',
        align: 'center',
        dataIndex: 'troubleDesc',
        editable: true,
      },
      {
        title: '报修人',
        align: 'center',
        dataIndex: 'executive',
        editable: true,
      },
      {
        title: '报修时间',
        align: 'center',
        dataIndex: 'sendTime',
        editable: true,
      },
      {
        title: '操作',
        align: 'center',
        width: 200,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return (
            <>
              <a href="#" onClick={() => this.sendOrder(record)}>
                <Icon type="user" />
              </a>
              <Divider type="vertical" />
              {record.imgUrl ? (
                <Icon type="picture" theme="twoTone" onClick={() => this.openImg(record.imgUrl)} />
              ) : (
                <Icon type="picture" title="暂无图片" />
              )}
              <Divider type="vertical" />
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a onClick={() => this.save(form, record.key)} style={{ marginRight: 8 }}>
                        <Icon type="check" />
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)}>
                    <a>
                      <Icon type="close" />
                    </a>
                  </Popconfirm>
                </span>
              ) : (
                <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                  {' '}
                  <Icon type="edit" />
                </a>
              )}
              <Divider type="vertical" />
              {record.map ? (
                <Icon type="eye" theme="twoTone" onClick={() => this.openMap(record.map)} />
              ) : (
                <Icon type="eye" title="暂无地图" />
              )}
            </>
          );
        },
      },
    ];
    const columns2 = [
      {
        title: '所在系统/区域',
        dataIndex: 'systemName',
        editable: true,
        render: (text, record) => record.systemName || record.areaName,
      },
      {
        title: '设备编号',
        align: 'center',
        dataIndex: 'deviceSn',
        editable: true,
        render: text => text || '-',
      },
      {
        title: '工单号',
        align: 'center',
        dataIndex: 'orderNumber',
        editable: true,
        render: (text, record) => <Tag color="#2db7f5">{record.orderNumber}</Tag>,
      },
      {
        title: '位置',
        align: 'center',
        dataIndex: 'position',
        editable: true,
      },
      {
        title: '报修情况',
        align: 'center',
        dataIndex: 'troubleDesc',
        editable: true,
      },
      {
        title: '报修人',
        align: 'center',
        dataIndex: 'executive',
        editable: true,
      },
      {
        title: '报修时间',
        align: 'center',
        dataIndex: 'sendTime',
        editable: true,
      },
      {
        title: '派单时间',
        align: 'center',
        dataIndex: 'orderTime',
        editable: true,
      },
      {
        title: '是否重要',
        align: 'center',
        dataIndex: 'importantFlag',
        editable: true,
        render: text => (text === 1 ? '重要' : '不重要'),
      },
      {
        title: '维修人',
        align: 'center',
        dataIndex: 'maintenance',
        editable: true,
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return (
            <>
              {record.imgUrl ? (
                <Icon type="picture" theme="twoTone" onClick={() => this.openImg(record.imgUrl)} />
              ) : (
                <Icon type="picture" title="暂无图片" />
              )}
            </>
          );
        },
      },
    ];
    const columns3 = [
      {
        title: '所在系统/区域',
        dataIndex: 'systemName',
        editable: true,
        render: (text, record) => record.systemName || record.areaName,
      },
      {
        title: '设备编号',
        align: 'center',
        dataIndex: 'deviceSn',
        editable: true,
        render: text => text || '-',
      },
      {
        title: '工单号',
        align: 'center',
        dataIndex: 'orderNumber',
        editable: true,
        render: (text, record) => <Tag color="#2db7f5">{record.orderNumber}</Tag>,
      },
      {
        title: '位置',
        align: 'center',
        dataIndex: 'position',
        editable: true,
      },
      {
        title: '报修情况',
        align: 'center',
        dataIndex: 'troubleDesc',
        editable: true,
      },
      {
        title: '报修人',
        align: 'center',
        dataIndex: 'executive',
        editable: true,
      },
      {
        title: '报修时间',
        align: 'center',
        dataIndex: 'sendTime',
        editable: true,
      },
      {
        title: '派单时间',
        align: 'center',
        dataIndex: 'orderTime',
        editable: true,
      },
      {
        title: '是否重要',
        align: 'center',
        dataIndex: 'importantFlag',
        editable: true,
        render: text => (text === 1 ? '重要' : '不重要'),
      },
      {
        title: '维修人',
        align: 'center',
        dataIndex: 'maintenance',
        editable: true,
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return (
            <>
              {record.imgUrl ? (
                <Icon type="picture" theme="twoTone" onClick={() => this.openImg(record.imgUrl)} />
              ) : (
                <Icon type="picture" title="暂无图片" />
              )}
            </>
          );
        },
      },
    ];
    const columns4 = [
      {
        title: '所在系统/区域',
        dataIndex: 'systemName',
        editable: true,
        render: (text, record) => record.systemName || record.areaName,
      },
      {
        title: '设备编号',
        align: 'center',
        dataIndex: 'deviceSn',
        editable: true,
        render: text => text || '-',
      },
      {
        title: '工单号',
        align: 'center',
        dataIndex: 'orderNumber',
        editable: true,
        render: (text, record) => <Tag color="#2db7f5">{record.orderNumber}</Tag>,
      },
      {
        title: '位置',
        align: 'center',
        dataIndex: 'position',
        editable: true,
      },
      {
        title: '报修情况',
        align: 'center',
        dataIndex: 'troubleDesc',
        editable: true,
      },
      {
        title: '报修人',
        align: 'center',
        dataIndex: 'executive',
        editable: true,
      },
      {
        title: '报修时间',
        align: 'center',
        dataIndex: 'sendTime',
        editable: true,
      },
      {
        title: '派单时间',
        align: 'center',
        dataIndex: 'orderTime',
        editable: true,
      },
      {
        title: '外派维修人',
        align: 'center',
        dataIndex: 'maintenance',
        editable: true,
      },
      {
        title: '联系方式',
        align: 'center',
        dataIndex: 'number',
        editable: true,
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return (
            <>
              {record.imgUrl ? (
                <Icon type="picture" theme="twoTone" onClick={() => this.openImg(record.imgUrl)} />
              ) : (
                <Icon type="picture" title="暂无图片" />
              )}
            </>
          );
        },
      },
    ];
    const columns5 = [
      {
        title: '所在系统/区域',
        dataIndex: 'systemName',
        editable: true,
        render: (text, record) => record.systemName || record.areaName,
      },
      {
        title: '设备编号',
        align: 'center',
        dataIndex: 'deviceSn',
        editable: true,
        render: text => text || '-',
      },
      {
        title: '工单号',
        align: 'center',
        dataIndex: 'orderNumber',
        editable: true,
        render: (text, record) => <Tag color="#2db7f5">{record.orderNumber}</Tag>,
      },
      {
        title: '位置',
        align: 'center',
        dataIndex: 'position',
        editable: true,
      },
      {
        title: '维修开始时间',
        align: 'center',
        dataIndex: 'createTime',
        editable: true,
      },
      {
        title: '维修结束时间',
        align: 'center',
        dataIndex: 'updateTime',
        editable: true,
      },
      {
        title: '维修时长',
        align: 'center',
        dataIndex: 'duration',
        editable: true,
        render: (text, record) => getDuration(record.createTime, record.updateTime),
      },
      {
        title: '维修人',
        align: 'center',
        dataIndex: 'maintenance',
        editable: true,
      },
    ];
    const tableColumns = columns1.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    const pagination = {
      total: maintainList.length,
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
    const radios = (
      <Radio.Group
        defaultValue={1}
        buttonStyle="solid"
        onChange={this.radioValueChange}
        style={{ marginBottom: 10 }}
      >
        <Radio.Button value={1}>待派工单</Radio.Button>
        <Radio.Button value={2}>已派工单</Radio.Button>
        <Radio.Button value={3}>未完成工单</Radio.Button>
        <Radio.Button value={4}>外派工单</Radio.Button>
        <Radio.Button value={5}>完成工单</Radio.Button>
      </Radio.Group>
    );
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const orderForm = (
      <Form {...formItemLayout}>
        <Form.Item label="是否重要">
          {getFieldDecorator('importantFlag', {
            initialValue: 1,
          })(
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="请选择维修人">
          {getFieldDecorator('maintenance')(
            <Select style={{ width: 130 }}>
              {staffList.map((item, i) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>
      </Form>
    );
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    return (
      <PageHeaderWrapper>
        <Card>
          <FilterForm formType="filter" filterType={1} filterSearch={this.filterSearch} />
        </Card>
        <Card
          title={radios}
          extra={
            <Button type="primary" icon="plus" onClick={this.newModelShow}>
              新增维修单
            </Button>
          }
        >
          <EditableContext.Provider value={this.props.form}>
            <Table
              components={components}
              bordered
              dataSource={unProcessedList}
              columns={
                orderType === 1
                  ? tableColumns
                  : orderType === 2
                  ? columns2
                  : orderType === 3
                  ? columns3
                  : orderType === 4
                  ? columns4
                  : columns5
              }
              rowClassName="editable-row"
              pagination={pagination}
            />
          </EditableContext.Provider>
          <Modal
            title="一键派单"
            center
            visible={orderModel}
            onOk={this.orderModelOk}
            onCancel={this.handleCancel}
          >
            {orderForm}
          </Modal>
          <Modal
            title="维修图片"
            center
            visible={imgModel}
            footer={null}
            onCancel={this.handleCancel}
          >
            {imgs.map((item, i) => (
              <img width="200" height="auto" style={{ marginRight: 20 }} src={item} key={i} />
            ))}
          </Modal>
          <Modal
            title="区域图片"
            center
            visible={areaModel}
            onCancel={this.handleCancel}
            footer={null}
          >
            <img src={areas} width="100%" />
          </Modal>
          <Modal
            title="新增维修单"
            visible={this.state.tableModel}
            onOk={this.newAdd}
            onCancel={() => {
              this.setState({ tableModel: false });
            }}
          >
            <FilterForm
              layoutType={1}
              formType="maintain"
              wrappedComponentRef={inst => (this.staffForm = inst)}
            />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
>>>>>>> 最终提交
