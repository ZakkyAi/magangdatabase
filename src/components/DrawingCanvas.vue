<script>
import fabric from 'fabric';

export default {
  data() {
    return {
      canvas: null,
    };
  },
  mounted() {
    try {
      // Initialize Fabric.js
      this.canvas = new fabric.Canvas(this.$refs.canvas);

      // Set up the canvas
      this.canvas.setHeight(600);
      this.canvas.setWidth(800);
      this.canvas.backgroundColor = 'white';
      this.canvas.renderAll();
    } catch (error) {
      console.error("Error during fabric.js setup:", error);
    }
  },
  methods: {
    addRectangle() {
      try {
        const rect = new fabric.Rect({
          left: 100,
          top: 100,
          fill: 'red',
          width: 100,
          height: 100
        });

        this.canvas.add(rect);
      } catch (error) {
        console.error("Error adding rectangle:", error);
      }
    }
  }
};
</script>
