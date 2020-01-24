<<<<<<< HEAD
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Table, Icon, Modal, Card, Input, Row, Button, Divider, message, Form, Popconfirm } from 'antd'
const { TextArea } = Input

export default class UserManager extends Component {
  state = {
    visible: false,
    editVisible: false,
    editData: {},
    dataSource: [
      {
        'key': 1,
        'id': 1,
        'account': 'zhanglichun333',
        'password': '111',
        'name': 'admin',
        'description': '管理员',
        'zname': '张丽春',
        'number': 13016042464,
      },
      {
        'key': 2,
        'id': 2,
        'account': 'wobo333',
        'password': '111',
        'name': 'admin',
        'description': '管理员',
        'zname': '吴博',
        'number': 13016042464,
      },
      {
        'key': 3,
        'id': 3,
        'account': 'zhangsanhe',
        'password': '111',
        'name': 'user',
        'description': '派单员',
        'zname': '张三和',
        'number': 13016042464,
      },
      {
        'key': 4,
        'id': 4,
        'account': 'zhanglich',
        'password': '111',
        'name': 'user',
        'description': '派单员',
        'zname': '张辉',
        'number': 13016042464,
      },
      {
        'key': 5,
        'id': 5,
        'account': 'zhanghui',
        'password': '111',
        'name': 'user',
        'description': '派单员',
        'zname': '张木',
        'number': 13016042464,
      }

    ]
  }

  // 搜索
  search = (e) => {
    console.log(e.target.value)
  }
  // 新增
  addShow = () => {
    this.setState({
      visible: true
    })
  }
  addRole = () => {
    let { dataSource } = this.state
    this.userForm.props.form.validateFields((err, values) => {
      console.log(values)
      dataSource.unshift({ ...values, id: dataSource.length + 1, key: dataSource + 1 })
      this.setState({
        dataSource: dataSource,
        visible: false
      })
      message.success('新增成功')
    })
    this.userForm.props.form.resetFields()
  }
  //编辑
  editShow = (record) => {
    console.log('record', record)
    this.setState({
      visible: true,
      editData: record
    })
  }
  editRole = () => {
    let { dataSource, editData } = this.state
    this.userForm.props.form.validateFields((err, values) => {
      console.log('values', values)
      let newEditData = { ...editData, ...values }
      let index = dataSource.findIndex(item => item.id === newEditData.id)
      dataSource.splice(index, 1, newEditData)
      this.setState({
        dataSource: dataSource,
        visible: false,
        editData: []
      })
      message.success('编辑成功')
    })
    this.userForm.props.form.resetFields()
  }
  // 重置密码
  reset = () => {
    console.log('重置密码')
  }
  // 删除
  delRole = (record) => {
    console.log(record)
    let newDataSource = this.state.dataSource.filter(item => item.id !== record.id)
    this.setState({
      dataSource: newDataSource
    }, () => {
      message.success('删除成功')
    })
  }

