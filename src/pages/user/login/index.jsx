import { Alert, Checkbox, Icon } from 'antd'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import React, { Component } from 'react'
import Link from 'umi/link'
import { connect } from 'dva'
import LoginComponents from './components/Login'
import styles from './style.less'

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents

@connect(({ userAndlogin, loading }) => ({
  userAndlogin,
  submitting: loading.effects['userAndlogin/login'],
}))
class Login extends Component {
  loginForm = undefined
  state = {
    type: 'account',
    autoLogin: true,
  }

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    })
  }
  //表单提交
  handleSubmit = (err, values) => {
    const { type } = this.state

    if (!err) {
      const { dispatch } = this.props
      dispatch({
        type: 'userAndlogin/login',
        payload: { ...values, type },
      })
    }
  }
  //tab组件切换
  onTabChange = type => {
    this.setState({
      type,
    })
  }
  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return
      }

      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err)
        } else {
          const { dispatch } = this.props
          dispatch({
            type: 'userAndlogin/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject)
        }
      })
    })
  //当密码或账号错误时， 警告提示
  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  )

  render() {
    const { userAndlogin, submitting } = this.props
    const { status, type: loginType } = userAndlogin
    const { type, autoLogin } = this.state
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form
          }}
        >
          <Tab key="account" tab="账户密码登录">
            {status === 'error' && loginType === 'account' && !submitting && this.renderMessage('账户或密码错误')}
            <UserName
              name="userName"
              placeholder="账号"
              rules={[
                {
                  required: true,
                  message: "请输入账号"
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: "请输入密码"
                },
              ]}
              onPressEnter={e => {
                e.preventDefault()
                this.loginForm.validateFields(this.handleSubmit)
              }}
            />
          </Tab>
          {/* <Tab key="mobile" tab="手机号登录">
            {status === 'error' && loginType === 'mobile' && !submitting && this.renderMessage('验证码错误')}
            <Mobile
              name="mobile"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号！'
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误!'
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder='验证码'
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText='获取验证码'
              getCaptchaSecondText='秒'
              rules={[
                {
                  required: true,
                  message: '请输入验证码！'
                },
              ]}
            />
          </Tab> */}
          {/* <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="userandlogin.login.remember-me" />
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              <FormattedMessage id="userandlogin.login.forgot-password" />
            </a>
          </div> */}
          <Submit loading={submitting}>
            登录
          </Submit>
          <div className={styles.other}>
            {/* <FormattedMessage id="userandlogin.login.sign-in-with" />
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" /> */}
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
          </div>
        </LoginComponents>
      </div>
    )
  }
}

export default Login
