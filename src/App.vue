<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{
  }
}
</script>

<style>
#frozen-section {
  position: fixed;
  z-index: 500;
}
.container {
  display: flex;
  justify-content: center;
}
</style>
