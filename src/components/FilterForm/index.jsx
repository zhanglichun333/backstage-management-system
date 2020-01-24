<<<<<<< HEAD
import React, { Component } from 'react'
import { Select, Form, Button, DatePicker, Input} from 'antd'
const { Option } = Select
const { TextArea } = Input

class FilterForm extends Component {
  state = {
    systemList: {
      type: 'select',
      label: '所在系统',
      feild: 'systemName',
      placeholder: '不限',
      width: 200,
      List: [
        { value: 1, text: '空調及機械通風系統' },
        { value: 2, text: '電力系統' },
        { value: 3, text: '照明系統' },
        { value: 4, text: '通訊系統' },
        { value: 5, text: '消防系统' },
        { value: 6, text: '保安系統' },
        { value: 7, text: '繫泊及登船系統' },
        { value: 8, text: '供水及排水系統' },
        { value: 9, text: '升降機類設備' },
        { value: 10, text: '行李處理系統' },
        { value: 11, text: '石油氣系統' },
        { value: 12, text: '其他基礎設施' },
      ]
    }, 
    deviceList: {
      type: 'select',
      label: '设备类型',
      feild: 'deviceTypeName',
      placeholder: '全部',
      width: 200,
      List: [
        { value: 1, text: '冷凍主機' },
        { value: 2, text: '冷凍水泵' },
        { value: 3, text: '冷卻水塔' },
        { value: 4, text: '冷凝水泵' },
        { value: 5, text: 'AHU風櫃' },
        { value: 6, text: '排風扇' },
        { value: 7, text: '冷氣盤管風機' },
        { value: 8, text: 'DX多聯機組"' },
        { value: 9, text: '分體機' },
        { value: 10, text: '加藥泵' },
      ]
    },
    areaList: {
      type: 'select',
      label: '区域类型',
      feild: 'areaName',
      placeholder: '不限',
      width: 200,
      List: [
        { value: 1, text: '1區' },
        { value: 2, text: '2區' },
        { value: 3, text: '3區' },
        { value: 4, text: '4區' },
        { value: 18, text: '5-1區' },
        { value: 19, text: '5-2區' },
        { value: 20, text: '6-1區' },
        { value: 21, text: '6-2區' },
        { value: 7, text: '7區' },
        { value: 8, text: '8區' },
        { value: 9, text: '9區' },
        { value: 10, text: '10區' },
        { value: 11, text: '11區' },
        { value: 12, text: '12區' },
        { value: 13, text: '13區' },
        { value: 22, text: '14-1區' },
        { value: 23, text: '14-2區' },
        { value: 15, text: '15區' },
        { value: 16, text: '16區' },
        { value: 17, text: '17區' },
      ]
    },
    gengList: {
      type: 'select',
      label: '更次',
      feild: 'geng',
      placeholder: '不限',
      width: 130,
      List: [
        { value: 1, text: 'A' }, { value: 2, text: 'B' }, { value: 3, text: 'C' }
      ]
    },
    get filterFormList() {
      return [
        this.systemList,
        this.deviceList,
        this.areaList,
        this.gengList
      ]
    },
    deviceBasicFormList: [
      {
        type: 'input',
        label: '所在系统',
        feild: 'systemName',
        width: 200,
      },
      {
        type: 'input',
        label: '设备类型',
        feild: 'deviceTypeName',
        width: 200,
      },
      {
        type: 'input',
        label: '设备编号',
        feild: 'sn',
        width: 200,
      },
      {
        type: 'input',
        label: '设备名称',
        feild: 'name',
        width: 200,
      },
      {
        type: 'input',
        label: '型号',
        feild: 'model',
        width: 200,
      },
      {
        type: 'input',
        label: '生产厂家',
        feild: 'productFactory',
        width: 200,
      },
      {
        type: 'input',
        label: '出厂日期',
        feild: 'productDate',
        width: 200,
      }
    ],
    maintainFormList: [
      {
        type: 'input',
        label: '所在系统',
        feild: 'systemName',
        width: 200,
      },
      {
        type: 'input',
        label: '设备编号',
        feild: 'deviceSn',
        width: 200,
      },
      {
        type: 'input',
        label: '工单号',
        feild: 'orderNumber',
        width: 200,
      },
      {
        type: 'input',
        label: '位置',
        feild: 'position',
        width: 200,
      },
      {
        type: 'input',
        label: '报修情况',
        feild: 'troubleDesc',
        width: 200,
      },
      {
        type: 'input',
        label: '报修人',
        feild: 'executive',
        width: 200,
      },
      {
        type: 'input',
        label: '报修时间',
        feild: 'sendTime',
        width: 200,
      }
    ],
    userManagerList: [
      {
        type: 'input',
        label: '账号',
        feild: 'account',
        width: 200,
        message: '请填写账号'
      },
      {
        type: 'input',
        label: '密码',
        feild: 'password',
        width: 200,
        message: '请填写密码'
      },
      {
        type: 'input',
        label: '角色名称',
        feild: 'name',
        width: 200,
        message: '请填写角色名称'
      },
      {
        type: 'textArea',
        label: '角色描述',
        feild: 'description',
        width: 200,
        minRows: 1,
        message: '请填写角色描述'
      },
      {
        type: 'input',
        label: '姓名',
        feild: 'zname',
        width: 200,
        message: '请填写姓名'
      },
      {
        type: 'input',
        label: '联系方式',
        feild: 'number',
        width: 200,
        message: '请填写联系方式'
      },
    ],
    toolManagerList: [
      {
        type: 'input',
        label: '工具名称',
        feild: 'tool',
        width: 200,
      },
      {
        type: 'datePicker',
        label: '时间',
        feild: 'time',
        placeholder: '请选择日期',
        width: 200,
      }
    ]
  }

