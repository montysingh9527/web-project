<template>
  <div id="vue-admin-beautiful">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {},
}
</script>
<style>
.avatarBox {
  float: left;
  width: 80px;
  height: 80px;
}
.avatar {
  width: 60px;
  height: 60px;
  margin-top: 10px;
  border-radius: 50%;
}
.el-rate__icon {
  font-size: 24px !important;
}
.el-table .cell.el-tooltip {
  white-space: normal !important;
}
.np {
  margin: 0;
  padding: 2px 0;
}
p.np {
  font-size: 14px;
  color: #999;
}
.acitve .activeNav {
  position: relative;
}
.acitve .activeNav:after {
  position: absolute;
  content: '';
  width: 100%;
  height: 4px;
  background: #4866ff;
  left: 0;
  bottom: 0;
}
.settingsBox textarea {
  height: 200px;
}
</style>
