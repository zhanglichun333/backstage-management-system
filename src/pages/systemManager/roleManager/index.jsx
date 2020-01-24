<<<<<<< HEAD
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Table, Icon, Modal, Card, Input, Row, Button, Divider, Tree, message, Form, Popconfirm } from 'antd'
const { TreeNode } = Tree
const { TextArea } = Input

export default class RoleManager extends Component {
  state = {
    visible: false,
    editData: {},
    checkedKeys: [],
    dataSource: [
      {
        id: 1,
        key: 1,
        name: 'admin',
        description: '管理员',
        checkedKeys: ["standing", "pointCheck", "pointCheckPlan", "pointCheckOrder", "upKeep", "upKeepPlan", "upKeepOrder", "main", "daily", "dailyEdit", "board", "maintain", "sparePart", "outPutManager", "toolManager", "systemManager", "roleManager", "userManager"]
      },
      {
        id: 2,
        key: 2,
        name: 'user',
        description: '派单员',
        checkedKeys: ["board", "dailyEdit", "standing", "pointCheck", "pointCheckPlan", "pointCheckOrder", "upKeep", "upKeepPlan", "upKeepOrder", "maintain", "sparePart", "outPutManager", "toolManager"]
      }
    ]
  }

  // 关键字搜索
  keyWordsSearch = (e) => {
    console.log(e.target.value)
  }
  // 删除角色
  delRole = (record) => {
    let newDataSource = this.state.dataSource.filter(item => item.id !== record.id)
    this.setState({
      dataSource: newDataSource
    }, () => {
      message.success('删除成功')
    })
  }
  //编辑角色
  eddShow = (record) => {
    this.setState({
      visible: true,
      editData: record,
      checkedKeys: record.checkedKeys
    })
  }
  editRole = () => {
    let { dataSource, checkedKeys, editData } = this.state
    this.roleForm.props.form.validateFields((err, values) => {
      console.log(values, checkedKeys)
      let newEditData = { ...editData, ...values, checkedKeys }
      let index = dataSource.findIndex(item => item.id === newEditData.id)
      dataSource.splice(index, 1, newEditData)
      this.setState({
        dataSource: dataSource,
        visible: false,
        checkedKeys: [],
        editData: {}
      })
      message.success('编辑成功')
    })
    this.roleForm.props.form.resetFields()
  }
  // 增加角色
  addShow = () => {
    this.setState({
      visible: true,
    })
  }
  addRole = () => {
    let { dataSource, checkedKeys } = this.state
    this.roleForm.props.form.validateFields((err, values) => {
      console.log(values, checkedKeys)
      dataSource.unshift({ ...values, id: dataSource.length + 1, key: dataSource.length + 1, checkedKeys })
      this.setState({
        dataSource: dataSource,
        visible: false,
        checkedKeys: []
      })
      message.success('新增成功')
    })
    this.roleForm.props.form.resetFields()
  }

