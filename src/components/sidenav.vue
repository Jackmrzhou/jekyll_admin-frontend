<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
    <el-menu-item index="1">home</el-menu-item>
    <el-menu-item index="2">post</el-menu-item>
    <el-menu-item index="3">files</el-menu-item>
    <el-menu-item index="4">configuration</el-menu-item>
  </el-menu>
</template>

<script>
export default {
    name: 'sidenav'
}
</script>