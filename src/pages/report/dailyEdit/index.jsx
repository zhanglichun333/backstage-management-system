<<<<<<< HEAD
import React from 'react'
import { connect } from 'dva'
import { Card, Row, Col, Icon, Button, Divider, List, Modal, Form, Input, message, AutoComplete } from 'antd'
import Cards from '../../../components/Cards'
const { Search } = Input

@Form.create()
@connect(({ global }) => ({
  global
}))
export default class DailyEdit extends React.Component {
  state= {
    visible: false,
    listData: [],
    systemData: ['空调及机械通风系统','电力系统','照明系统','通讯系统','消防系统','保安系统','繫泊及登船系统','供水及排水系统','升降机类设备','行李处理系统','石油气系统','其他基础设施']

  }

  // Model显隐
  modelShow = () => {
    this.setState({visible: true})
  }
  //Modal 添加确认框
  addSumbit = () => {
    let { listData } = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.setState({
          listData: [...listData, { ...values }],
          visible: false
        })
        message.success('添加成功')
      }
    })
    this.props.form.resetFields()
  }
  //添加标题
  onSelect = (value) => {
    let {systemData} = this.state
    this.setState({
      systemData: systemData.filter(item => item !== value)
    })
  }
  // Form表单 增加一个工作内容
  add = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(keys.length);
    form.setFieldsValue({
      keys: nextKeys,
    })
  }
  // Form表单 移除工作内容
  remove = k => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }
  // 整个工作汇报提交
  allSumbit = () => {
    console.log('listData', this.state.listData)
    const { dispatch } = this.props
    dispatch({
      type: 'global/saveDailyList',
      payload: {
        dailyList: this.state.listData
      }
    })
    console.log(this.props)
    message.success('每日工作汇报提交成功')
  }
  // List 增加
  addList = (listItem) => {
    console.log('addListItem', listItem)
    this.setState({ addListItem: listItem})
  }
  confirm = (value) => {
    console.log('value', value )
    let {addListItem, listData} = this.state
    addListItem.names.push(value)
    addListItem.keys.push(addListItem.keys.length)
    let index = listData.findIndex(item => item.title===addListItem.title)
    listData.splice(index, 1, addListItem)
    this.setState({listData, addListItem:null})
    message.success('增加成功')
  }
  cancal = () => {
    this.setState({addListItem: null})
  }
  // List 编辑
  editList = (listItem) => {
    console.log('listItem', listItem)
    this.setState({
      visible: true,
      editListItem: listItem
    })
  }
  //Modal 编辑确认框
  eidtSumbit = () => {
    let { listData } = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        let index = listData.findIndex(item => item.title !== values.title)
        listData.splice(index, 1, values)
        this.setState({
          listData: listData,
          visible: false,
          editListItem: null
        })
      }
      message.success('编辑成功')
    })
    this.props.form.resetFields()
  }
  // List 删除
  deleteList = (listItem) => {
    console.log('listItem', listItem)
    let { listData } = this.state
    this.setState({
      listData: listData.filter(item => item !== listItem)
    })
    message.success('删除成功')
  }

  render() {
    const { editListItem, addListItem, systemData} = this.state
    const buttons = (
      <>
        <p style={{ color: '#1890FF'}}>填写完工作内容后记得提交哦！</p>
        <Button icon="plus" type="dashed" style={{ marginRight: 10 }} onClick={this.modelShow}>添加</Button>
        <Button type="primary" onClick={this.allSumbit}>提交</Button>
      </>
    )
    const { getFieldDecorator, getFieldValue } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 18, offset: 6}
    }
    getFieldDecorator('keys', { initialValue: editListItem? editListItem.keys: [0] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k,index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '工作内容' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${index}]`, {
          initialValue: editListItem && editListItem.names[k] ? editListItem.names[k] : '',
          rules: [
            { required: true, whitespace: true, message: '请选择系统和自定义输入标题' },
          ]
        })(<Input addonBefore={<span>{index+1}</span>} style={{ width: '80%', marginRight: 8 }}/>)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ))
    return (
      <Row gutter={40}>
        <Col span={7}>
          <Cards title="每日统计" width="100%" />
        </Col>
        <Col span={17}>
          <Card title="每日汇报编辑" extra={buttons}>
            <List
              locale
              dataSource={this.state.listData}
              renderItem={item => (
                <List.Item>
                  <Card
                    title={item.title}
                    extra={
                      <>
                        <a href="#" onClick={() => this.addList(item)}>增加</a>
                        <Divider type="vertical" />
                        <a href="#" onClick={() => this.editList(item)}>编辑</a>
                        <Divider type="vertical" />
                        <a href="#" onClick={() => this.deleteList(item)}>删除</a>
                      </>
                    }
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
                      {
                        addListItem ?
                          (<>
                            <Search
                              addonBefore={<span>{addListItem.names.length + 1}</span>}
                              placeholder="请输入工作内容" enterButton="确定"
                              onSearch={this.confirm}
                              style={{ width: 800 }}
                            />
                            <Button type="danger" onClick={this.cancal} style={{ marginLeft: 8 }}>取消</Button>
                          </>) : <></>
                      }
                    </ul>
                  </Card>
                </List.Item>
              )}
            />
            <Modal
              title={editListItem ? "编辑" : "添加"}
              style={{ marginRight: 400, marginTop: 80 }}
              visible={this.state.visible}
              onOk={editListItem ? this.eidtSumbit : this.addSumbit}
              onCancel={() => { this.setState({ visible: false }) }}
            >
              <Form>
                <Form.Item label="添加标题" {...formItemLayout}>
                  {getFieldDecorator('title', {
                    initialValue: editListItem ? editListItem.title : '',
                    rules: [
                      { required: true, message: '请选择系统和自定义输入标题' },
                    ]
                  })(
                    <AutoComplete
                      dataSource={systemData}
                      placeholder="请选择系统和自定义输入标题"
                      style={{ width: '80%' }}
                      onSelect={this.onSelect}
                      filterOption={(inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
                    />
                  )}
                </Form.Item>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={this.add}>
                    <Icon type="plus" /> 添加一条新的工作内容
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Card>
        </Col>
      </Row>
    )
  }
=======
import React from 'react'
import { connect } from 'dva'
import { Card, Row, Col, Icon, Button, Divider, List, Modal, Form, Input, message, AutoComplete } from 'antd'
import Cards from '../../../components/Cards'
const { Search } = Input

@Form.create()
@connect(({ global }) => ({
  global
}))
export default class DailyEdit extends React.Component {
  state= {
    visible: false,
    listData: [],
    systemData: ['空调及机械通风系统','电力系统','照明系统','通讯系统','消防系统','保安系统','繫泊及登船系统','供水及排水系统','升降机类设备','行李处理系统','石油气系统','其他基础设施']

  }

  // Model显隐
  modelShow = () => {
    this.setState({visible: true})
  }
  //Modal 添加确认框
  addSumbit = () => {
    let { listData } = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.setState({
          listData: [...listData, { ...values }],
          visible: false
        })
        message.success('添加成功')
      }
    })
    this.props.form.resetFields()
  }
  //添加标题
  onSelect = (value) => {
    let {systemData} = this.state
    this.setState({
      systemData: systemData.filter(item => item !== value)
    })
  }
  // Form表单 增加一个工作内容
  add = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(keys.length);
    form.setFieldsValue({
      keys: nextKeys,
    })
  }
  // Form表单 移除工作内容
  remove = k => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }
  // 整个工作汇报提交
  allSumbit = () => {
    console.log('listData', this.state.listData)
    const { dispatch } = this.props
    dispatch({
      type: 'global/saveDailyList',
      payload: {
        dailyList: this.state.listData
      }
    })
    console.log(this.props)
    message.success('每日工作汇报提交成功')
  }
  // List 增加
  addList = (listItem) => {
    console.log('addListItem', listItem)
    this.setState({ addListItem: listItem})
  }
  confirm = (value) => {
    console.log('value', value )
    let {addListItem, listData} = this.state
    addListItem.names.push(value)
    addListItem.keys.push(addListItem.keys.length)
    let index = listData.findIndex(item => item.title===addListItem.title)
    listData.splice(index, 1, addListItem)
    this.setState({listData, addListItem:null})
    message.success('增加成功')
  }
  cancal = () => {
    this.setState({addListItem: null})
  }
  // List 编辑
  editList = (listItem) => {
    console.log('listItem', listItem)
    this.setState({
      visible: true,
      editListItem: listItem
    })
  }
  //Modal 编辑确认框
  eidtSumbit = () => {
    let { listData } = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        let index = listData.findIndex(item => item.title !== values.title)
        listData.splice(index, 1, values)
        this.setState({
          listData: listData,
          visible: false,
          editListItem: null
        })
      }
      message.success('编辑成功')
    })
    this.props.form.resetFields()
  }
  // List 删除
  deleteList = (listItem) => {
    console.log('listItem', listItem)
    let { listData } = this.state
    this.setState({
      listData: listData.filter(item => item !== listItem)
    })
    message.success('删除成功')
  }

  render() {
    const { editListItem, addListItem, systemData} = this.state
    const buttons = (
      <>
        <p style={{ color: '#1890FF'}}>填写完工作内容后记得提交哦！</p>
        <Button icon="plus" type="dashed" style={{ marginRight: 10 }} onClick={this.modelShow}>添加</Button>
        <Button type="primary" onClick={this.allSumbit}>提交</Button>
      </>
    )
    const { getFieldDecorator, getFieldValue } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 18, offset: 6}
    }
    getFieldDecorator('keys', { initialValue: editListItem? editListItem.keys: [0] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k,index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '工作内容' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${index}]`, {
          initialValue: editListItem && editListItem.names[k] ? editListItem.names[k] : '',
          rules: [
            { required: true, whitespace: true, message: '请选择系统和自定义输入标题' },
          ]
        })(<Input addonBefore={<span>{index+1}</span>} style={{ width: '80%', marginRight: 8 }}/>)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ))
    return (
      <Row gutter={40}>
        <Col span={7}>
          <Cards title="每日统计" width="100%" />
        </Col>
        <Col span={17}>
          <Card title="每日汇报编辑" extra={buttons}>
            <List
              locale
              dataSource={this.state.listData}
              renderItem={item => (
                <List.Item>
                  <Card
                    title={item.title}
                    extra={
                      <>
                        <a href="#" onClick={() => this.addList(item)}>增加</a>
                        <Divider type="vertical" />
                        <a href="#" onClick={() => this.editList(item)}>编辑</a>
                        <Divider type="vertical" />
                        <a href="#" onClick={() => this.deleteList(item)}>删除</a>
                      </>
                    }
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
                      {
                        addListItem ?
                          (<>
                            <Search
                              addonBefore={<span>{addListItem.names.length + 1}</span>}
                              placeholder="请输入工作内容" enterButton="确定"
                              onSearch={this.confirm}
                              style={{ width: 800 }}
                            />
                            <Button type="danger" onClick={this.cancal} style={{ marginLeft: 8 }}>取消</Button>
                          </>) : <></>
                      }
                    </ul>
                  </Card>
                </List.Item>
              )}
            />
            <Modal
              title={editListItem ? "编辑" : "添加"}
              style={{ marginRight: 400, marginTop: 80 }}
              visible={this.state.visible}
              onOk={editListItem ? this.eidtSumbit : this.addSumbit}
              onCancel={() => { this.setState({ visible: false }) }}
            >
              <Form>
                <Form.Item label="添加标题" {...formItemLayout}>
                  {getFieldDecorator('title', {
                    initialValue: editListItem ? editListItem.title : '',
                    rules: [
                      { required: true, message: '请选择系统和自定义输入标题' },
                    ]
                  })(
                    <AutoComplete
                      dataSource={systemData}
                      placeholder="请选择系统和自定义输入标题"
                      style={{ width: '80%' }}
                      onSelect={this.onSelect}
                      filterOption={(inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
                    />
                  )}
                </Form.Item>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={this.add}>
                    <Icon type="plus" /> 添加一条新的工作内容
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Card>
        </Col>
      </Row>
    )
  }
>>>>>>> 最终提交
}