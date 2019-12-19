<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect" router>
    <el-menu-item index="/admin">home</el-menu-item>
    <el-menu-item index="/admin/post">post</el-menu-item>
    <el-menu-item index="/admin/files">files</el-menu-item>
    <el-menu-item index="/admin/config">configuration</el-menu-item>
  </el-menu>
</template>

<script>
export default {
    name: 'sidenav'
}
</script>