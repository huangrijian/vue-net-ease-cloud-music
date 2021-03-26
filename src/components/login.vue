<template>
  <div class="login">
    <!-- 登录box -->
    <div class="login_box">
      <!-- 登录logo -->
      <img src="../assets/logo.png" alt="" />
      <!-- 登录表单 -->
      <el-form
        class="login_form"
        ref="loginFormRef"
        :model="ruleForm"
        :rules="rules"
      >
        <!-- 用户名 -->
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入网易云音乐手机号"
            prefix-icon="el-icon-user-solid"
            v-model="ruleForm.phone"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-unlock"
            v-model="ruleForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        phone: "13030190129",
        password: "IOP760198",
      },
      id:'',
      rules: {
        phone: [
          { required: true, message: "请输入登录手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        //    表单预验证，通过则valid返回true
        if (!valid) return;
        const result = await this.$http.get("/login/cellphone?phone=" + this.ruleForm.phone + "&password=" + this.ruleForm.password);
        if (result.data.code == 502) {
          return this.$message.error("密码错误，请重新输入！");
        }
        if(result.data.code == 200){
          this.$message.success("登录成功！");
          console.log(result);
          // 保存用户id
          this.id = result.data.account.id;
          // 获取token
          var token = result.data.token;

                  /*
                    1.将登录成功之后,会得到一个token值,将其保存到客户端的sessionStorage中
                        1.1 项目中除了登录以外的api，都需要token值才能正常访问
                        1.2 token只应在当前网站打开期间生效，所以将token保存在localStorage

                        localStorage和sessionStorage一样都是用来存储客户端临时信息的对象。

                他们均只能存储字符串类型的对象（虽然规范中可以存储其他原生类型的对象，但是目前为止没有浏览器对其进行实现）。

                localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。

                sessionStorage生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过sessionStorage存储的数据也就被清空了。
                */
           //存放userTokenb
          window.sessionStorage.setItem('userToken', token);
          console.log(window.sessionStorage.getItem("userToken"))
          //存放userid
          window.sessionStorage.setItem('UserId', this.id);

        }else return this.$message.error("登录失败");

        //    2.通过编程式导航跳转到user主页，路由地址是/home    把用户id传入，  home页面通过参数取值  -- this.$route.params.key
        this.$router.push({name:'home',params: {UserId:this.id}})

        this.$emit('getMessage', this.id);

        
        
      })

      
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  background: url("../assets/bg.jpg");
  background-size: 100% 100%;

  .login_box {
     width: 400px;
    height: 500px;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #d3d3d3;
    box-shadow: 0px 36px 54px -12px rgb(0 0 0);

    img {
      // 居中
      width: 150px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }

    .login_form {
      // 居中
      margin-top: 150px;
      padding: 0 25px;

      .btn {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>
