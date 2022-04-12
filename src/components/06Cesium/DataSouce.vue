<template>
  <div id="cesiumContainer"></div>
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
    // this.addCZMLDataSource()
    // this.addGeojsonDataSource()
    // this.addKmlDataSource()
    this.addCustomDataSource()
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
    addCZMLDataSource () {
      // this.viewer.dataSources.add(
      //   Cesium.CzmlDataSource.load('http://39.105.197.110/Cesium1.91/Apps/SampleData/simple.czml')
      // )

      let cmzDataSourcePromise = Cesium.CzmlDataSource.load('http://39.105.197.110/Cesium1.91/Apps/SampleData/Vehicle.czml')
      cmzDataSourcePromise.then((cmzl) => {
        console.log(cmzl)
        console.log(cmzl.entities)
        console.log(cmzl.clustering)
        this.viewer.dataSources.add(cmzl)
      }).otherwise(error => {
        console.log(error)
      })
      this.viewer.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(-116.52, 35.02, 95000),
        orientation: {
          heading: 6
        }
      })
    },
    addGeojsonDataSource () {
      let promise1 = Cesium.GeoJsonDataSource.load('http://39.105.197.110/Cesium1.91/Apps/SampleData/china.json', {
        fill: Cesium.Color.GREENYELLOW,
        markerSize: 10,
        markerColor: Cesium.Color.RED,
        stroke: Cesium.Color.RED, // 折线和多边形轮廓的颜色
        strokeWidth: 20, // 折线和多边形轮廓的宽度
        clampToGround: false // geojson的outline不能贴地,如果设置true，边框线将被禁用
      })
      promise1.then(dataSource => {
        this.viewer.dataSources.add(dataSource)
      })

      let promise2 = Cesium.GeoJsonDataSource.load('http://39.105.197.110/Cesium1.91/Apps/SampleData/usa.topojson')

      promise2.then(dataSource => {
        this.viewer.dataSources.add(dataSource)

        let entities = dataSource.entities.values

        let colorHash = {}
        for (let i = 0; i < entities.length; i++) {
          // 遍历所有的entity,随机给颜色
          let entity = entities[i]
          let name = entity.name
          let color = colorHash[name]
          if (!color) {
            color = Cesium.Color.fromRandom({
              alpha: 1.0
            })
            colorHash[name] = color
          }

          // Set the polygon material to our random color.
          entity.polygon.material = color
          // Remove the outlines.
          entity.polygon.outline = false

          // 根据人口给拉伸高度
          entity.polygon.extrudedHeight = entity.properties.Population / 50.0
        }
      })
    },
    addKmlDataSource () {
      let kmlDataSourcePromise = Cesium.KmlDataSource.load('http://39.105.197.110/Cesium1.91/Apps/SampleData/kml/facilities/facilities.kml', {
        camera: this.viewer.scene.camera,
        canvas: this.viewer.scene.canvas
      })
      kmlDataSourcePromise.then(dataSource => {
        this.viewer.dataSources.add(dataSource)
      })
    },
    addCustomDataSource () {
      let dataSource = new Cesium.CustomDataSource('myData')
      dataSource.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
        box: {
          dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
          material: Cesium.Color.BLUE,
          fill: true,
          outline: true,
          outlineColor: Cesium.Color.RED,
          outlineWidth: 10,
          shadows: Cesium.ShadowMode.ENABLED// 开启接收并且投射阴影
        }
      })
      this.viewer.dataSources.add(dataSource)
    }
  }
}
</script>
