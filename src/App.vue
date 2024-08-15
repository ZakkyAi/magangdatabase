<template>
  <div id="app">
    <nav>
      <router-link to="/" v-if="isLoggedIn">Home</router-link> |
      <router-link to="/login" v-if="!isLoggedIn">Login</router-link> |
      <router-link to="/register" v-if="!isLoggedIn">Register</router-link> |
      <a href="#" @click.prevent="logout" v-if="isLoggedIn">Logout</a>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>
