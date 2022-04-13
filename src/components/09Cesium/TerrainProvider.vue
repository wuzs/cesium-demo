<template>
  <div style="width: 100%;height: 100%">
    <div id="cesiumContainer"></div>

  </div>
</template>

<script>
import * as Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'

export default {
  name: 'Primitive',
  data () {
    return {
      viewer: undefined
    }
  },
  mounted () {
    this.viewer = this.initCesium()
    this.addCesiumTerrainProvider()
  },
  methods: {
    initCesium () {
      Cesium.Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZjg4ZjljZC1mZGM3LTRlZjEtYjg3MC00MjZkNGU3YjI5ZWUiLCJpZCI6MTU5NTIsImlhdCI6MTYwNTE0ODM5OX0.LjxeKrgAo7Ksk8405kSAhYwF0nKcF2w2DGJnKHh51N8'
      let viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: true,
        sceneModePicker: false,
        navigationHelpButton: false,
        scene3DOnly: true,
        timeline: false,
        selectionIndicator: false, // 是否显示选取指示器组件
        shouldAnimate: true, // 自动播放动画控件
        shadows: true, // 是否显示光照投射的阴影
        terrainShadows: Cesium.ShadowMode.RECEIVE_ONLY, // 地质接收阴影
        sceneMode: Cesium.SceneMode.SCENE3D,
        clock: new Cesium.Clock(),
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer?f=jsapi'
        }),
        terrainProvider: new Cesium.EllipsoidTerrainProvider()
      })
      viewer._cesiumWidget._creditContainer.style.display = 'none' // 去除版权信息
      return viewer
    },
    addCesiumTerrainProvider () {
      this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
        url: Cesium.IonResource.fromAssetId(1),
        requestVertexNormals: true, // 定点法线效果
        requestWaterMask: true// 水效果
      })
    }

  }
}
</script>
