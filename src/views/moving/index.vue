<template>
  <div class="about">
    <h1>动态</h1>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import QRCode from "qrcode";
export default {
  data() {
    return {};
  },
  mounted() {
    var canvas = document.getElementById("canvas");
    QRCode.toCanvas(canvas, "扫我干啥？", function(error) {
      if (error) console.error(error);
      console.log("success!");
    });
  }
};
</script>