  render() {
    const { dataSource, editData, visible, checkedKeys } = this.state
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '角色描述',
        dataIndex: 'description'
      },
      {
        title: '操作',
        render: (record) => (
          <>
            <Icon type="edit" theme="twoTone" onClick={() => this.eddShow(record)} />
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除"
              onConfirm={() => this.delRole(record)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
            </Popconfirm>
          </>
        )
      }
    ]
    return (
      <PageHeaderWrapper>
        <Card>
          <Row>
            <label>关键字:&emsp;<Input onChange={this.keyWordsSearch} style={{ width: 150 }} /></label>
            <Button type="primary" style={{ marginLeft: 40 }} onClick={this.addShow}>新增</Button>
          </Row>
          <Table
            dataSource={dataSource}
            columns={columns}
            style={{ marginTop: 20 }}
          />
          <Modal
            title={editData.id ? "编辑": "新增"}
            visible={visible}
            onOk={editData.id ? this.editRole: this.addRole}
            onCancel={() => { this.setState({ visible: false, checkedKeys: [], editData: {} }) }}
          >
            <RoleForm
              editData={editData}
              checkedKeys={checkedKeys}
              wrappedComponentRef={(inst) => this.roleForm = inst}
              getCheckedKeys={(checkedKeys) => { this.setState({ checkedKeys }) }}
            />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

@Form.create()
class RoleForm extends Component {
  constructor(props) {
    super(props),
      this.state = {
        expandedKeys: [],
        menuList: [
          {
            path: '/main',
            name: 'main',
            zname: '首页',
            icon: 'home',
            routes: [
              {
                name: 'daily',
                zname: '日报',
                path: '/main/daily',
                component: './main/daily',
              },
              {
                name: 'dailyEdit',
                zname: '日报编辑',
                path: '/main/dailyEdit',
                component: './main/dailyEdit',
              },
              {
                name: 'board',
                zname: '看板',
                path: '/main/board',
                component: './main/board',
              },
            ],
          },
          {
            path: '/standing',
            name: 'standing',
            zname: '设备相关信息管理',
            component: './standing',
            icon: 'file'
          },
          {
            path: '/pointCheck',
            name: 'pointCheck',
            zname: '设备检查管理',
            icon: 'gateway',
            routes: [
              {
                name: 'pointCheckPlan',
                zname: '设备检查计划',
                path: '/pointCheck/pointCheckPlan',
                component: './pointCheck/pointCheckPlan',
              },
              {
                name: 'pointCheckOrder',
                zname: '设备检查工单',
                path: '/pointCheck/pointCheckOrder',
                component: './pointCheck/pointCheckOrder',
              }
            ],
          },
          {
            path: '/upKeep',
            name: 'upKeep',
            zname: '设备保养管理',
            icon: 'safety',
            routes: [
              {
                name: 'upKeepPlan',
                zname: '设备保养计划',
                path: '/upKeep/upKeepPlan',
                component: './upKeep/upKeepPlan',
              },
              {
                name: 'upKeepOrder',
                zname: '设备保养工单',
                path: '/upKeep/upKeepOrder',
                component: './upKeep/upKeepOrder',
              }
            ],
          },
          {
            path: '/maintain',
            zname: '设备维修管理',
            name: 'maintain',
            component: './maintain',
            icon: 'tool',
          },
          {
            path: '/sparePart',
            name: 'sparePart',
            zname: '设备库存管理',
            icon: 'tool',
            routes: [
              {
                name: 'outPutManager',
                zname: '备件',
                path: '/sparePart/outPutManager',
                component: './sparePart/outPutManager',
              },
              {
                name: 'toolManager',
                zname: '工具出入库',
                path: '/sparePart/toolManager',
                component: './sparePart/toolManager',
              }
            ],
          },
          {
            path: '/systemManager',
            name: 'systemManager',
            zname: '系统管理',
            icon: 'setting',
            routes: [
              {
                name: 'roleManager',
                zname: '角色管理',
                path: '/systemManager/roleManager',
                component: './systemManager/roleManager',
              },
              {
                name: 'userManager',
                zname: '用户管理',
                path: '/systemManager/userManager',
                component: './systemManager/userManager',
              }
            ],
          }
        ]
      }
  }

  // 树形控件
  renderTreeNodes = (data) => {
    return data.map(item => {
      if (item.routes) {
        return (
          <TreeNode title={item.zname} key={item.name}>
            {this.renderTreeNodes(item.routes)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.zname} key={item.name} />
    })
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    this.props.getCheckedKeys(checkedKeys)
  }
  // 展开/收起节点时触发
  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  render() {
    const { form: { getFieldDecorator }, editData, checkedKeys } = this.props
    const { menuList } = this.state
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form {...formItemLayout} >
        <Form.Item label="角色名稱" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: editData ? editData.name : '',
            rules: [{ required: true, message: '請填寫角色名稱' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="角色描述" hasFeedback>
          {getFieldDecorator('description', {
            initialValue: editData ? editData.description : '',
            rules: [{ required: true, message: '請填寫角色描述' }],
          })(
            <TextArea
              autoSize={{
                minRows: 2,
              }}
            />
          )}
        </Form.Item>
        <Form.Item label="角色权限" hasFeedback>
          <Tree
            checkable
            onExpand={this.onExpand}
            checkedKeys={checkedKeys}
            onCheck={this.onCheck}
          >
            {this.renderTreeNodes(menuList)}
          </Tree>
        </Form.Item>
      </Form>
    )
  }
}

// import React, { Component } from 'react'
// import { PageHeaderWrapper } from '@ant-design/pro-layout'
// import { Table, Icon, Modal, Card, Input, Row, Button, Divider, Tree, message, Form, Popconfirm  } from 'antd'
// const { TreeNode } = Tree
// const { TextArea } = Input

// export default class RoleManager extends Component {
//   state = {
//     addVisible: false,
//     editVisible: false,
//     editData: {},
//     checkedKeys: [],
//     dataSource: [
//       {
//         id: 1,
//         key: 1,
//         name: 'admin',
//         description: '管理员',
//         checkedKeys: ["standing", "pointCheck", "pointCheckPlan", "pointCheckOrder", "upKeep", "upKeepPlan", "upKeepOrder", "main", "daily", "dailyEdit", "board", "maintain", "sparePart", "outPutManager", "toolManager", "systemManager", "roleManager", "userManager"]
//       },
//       {
//         id: 2,
//         key: 2,
//         name: 'user',
//         description: '派单员',
//         checkedKeys: ["board", "dailyEdit", "standing", "pointCheck", "pointCheckPlan", "pointCheckOrder", "upKeep", "upKeepPlan", "upKeepOrder", "maintain", "sparePart", "outPutManager", "toolManager"]
//       }
//     ]
//   }

//   // 关键字搜索
//   keyWordsSearch = (e) => {
//     console.log(e.target.value)
//   }
//   // 删除角色
//   delRole = (text, record, index) => {
//     let newDataSource = this.state.dataSource.filter(item => item.id !== record.id)
//     this.setState({
//       dataSource: newDataSource
//     }, () => {
//       message.success('删除成功')
//     })
//   }
//   //编辑角色
//   eddShow = (record) => {
//     this.setState({
//       editVisible: true,
//       editData: record,
//       checkedKeys: record.checkedKeys
//     })
//   }
//   editRole = () => {
//     let { dataSource, checkedKeys, editData } = this.state
//     this.roleForm2.props.form.validateFields((err, values) => {
//       console.log(values, checkedKeys)
//       let newEditData = { ...editData, ...values, checkedKeys }
//       let index = dataSource.findIndex(item=> item.id === newEditData.id)
//       dataSource.splice(index, 1, newEditData)
//       this.setState({
//         dataSource: dataSource,
//         editVisible: false,
//         checkedKeys: [],
//         editData: {}
//       })
//       message.success('编辑成功')
//     })
//     this.roleForm2.props.form.resetFields()
//   }
//   // 增加角色
//   addShow = () => {
//     this.setState({
//       addVisible: true,
//     })
//   }
//   addRole = () => {
//     let { dataSource, checkedKeys } = this.state
//     this.roleForm1.props.form.validateFields((err, values) => {
//       console.log(values, checkedKeys)
//       dataSource.unshift({ ...values, id: dataSource.length + 1, key: dataSource.length + 1, checkedKeys })
//       this.setState({
//         dataSource: dataSource,
//         addVisible: false,
//         checkedKeys: []
//       })
//       message.success('新增成功')
//     })
//     this.roleForm1.props.form.resetFields()
//   }

//   render() {
//     const { dataSource } = this.state
//     const columns = [
//       {
//         title: '角色名称',
//         dataIndex: 'name'
//       },
//       {
//         title: '角色描述',
//         dataIndex: 'description'
//       },
//       {
//         title: '操作',
//         render: (text, record, index) => (
//           <>
//             <Icon type="edit" theme="twoTone" onClick={() => this.eddShow(record)}/>
//             <Divider type="vertical" />
//             <Popconfirm
//               title="确定删除"
//               onConfirm={() => this.delRole(text, record, index)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Icon type="delete" theme="twoTone" twoToneColor="#F5222D"/>
//             </Popconfirm>
//           </>
//         )
//       }
//     ]
//     return (
//       <PageHeaderWrapper>
//         <Card>
//           <Row>
//             <label>关键字:&emsp;<Input onChange={this.keyWordsSearch} style={{ width: 150 }} /></label>
//             <Button type="primary" style={{marginLeft: 40}} onClick={this.addShow}>新增</Button>
//           </Row>
//           <Table
//             dataSource={dataSource}
//             columns={columns}
//             style={{marginTop: 20}}
//           />
//           <Modal
//             title="新增"
//             visible={this.state.addVisible}
//             onOk={this.addRole}
//             onCancel={() => {this.setState({addVisible: false})}}
//           >
//             <RoleForm
//               editData={this.state.editData}
//               checkedKeys={this.state.checkedKeys}
//               wrappedComponentRef={(inst) => this.roleForm1 = inst} 
//               getCheckedKeys={(checkedKeys) => {this.setState({checkedKeys})}}
//             />
//           </Modal>
//           <Modal
//             title="编辑"
//             visible={this.state.editVisible}
//             onOk={this.editRole}
//             onCancel={() => { this.setState({ editVisible: false, checkedKeys:[], editData: {} }) }}
//           >
//             <RoleForm
//               editData={this.state.editData}
//               checkedKeys={this.state.checkedKeys}
//               wrappedComponentRef={(inst) => this.roleForm2 = inst}
//               getCheckedKeys={(checkedKeys) => { this.setState({ checkedKeys }) }}
//             />
//           </Modal>
//         </Card>
//       </PageHeaderWrapper>
//     )
//   }
// }

// @Form.create()
// class RoleForm extends Component {
//   constructor(props){
//     super(props),
//     this.state = {
//       expandedKeys: [],
//       menuList: [
//         {
//           path: '/main',
//           name: 'main',
//           zname: '首页',
//           icon: 'home',
//           routes: [
//             {
//               name: 'daily',
//               zname: '日报',
//               path: '/main/daily',
//               component: './main/daily',
//             },
//             {
//               name: 'dailyEdit',
//               zname: '日报编辑',
//               path: '/main/dailyEdit',
//               component: './main/dailyEdit',
//             },
//             {
//               name: 'board',
//               zname: '看板',
//               path: '/main/board',
//               component: './main/board',
//             },
//           ],
//         },
//         {
//           path: '/standing',
//           name: 'standing',
//           zname: '设备相关信息管理',
//           component: './standing',
//           icon: 'file'
//         },
//         {
//           path: '/pointCheck',
//           name: 'pointCheck',
//           zname: '设备检查管理',
//           icon: 'gateway',
//           routes: [
//             {
//               name: 'pointCheckPlan',
//               zname: '设备检查计划',
//               path: '/pointCheck/pointCheckPlan',
//               component: './pointCheck/pointCheckPlan',
//             },
//             {
//               name: 'pointCheckOrder',
//               zname: '设备检查工单',
//               path: '/pointCheck/pointCheckOrder',
//               component: './pointCheck/pointCheckOrder',
//             }
//           ],
//         },
//         {
//           path: '/upKeep',
//           name: 'upKeep',
//           zname: '设备保养管理',
//           icon: 'safety',
//           routes: [
//             {
//               name: 'upKeepPlan',
//               zname: '设备保养计划',
//               path: '/upKeep/upKeepPlan',
//               component: './upKeep/upKeepPlan',
//             },
//             {
//               name: 'upKeepOrder',
//               zname: '设备保养工单',
//               path: '/upKeep/upKeepOrder',
//               component: './upKeep/upKeepOrder',
//             }
//           ],
//         },
//         {
//           path: '/maintain',
//           zname: '设备维修管理',
//           name: 'maintain',
//           component: './maintain',
//           icon: 'tool',
//         },
//         {
//           path: '/sparePart',
//           name: 'sparePart',
//           zname: '设备库存管理',
//           icon: 'tool',
//           routes: [
//             {
//               name: 'outPutManager',
//               zname: '备件',
//               path: '/sparePart/outPutManager',
//               component: './sparePart/outPutManager',
//             },
//             {
//               name: 'toolManager',
//               zname: '工具出入库',
//               path: '/sparePart/toolManager',
//               component: './sparePart/toolManager',
//             }
//           ],
//         },
//         {
//           path: '/systemManager',
//           name: 'systemManager',
//           zname: '系统管理',
//           icon: 'setting',
//           routes: [
//             {
//               name: 'roleManager',
//               zname: '角色管理',
//               path: '/systemManager/roleManager',
//               component: './systemManager/roleManager',
//             },
//             {
//               name: 'userManager',
//               zname: '用户管理',
//               path: '/systemManager/userManager',
//               component: './systemManager/userManager',
//             }
//           ],
//         }
//       ]
//     }
//   }

//   // 树形控件
//   renderTreeNodes = (data) => {
//     return data.map(item => {
//       if (item.routes) {
//         return (
//           <TreeNode title={item.zname} key={item.name}>
//             {this.renderTreeNodes(item.routes)}
//           </TreeNode>
//         )
//       }
//       return <TreeNode title={item.zname} key={item.name} />
//     })
//   }
//   onCheck = (checkedKeys, info) => {
//     console.log('onCheck', checkedKeys, info);
//     this.props.getCheckedKeys(checkedKeys)
//   }
//   // 展开/收起节点时触发
//   onExpand = expandedKeys => {
//     console.log('onExpand', expandedKeys);
//     this.setState({
//       expandedKeys,
//       autoExpandParent: false,
//     });
//   }

//   render() {
//     const { form: { getFieldDecorator }, editData, checkedKeys} = this.props
//     const {menuList} = this.state
//     const formItemLayout = {
//       labelCol: { span: 6 },
//       wrapperCol: { span: 14 },
//     }
//     return (
//       <Form {...formItemLayout} >
//         <Form.Item label="角色名稱" hasFeedback>
//           {getFieldDecorator('name', {
//             initialValue: editData? editData.name: '',
//             rules: [{ required: true, message: '請填寫角色名稱' }],
//           })(<Input />)}
//         </Form.Item>
//         <Form.Item label="角色描述" hasFeedback>
//           {getFieldDecorator('description', {
//             initialValue: editData ? editData.description : '',
//             rules: [{ required: true, message: '請填寫角色描述' }],
//           })(
//             <TextArea
//               autoSize={{
//                 minRows: 2,
//               }}
//             />
//           )}
//         </Form.Item>
//         <Form.Item label="角色权限" hasFeedback>
//           <Tree
//             checkable                                      
//             onExpand={this.onExpand} 
//             checkedKeys={checkedKeys}                     
//             onCheck={this.onCheck}
//             >
//             {this.renderTreeNodes(menuList)}
//           </Tree>
//         </Form.Item>
//       </Form>
//     )
//   }
=======
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Table, Icon, Modal, Card, Input, Row, Button, Divider, Tree, message, Form, Popconfirm } from 'antd'
const { TreeNode } = Tree
const { TextArea } = Input

export default class RoleManager extends Component {
  state = {
    visible: false,
    editData: {},
    checkedKeys: [],
    dataSource: [
      {
        id: 1,
        key: 1,
        name: 'admin',
        description: '管理员',
        checkedKeys: ["standing", "pointCheck", "pointCheckPlan", "pointCheckOrder", "upKeep", "upKeepPlan", "upKeepOrder", "main", "daily", "dailyEdit", "board", "maintain", "sparePart", "outPutManager", "toolManager", "systemManager", "roleManager", "userManager"]
      },
      {
        id: 2,
        key: 2,
        name: 'user',
        description: '派单员',
        checkedKeys: ["board", "dailyEdit", "standing", "pointCheck", "pointCheckPlan", "pointCheckOrder", "upKeep", "upKeepPlan", "upKeepOrder", "maintain", "sparePart", "outPutManager", "toolManager"]
      }
    ]
  }

  // 关键字搜索
  keyWordsSearch = (e) => {
    console.log(e.target.value)
  }
  // 删除角色
  delRole = (record) => {
    let newDataSource = this.state.dataSource.filter(item => item.id !== record.id)
    this.setState({
      dataSource: newDataSource
    }, () => {
      message.success('删除成功')
    })
  }
  //编辑角色
  eddShow = (record) => {
    this.setState({
      visible: true,
      editData: record,
      checkedKeys: record.checkedKeys
    })
  }
  editRole = () => {
    let { dataSource, checkedKeys, editData } = this.state
    this.roleForm.props.form.validateFields((err, values) => {
      console.log(values, checkedKeys)
      let newEditData = { ...editData, ...values, checkedKeys }
      let index = dataSource.findIndex(item => item.id === newEditData.id)
      dataSource.splice(index, 1, newEditData)
      this.setState({
        dataSource: dataSource,
        visible: false,
        checkedKeys: [],
        editData: {}
      })
      message.success('编辑成功')
    })
    this.roleForm.props.form.resetFields()
  }
  // 增加角色
  addShow = () => {
    this.setState({
      visible: true,
    })
  }
  addRole = () => {
    let { dataSource, checkedKeys } = this.state
    this.roleForm.props.form.validateFields((err, values) => {
      console.log(values, checkedKeys)
      dataSource.unshift({ ...values, id: dataSource.length + 1, key: dataSource.length + 1, checkedKeys })
      this.setState({
        dataSource: dataSource,
        visible: false,
        checkedKeys: []
      })
      message.success('新增成功')
    })
    this.roleForm.props.form.resetFields()
  }

  render() {
    const { dataSource, editData, visible, checkedKeys } = this.state
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '角色描述',
        dataIndex: 'description'
      },
      {
        title: '操作',
        render: (record) => (
          <>
            <Icon type="edit" theme="twoTone" onClick={() => this.eddShow(record)} />
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除"
              onConfirm={() => this.delRole(record)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" theme="twoTone" twoToneColor="#F5222D" />
            </Popconfirm>
          </>
        )
      }
    ]
    return (
      <PageHeaderWrapper>
        <Card>
          <Row>
            <label>关键字:&emsp;<Input onChange={this.keyWordsSearch} style={{ width: 150 }} /></label>
            <Button type="primary" style={{ marginLeft: 40 }} onClick={this.addShow}>新增</Button>
          </Row>
          <Table
            dataSource={dataSource}
            columns={columns}
            style={{ marginTop: 20 }}
          />
          <Modal
            title={editData.id ? "编辑": "新增"}
            visible={visible}
            onOk={editData.id ? this.editRole: this.addRole}
            onCancel={() => { this.setState({ visible: false, checkedKeys: [], editData: {} }) }}
          >
            <RoleForm
              editData={editData}
              checkedKeys={checkedKeys}
              wrappedComponentRef={(inst) => this.roleForm = inst}
              getCheckedKeys={(checkedKeys) => { this.setState({ checkedKeys }) }}
            />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

@Form.create()
class RoleForm extends Component {
  constructor(props) {
    super(props),
      this.state = {
        expandedKeys: [],
        menuList: [
          {
            path: '/main',
            name: 'main',
            zname: '首页',
            icon: 'home',
            routes: [
              {
                name: 'daily',
                zname: '日报',
                path: '/main/daily',
                component: './main/daily',
              },
              {
                name: 'dailyEdit',
                zname: '日报编辑',
                path: '/main/dailyEdit',
                component: './main/dailyEdit',
              },
              {
                name: 'board',
                zname: '看板',
                path: '/main/board',
                component: './main/board',
              },
            ],
          },
          {
            path: '/standing',
            name: 'standing',
            zname: '设备相关信息管理',
            component: './standing',
            icon: 'file'
          },
          {
            path: '/pointCheck',
            name: 'pointCheck',
            zname: '设备检查管理',
            icon: 'gateway',
            routes: [
              {
                name: 'pointCheckPlan',
                zname: '设备检查计划',
                path: '/pointCheck/pointCheckPlan',
                component: './pointCheck/pointCheckPlan',
              },
              {
                name: 'pointCheckOrder',
                zname: '设备检查工单',
                path: '/pointCheck/pointCheckOrder',
                component: './pointCheck/pointCheckOrder',
              }
            ],
          },
          {
            path: '/upKeep',
            name: 'upKeep',
            zname: '设备保养管理',
            icon: 'safety',
            routes: [
              {
                name: 'upKeepPlan',
                zname: '设备保养计划',
                path: '/upKeep/upKeepPlan',
                component: './upKeep/upKeepPlan',
              },
              {
                name: 'upKeepOrder',
                zname: '设备保养工单',
                path: '/upKeep/upKeepOrder',
                component: './upKeep/upKeepOrder',
              }
            ],
          },
          {
            path: '/maintain',
            zname: '设备维修管理',
            name: 'maintain',
            component: './maintain',
            icon: 'tool',
          },
          {
            path: '/sparePart',
            name: 'sparePart',
            zname: '设备库存管理',
            icon: 'tool',
            routes: [
              {
                name: 'outPutManager',
                zname: '备件',
                path: '/sparePart/outPutManager',
                component: './sparePart/outPutManager',
              },
              {
                name: 'toolManager',
                zname: '工具出入库',
                path: '/sparePart/toolManager',
                component: './sparePart/toolManager',
              }
            ],
          },
          {
            path: '/systemManager',
            name: 'systemManager',
            zname: '系统管理',
            icon: 'setting',
            routes: [
              {
                name: 'roleManager',
                zname: '角色管理',
                path: '/systemManager/roleManager',
                component: './systemManager/roleManager',
              },
              {
                name: 'userManager',
                zname: '用户管理',
                path: '/systemManager/userManager',
                component: './systemManager/userManager',
              }
            ],
          }
        ]
      }
  }

  // 树形控件
  renderTreeNodes = (data) => {
    return data.map(item => {
      if (item.routes) {
        return (
          <TreeNode title={item.zname} key={item.name}>
            {this.renderTreeNodes(item.routes)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.zname} key={item.name} />
    })
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    this.props.getCheckedKeys(checkedKeys)
  }
  // 展开/收起节点时触发
  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  render() {
    const { form: { getFieldDecorator }, editData, checkedKeys } = this.props
    const { menuList } = this.state
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form {...formItemLayout} >
        <Form.Item label="角色名稱" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: editData ? editData.name : '',
            rules: [{ required: true, message: '請填寫角色名稱' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="角色描述" hasFeedback>
          {getFieldDecorator('description', {
            initialValue: editData ? editData.description : '',
            rules: [{ required: true, message: '請填寫角色描述' }],
          })(
            <TextArea
              autoSize={{
                minRows: 2,
              }}
            />
          )}
        </Form.Item>
        <Form.Item label="角色权限" hasFeedback>
          <Tree
            checkable
            onExpand={this.onExpand}
            checkedKeys={checkedKeys}
            onCheck={this.onCheck}
          >
            {this.renderTreeNodes(menuList)}
          </Tree>
        </Form.Item>
      </Form>
    )
  }
}

// import React, { Component } from 'react'
// import { PageHeaderWrapper } from '@ant-design/pro-layout'
// import { Table, Icon, Modal, Card, Input, Row, Button, Divider, Tree, message, Form, Popconfirm  } from 'antd'
// const { TreeNode } = Tree
// const { TextArea } = Input

// export default class RoleManager extends Component {
//   state = {
//     addVisible: false,
//     editVisible: false,
//     editData: {},
//     checkedKeys: [],
//     dataSource: [
//       {
//         id: 1,
//         key: 1,
//         name: 'admin',
//         description: '管理员',
//         checkedKeys: ["standing", "pointCheck", "pointCheckPlan", "pointCheckOrder", "upKeep", "upKeepPlan", "upKeepOrder", "main", "daily", "dailyEdit", "board", "maintain", "sparePart", "outPutManager", "toolManager", "systemManager", "roleManager", "userManager"]
//       },
//       {
//         id: 2,
//         key: 2,
//         name: 'user',
//         description: '派单员',
//         checkedKeys: ["board", "dailyEdit", "standing", "pointCheck", "pointCheckPlan", "pointCheckOrder", "upKeep", "upKeepPlan", "upKeepOrder", "maintain", "sparePart", "outPutManager", "toolManager"]
//       }
//     ]
//   }

//   // 关键字搜索
//   keyWordsSearch = (e) => {
//     console.log(e.target.value)
//   }
//   // 删除角色
//   delRole = (text, record, index) => {
//     let newDataSource = this.state.dataSource.filter(item => item.id !== record.id)
//     this.setState({
//       dataSource: newDataSource
//     }, () => {
//       message.success('删除成功')
//     })
//   }
//   //编辑角色
//   eddShow = (record) => {
//     this.setState({
//       editVisible: true,
//       editData: record,
//       checkedKeys: record.checkedKeys
//     })
//   }
//   editRole = () => {
//     let { dataSource, checkedKeys, editData } = this.state
//     this.roleForm2.props.form.validateFields((err, values) => {
//       console.log(values, checkedKeys)
//       let newEditData = { ...editData, ...values, checkedKeys }
//       let index = dataSource.findIndex(item=> item.id === newEditData.id)
//       dataSource.splice(index, 1, newEditData)
//       this.setState({
//         dataSource: dataSource,
//         editVisible: false,
//         checkedKeys: [],
//         editData: {}
//       })
//       message.success('编辑成功')
//     })
//     this.roleForm2.props.form.resetFields()
//   }
//   // 增加角色
//   addShow = () => {
//     this.setState({
//       addVisible: true,
//     })
//   }
//   addRole = () => {
//     let { dataSource, checkedKeys } = this.state
//     this.roleForm1.props.form.validateFields((err, values) => {
//       console.log(values, checkedKeys)
//       dataSource.unshift({ ...values, id: dataSource.length + 1, key: dataSource.length + 1, checkedKeys })
//       this.setState({
//         dataSource: dataSource,
//         addVisible: false,
//         checkedKeys: []
//       })
//       message.success('新增成功')
//     })
//     this.roleForm1.props.form.resetFields()
//   }

//   render() {
//     const { dataSource } = this.state
//     const columns = [
//       {
//         title: '角色名称',
//         dataIndex: 'name'
//       },
//       {
//         title: '角色描述',
//         dataIndex: 'description'
//       },
//       {
//         title: '操作',
//         render: (text, record, index) => (
//           <>
//             <Icon type="edit" theme="twoTone" onClick={() => this.eddShow(record)}/>
//             <Divider type="vertical" />
//             <Popconfirm
//               title="确定删除"
//               onConfirm={() => this.delRole(text, record, index)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Icon type="delete" theme="twoTone" twoToneColor="#F5222D"/>
//             </Popconfirm>
//           </>
//         )
//       }
//     ]
//     return (
//       <PageHeaderWrapper>
//         <Card>
//           <Row>
//             <label>关键字:&emsp;<Input onChange={this.keyWordsSearch} style={{ width: 150 }} /></label>
//             <Button type="primary" style={{marginLeft: 40}} onClick={this.addShow}>新增</Button>
//           </Row>
//           <Table
//             dataSource={dataSource}
//             columns={columns}
//             style={{marginTop: 20}}
//           />
//           <Modal
//             title="新增"
//             visible={this.state.addVisible}
//             onOk={this.addRole}
//             onCancel={() => {this.setState({addVisible: false})}}
//           >
//             <RoleForm
//               editData={this.state.editData}
//               checkedKeys={this.state.checkedKeys}
//               wrappedComponentRef={(inst) => this.roleForm1 = inst} 
//               getCheckedKeys={(checkedKeys) => {this.setState({checkedKeys})}}
//             />
//           </Modal>
//           <Modal
//             title="编辑"
//             visible={this.state.editVisible}
//             onOk={this.editRole}
//             onCancel={() => { this.setState({ editVisible: false, checkedKeys:[], editData: {} }) }}
//           >
//             <RoleForm
//               editData={this.state.editData}
//               checkedKeys={this.state.checkedKeys}
//               wrappedComponentRef={(inst) => this.roleForm2 = inst}
//               getCheckedKeys={(checkedKeys) => { this.setState({ checkedKeys }) }}
//             />
//           </Modal>
//         </Card>
//       </PageHeaderWrapper>
//     )
//   }
// }

// @Form.create()
// class RoleForm extends Component {
//   constructor(props){
//     super(props),
//     this.state = {
//       expandedKeys: [],
//       menuList: [
//         {
//           path: '/main',
//           name: 'main',
//           zname: '首页',
//           icon: 'home',
//           routes: [
//             {
//               name: 'daily',
//               zname: '日报',
//               path: '/main/daily',
//               component: './main/daily',
//             },
//             {
//               name: 'dailyEdit',
//               zname: '日报编辑',
//               path: '/main/dailyEdit',
//               component: './main/dailyEdit',
//             },
//             {
//               name: 'board',
//               zname: '看板',
//               path: '/main/board',
//               component: './main/board',
//             },
//           ],
//         },
//         {
//           path: '/standing',
//           name: 'standing',
//           zname: '设备相关信息管理',
//           component: './standing',
//           icon: 'file'
//         },
//         {
//           path: '/pointCheck',
//           name: 'pointCheck',
//           zname: '设备检查管理',
//           icon: 'gateway',
//           routes: [
//             {
//               name: 'pointCheckPlan',
//               zname: '设备检查计划',
//               path: '/pointCheck/pointCheckPlan',
//               component: './pointCheck/pointCheckPlan',
//             },
//             {
//               name: 'pointCheckOrder',
//               zname: '设备检查工单',
//               path: '/pointCheck/pointCheckOrder',
//               component: './pointCheck/pointCheckOrder',
//             }
//           ],
//         },
//         {
//           path: '/upKeep',
//           name: 'upKeep',
//           zname: '设备保养管理',
//           icon: 'safety',
//           routes: [
//             {
//               name: 'upKeepPlan',
//               zname: '设备保养计划',
//               path: '/upKeep/upKeepPlan',
//               component: './upKeep/upKeepPlan',
//             },
//             {
//               name: 'upKeepOrder',
//               zname: '设备保养工单',
//               path: '/upKeep/upKeepOrder',
//               component: './upKeep/upKeepOrder',
//             }
//           ],
//         },
//         {
//           path: '/maintain',
//           zname: '设备维修管理',
//           name: 'maintain',
//           component: './maintain',
//           icon: 'tool',
//         },
//         {
//           path: '/sparePart',
//           name: 'sparePart',
//           zname: '设备库存管理',
//           icon: 'tool',
//           routes: [
//             {
//               name: 'outPutManager',
//               zname: '备件',
//               path: '/sparePart/outPutManager',
//               component: './sparePart/outPutManager',
//             },
//             {
//               name: 'toolManager',
//               zname: '工具出入库',
//               path: '/sparePart/toolManager',
//               component: './sparePart/toolManager',
//             }
//           ],
//         },
//         {
//           path: '/systemManager',
//           name: 'systemManager',
//           zname: '系统管理',
//           icon: 'setting',
//           routes: [
//             {
//               name: 'roleManager',
//               zname: '角色管理',
//               path: '/systemManager/roleManager',
//               component: './systemManager/roleManager',
//             },
//             {
//               name: 'userManager',
//               zname: '用户管理',
//               path: '/systemManager/userManager',
//               component: './systemManager/userManager',
//             }
//           ],
//         }
//       ]
//     }
//   }

//   // 树形控件
//   renderTreeNodes = (data) => {
//     return data.map(item => {
//       if (item.routes) {
//         return (
//           <TreeNode title={item.zname} key={item.name}>
//             {this.renderTreeNodes(item.routes)}
//           </TreeNode>
//         )
//       }
//       return <TreeNode title={item.zname} key={item.name} />
//     })
//   }
//   onCheck = (checkedKeys, info) => {
//     console.log('onCheck', checkedKeys, info);
//     this.props.getCheckedKeys(checkedKeys)
//   }
//   // 展开/收起节点时触发
//   onExpand = expandedKeys => {
//     console.log('onExpand', expandedKeys);
//     this.setState({
//       expandedKeys,
//       autoExpandParent: false,
//     });
//   }

//   render() {
//     const { form: { getFieldDecorator }, editData, checkedKeys} = this.props
//     const {menuList} = this.state
//     const formItemLayout = {
//       labelCol: { span: 6 },
//       wrapperCol: { span: 14 },
//     }
//     return (
//       <Form {...formItemLayout} >
//         <Form.Item label="角色名稱" hasFeedback>
//           {getFieldDecorator('name', {
//             initialValue: editData? editData.name: '',
//             rules: [{ required: true, message: '請填寫角色名稱' }],
//           })(<Input />)}
//         </Form.Item>
//         <Form.Item label="角色描述" hasFeedback>
//           {getFieldDecorator('description', {
//             initialValue: editData ? editData.description : '',
//             rules: [{ required: true, message: '請填寫角色描述' }],
//           })(
//             <TextArea
//               autoSize={{
//                 minRows: 2,
//               }}
//             />
//           )}
//         </Form.Item>
//         <Form.Item label="角色权限" hasFeedback>
//           <Tree
//             checkable                                      
//             onExpand={this.onExpand} 
//             checkedKeys={checkedKeys}                     
//             onCheck={this.onCheck}
//             >
//             {this.renderTreeNodes(menuList)}
//           </Tree>
//         </Form.Item>
//       </Form>
//     )
//   }
>>>>>>> 最终提交
// }