<template>
  <div class="login_header">
    <div class="login_box">
      <!--登录图片区域-->
      <div class="avatar_box">
        <img src="~assets/logo.png" alt="" />
      </div>
      <!--登录表单区域-->
      <el-form
        :rules="rules"
        ref="form"
        :model="form"
        label-width="0px"
        class="login_form"
      >
        <el-form-item label="" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入您的账号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入您的密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btnArea">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetData">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在3到10个字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在3到20个字符之间',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    //登录信息的重置功能
    resetData() {
      //通过$refs获取当前组件，在组件中调用对应方法
      //resetFields方法会重置为默认值
      this.$refs.form.resetFields()
    },
    async login() {
      //调用方法，实现表单验证
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        let res = await this.$http.post('/login', this.form)
        if (res.meta.status != 200) this.$message.error('登录失败!')
        else {
          this.$message.success('登录成功!')
          sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        }
      })
      
    },
  },
}
</script>
<style lang="scss" scoped>
.login_header {
  background: #2b4b6b;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      padding: 10px;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px #ddd;
      background: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eee;
      }
    }
    .login_form {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      width: 90%;
      .btnArea {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>