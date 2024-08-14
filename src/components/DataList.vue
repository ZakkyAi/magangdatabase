<template>
    <div>
      <h1>Data from MySQL Database</h1>
      <ul>
        <li v-for="item in data" :key="item.id">
          <strong>{{ item.name }}</strong>: {{ item.description }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        data: []
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:5000/api/data')
          .then(response => {
            this.data = response.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 4px;
  }
  </style>
  