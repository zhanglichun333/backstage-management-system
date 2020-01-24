<<<<<<< HEAD
import React, { Component } from 'react'
import { Card, Table, Icon, Divider, Form, message, Popconfirm, Input, Button, Modal, Radio } from 'antd'
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import FilterForm from '../../components/FilterForm'

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

@connect(({ standingAndbasic, loading }) => ({
  standingAndbasic,
  loading: loading.effects['standingAndbasic/fetchDeviceBasic'],
}))
class DeviceBasic extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      editingKey: '',
      visible: false,
      page: 1,    //当前页数
      pageSize: 7,//当前条数
      orderType: 1
   }
  }

  componentDidMount() {
    this.queryData()
  }

  // 轮询
  queryData = () => {
    const {orderType} = this.state
    const { dispatch } = this.props
    switch (orderType) {
      case 1:
        return dispatch({
          type: 'standingAndbasic/fetchDeviceBasic'
        })
      case 2:
        return dispatch({
          type: 'standingAndbasic/fetchDeviceCheck',
        })
      case 3:
        return dispatch({
          type: 'standingAndbasic/fetchDeviceKeep',
        })
      case 4:
        return dispatch({
          type: 'standingAndbasic/fetchDeviceContex',
        })
      case 5:
        return dispatch({
          type: 'standingAndbasic/fetchToolContext',
        })
      default:
        return dispatch({
          type: 'standingAndbasic/fetchDeviceBasic'
        })
    }
  }
  // FilterForm的查询功能
  filterSearch(values) {
    console.log(values)
  }
  // radio value值的改变 请求数据/改变columns及dataSource
  radioValueChange = e => {
    this.setState({
      orderType: e.target.value
    }, () => {
      this.queryData()
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
    const { standingAndbasic: { deviceBasicList } } = this.props
    const { dispatch } = this.props
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      const newData = [...deviceBasicList]
      const index = newData.findIndex(item => key === item.key) //根据key值，找到编辑那行的index
      const item = newData[index]
      newData.splice(index, 1, {  //如果没改变，只有item, 如果改变row会把item覆盖， 采取这种方法是row!==item
        ...item,
        ...row,
      })
      this.setState({ editingKey: '' })
      dispatch({
        type: 'standingAndbasic/save',
        payload: {
          deviceBasicList: newData
        },
        callback: () => {
          message.success('修改成功')
        }
      })
    })
  }
  // 删除功能
  delete(record) {
    const { standingAndbasic:{ deviceBasicList} } = this.props
    const { dispatch } = this.props
    dispatch({
      type: 'standingAndbasic/save',
      payload: {
        deviceBasicList: deviceBasicList.filter((item) => item !== record)
      },
      callback: () => {
        message.success('删除成功')
      }
    })
  }
  //新增一条基础信息
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  newAdd = () => {
    const { standingAndbasic: { deviceBasicList } } = this.props
    const { dispatch } = this.props
    let newCell = this.staffForm.props.form.getFieldsValue()
    deviceBasicList.unshift(newCell)
    dispatch({
      type: 'standingAndbasic/save',
      payload: {
        deviceBasicList: deviceBasicList
      },
      callback: () => {
        this.setState({visible: false})
        message.success('新增成功')
      }
    })
  }

  render() {
    const {orderType} = this.state
    const { standingAndbasic: { deviceBasicList, deviceCheckList, deviceKeepList, deviceContextList, toolContextList } } = this.props
    const components = {
      body: {
        cell: EditableCell,
      },
    }
    const columns1 = [{
      title: '所属系统',
      width: 200,
      dataIndex: 'systemName',
      editable: true
    }, {
      title: '设备类型',
      align: 'center',
      width: 130,
      dataIndex: 'deviceTypeName',
      editable: true
    }, {
      title: '设备编号',
      align: 'center',
      width: 130,
      dataIndex: 'sn',
      editable: true
    }, {
      title: '设备名称',
      width: 130,
      align: 'center',
      dataIndex: 'name',
      editable: true
    }, {
      title: '型号',
      align: 'center',
      width: 400,
      dataIndex: 'model',
      editable: true
    }, {
      title: '生产厂家',
      align: 'center',
      width: 130,
      dataIndex: 'productFactory',
      editable: true
    }, {
      title: '出厂日期',
      align: 'center',
      width: 130,
      dataIndex: 'productDate',
      editable: true
    }, {
      title: '操作',
      align: 'center',
      width: 130,
      render: (text, record) => {
        const { editingKey } = this.state
        const editable = this.isEditing(record)  //true or false
        return editable ?
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
            <>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}> <Icon type="edit" /></a>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
              </Popconfirm>
            </>
          )
      }
    }]
    const columns2 = [{
      title: '所属系统',
      width: 200,
      dataIndex: 'systemName',
      editable: true
    }, {
      title: '设备类型',
      align: 'center',
      width: 130,
      dataIndex: 'deviceTypeName',
      editable: true
    }, {
      title: '类型编号',
      align: 'center',
      width: 130,
      dataIndex: 'id',
      editable: true
    }, {
      title: '检查週期',
      width: 130,
      align: 'center',
      dataIndex: 'period',
      editable: true,
      render: (text, record) => {
        let config = {
          '0': '日检',
          '1': '月检',
          '2': '年检',
        }
        return config[text]
      }
    }, {
      title: '检查方法',
      align: 'center',
      width: 400,
      dataIndex: 'checkMethod',
      editable: true
    }, {
      title: '选项',
      align: 'center',
      width: 130,
      dataIndex: 'option',
      editable: true
    }, {
      title: '单位',
      align: 'center',
      width: 130,
      dataIndex: 'unit',
      editable: true
    },{
      title: '备注',
      align: 'center',
      width: 130,
      dataIndex: 'remark',
      editable: true
    }, {
      title: '操作',
      align: 'center',
      width: 130,
      render: (text, record) => {
        const { editingKey } = this.state
        const editable = this.isEditing(record)  //true or false
        return editable ?
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
            <>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}> <Icon type="edit" /></a>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
              </Popconfirm>
            </>
          )
      }
    }]
    const columns3 = [{
      title: '所属系统',
      width: 200,
      dataIndex: 'systemName',
      editable: true
    }, {
      title: '设备类型',
      align: 'center',
      width: 200,
      dataIndex: 'deviceTypeName',
      editable: true
    }, {
      title: '保养项目',
      align: 'center',
      width: 200,
      dataIndex: 'name',
      editable: true
    }, {
      title: '周期',
      width: 130,
      align: 'center',
      dataIndex: 'period',
      editable: true,
      render: (text, record) => {
        let config = {
          '0': '日检',
          '1': '月检',
          '2': '年检',
        }
        return config[text]
      }
    }, {
      title: '选项',
      align: 'center',
      width: 130,
      dataIndex: 'option',
      editable: true
    }, {
      title: '单位',
      align: 'center',
      width: 130,
      dataIndex: 'unit',
      editable: true
    },{
      title: '备注',
      align: 'center',
      width: 130,
      dataIndex: 'productFactory',
      editable: true
    },{
      title: '操作',
      align: 'center',
      width: 130,
      render: (text, record) => {
        const { editingKey } = this.state
        const editable = this.isEditing(record)  //true or false
        return editable ?
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
            <>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}> <Icon type="edit" /></a>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
              </Popconfirm>
            </>
          )
      }
    }]
    const columns4 = [{
      title: '所在系统',
      width: 200,
      dataIndex: 'systemName',
      editable: true
    }, {
      title: '设备类型',
      align: 'center',
      width: 200,
      dataIndex: 'deviceTypeName',
      editable: true
    }, {
      title: '备件名称',
      align: 'center',
      width: 200,
      dataIndex: 'name',
      editable: true
    }, {
      title: '备件规格型号',
      width: 130,
      align: 'center',
      dataIndex: 'specification',
      editable: true
    }, {
      title: '备件数量',
      align: 'center',
      width: 130,
      dataIndex: 'count',
      editable: true
    }, {
      title: '单位',
      align: 'center',
      width: 130,
      dataIndex: 'unit',
      editable: true
    }, {
      title: '成本价',
      align: 'center',
      width: 130,
      dataIndex: 'price',
      editable: true
    },{
      title: '预警值',
      align: 'center',
      width: 130,
      dataIndex: 'lowerWarningStock',
      editable: true
    }, {
      title: '操作',
      align: 'center',
      width: 130,
      render: (text, record) => {
        const { editingKey } = this.state
        const editable = this.isEditing(record)  //true or false
        return editable ?
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
            <>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}> <Icon type="edit" /></a>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
              </Popconfirm>
            </>
          )
      }
    }]
    const columns5 = [{
      title: '工具名称',
      dataIndex: 'name',
      editable: true
    }, {
      title: '工具规格型号',
      align: 'center',
      dataIndex: 'specification',
      editable: true
    }, {
      title: '工具数量',
      align: 'center',
      dataIndex: 'count',
      editable: true
    }, {
      title: '单位',
      align: 'center',
      dataIndex: 'unit',
      editable: true
    }, {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      editable: true
    }, {
      title: '操作',
      align: 'center',
      width: 130,
      render: (text, record) => {
        const { editingKey } = this.state
        const editable = this.isEditing(record)  //true or false
        return editable ?
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
            <>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}> <Icon type="edit" /></a>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
              </Popconfirm>
            </>
          )
      }
    }]
    const columnses = [columns1, columns2, columns3, columns4, columns5]
    const editColumns = columnses.map(columns => columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      }
    }))
    const pagination = {
      total: deviceBasicList.length,
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
        <Radio.Button value={1}>设备基础信息</Radio.Button>
        <Radio.Button value={2}>点检基础信息</Radio.Button>
        <Radio.Button value={3}>保养基础信息</Radio.Button>
        <Radio.Button value={4}>关联备件基础信息</Radio.Button>
        <Radio.Button value={5}>工具基础信息</Radio.Button>
      </Radio.Group>
    )
    return (
      <PageHeaderWrapper>
        <Card><FilterForm formType="filter" filterType={2}  filterSearch={this.filterSearch} /></Card>
        <Card title={radios} extra={<Button type="primary" icon="plus" onClick={this.showModal}>新增一条基础信息</Button>}>
          <EditableContext.Provider value={this.props.form}>
            <Table
              components={components}
              bordered
              dataSource={orderType === 1 ? deviceBasicList : orderType === 2 ? deviceCheckList : orderType === 3 ? deviceKeepList : orderType === 4 ? deviceContextList : toolContextList}
              columns={orderType === 1 ? editColumns[0] : orderType === 2 ? editColumns[1] : orderType === 3 ? editColumns[2] : orderType === 4 ? editColumns[3] : editColumns[4]}
              rowClassName="editable-row"
              pagination={pagination}
            />
          </EditableContext.Provider>
          <Modal
            title="新增一条基础信息"
            visible={this.state.visible}
            onOk={this.newAdd}
            onCancel={() => {this.setState({visible:false})}}
          >
            <FilterForm layoutType={1} formType="deviceBasic" wrappedComponentRef={(inst) => this.staffForm = inst}/>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default Form.create({})(DeviceBasic)
=======
import React, { Component } from 'react';
import {
  Card,
  Table,
  Icon,
  Divider,
  Form,
  message,
  Popconfirm,
  Input,
  Button,
  Modal,
  Radio,
} from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FilterForm from '../../components/FilterForm';

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
@connect(({ standingAndbasic, loading }) => ({
  standingAndbasic,
  loading: loading.effects['standingAndbasic/fetchDeviceBasic'],
}))
export default class DeviceBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: '',
      visible: false,
      page: 1, //当前页数z
      pageSize: 7, //当前条数
      orderType: '设备基础信息',
    };
  }

  componentDidMount() {
    this.queryData();
  }

  // 轮询
  queryData = () => {
    const { orderType } = this.state;
    const { dispatch } = this.props;
    switch (orderType) {
      case '点检基础信息':
        return dispatch({
          type: 'standingAndbasic/fetchDeviceCheck',
        });
      case '保养基础信息':
        return dispatch({
          type: 'standingAndbasic/fetchDeviceKeep',
        });
      case '关联备件基础信息':
        return dispatch({
          type: 'standingAndbasic/fetchDeviceContex',
        });
      case '工具基础信息':
        return dispatch({
          type: 'standingAndbasic/fetchToolContext',
        });
      default:
        return dispatch({
          type: 'standingAndbasic/fetchDeviceBasic',
        });
    }
  };
  // FilterForm的查询功能
  filterSearch = values => {
    console.log(values);
  };
  // radio value值的改变 请求数据/改变columns及dataSource
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
  // 编辑功能
  edit(key) {
    this.setState({ editingKey: key });
  }
  isEditing = record => record.key === this.state.editingKey;
  cancel() {
    this.setState({ editingKey: '' });
  }
  // 保存功能
  save(form, key) {
    const {
      standingAndbasic: { deviceBasicList },
    } = this.props;
    const { dispatch } = this.props;
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...deviceBasicList];
      const index = newData.findIndex(item => key === item.key); //根据key值，找到编辑那行的index
      const item = newData[index];
      newData.splice(index, 1, {
        //如果没改变，只有item, 如果改变row会把item覆盖， 采取这种方法是row!==item
        ...item,
        ...row,
      });
      this.setState({ editingKey: '' });
      dispatch({
        type: 'standingAndbasic/save',
        payload: {
          deviceBasicList: newData,
        },
        callback: () => {
          message.success('修改成功');
        },
      });
    });
  }
  // 删除功能
  delete(record) {
    const {
      standingAndbasic: { deviceBasicList },
    } = this.props;
    const { dispatch } = this.props;
    dispatch({
      type: 'standingAndbasic/save',
      payload: {
        deviceBasicList: deviceBasicList.filter(item => item !== record),
      },
      callback: () => {
        message.success('删除成功');
      },
    });
  }
  //新增一条基础信息
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  newAdd = () => {
    const {
      standingAndbasic: {
        deviceBasicList,
        deviceCheckList,
        deviceKeepList,
        deviceContextList,
        toolContextList,
      },
      dispatch,
    } = this.props;
    const { orderType } = this.state;
    let list =
      orderType === '设备基础信息'
        ? deviceBasicList
        : orderType === '点检基础信息'
        ? deviceCheckList
        : orderType === '保养基础信息'
        ? deviceKeepList
        : orderType === '关联备件基础信息'
        ? deviceContextList
        : toolContextList;
    let newCell = this.filterForm.props.form.getFieldsValue();
    let payload = {};
    payload[list] = list.unshift(newCell);
    dispatch({
      type: 'standingAndbasic/save',
      payload,
      callback: () => {
        this.setState({ visible: false });
        message.success('新增成功');
      },
    });
    this.filterForm.props.form.resetFields();
  };

  render() {
    const { orderType } = this.state;
    const {
      standingAndbasic: {
        deviceBasicList,
        deviceCheckList,
        deviceKeepList,
        deviceContextList,
        toolContextList,
      },
    } = this.props;
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns1 = [
      {
        title: '所属系统',
        width: 200,
        dataIndex: 'systemName',
        editable: true,
      },
      {
        title: '设备类型',
        align: 'center',
        width: 130,
        dataIndex: 'deviceTypeName',
        editable: true,
      },
      {
        title: '设备编号',
        align: 'center',
        width: 130,
        dataIndex: 'sn',
        editable: true,
      },
      {
        title: '设备名称',
        width: 130,
        align: 'center',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '型号',
        align: 'center',
        width: 400,
        dataIndex: 'model',
        editable: true,
      },
      {
        title: '生产厂家',
        align: 'center',
        width: 130,
        dataIndex: 'productFactory',
        editable: true,
      },
      {
        title: '出厂日期',
        align: 'center',
        width: 130,
        dataIndex: 'productDate',
        editable: true,
      },
      {
        title: '操作',
        align: 'center',
        width: 130,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record); //true or false
          return editable ? (
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
            <>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                {' '}
                <Icon type="edit" />
              </a>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
              </Popconfirm>
            </>
          );
        },
      },
    ];
    const columns2 = [
      {
        title: '所属系统',
        width: 200,
        dataIndex: 'systemName',
        editable: true,
      },
      {
        title: '设备类型',
        align: 'center',
        width: 130,
        dataIndex: 'deviceTypeName',
        editable: true,
      },
      {
        title: '检查方法',
        align: 'center',
        width: 400,
        dataIndex: 'checkMethod',
        editable: true,
      },
      {
        title: '检查周期',
        width: 130,
        align: 'center',
        dataIndex: 'period',
        editable: true,
        render: (text, record) => {
          let config = {
            '0': '日检',
            '1': '月检',
            '2': '年检',
          };
          return config[text];
        },
      },
      {
        title: '选项',
        align: 'center',
        width: 130,
        dataIndex: 'option',
        editable: true,
      },
      {
        title: '单位',
        align: 'center',
        width: 130,
        dataIndex: 'unit',
        editable: true,
      },
      {
        title: '备注',
        align: 'center',
        width: 130,
        dataIndex: 'remark',
        editable: true,
      },
      {
        title: '操作',
        align: 'center',
        width: 130,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record); //true or false
          return editable ? (
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
            <>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                {' '}
                <Icon type="edit" />
              </a>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
              </Popconfirm>
            </>
          );
        },
      },
    ];
    const columns3 = [
      {
        title: '所属系统',
        width: 200,
        dataIndex: 'systemName',
        editable: true,
      },
      {
        title: '设备类型',
        align: 'center',
        width: 200,
        dataIndex: 'deviceTypeName',
        editable: true,
      },
      {
        title: '保养项目',
        align: 'center',
        width: 200,
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '周期',
        width: 130,
        align: 'center',
        dataIndex: 'period',
        editable: true,
        render: (text, record) => {
          let config = {
            '0': '日检',
            '1': '月检',
            '2': '年检',
          };
          return config[text];
        },
      },
      {
        title: '选项',
        align: 'center',
        width: 130,
        dataIndex: 'option',
        editable: true,
      },
      {
        title: '单位',
        align: 'center',
        width: 130,
        dataIndex: 'unit',
        editable: true,
      },
      {
        title: '备注',
        align: 'center',
        width: 130,
        dataIndex: 'productFactory',
        editable: true,
      },
      {
        title: '操作',
        align: 'center',
        width: 130,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record); //true or false
          return editable ? (
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
            <>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                {' '}
                <Icon type="edit" />
              </a>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
              </Popconfirm>
            </>
          );
        },
      },
    ];
    const columns4 = [
      {
        title: '所在系统',
        width: 200,
        dataIndex: 'systemName',
        editable: true,
      },
      {
        title: '设备类型',
        align: 'center',
        width: 200,
        dataIndex: 'deviceTypeName',
        editable: true,
      },
      {
        title: '备件名称',
        align: 'center',
        width: 200,
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '备件规格型号',
        width: 130,
        align: 'center',
        dataIndex: 'specification',
        editable: true,
      },
      {
        title: '备件数量',
        align: 'center',
        width: 130,
        dataIndex: 'count',
        editable: true,
      },
      {
        title: '单位',
        align: 'center',
        width: 130,
        dataIndex: 'unit',
        editable: true,
      },
      {
        title: '成本价',
        align: 'center',
        width: 130,
        dataIndex: 'price',
        editable: true,
      },
      {
        title: '预警值',
        align: 'center',
        width: 130,
        dataIndex: 'lowerWarningStock',
        editable: true,
      },
      {
        title: '操作',
        align: 'center',
        width: 130,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record); //true or false
          return editable ? (
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
            <>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                {' '}
                <Icon type="edit" />
              </a>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
              </Popconfirm>
            </>
          );
        },
      },
    ];
    const columns5 = [
      {
        title: '工具名称',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '工具规格型号',
        align: 'center',
        dataIndex: 'specification',
        editable: true,
      },
      {
        title: '工具数量',
        align: 'center',
        dataIndex: 'count',
        editable: true,
      },
      {
        title: '单位',
        align: 'center',
        dataIndex: 'unit',
        editable: true,
      },
      {
        title: '备注',
        align: 'center',
        dataIndex: 'remark',
        editable: true,
      },
      {
        title: '操作',
        align: 'center',
        width: 130,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record); //true or false
          return editable ? (
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
            <>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                {' '}
                <Icon type="edit" />
              </a>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
              </Popconfirm>
            </>
          );
        },
      },
    ];
    const columnses = [columns1, columns2, columns3, columns4, columns5];
    const editColumns = columnses.map(columns =>
      columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      }),
    );
    const arrData = [
      {
        title: '设备基础信息',
        colu: editColumns[0],
        data: deviceBasicList,
        formType: 'deviceBasic',
      },
      {
        title: '点检基础信息',
        colu: editColumns[1],
        data: deviceCheckList,
        formType: 'deviceCheck',
      },
      {
        title: '保养基础信息',
        colu: editColumns[2],
        data: deviceKeepList,
        formType: 'deviceKeep',
      },
      {
        title: '关联备件基础信息',
        colu: editColumns[3],
        data: deviceContextList,
        formType: 'deviceContext',
      },
      {
        title: '工具基础信息',
        colu: editColumns[4],
        data: toolContextList,
        formType: 'toolContext',
      },
    ];
    const currentData = arrData.filter(item => item.title === orderType)[0];
    const radios = (
      <Radio.Group
        defaultValue="设备基础信息"
        buttonStyle="solid"
        onChange={this.radioValueChange}
        style={{ marginBottom: 10 }}
      >
        {arrData.map(item => (
          <Radio.Button value={item.title}>{item.title}</Radio.Button>
        ))}
      </Radio.Group>
    );
    const pagination = {
      total: currentData.length,
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
        <Card
          title={radios}
          extra={
            <Button type="primary" icon="plus" onClick={this.showModal}>
              新增一条基础信息
            </Button>
          }
        >
          <EditableContext.Provider value={this.props.form}>
            <Table
              components={components}
              bordered
              dataSource={currentData.data}
              columns={currentData.colu}
              rowClassName="editable-row"
              pagination={pagination}
            />
          </EditableContext.Provider>
          <Modal
            title={`新增${currentData.title}`}
            visible={this.state.visible}
            onOk={this.newAdd}
            onCancel={() => {
              this.setState({ visible: false });
            }}
          >
            <FilterForm
              layoutType={1}
              formType={currentData.formType}
              wrappedComponentRef={inst => (this.filterForm = inst)}
            />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
>>>>>>> 最终提交
