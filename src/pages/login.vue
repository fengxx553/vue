<template>
  <el-card id="login">
  <el-form>
    <div class="title" >后台管理系统</div>
    <el-input v-model="form.user_name" size="mini"   placeholder="账号" class="input"></el-input>
  <el-input v-model="form.password" type="password" size="mini" placeholder="密码" class="input"></el-input>
  <br/>
  <el-button type="primary" size="mini"  class="btn"  @click="login">登录</el-button>
  </el-form>
  
  </el-card>
</template>

<script>
export default {
  data () {
    return {
        form: {
          user_name: '17631030743',
					password: '123456',
        }
    }
  },
  methods: {
   async login(){
     let res=await this.$API.login(this.form)
     if(res.status==200){
       this.$message({
         message: '登录成功',
         type: 'success'
       });
    this.$store.dispatch('getadmininfo')
      this.$store.dispatch('getLongitude')
    }
  }
  }
  }
</script>

<style scoped>
#login{
  width: 300px;
  height: 250px;
  position: absolute;
  top: 30%;
  left: 35%;
}
.title{
  position: relative;
  left: 30%;
  top: 30px;
  font-size: 20px;
  font-weight: bold;
  color: blue;
}
.input{
  width: 200px;
position: relative;
left: 13%;
top: 45px;
margin-top: 10px;
}
.btn{
  position: relative;
  left: 40%;
  top: 70px;
}
</style>
