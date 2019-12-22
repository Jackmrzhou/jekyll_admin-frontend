<template>
  <div id="auth">
      <el-row>
        <el-col :xs="3" :lg="9" :xl="9">&nbsp;</el-col>
        <el-col :xs="18" :lg="6" :xl="6">
          <el-image :src="imageSrc" class="login-logo" :fit="'scale-down'"></el-image>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="1" :lg="9" :xl="10">&nbsp;</el-col>
        <el-col :xs="22" :lg="6" :xl="4">
          <el-card class="login-box">
              <el-tabs>
                <el-tab-pane label="username&password">
                  <el-form ref="loginForm" :model="normalForm" :rules="rules">
                    <el-form-item label="username" prop="username">
                      <el-input v-model="normalForm.username" placeholder="please input username" type="text"></el-input>
                    </el-form-item>
                    <el-form-item label="password" prop="password">
                      <el-input v-model="normalForm.password" placeholder="please input password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                      <el-button style="width: 60%;" type="success" @click="onSubmit" round>Login</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="token">
                  <el-form ref="tokenLoginForm" :model="tokenForm" :rules="tokenRules">
                    <el-form-item label="token" prop="token">
                      <el-input v-model="tokenForm.token" type="password"/>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                      <el-button style="width: 60%;" type="success" @click="tokenOnSubmit" round>Login</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
    name: 'auth',
    data () {
      return {
        imageSrc: require('../assets/jekyll_logo.png'),
        normalForm: {
            username: '',
            password: ''
        }, 
        tokenForm: {
          token: ''
        },
        loginUrl: '/api/auth',
        rules: {
            username: [{
              required: true,
              message: 'username can not be empty',
              trigger: 'blur'
            }],
            password: [{
              required: true,
              message: 'password can not be empty',
              trigger: 'blur'
            }]
        }, 
        tokenRules: {
          token: [{
            required: true,
            message: 'token can not be empty',
            trigger: 'blur'
          }]
        }
      }
    }, 
    methods: {
      onSubmit() {
        this.$refs.loginForm.validate((valid) => {
          var redirect = this.getRedirect()
          this.axios.post(this.loginUrl+'/user', this.normalForm).then((resp) => {
            var data = resp.data
            if (data.code) {
              this.$notify({
                title: "result",
                message: data.message,
                type: "error"
              })
            } else {
              this.$cookies.set("token", data.token)
              this.$router.push(redirect)
            }
          }).catch((err) => {
            this.$notify({
              title:"result",
              message: "error",
              type: "error"
            })
            console.log(err)
          })
        })
      }, 
      tokenOnSubmit() {
        this.$refs.tokenLoginForm.validate((valid) => {
          var redirect = this.getRedirect()
          this.axios.post(this.loginUrl+'/token', this.tokenForm).then((resp) => {
            var data = resp.data
            if (data.code) {
              this.$notify({
                title: "result",
                message: data.message,
                type: "error"
              })
            } else {
              this.$cookies.set("token", data.token)
              this.$router.push(redirect)
            }
          }).catch((err) => {
            this.$notify({
              title:"result",
              message: "error",
              type: "error"
            })
            console.log(err)
          })
        })
      },
      getRedirect() {
        var redirect
        if (this.$router.query === undefined || this.$router.query.redirect === undefined) {
          redirect = '/'
        } else {
          redirect = this.$router.query.redirect
        }
        return redirect
      }
    }
}
</script>