  // 查询功能
  handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      this.props.filterSearch(values)
    })
  }
  // 重置功能
  handleReset = () => {
    this.props.form.resetFields()
  }
  // <Option></Option>
  renderList = (List) => {
    return List.map((item, i) => {
      return <Option value={item.value} key={i}>{item.text}</Option>
    })
  }
  // <Selet.Item></Selet.Item>
  renderForm = () => {
    let formList = []
    let { filterFormList, deviceBasicFormList, maintainFormList, userManagerList, toolManagerList } = this.state
    let { form: { getFieldDecorator }, formType, filterType, editData, layoutType} = this.props
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
    formType === 'filter' ? formList = filterFormList : formType === 'deviceBasic' ? formList = deviceBasicFormList : formType === 'maintain' ? formList = maintainFormList : formType === 'userManager' ? formList = userManagerList : formList = toolManagerList 
    if (filterType === 1) {
      formList.length = 3
    } else if (filterType === 2) {
      formList.length = 2
    }
    return formList.map((item)=>{
      if (item.type === 'select') {
        return (
          <Form.Item label={item.label} key={item.feild} {...formItemLayout} hasFeedback={layoutType ? true : false}>
            {getFieldDecorator(item.feild, {
              initialValue: editData ? editData[item.feild] : ''
            })(
              <Select placeholder={item.placeholder} style={{ width: item.width }}>
                {this.renderList(item.List)}
              </Select>
            )}
          </Form.Item>
        )
      } else if (item.type === 'input') {
        return (
          <Form.Item label={item.label} key={item.feild} {...formItemLayout} hasFeedback={layoutType ? true : false}>
            {getFieldDecorator(item.feild, {
              initialValue: editData ? editData[item.feild] : '',
              rules: item.message ? [{ required: true, message: item.message }] : null
            })(
              <Input placeholder={item.placeholder} style={{ width: item.width }} />
            )}
          </Form.Item>
        )
      } else if (item.type === 'textArea') {
        return (
          <Form.Item label={item.label} key={item.feild} {...formItemLayout} hasFeedback={layoutType ? true : false}>
            {getFieldDecorator(item.feild, {
              initialValue: editData ? editData[item.feild] : '',
              rules: item.message ? [{ required: true, message: item.message }] : null
            })(
              <TextArea autoSize={{ minRows: item.minRows }} placeholder={item.placeholder} style={{ width: item.width }}/>
            )}
          </Form.Item>
        )
      } else if (item.type === 'datePicker') {
        return (
          <Form.Item label={item.label} key={item.feild} {...formItemLayout} >
            {getFieldDecorator(item.feild, {
              initialValue: editData ? editData[item.feild] : null
            })(
              <DatePicker placeholder={item.placeholder} style={{ width: item.width }} />
            )}
          </Form.Item>
        )
      }
    })
  }

  render() {
    const { layoutType, filterType } = this.props
    return (
      <Form layout={layoutType ? 'horizontal': 'inline'}>
        {this.renderForm()}
        {filterType ? <Form.Item>
          <Button type="primary" style={{ margin: '0 20px 0 40px' }} onClick={this.handleSearch}>查询</Button>
          <Button onClick={this.handleReset}>重置</Button>
        </Form.Item>: <></>} 
      </Form>
    )
  }
}
export default Form.create({})(FilterForm)
=======
import React, { Component } from 'react';
import { Select, Form, Button, DatePicker, Input, Radio } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

