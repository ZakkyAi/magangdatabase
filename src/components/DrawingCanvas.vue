<template>
  <div>
    <canvas ref="canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" @mouseout="stopDrawing"></canvas>
    <div>
      <button @click="setShape('rectangle')">Rectangle</button>
      <button @click="setShape('circle')">Circle</button>
      <button @click="setShape('line')">Line</button>
      <input type="color" v-model="color">
      <input type="number" v-model.number="lineWidth" min="1" max="20">
    </div>
    <button @click="saveDrawing">Save Drawing</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DrawingCanvas',
  data() {
    return {
      isDrawing: false,
      ctx: null,
      currentShape: 'rectangle',
      color: '#000000',
      lineWidth: 2,
      startX: 0,
      startY: 0
    }
  },
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.width = 800;
    canvas.height = 600;
    this.ctx = canvas.getContext('2d');
  },
  methods: {
    setShape(shape) {
      this.currentShape = shape;
    },
    startDrawing(event) {
      this.isDrawing = true;
      [this.startX, this.startY] = [event.offsetX, event.offsetY];
    },
    draw(event) {
      if (!this.isDrawing) return;
      const [endX, endY] = [event.offsetX, event.offsetY];
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.beginPath();
      
      switch (this.currentShape) {
        case 'rectangle':
          this.ctx.rect(this.startX, this.startY, endX - this.startX, endY - this.startY);
          break;
        case 'circle':
          const radius = Math.sqrt(Math.pow(endX - this.startX, 2) + Math.pow(endY - this.startY, 2));
          this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
          break;
        case 'line':
          this.ctx.moveTo(this.startX, this.startY);
          this.ctx.lineTo(endX, endY);
          break;
      }
      
      this.ctx.stroke();
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    async saveDrawing() {
      const canvas = this.$refs.canvas;
      const drawingData = canvas.toDataURL();
      try {
        await axios.post('http://localhost:3000/drawings', {
          name: 'My Drawing',
          data: drawingData
        }, {
          headers: { Authorization: localStorage.getItem('token') }
        });
        alert('Drawing saved successfully!');
      } catch (error) {
        console.error('Error saving drawing', error);
      }
    }
  }
}
</script>