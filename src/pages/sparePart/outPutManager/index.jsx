<<<<<<< HEAD
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { connect } from 'dva'
import { Table, Icon, Tag, Select, Card, Form, DatePicker, Button, Radio } from 'antd'
import FilterForm from '../../../components/FilterForm'

// @connect(({ toolManager, loading }) => ({
//   toolManager,
//   loading: loading.effects['toolManager/fetch'],
// }))
export default class OutPutManager extends Component {
  componentDidMount() {
    // const { dispatch } = this.props
    // dispatch({
    //   type: 'toolManager/fetch'
    // })
  }

  // ToolForm的查询按钮
  filterSearch = (values) => {
    console.log(values)
  }

  render() {
    // const { toolManager } = this.props
    // const { toolList } = toolManager
    const columns = [
      { title: '日期', dataIndex: 'date' },
      { title: '工具名称', dataIndex: 'toolName', render: text => <Tag color='#2db7f5'>text</Tag> },
      { title: '数量', dataIndex: 'count' },
      { title: '单位', dataIndex: 'unit' },
      { title: '借出时间', dataIndex: 'useTime' },
      { title: '借出人员', dataIndex: 'useByName' },
      { title: '归还时间', dataIndex: 'returnTime' },
      { title: '归还人', dataIndex: 'returnByName' },
      { title: '备注', dataIndex: 'remark' },
      { title: '操作', render: (record) => !record.returnByName && <a title="归还" onClick={() => this.returnTool(record)}><Icon type="rollback" /></a> },
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
        <Button type="primary" onClick={this.outTool} style={{ marginRight: 20 }}>出库</Button>===
        <Button type="primary" onClick={this.inTool}>入库</Button>
      </>
    )
    return (
      <PageHeaderWrapper>
        <Card>
          <FilterForm formType="filter" filterType={2} filterSearch={this.filterSearch} />
        </Card>
        <Card title={radios} extra={buttons}>
          <Table
            bordered
            // dataSource={toolList}
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
  Card,
  Form,
  Radio,
  Divider,
  Popconfirm,
  Input,
  message,
  Modal,
  Button,
  Tag,
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
@connect(({ outPutManager, loading }) => ({
  outPutManager,
  loading: loading.effects['outPutManager/fetch'],
}))
export default class OutPutManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioType: 1,
      editingKey: '',
      visible: false,
      page: 1,
      pageSize: 7,
      newCheckData: [],
      newInPutData: [],
      newOutPutData: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'outPutManager/fetch',
    });
  }

  // FilterForm的查询按钮
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
      outPutManager: { outPutList },
    } = this.props;
    this.filterForm.props.form.validateFields((err, values) => {
      console.log(values);
      outPutList.unshift({ ...values, id: outPutList.length + 1, key: outPutList + 1 });
      this.setState({
        dataSource: outPutList,
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
      outPutManager: { outPutList },
    } = this.props;
    const { dispatch } = this.props;
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const index = outPutList.findIndex(item => key === item.key);
      const item = outPutList[index];
      outPutList.splice(index, 1, {
        ...item,
        ...row,
      });
      this.setState({ editingKey: '' });
      dispatch({
        type: 'outPutManager/save',
        payload: {
          outPutList: outPutList,
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
      outPutManager: { outPutList },
    } = this.props;
    const { dispatch } = this.props;
    dispatch({
      type: 'outPutManager/save',
      payload: {
        outPutList: outPutList.filter(item => item !== record),
      },
      callback: () => {
        message.success('删除成功');
      },
    });
  }
  //盘点
  check = record => {
    this.setState({
      visible: true,
      checkData: record,
    });
  };
  checkOk = () => {
    let { newCheckData, checkData } = this.state;
    let {
      outPutManager: { outPutList },
    } = this.props;
    this.filterForm.props.form.validateFields((err, values) => {
      console.log(values);
      let index = outPutList.findIndex(item => item === checkData);
      outPutList[index].count = values.acount;
      let checkTime = moment().format('YYYY-MM-DD hh:mm:ss');
      newCheckData.push({ ...checkData, ...values, checkTime });
      this.setState(
        {
          newCheckData: newCheckData,
          visible: false,
          checkData: null,
        },
        () => {
          console.log(newCheckData);
        },
      );
      message.success('盘点成功');
    });
    this.filterForm.props.form.resetFields();
  };
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
      outPutManager: { outPutList },
    } = this.props;
    this.filterForm.props.form.validateFields((err, values) => {
      console.log(values);
      let index = outPutList.findIndex(item => item === inPutData);
      outPutList[index].count += parseInt(values.inPutCount);
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
      outPutManager: { outPutList },
    } = this.props;
    this.filterForm.props.form.validateFields((err, values) => {
      console.log(values);
      let index = outPutList.findIndex(item => item === outPutData);
      outPutList[index].count -= values.outPutCount;
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

  render() {
    const {
      radioType,
      checkData,
      inPutData,
      outPutData,
      newCheckData,
      newInPutData,
      newOutPutData,
    } = this.state;
    const {
      outPutManager: { outPutList },
    } = this.props;
    const radios = (
      <Radio.Group
        defaultValue={1}
        buttonStyle="solid"
        onChange={this.radioValueChange}
        style={{ marginBottom: 10 }}
      >
        <Radio.Button value={1}>备件库存</Radio.Button>
        <Radio.Button value={2}>盘点记录</Radio.Button>
        <Radio.Button value={3}>入库记录</Radio.Button>
        <Radio.Button value={4}>出库记录</Radio.Button>
      </Radio.Group>
    );
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns = [
      { title: '所属系统', align: 'center', editable: true, dataIndex: 'systemName' },
      {
        title: '设备类型',
        align: 'center',
        editable: true,
        width: 200,
        dataIndex: 'deviceTypeName',
      },
      {
        title: '备件名称',
        align: 'center',
        editable: true,
        dataIndex: 'name',
        render: text => <Tag color="orange">{text}</Tag>,
      },
      {
        title: '备件规格型号',
        align: 'center',
        editable: true,
        width: 150,
        dataIndex: 'specification',
      },
      { title: '单位', align: 'center', editable: true, width: 80, dataIndex: 'unit' },
    ];
    const storeColumn = [
      ...columns,
      { title: '库存数量', align: 'center', editable: true, width: 80, dataIndex: 'count' },
      { title: '成本价/（元）', align: 'center', editable: true, width: 100, dataIndex: 'price' },
      {
        title: '操作',
        align: 'center',
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
              <Tag onClick={() => this.check(record)} color="#2db7f5">
                盘点
              </Tag>
              <Divider type="vertical" />
              <Tag onClick={() => this.inPut(record)} color="#2db7f5">
                入库
              </Tag>
              <Divider type="vertical" />
              <Tag onClick={() => this.outPut(record)} color="#2db7f5">
                出库
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
    const checkColumns = [
      ...columns,
      { title: '盘点前数量', align: 'center', editable: true, dataIndex: 'bcount' },
      { title: '盘点后数量', align: 'center', editable: true, dataIndex: 'acount' },
      { title: '时间', align: 'center', editable: true, dataIndex: 'checkTime' },
    ];
    const inPutColumns = [
      ...columns,
      { title: '入库来源', align: 'center', dataIndex: 'origin' },
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
      total: outPutList.length,
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
    const modalData = [
      { title: '新增', onOk: this.newAddOk, fromType: 'newAdd' },
      { title: '盘点', onOk: this.checkOk, fromType: 'check' },
      { title: '入库', onOk: this.inPutOk, fromType: 'outPut' },
      { title: '出库', onOk: this.outPutOk, fromType: 'outPut' },
    ];
    return (
      <PageHeaderWrapper>
        <Card>
          <FilterForm filterType={2} filterSearch={this.filterSearch} />
        </Card>
        <Card
          title={radios}
          extra={
            <Button type="primary" icon="plus" onClick={this.newAdd}>
              新增一条关联备件信息
            </Button>
          }
        >
          <EditableContext.Provider value={this.props.form}>
            <Table
              components={components}
              bordered
              dataSource={
                radioType === 1
                  ? outPutList
                  : radioType === 2
                  ? newCheckData
                  : radioType === 3
                  ? newInPutData
                  : newOutPutData
              }
              columns={
                radioType === 1
                  ? storeColumns
                  : radioType === 2
                  ? checkColumns
                  : radioType === 3
                  ? inPutColumns
                  : outPutColumns
              }
              rowClassName="editable-row"
              pagination={pagination}
            />
          </EditableContext.Provider>
          <Modal
            title={checkData ? '盘点' : inPutData ? '入库' : outPutData ? '出库' : '新增'}
            visible={this.state.visible}
            onOk={
              checkData
                ? this.checkOk
                : inPutData
                ? this.inPutOk
                : outPutData
                ? this.outPutOk
                : this.newAddOk
            }
            onCancel={() => {
              this.setState({ visible: false, checkData: null, inPutData: null, outPutData: null });
            }}
          >
            <FilterForm
              layoutType="horizontail"
              formType={
                checkData ? 'check' : inPutData ? 'inPut' : outPutData ? 'outPut' : 'newAdd'
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
