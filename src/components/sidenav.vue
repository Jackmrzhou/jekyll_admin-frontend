<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <el-menu-item index="/">home</el-menu-item>
    <el-menu-item index="/post">post</el-menu-item>
    <el-menu-item index="/files">files</el-menu-item>
    <el-menu-item index="/config">configuration</el-menu-item>
  </el-menu>
</template>

<script>
export default {
    name: 'sidenav',
    data() {
      return {
        activeIndex: '/'
      }
    }
}
</script>