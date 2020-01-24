<<<<<<< HEAD
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { connect } from 'dva'
import { Table, Icon, Tag, Select, Card, Form, DatePicker, Button, Radio  } from 'antd'
import FilterForm from '../../../components/FilterForm'

@connect(({ toolManager, loading }) => ({
  toolManager,
  loading: loading.effects['toolManager/fetch'],
}))
export default class ToolManager extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'toolManager/fetch'
    })
  }

  // ToolForm的查询按钮
  filterSearch = (values) => {
    console.log(values)
  }

  render() {
    const { toolManager } = this.props
    const { toolList } = toolManager
    const columns = [
      { title: '日期', dataIndex: 'date' },
      { title: '工具名称', dataIndex: 'toolName', render: text => <Tag color='#2db7f5'>text</Tag>},
      { title: '数量', dataIndex: 'count' },
      { title: '单位', dataIndex: 'unit' },
      { title: '借出时间', dataIndex: 'useTime' },
      { title: '借出人员', dataIndex: 'useByName' },
      { title: '归还时间', dataIndex: 'returnTime' },
      { title: '归还人', dataIndex: 'returnByName' },
      { title: '备注', dataIndex: 'remark' },
      {title: '操作', render: (record) => !record.returnByName && <a title="归还" onClick={() => this.returnTool(record)}><Icon type="rollback" /></a>},
    ]
    const radios = (
      <Radio.Group defaultValue={1} buttonStyle="solid" onChange={this.radioValueChange} style={{ marginBottom: 10 }}>
        <Radio.Button value={1}>出库记录</Radio.Button>
        <Radio.Button value={2}>入库记录</Radio.Button>
        <Radio.Button value={3}>盘点记录</Radio.Button>
      </Radio.Group>
    )
    const buttons = (
      <>
        <Button type="primary" onClick={this.outTool} style={{marginRight: 20}}>出库</Button>
        <Button type="primary" onClick={this.inTool}>入库</Button>
      </>
    )
    return (
      <PageHeaderWrapper>
        <Card>
          <FilterForm formType="toolManager" filterType={3} filterSearch={this.filterSearch} />
        </Card>
        <Card title={radios} extra={buttons}>
          <Table
            bordered
            dataSource={toolList}
            columns={columns}
          />
        </Card>
      </PageHeaderWrapper>
    )
  }
}
=======
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import {
  Table,
  Icon,
  Tag,
  Form,
  Card,
  Button,
  Radio,
  Divider,
  Popconfirm,
  Modal,
  message,
  Input,
} from 'antd';
import FilterForm from '../../../components/FilterForm';

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
@connect(({ toolManager, loading }) => ({
  toolManager,
  loading: loading.effects['toolManager/fetch'],
}))
export default class ToolManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioType: 1,
      editingKey: '',
      visible: false,
      page: 1, //当前页数z
      pageSize: 7, //当前条数
      newInPutData: [],
      newOutPutData: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'toolManager/fetch',
    });
  }

  // ToolForm的查询按钮
  filterSearch = values => {
    console.log(values);
  };
  // radioType
  radioValueChange = e => {
    this.setState({ radioType: e.target.value });
  };
  //新增
  newAdd = () => {
    this.setState({
      visible: true,
    });
  };
  newAddOk = () => {
    let {
      toolManager: { toolList },
    } = this.props;
    this.filterForm.props.form.validateFields((err, values) => {
      console.log(values);
      toolList.unshift({ ...values, id: toolList.length + 1, key: toolList + 1 });
      this.setState({
        dataSource: toolList,
        visible: false,
      });
      message.success('新增成功');
    });
    this.filterForm.props.form.resetFields();
  };
  // 编辑功能
  isEditing = record => record.key === this.state.editingKey;
  cancel = () => {
    this.setState({ editingKey: '' });
  };
  save(form, key) {
    const {
      toolManager: { toolList },
    } = this.props;
    const { dispatch } = this.props;
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const index = toolList.findIndex(item => key === item.key);
      const item = toolList[index];
      toolList.splice(index, 1, {
        ...item,
        ...row,
      });
      this.setState({ editingKey: '' });
      dispatch({
        type: 'toolManager/save',
        payload: {
          toolList: toolList,
        },
        callback: () => {
          message.success('修改成功');
        },
      });
    });
  }
  edit(key) {
    this.setState({ editingKey: key });
  }
  // 删除功能
  delete(record) {
    const {
      toolManager: { toolList },
    } = this.props;
    const { dispatch } = this.props;
    dispatch({
      type: 'toolManager/save',
      payload: {
        toolList: toolList.filter(item => item !== record),
      },
      callback: () => {
        message.success('删除成功');
      },
    });
  }
  //入库
  inPut = record => {
    this.setState({
      visible: true,
      inPutData: record,
    });
  };
  inPutOk = () => {
    let { newInPutData, inPutData } = this.state;
    let {
      toolManager: { toolList },
    } = this.props;
    this.filterForm.props.form.validateFields((err, values) => {
      console.log(values);
      let index = toolList.findIndex(item => item === inPutData);
      toolList[index].count += parseInt(values.inPutCount);
      let inPutTime = moment().format('YYYY-MM-DD hh:mm:ss');
      newInPutData.push({ ...inPutData, ...values, inPutTime });
      this.setState({
        newInPutData: newInPutData,
        visible: false,
        inPutData: null,
      });
      message.success('入库成功');
    });
    this.filterForm.props.form.resetFields();
  };
  // 出库
  outPut = record => {
    this.setState({
      visible: true,
      outPutData: record,
    });
  };
  outPutOk = () => {
    let { newOutPutData, outPutData } = this.state;
    let {
      toolManager: { toolList },
    } = this.props;
    this.filterForm.props.form.validateFields((err, values) => {
      console.log(values);
      let index = toolList.findIndex(item => item === outPutData);
      toolList[index].count -= values.outPutCount;
      let outPutTime = moment().format('YYYY-MM-DD hh:mm:ss');
      newOutPutData.push({ ...outPutData, ...values, outPutTime });
      this.setState({
        newOutPutData: newOutPutData,
        visible: false,
        outPutData: null,
      });
      message.success('出库成功');
    });
    this.filterForm.props.form.resetFields();
  };
  // 归还
  return = record => {
    this.setState({
      visible: true,
      returnData: record,
    });
  };
  returnOk = () => {
    let { returnData } = this.state;
    let {
      toolManager: { toolList },
    } = this.props;
    this.filterForm.props.form.validateFields((err, values) => {
      console.log(values);
      let index = toolList.findIndex(item => item === returnData);
      toolList[index].count += parseInt(values.returnCount);
      this.setState({
        visible: false,
        returnData: null,
      });
      message.success('归还成功');
    });
    this.filterForm.props.form.resetFields();
  };

  render() {
    const {
      radioType,
      inPutData,
      outPutData,
      returnData,
      newInPutData,
      newOutPutData,
    } = this.state;
    const {
      toolManager: { toolList },
    } = this.props;
    const radios = (
      <Radio.Group
        defaultValue={1}
        buttonStyle="solid"
        onChange={this.radioValueChange}
        style={{ marginBottom: 10 }}
      >
        <Radio.Button value={1}>工具库存</Radio.Button>
        <Radio.Button value={2}>入库记录</Radio.Button>
        <Radio.Button value={3}>出库记录</Radio.Button>
      </Radio.Group>
    );
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns = [
      {
        title: '工具名称',
        dataIndex: 'name',
        editable: true,
        render: text => <Tag color="orange">{text}</Tag>,
      },
      { title: '工具规格型号', align: 'center', dataIndex: 'specification', editable: true },
      { title: '单位', align: 'center', dataIndex: 'unit', editable: true },
    ];
    const storeColumn = [
      ...columns,
      { title: '工具数量', align: 'center', dataIndex: 'count', editable: true },
      { title: '备注', align: 'center', dataIndex: 'remark', editable: true },
      {
        title: '操作',
        align: 'center',
        width: 400,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return (
            <>
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
                <>
                  <Tag
                    disabled={editingKey !== ''}
                    onClick={() => this.edit(record.key)}
                    color="#2db7f5"
                  >
                    <Icon type="edit" />
                  </Tag>
                  <Divider type="vertical" />
                  <Popconfirm title="确定要删除?" onConfirm={() => this.delete(record)}>
                    <Tag color="red">
                      <Icon type="delete" />
                    </Tag>
                  </Popconfirm>
                </>
              )}
              <Divider type="vertical" />
              <Tag onClick={() => this.inPut(record)} color="#2db7f5">
                入库
              </Tag>
              <Divider type="vertical" />
              <Tag onClick={() => this.outPut(record)} color="#2db7f5">
                出库
              </Tag>
              <Divider type="vertical" />
              <Tag onClick={() => this.return(record)} color="#2db7f5">
                归还
              </Tag>
            </>
          );
        },
      },
    ];
    const storeColumns = storeColumn.map(col => {
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
    });
    const inPutColumns = [
      ...columns,
      { title: '数量', align: 'center', dataIndex: 'inPutCount' },
      { title: '入库人', align: 'center', dataIndex: 'inPutMan' },
      { title: '时间', align: 'center', dataIndex: 'inPutTime' },
    ];
    const outPutColumns = [
      { title: '工单号', dataIndex: 'number' },
      ...columns,
      { title: '数量', align: 'center', dataIndex: 'outPutCount' },
      { title: '领用人', align: 'center', dataIndex: 'outPutMan' },
      { title: '时间', align: 'center', dataIndex: 'outPutTime' },
    ];
    const pagination = {
      total: toolList.length,
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
          <FilterForm formType="toolFilter" filterType={3} filterSearch={this.filterSearch} />
        </Card>
        <Card
          title={radios}
          extra={
            <Button type="primary" icon="plus" onClick={this.newAdd}>
              新增一条工具信息
            </Button>
          }
        >
          <EditableContext.Provider value={this.props.form}>
            <Table
              components={components}
              bordered
              dataSource={
                radioType === 1 ? toolList : radioType === 2 ? newInPutData : newOutPutData
              }
              columns={
                radioType === 1 ? storeColumns : radioType === 2 ? inPutColumns : outPutColumns
              }
              rowClassName="editable-row"
              pagination={pagination}
            />
          </EditableContext.Provider>
          <Modal
            title={inPutData ? '入库' : outPutData ? '出库' : returnData ? '归还' : '新增'}
            visible={this.state.visible}
            onOk={
              inPutData
                ? this.inPutOk
                : outPutData
                ? this.outPutOk
                : returnData
                ? this.returnOk
                : this.newAddOk
            }
            onCancel={() => {
              this.setState({ visible: false, checkData: null, inPutData: null, outPutData: null });
            }}
          >
            <FilterForm
              layoutType="horizontail"
              formType={
                inPutData ? 'inPuts' : outPutData ? 'outPut' : returnData ? 'return' : 'newAdd'
              }
              wrappedComponentRef={inst => (this.filterForm = inst)}
            />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
>>>>>>> 最终提交
