
<template>
  <div class="login-wrapper">
    <img class="logo" :src="logo" />
    <el-form
            ref="loginForm" :model="loginForm" :rules="loginRules"
            label-width="0"
      style="width:100%;"
    >
      <el-form-item prop="account">
        <el-input
                ref="account"
                v-model="loginForm.account"
                placeholder="account"
                name="account"
                type="text"
                tabindex="1"
                autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
                ref="password"
                v-model="loginForm.password"
                type="password"
                placeholder="Password"
                name="password"
                tabindex="2"
                autocomplete="on"
        />
      </el-form-item>

    </el-form>
    <el-button
      type="primary"
      @click="submit"
      style="width:100%; margin-top: 6px;"
      :loading="loading"
    >登录</el-button>
  </div>
</template>

<script>
import { Form, FormItem, Select, Option } from 'element-ui'
import logo from '../../assets/logo/logo.png'
import { login,getUserSig } from '../../api/user'
import {setUserSig,setUserID,setToken} from '../../utils/auth'

export default {
  name: 'Login',
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElSelect: Select,
    ElOption: Option,
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter the correct system name'))
      } else {
        callback()
      }
    }

    return {
      userID:'',
      userSig:'',
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur' }]
      },
      logo: logo,
      registerVisible: false,
      loading: false
    }
  },
  methods: {
    /**
     * 提交form
     */
    submit() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          login(this.loginForm).then(res=>{
            if(res.user.id) {
              setToken(res.token)
              setUserID( res.user.id  + '')
              this.userID = res.user.id  + ''
              getUserSig(res.user.id,res.token).then(res=>{
                this.userSig = res
                setUserSig( res)
                this.login()
              })
            }
          })
        }
      })
    },
    /**
     * 登陆操作
     */
    login() {
      // this.loading = true
      this.tim
        .login({
          userID: this.userID,
          userSig: this.userSig
        })
        .then(() => {
          this.loading = false
          this.$store.commit('toggleIsLogin', true)
          this.$store.commit('startComputeCurrent')
          this.$store.commit('showMessage', { type: 'success', message: '登录成功' })
          this.$store.commit({
            type: 'GET_USER_INFO',
            userID: this.userID,
            userSig:this.userSig,
            sdkAppID: window.genTestUserSig('').SDKAppID
          })
          this.$store.commit('showMessage', {
            type: 'success',
            message: '登录成功'
          })
          this.$router.push('/index')
        })
        .catch(error => {
          this.loading = false
          this.$store.commit('showMessage', {
            message: '登录失败：' + error.message,
            type: 'error'
          })
        })
    },
  }
}
</script>

<style lang="stylus" scoped>
.login-wrapper
  display flex
  align-items center
  flex-direction column
  width 450px
  background $white
  color $black
  border-radius 5px
  box-shadow: 0 11px 20px 0 rgba(0,0,0,0.3)
  .row-div
    display flex
    justify-content center
    align-items center
    flex-direction row
  .logo
    width 110px
    height 110px
  .loginBox
    width 320px
    margin 0 0 20px 0
    .send-code
      width 112px
    .login-im-btn
      width 100%
  .loginFooter
    color: #8c8a8ac7
    text-align: center
    padding: 0 0 20px 0
    cursor: pointer
.login-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  padding: 20px 80px 50px;
  background: $white;
  color: $black;
  border-radius: 5px;
  box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);

  .logo {
    width: 130px;
    height: 130px;
  }

  .register-button {
    width: 100%;
    margin: 6px 0 0 0;
  }

  .user-selector {
    width: 100%;
  }
}
</style>