class FilterForm extends Component {
  state = {
    systemList: {
      type: 'select',
      label: '所在系统',
      feild: 'systemName',
      placeholder: '不限',
      List: [
        { value: 1, text: '空調及機械通風系統' },
        { value: 2, text: '電力系統' },
        { value: 3, text: '照明系統' },
        { value: 4, text: '通訊系統' },
        { value: 5, text: '消防系统' },
        { value: 6, text: '保安系統' },
        { value: 7, text: '繫泊及登船系統' },
        { value: 8, text: '供水及排水系統' },
        { value: 9, text: '升降機類設備' },
        { value: 10, text: '行李處理系統' },
        { value: 11, text: '石油氣系統' },
        { value: 12, text: '其他基礎設施' },
      ],
    },
    deviceList: {
      type: 'select',
      label: '设备类型',
      feild: 'deviceTypeName',
      placeholder: '全部',
      List: [
        { value: 1, text: '冷凍主機' },
        { value: 2, text: '冷凍水泵' },
        { value: 3, text: '冷卻水塔' },
        { value: 4, text: '冷凝水泵' },
        { value: 5, text: 'AHU風櫃' },
        { value: 6, text: '排風扇' },
        { value: 7, text: '冷氣盤管風機' },
        { value: 8, text: 'DX多聯機組"' },
        { value: 9, text: '分體機' },
        { value: 10, text: '加藥泵' },
      ],
    },
    areaList: {
      type: 'select',
      label: '区域类型',
      feild: 'areaName',
      placeholder: '不限',
      List: [
        { value: 1, text: '1區' },
        { value: 2, text: '2區' },
        { value: 3, text: '3區' },
        { value: 4, text: '4區' },
        { value: 18, text: '5-1區' },
        { value: 19, text: '5-2區' },
        { value: 20, text: '6-1區' },
        { value: 21, text: '6-2區' },
        { value: 7, text: '7區' },
        { value: 8, text: '8區' },
        { value: 9, text: '9區' },
        { value: 10, text: '10區' },
        { value: 11, text: '11區' },
        { value: 12, text: '12區' },
        { value: 13, text: '13區' },
        { value: 22, text: '14-1區' },
        { value: 23, text: '14-2區' },
        { value: 15, text: '15區' },
        { value: 16, text: '16區' },
        { value: 17, text: '17區' },
      ],
    },
    gengList: {
      type: 'select',
      label: '更次',
      feild: 'geng',
      placeholder: '不限',
      width: 130,
      List: [
        { value: 1, text: 'A' },
        { value: 2, text: 'B' },
        { value: 3, text: 'C' },
      ],
    },
    get filterList() {
      return [this.systemList, this.deviceList, this.areaList, this.gengList];
    },
    //sparePart
    get newAddList() {
      return [
        this.systemList,
        this.deviceList,
        {
          type: 'input',
          label: '备件名称',
          feild: 'name',
        },
        {
          type: 'input',
          label: '备件规格型号',
          feild: 'specification',
        },
        {
          type: 'input',
          label: '库存数量',
          feild: 'count',
        },
        {
          type: 'input',
          label: '单位',
          feild: 'unit',
        },
        {
          type: 'input',
          label: '成本价',
          feild: 'price',
        },
      ];
    },
    checkList: [
      { type: 'input', label: '盘点前数量', feild: 'bcount' },
      { type: 'input', label: '盘点后数量', feild: 'acount' },
    ],
    inPutList: [
      {
        type: 'radio',
        label: '入库来源',
        feild: 'origin',
        List: [
          { value: 1, text: '归还' },
          { value: 2, text: '新增' },
        ],
      },
      { type: 'input', label: '数量', feild: 'inPutCount' },
      { type: 'input', label: '入库人', feild: 'inPutMan' },
    ],
    outPutList: [
      { type: 'input', label: '工单号', feild: 'number' },
      { type: 'input', label: '数量', feild: 'outPutCount' },
      { type: 'input', label: '领用人', feild: 'outPutMan' },
    ],
    toolFilterList: [
      {
        type: 'input',
        label: '工具名称',
        feild: 'tool',
      },
      {
        type: 'datePicker',
        label: '时间',
        feild: 'time',
        placeholder: '请选择日期',
      },
    ],
    inPutsList: [
      { type: 'input', label: '数量', feild: 'inPutCount' },
      { type: 'input', label: '入库人', feild: 'inPutMan' },
    ],
    returnList: [{ type: 'input', label: '数量', feild: 'returnCount' }],
    //stading
    get deviceBasicList() {
      return [
        this.systemList,
        this.deviceList,
        {
          type: 'input',
          label: '设备编号',
          feild: 'sn',
        },
        {
          type: 'input',
          label: '设备名称',
          feild: 'name',
        },
        {
          type: 'input',
          label: '型号',
          feild: 'model',
        },
        {
          type: 'input',
          label: '生产厂家',
          feild: 'productFactory',
        },
        {
          type: 'input',
          label: '出厂日期',
          feild: 'productDate',
        },
      ];
    },
    get deviceCheckList() {
      return [
        this.systemList,
        this.deviceList,
        {
          type: 'input',
          label: '检查方法',
          feild: 'checkMethod',
        },
        {
          type: 'input',
          label: '检查周期',
          feild: 'period',
        },
        {
          type: 'input',
          label: '选项',
          feild: 'option',
        },
        {
          type: 'input',
          label: '单位',
          feild: 'unit',
        },
        {
          type: 'input',
          label: '备注',
          feild: 'productFactory',
        },
      ];
    },
    get deviceKeepList() {
      return [
        this.systemList,
        this.deviceList,
        {
          type: 'input',
          label: '保养项目',
          feild: 'name',
        },
        {
          type: 'input',
          label: '周期',
          feild: 'period',
        },
        {
          type: 'input',
          label: '选项',
          feild: 'option',
        },
        {
          type: 'input',
          label: '单位',
          feild: 'unit',
        },
        {
          type: 'input',
          label: '备注',
          feild: 'remark',
        },
      ];
    },
    get deviceContextList() {
      return [
        ...this.newAddList,
        {
          type: 'input',
          label: '预警值',
          feild: 'lowerWarningStock',
        },
      ];
    },
    toolContextList: [
      {
        type: 'input',
        label: '工具名称',
        feild: 'name',
      },
      {
        type: 'input',
        label: '工具规格型号',
        feild: 'specification',
      },
      {
        type: 'input',
        label: '工具数量',
        feild: 'count',
      },
      {
        type: 'input',
        label: '单位',
        feild: 'unit',
      },
      {
        type: 'input',
        label: '备注',
        feild: 'remark',
      },
    ],
    //maintain
    get maintainList() {
      return [
        this.systemList,
        this.deviceList,
        {
          type: 'input',
          label: '工单号',
          feild: 'orderNumber',
        },
        {
          type: 'input',
          label: '位置',
          feild: 'position',
        },
        {
          type: 'input',
          label: '报修情况',
          feild: 'troubleDesc',
        },
        {
          type: 'input',
          label: '报修人',
          feild: 'executive',
        },
        {
          type: 'input',
          label: '报修时间',
          feild: 'sendTime',
        },
      ];
    },
    //systemManager
    userManagerList: [
      {
        type: 'input',
        label: '账号',
        feild: 'account',
        message: '请填写账号',
      },
      {
        type: 'input',
        label: '密码',
        feild: 'password',
        message: '请填写密码',
      },
      {
        type: 'input',
        label: '角色名称',
        feild: 'name',
        message: '请填写角色名称',
      },
      {
        type: 'textArea',
        label: '角色描述',
        feild: 'description',
        minRows: 1,
        message: '请填写角色描述',
      },
      {
        type: 'input',
        label: '姓名',
        feild: 'zname',
        message: '请填写姓名',
      },
      {
        type: 'input',
        label: '联系方式',
        feild: 'number',
        message: '请填写联系方式',
      },
    ],
  };

