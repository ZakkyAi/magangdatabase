<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Username" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:3000/register', {
          username: this.username,
          password: this.password
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed', error);
      }
    }
  }
}
</script>