<template>
  <div id="cesiumContainer">

  </div>
</template>

<script>
  import * as Cesium from 'cesium/Cesium';
  import 'cesium/Widgets/widgets.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.initCesium();
  },
  methods:{
    initCesium(){
      Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYWQyYWYyMS05Y2VmLTQ2YTItYmZkZC02YTQyNTE2ZGI1OWQiLCJpZCI6MzQwNzAsImlhdCI6MTU5OTcwNDE2NH0.ufpLgxJYiCPsBtANhyXpJxNeJs_oP7jOLBjrM9nTV14";

      let viewer = new Cesium.Viewer("cesiumContainer");
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
