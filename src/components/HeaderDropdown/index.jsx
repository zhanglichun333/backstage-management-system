import { Dropdown } from 'antd'
import React from 'react'
import classNames from 'classnames'
import styles from './index.less'

const HeaderDropdown = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />
)

export default HeaderDropdown  //下拉菜单


// 由于react原生动态添加多个className会报错    className={style.container cls} => className={classNames(styles.container, cls)}
// 传入动态class

// let buttonType = 'pressed'
// let buttonType = 'over'
// classNames({ [`btn-${buttonType}`]: true })

// var classNames = require('classnames')
// var Button = React.createClass({
//   // ...
//   render() {
//     var btnClass = classNames({
//       btn: true,
//       'btn-pressed': this.state.isPressed,
//       'btn-over': !this.state.isPressed && this.state.isHovered
//     })
//     return <button className={btnClass}>{this.props.label}</button>
//   }
// })
