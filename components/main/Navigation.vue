<template>
  <div>
    <nav>
      <h1>SSR Blog</h1>
    </nav>
    <small><nuxt-link to="/admin/">Admin page</nuxt-link></small>
  </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss" scoped>
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-bottom: 1px solid #e6e6e6;
  }
</style>
