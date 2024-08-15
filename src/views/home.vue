<template>
    <div class="home">
      <h1>Drawing App</h1>
      <DrawingCanvas />
    </div>
  </template>
  
  <script>
  import DrawingCanvas from '@/components/DrawingCanvas.vue'
  
  export default {
    name: 'Home',
    components: {
      DrawingCanvas
    }
  }
  </script>