  // 查询功能
  handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      this.props.filterSearch(values);
    });
  };

  // 重置功能
  handleReset = () => {
    this.props.form.resetFields();
  };

  // <Option></Option>
  renderList = List => {
    return List.map((item, i) => {
      return (
        <Option value={item.text} key={i}>
          {item.text}
        </Option>
      );
    });
  };
  //radio
  renderRaidoList = List => {
    return List.map((item, i) => {
      return (
        <Radio value={item.text} key={i}>
          {item.text}
        </Radio>
      );
    });
  };

  // <Selet.Item></Selet.Item>
  renderForm = () => {
    let formList = [];
    let {
      filterList,
      newAddList,
      checkList,
      inPutList,
      outPutList,
      toolFilterList,
      inPutsList,
      returnList,
      deviceBasicList,
      deviceCheckList,
      deviceKeepList,
      deviceContextList,
      toolContextList,
      maintainList,
      userManagerList,
    } = this.state;
    let {
      form: { getFieldDecorator },
      formType,
      filterType,
      editData,
      layoutType,
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    switch (formType) {
      case 'newAdd':
        formList = newAddList;
        break;
      case 'check':
        formList = checkList;
        break;
      case 'inPut':
        formList = inPutList;
        break;
      case 'outPut':
        formList = outPutList;
        break;
      case 'toolFilter':
        formList = toolFilterList;
        break;
      case 'inPuts':
        formList = inPutsList;
        break;
      case 'return':
        formList = returnList;
        break;
      case 'deviceBasic':
        formList = deviceBasicList;
        break;
      case 'deviceCheck':
        formList = deviceCheckList;
        break;
      case 'deviceKeep':
        formList = deviceKeepList;
        break;
      case 'deviceContext':
        formList = deviceContextList;
        break;
      case 'toolContext':
        formList = toolContextList;
        break;
      case 'maintain':
        formList = maintainList;
        break;
      case 'userManager':
        formList = userManagerList;
        break;
      default:
        formList = filterList;
    }
    if (filterType === 1) {
      formList.length = 3;
    } else if (filterType === 2) {
      formList.length = 2;
    }
    return formList.map(item => {
      if (item.type === 'select') {
        return (
          <Form.Item label={item.label} key={item.feild} {...formItemLayout}>
            {getFieldDecorator(item.feild, {
              initialValue: editData ? editData[item.feild] : '',
            })(
              <Select placeholder={item.placeholder} style={{ width: item.width || 200 }}>
                {this.renderList(item.List)}
              </Select>,
            )}
          </Form.Item>
        );
      } else if (item.type === 'input') {
        return (
          <Form.Item
            label={item.label}
            key={item.feild}
            {...formItemLayout}
            hasFeedback={layoutType ? true : false}
          >
            {getFieldDecorator(item.feild, {
              initialValue: editData ? editData[item.feild] : '',
              rules: item.message ? [{ required: true, message: item.message }] : null,
            })(<Input placeholder={item.placeholder} style={{ width: item.width || 200 }} />)}
          </Form.Item>
        );
      } else if (item.type === 'textArea') {
        return (
          <Form.Item
            label={item.label}
            key={item.feild}
            {...formItemLayout}
            hasFeedback={layoutType ? true : false}
          >
            {getFieldDecorator(item.feild, {
              initialValue: editData ? editData[item.feild] : '',
              rules: item.message ? [{ required: true, message: item.message }] : null,
            })(
              <TextArea
                autoSize={{ minRows: item.minRows }}
                placeholder={item.placeholder}
                style={{ width: item.width || 200 }}
              />,
            )}
          </Form.Item>
        );
      } else if (item.type === 'datePicker') {
        return (
          <Form.Item label={item.label} key={item.feild} {...formItemLayout}>
            {getFieldDecorator(item.feild, {
              initialValue: editData ? editData[item.feild] : null,
            })(<DatePicker placeholder={item.placeholder} style={{ width: item.width || 200 }} />)}
          </Form.Item>
        );
      } else if (item.type === 'radio') {
        return (
          <Form.Item label={item.label} key={item.feild} {...formItemLayout}>
            {getFieldDecorator(item.feild, {
              initialValue: editData ? editData[item.feild] : null,
            })(
              <Radio.Group placeholder={item.placeholder} style={{ width: item.width || 200 }}>
                {this.renderRaidoList(item.List)}
              </Radio.Group>,
            )}
          </Form.Item>
        );
      }
    });
  };

  render() {
    const { layoutType, filterType } = this.props;
    return (
      <Form layout={layoutType ? 'horizontal' : 'inline'}>
        {this.renderForm()}
        {filterType ? (
          <Form.Item>
            <Button type="primary" style={{ margin: '0 20px 0 40px' }} onClick={this.handleSearch}>
              查询
            </Button>
            <Button onClick={this.handleReset}>重置</Button>
          </Form.Item>
        ) : null}
      </Form>
    );
  }
}
export default Form.create({})(FilterForm);
>>>>>>> 最终提交
