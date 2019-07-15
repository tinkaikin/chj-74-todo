<template>
  <!-- 左边使用 element-ui -->
  <!-- 1.安装和配置  -->
  <div class="login-container">
    <el-card class="login-card">
      <img src="../../assets/logo_index.png" alt="logo_index.png">
      <!-- s=表单 -->
      <el-form
        :model="loginForm"
        :rules="loginRules"
        status-icon
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="输入验证码" style="width:240px"></el-input>
          <el-button type="success" v-show="show" style="float:right" @click="getCode">发送验证码</el-button>
          <el-button type="success" v-show="!show" style="float:right">{{count}} s</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">
            <span class="xy">我已阅读并同意</span>用户协议
            <span class="xy">和隐私</span>条款
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin" style="width:100%">登 基</el-button>
        </el-form-item>
      </el-form>
      <!-- e=表单 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        console.log('规则:', rule)
        console.log('输入框内容:', value)
        console.log('回调函数:', callback)
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输6位数', trigger: 'blur' }
        ]
      },
      show: true, // 定时器
      count: '',
      timer: null
    }
  },
  methods: {
    onLogin () {
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          // 发送ajax请求
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              const { status, data } = res
              if (status === 201) {
                window.sessionStorage.setItem(
                  'token',
                  JSON.stringify(data.data)
                )
                this.$router.push('/')
              }
            })
            .catch(() => {
              this.$message.error('傻屌,手机或验证码错误')
            })
        } else {
          // 错误弹出消息框
          this.$message.error('手机或验证码格式错误,傻屌')
        }
      })
    },
    getCode () {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/images/timg.jpg") no-repeat center;
  background-size: 100% 100%;
  .login-card {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      margin: 20px auto;
    }
  }
  .xy {
    color: #ccc;
  }
}
</style>
