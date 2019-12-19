<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <div id="content">
    <el-container>
      <el-aside width="200px">
        <Sidenav></Sidenav>
      </el-aside>
      <el-main>
          <PostMain></PostMain>
      </el-main>
    </el-container>
    </div>
  </el-container>
</template>

<script>
import Header from "../components/header"
import sidenav from "../components/sidenav"
import PostMain from "../components/postMain"
export default {
  name: 'home',
  components: {
    'Header': Header,
    'Sidenav': sidenav,
    'PostMain': PostMain
  }
}
</script>

<style scoped>
#content{
  padding-top: 20px;
  padding-left: 20px;
}
</style>
