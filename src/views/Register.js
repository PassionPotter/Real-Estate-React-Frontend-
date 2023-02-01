import { Component } from "react"
import { Radio, Form, Input, Layout } from 'element-react'
import { Button} from 'react-bootstrap';
import 'element-theme-default'
import { connect } from "react-redux"
import { actionAuthRegister } from "../redux/actions/auth"
import { withTranslation } from "react-i18next";

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = { actionAuthRegister };

const Register = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
  constructor(props) {
    super(props)
    const { t } = props;

    this.state = {
      form: {
        firstname: '',
        lastname: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        citizen: '0',
      },
      rules: {
        firstname: [
          { required: true, message: t('Register.Please input first name'), trigger: 'blur' }
        ],
        lastname: [
          { required: true, message: t('Register.Please input last name'), trigger: 'blur' }
        ],
        username: [
          { required: true, message: t('Register.Please input user name'), trigger: 'blur' }
        ],
        phone: [
          { required: true, message: t('Register.Please input phone'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: t('Register.Please input email'), trigger: 'blur' },
          { type: 'email', message: t('Register.Please input correct email address'), trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: t('Register.Please input the password'), trigger: 'blur' },
        ],
        citizen: [
          { required: true, message: '', trigger: 'change' }
        ],
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    this.refs.form.validate((valid) => {
      if (valid) {
        let data = { ...this.state.form }
        if (sessionStorage.getItem('referredBy')) {
          data['referral'] = sessionStorage.getItem('referredBy')
        }
        this.props.actionAuthRegister(data);
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
        className="register-ruleForm d-font-bold"
        labelPosition={"top"}
        style={{  margin: 20, borderRadius: 10 }}>
        <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 15px 0px" }}>
          <Layout.Col span="24">
            <div className="grid-content d-content-highlight" style={{ borderRadius: "10px 10px 1px 1px" }}>
              <div style={{ display: "inline", marginLeft: 20 }}>{t('Register.')}</div>
              {/* <div style={{ float: "right", display: "inline" }}>
                <img src="imgs/logo3.png" alt="logo" style={{ height: "35px", marginRight: 20 }} />
              </div> */}
            </div>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span="12">
            <div className="grid-content bg-purple">
              <Form.Item label={t("Register.FIRST NAME")} prop="firstname" style={{ margin: 15 }}>
                <Input value={this.state.form.firstname}
                  onChange={this.onChange.bind(this, 'firstname')} />
              </Form.Item>
            </div>
          </Layout.Col>
          <Layout.Col span="12">
            <div className="grid-content bg-purple-light">
              <Form.Item label={t("Register.LAST NAME")} prop="lastname" style={{ margin: 15 }}>
                <Input value={this.state.form.lastname} onChange={this.onChange.bind(this, 'lastname')} />
              </Form.Item>
            </div>
          </Layout.Col>
        </Layout.Row>

        <Form.Item label={t("Register.PHONE")} prop="phone" style={{ margin: 15 }}>
          <Input value={this.state.form.phone} onChange={this.onChange.bind(this, 'phone')} />
        </Form.Item>
        <Form.Item label={t("Register.USERNAME")} prop="username" style={{ margin: 15 }}>
          <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')} />
        </Form.Item>
        <Form.Item label={t("Register.EMAIL ADDRESS")} prop="email" style={{ margin: 15 }}>
          <Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} />
        </Form.Item>
        <Form.Item label={t("Register.PASSWORD")} prop="password" style={{ margin: 15 }}>
          <Input type="password" value={this.state.form.password}
            onChange={this.onChange.bind(this, 'password')}
            autoComplete="off" />
        </Form.Item>
        <div style={{ margin: 15 }}>
          <span style={{ fontSize: 12, color: "white" }}>{t("Register.ARE YOU A RESIDENT OR CITIZEN OF THE UNITED STATES OR ITS TERRITORIES?")} <span
            style={{ color: "#dba87e" }}>*</span></span>
        </div>
        <Form.Item label="" prop="citizen" style={{ textAlign: "center" }}>
          <Radio.Group value={this.state.form.citizen} onChange={this.onChange.bind(this, 'citizen')}>
            <Radio value="1">{t("Register.YES")}</Radio>
            <Radio value="0">{t("Register.NO")}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" , paddingBottom:30, }}>
          <Button onClick={this.handleSubmit.bind(this)} style={{padding:"10px 35px"}}>{t("Register.REGISTER")}</Button>
        </Form.Item>
      </Form>
    )
  }
})

export default withTranslation()(Register)