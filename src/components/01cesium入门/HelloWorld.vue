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

      let viewer = new Cesium.Viewer("cesiumContainer",{
        animation:false,//是否创建动画小器件，左下角仪表
        baseLayerPicker:false,//是否显示图层选择器，右上角图层选择按钮
        fullscreenButton:false,//是否显示全屏按钮，右下角全屏选择按钮
        geocoder:false,//是否显示geocoder小器件，右上角查询按钮
        homeButton:false,//是否显示Home 按钮 ，右上角home按钮
        sceneModePicker:false,//是否显示3D/2D选择器，右上角按钮
        navigationHelpButton:false,//是否显示右上角的帮助按钮
        selectionIndicator:false,//是否显示选取指示器组件
        timeline:false,//是否显示时间轴
        infoBox:false,//是否显示信息框
        scene3DOnly:true,//如果设置为true  则所有几何以3D的模式绘制以节约GPU资源
        clock:new Cesium.Clock(),//用于控制当前的时间的时钟对象
        shouldAnimate:true,//自动播放动画控件
        shadows:true,//是否显示光照投射阴影
        terrainShadows:Cesium.ShadowMode.RECEIVE_ONLY,//地质接收阴影
        sceneMode:Cesium.SceneMode.SCENE3D,//初始化渲染3D场景
        selectedImageryProviderViewModel:undefined,//当前图像图层的显示模式，仅baseLayerPicker 设为true 有意义
        imageryProviderViewModels:Cesium.createDefaultImageryProviderViewModels(),// 可 供 BaseLayerPicker 选择的图像图层 ProviderViewModel 数组
        imageryProvider : new Cesium.UrlTemplateImageryProvider({
          url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
          layer: "tdtVecBasicLayer",
          style: "default",
          format: "image/png",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: true
        } ),//图像图层提供者，仅 baseLayerPicker 设为 false 有意义
        selectedTerrainProviderViewModel:undefined,//当前地形图层的显示模型，仅baseLayerPicker 设为true 有意义
        terrainProviderViewModels:Cesium.createDefaultImageryProviderViewModels(),//可供BaseLayerPicker 选择的地形图层ProviderViewModel数组
        terrainProvider:new Cesium.EllipsoidTerrainProvider(),//地形图层提供则，仅baseLayerPicker设为false 有效
        showRenderLoopErrors:false,//如果设置为true 将在一个HTML 面板中显示错误信息
      });

      viewer._cesiumWidget._creditContainer.style.display = "none";
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