  render() {
    const { dataSource, editData } = this.state
    const columns = [
      {
        title: '账号',
        dataIndex: 'account'
      },
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '角色描述',
        dataIndex: 'description'
      },
      {
        title: '姓名',
        dataIndex: 'zname'
      },
      {
        title: '联系方式',
        dataIndex: 'number'
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <>
            <Icon type="edit" title="编辑" theme="twoTone" onClick={() => this.editShow(record)} />
            <Divider type="vertical" />
            <a href="#" title="重置密码" onClick={() => this.reset()}><Icon type="sync" spin /></a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除"
              onConfirm={() => this.delRole(record)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" title="删除" theme="twoTone" twoToneColor="#F5222D" />
            </Popconfirm>
          </>
        )
      }
    ]
    return (
      <PageHeaderWrapper>
        <Card>
          <Row>
            <label>姓名:&emsp;<Input onChange={this.search} style={{ width: 150 }} placeholder="请输入" /></label>
            <Button type="primary" style={{ marginLeft: 40 }} onClick={this.addShow}>新增</Button>
          </Row>
          <Table
            dataSource={dataSource}
            columns={columns}
            style={{ marginTop: 20 }}
          />
          <Modal
            title={editData.id? "编辑":"新增" }
            visible={this.state.visible}
            onOk={editData.id ?this.editRole: this.addRole}
            onCancel={() => { this.setState({ visible: false, editData: []}) }}
          >
            <UserForm editData={editData} wrappedComponentRef={(inst) => this.userForm = inst} />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

@Form.create()
class UserForm extends Component {
  render() {
    const { form: { getFieldDecorator }, editData } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form {...formItemLayout}>
        <Form.Item label="账号" hasFeedback>
          {getFieldDecorator('account', {
            initialValue: editData ? editData.account : '',
            rules: [{ required: true, message: '请填写账号' }],
          })(<Input />)}
        </Form.Item>
        {
          editData.id ? <></>: 
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('password', {
              initialValue: editData ? editData.password : '',
              rules: [{ required: true, message: '请填写密码' }],
            })(<Input placeholder="初始密码：88888"/>)}
          </Form.Item>
        }
        <Form.Item label="角色名称" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: editData ? editData.name : '',
            rules: [{ required: true, message: '请填写角色名称' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="角色描述" hasFeedback>
          {getFieldDecorator('description', {
            initialValue: editData ? editData.description : '',
            rules: [{ required: true, message: '请填写角色描述' }],
          })(
            <TextArea
              autoSize={{
                minRows: 1,
              }}
            />
          )}
        </Form.Item>
        <Form.Item label="姓名" hasFeedback>
          {getFieldDecorator('zname', {
            initialValue: editData ? editData.zname : '',
            rules: [{ required: true, message: '请填写姓名' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="联系方式" hasFeedback>
          {getFieldDecorator('number', {
            initialValue: editData ? editData.number : '',
            rules: [{ required: true, message: '请填写联系方式' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    )
  }
}
=======
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Table, Icon, Modal, Card, Input, Row, Button, Divider, message, Form, Popconfirm } from 'antd'
const { TextArea } = Input

export default class UserManager extends Component {
  state = {
    visible: false,
    editVisible: false,
    editData: {},
    dataSource: [
      {
        'key': 1,
        'id': 1,
        'account': 'zhanglichun333',
        'password': '111',
        'name': 'admin',
        'description': '管理员',
        'zname': '张丽春',
        'number': 13016042464,
      },
      {
        'key': 2,
        'id': 2,
        'account': 'wobo333',
        'password': '111',
        'name': 'admin',
        'description': '管理员',
        'zname': '吴博',
        'number': 13016042464,
      },
      {
        'key': 3,
        'id': 3,
        'account': 'zhangsanhe',
        'password': '111',
        'name': 'user',
        'description': '派单员',
        'zname': '张三和',
        'number': 13016042464,
      },
      {
        'key': 4,
        'id': 4,
        'account': 'zhanglich',
        'password': '111',
        'name': 'user',
        'description': '派单员',
        'zname': '张辉',
        'number': 13016042464,
      },
      {
        'key': 5,
        'id': 5,
        'account': 'zhanghui',
        'password': '111',
        'name': 'user',
        'description': '派单员',
        'zname': '张木',
        'number': 13016042464,
      }

    ]
  }

  // 搜索
  search = (e) => {
    console.log(e.target.value)
  }
  // 新增
  addShow = () => {
    this.setState({
      visible: true
    })
  }
  addRole = () => {
    let { dataSource } = this.state
    this.userForm.props.form.validateFields((err, values) => {
      console.log(values)
      dataSource.unshift({ ...values, id: dataSource.length + 1, key: dataSource + 1 })
      this.setState({
        dataSource: dataSource,
        visible: false
      })
      message.success('新增成功')
    })
    this.userForm.props.form.resetFields()
  }
  //编辑
  editShow = (record) => {
    console.log('record', record)
    this.setState({
      visible: true,
      editData: record
    })
  }
  editRole = () => {
    let { dataSource, editData } = this.state
    this.userForm.props.form.validateFields((err, values) => {
      console.log('values', values)
      let newEditData = { ...editData, ...values }
      let index = dataSource.findIndex(item => item.id === newEditData.id)
      dataSource.splice(index, 1, newEditData)
      this.setState({
        dataSource: dataSource,
        visible: false,
        editData: []
      })
      message.success('编辑成功')
    })
    this.userForm.props.form.resetFields()
  }
  // 重置密码
  reset = () => {
    console.log('重置密码')
  }
  // 删除
  delRole = (record) => {
    console.log(record)
    let newDataSource = this.state.dataSource.filter(item => item.id !== record.id)
    this.setState({
      dataSource: newDataSource
    }, () => {
      message.success('删除成功')
    })
  }

  render() {
    const { dataSource, editData } = this.state
    const columns = [
      {
        title: '账号',
        dataIndex: 'account'
      },
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '角色描述',
        dataIndex: 'description'
      },
      {
        title: '姓名',
        dataIndex: 'zname'
      },
      {
        title: '联系方式',
        dataIndex: 'number'
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <>
            <Icon type="edit" title="编辑" theme="twoTone" onClick={() => this.editShow(record)} />
            <Divider type="vertical" />
            <a href="#" title="重置密码" onClick={() => this.reset()}><Icon type="sync" spin /></a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除"
              onConfirm={() => this.delRole(record)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" title="删除" theme="twoTone" twoToneColor="#F5222D" />
            </Popconfirm>
          </>
        )
      }
    ]
    return (
      <PageHeaderWrapper>
        <Card>
          <Row>
            <label>姓名:&emsp;<Input onChange={this.search} style={{ width: 150 }} placeholder="请输入" /></label>
            <Button type="primary" style={{ marginLeft: 40 }} onClick={this.addShow}>新增</Button>
          </Row>
          <Table
            dataSource={dataSource}
            columns={columns}
            style={{ marginTop: 20 }}
          />
          <Modal
            title={editData.id? "编辑":"新增" }
            visible={this.state.visible}
            onOk={editData.id ?this.editRole: this.addRole}
            onCancel={() => { this.setState({ visible: false, editData: []}) }}
          >
            <UserForm editData={editData} wrappedComponentRef={(inst) => this.userForm = inst} />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

@Form.create()
class UserForm extends Component {
  render() {
    const { form: { getFieldDecorator }, editData } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form {...formItemLayout}>
        <Form.Item label="账号" hasFeedback>
          {getFieldDecorator('account', {
            initialValue: editData ? editData.account : '',
            rules: [{ required: true, message: '请填写账号' }],
          })(<Input />)}
        </Form.Item>
        {
          editData.id ? <></>: 
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('password', {
              initialValue: editData ? editData.password : '',
              rules: [{ required: true, message: '请填写密码' }],
            })(<Input placeholder="初始密码：88888"/>)}
          </Form.Item>
        }
        <Form.Item label="角色名称" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: editData ? editData.name : '',
            rules: [{ required: true, message: '请填写角色名称' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="角色描述" hasFeedback>
          {getFieldDecorator('description', {
            initialValue: editData ? editData.description : '',
            rules: [{ required: true, message: '请填写角色描述' }],
          })(
            <TextArea
              autoSize={{
                minRows: 1,
              }}
            />
          )}
        </Form.Item>
        <Form.Item label="姓名" hasFeedback>
          {getFieldDecorator('zname', {
            initialValue: editData ? editData.zname : '',
            rules: [{ required: true, message: '请填写姓名' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="联系方式" hasFeedback>
          {getFieldDecorator('number', {
            initialValue: editData ? editData.number : '',
            rules: [{ required: true, message: '请填写联系方式' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    )
  }
}
>>>>>>> 最终提交
