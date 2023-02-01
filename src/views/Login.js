import { Component } from "react"
import { Checkbox, Form, Input, Layout } from 'element-react'
import { Button} from 'react-bootstrap';
import 'element-theme-default'
import { Link } from "react-router-dom"
import { actionAuthLogin } from "../redux/actions/auth"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next";

const mapStateToProps = (state) => {
  const { logged } = state
  return {
    logged
  }
}

const mapDispatchToProps = { actionAuthLogin }

const Login = connect(mapStateToProps, mapDispatchToProps)(
  class extends Component {
    constructor(props) {
      super(props)
      const { t } = props;

      this.state = {
        form: {
          password: '',
          username: '',
        },
        rules: {
          username: [
            { required: true, message: t('Login.Please input user name or email'), trigger: 'blur' }
          ],
          password: [
            { required: true, message: t('Login.Please input the password'), trigger: 'blur' },
          ]
        }
      }
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.refs.form.validate((valid) => {
        if (valid) {
          // ===============action function======================
          this.props.actionAuthLogin(this.state.form)
        } else {
          return false
        }
      })
    }

    handleReset(e) {
      e.preventDefault()
      this.refs.form.resetFields()
    }

    onChange(key, value) {
      this.setState({
        form: Object.assign({}, this.state.form, { [key]: value })
      })
    }

    render() {
      const { t } = this.props;
      return (
        <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100"
          className="login-ruleForm d-font-bold"
          labelPosition={"top"}
          style={{  margin: 20, borderRadius: 10 }}>
          <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 15px 0px" }}>
            <Layout.Col span="24">
              <div className="grid-content d-content-highlight"
                style={{ borderRadius: "10px 10px 1px 1px" }}>
                <div style={{ display: "inline", marginLeft: 20 }}>{t("Login.")}</div>
                {/* <div style={{ float: "right", display: "inline" }}>
                  <img src="imgs/logo3.png" alt='logo' style={{ height: "35px", marginRight: 20 }} />
                </div> */}
              </div>
            </Layout.Col>
          </Layout.Row>
          
          <div style={{marginTop:30}}/>
          <Form.Item label={t("Login.USERNAME OR EMAIL ADDRESS")} prop="username" style={{ margin: 15 }}>
            <Input value={this.state.form.username}
              onChange={this.onChange.bind(this, 'username')} />
          </Form.Item>
          <Form.Item label={t("Login.PASSWORD")} prop="password" style={{ margin: 15 }}>
            <Input type="password" value={this.state.form.password}
              onChange={this.onChange.bind(this, 'password')}
              autoComplete="off" />
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Checkbox>{t("Login.REMEMBER ME")}</Checkbox>
          </div>
          <Form.Item style={{ textAlign: "center" }}>
            <Button className="btn btn-primary" style={{padding:"10px 45px"}} onClick={this.handleSubmit}>{t("Login.")}</Button>
          </Form.Item>
          <div style={{ textAlign: "center", marginTop: -5, paddingBottom: 20 }}>
            <Link to={"/my-account/lost-password"}>{t("Login.Lost your password?")}</Link>
          </div>
        </Form>
      )
    }
  }
)

export default withTranslation()(Login)