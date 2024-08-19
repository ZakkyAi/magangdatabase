import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import DrawingCanvas from '../components/DrawingCanvas.vue'; // Add this import

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/drawing', component: DrawingCanvas } // Add this route
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
