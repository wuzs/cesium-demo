<template>
  <div style="width: 100%;height: 100%">
    <div id="cesiumContainer"></div>
    <div id="toolbar">
      <video id="video" muted autoplay loop crossorigin controls>
        <source src="http://39.105.197.110/Cesium1.91/Apps/SampleData/video/kl.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
import * as Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import image from './images/image.jpg'
import w from './images/w1.jpg'
import h from './images/h.jpg'
import n from './images/n.jpg'
export default {
  name: 'Primitive',
  data () {
    return {
      viewer: undefined
    }
  },
  mounted () {
    this.viewer = this.initCesium()
    // this.addArcGisMapServerImageryProvider()
    // this.addOpenStreetMapImageryProvider()
    // this.addGoogleEarthEnterpriseMetadata()
    // this.addUrlTemplateImageryProvider()
    //  this.addWebMapTileServiceImageryProvider()
    // this.addSingleTileImageryProvider()
    // this.addGridImageryProvider()
    this.addTileCoordinatesImageryProvider()
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
    addArcGisMapServerImageryProvider () {
      this.viewer.imageryLayers.removeAll()
      let arcGisMapServerImageryProvider = new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer?f=jsapi'
      })
      this.viewer.imageryLayers.addImageryProvider(arcGisMapServerImageryProvider)
    },
    addOpenStreetMapImageryProvider () {
      this.viewer.imageryLayers.removeAll()
      let osm = new Cesium.OpenStreetMapImageryProvider({
        url: 'https://a.tile.openstreetmap.org/'
      })
      this.viewer.imageryLayers.addImageryProvider(osm)
    },
    addGoogleEarthEnterpriseMetadata () {
      let geeMetadata = new Cesium.GoogleEarthEnterpriseMetadata('http://www.earthenterprise.org/3d')
      let gee = new Cesium.GoogleEarthEnterpriseImageryProvider({
        geeMetadata: geeMetadata
      })
      this.viewer.imageryLayers.addImageryProvider(gee)
    },
    addUrlTemplateImageryProvider () {
      this.viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        layer: 'tdtVecBasicLayer',
        style: 'default',
        format: 'image/png',
        tileMatrixSetID: 'GoogleMapsCompatible',
        show: true
      }))
    },
    addWebMapTileServiceImageryProvider () {
      this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: 'http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=acac85ef4cf5cda34815cc14d7ba0364',
        layer: 'tdtAnnoLayer',
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'GoogleMapsCompatible'
      }))
    },
    addSingleTileImageryProvider () {
      // 添加天地图标注
      this.viewer.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
        url: n
      }))
      // this.viewer.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
      //   url: image,
      //   rectangle: Cesium.Rectangle.fromDegrees(
      //     110.0,
      //     20.0,
      //     80.0,
      //     35.0)
      // }))
    },
    addGridImageryProvider () {
      this.viewer.imageryLayers.addImageryProvider(new Cesium.GridImageryProvider())
    },
    addTileCoordinatesImageryProvider () {
      this.viewer.imageryLayers.addImageryProvider(new Cesium.TileCoordinatesImageryProvider())
    }

  }
}
</script>
