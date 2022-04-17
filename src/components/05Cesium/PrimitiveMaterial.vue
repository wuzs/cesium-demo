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
    // this.addEllipsoidSurfaceAppearance()
    // this.addPerInstanceColorAppearance()
    // this.addPolylineMaterialAppearance()
    // this.addPolylineColorAppearance()
    this.addMaterialAppearance()
  },
  methods: {
    initCesium: function () {
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZjg4ZjljZC1mZGM3LTRlZjEtYjg3MC00MjZkNGU3YjI5ZWUiLCJpZCI6MTU5NTIsImlhdCI6MTYwNTE0ODM5OX0.LjxeKrgAo7Ksk8405kSAhYwF0nKcF2w2DGJnKHh51N8'
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
        shouldAnimate: false, // 自动播放动画控件
        shadows: true, // 是否显示光照投射的阴影
        terrainShadows: Cesium.ShadowMode.RECEIVE_ONLY, // 地质接收阴影
        sceneMode: Cesium.SceneMode.SCENE3D,
        clock: new Cesium.Clock(),
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer?f=jsapi'
        }),
        terrainProvider: new Cesium.EllipsoidTerrainProvider()
      })
      viewer._cesiumWidget._creditContainer.style.display = 'none' //	去除版权信息
      return viewer
    },
    addEllipsoidSurfaceAppearance () {
      let instance = new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
          rectangle: Cesium.Rectangle.fromDegrees(-100.0, 20.0, -90.0, 30.0),
          vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
        })
      })
      let primitive = new Cesium.Primitive({
        geometryInstances: instance,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 1000), new Cesium.Matrix4()),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
          material: Cesium.Material.fromType('Stripe'),
          aboveGround: true
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addPerInstanceColorAppearance () {
      let instance = new Cesium.GeometryInstance({
        geometry: new Cesium.WallGeometry({
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            109.0, 37.0, 10000.0,
            109.0, 38.0, 10000.0,
            105.0, 38.0, 10000.0,
            105.0, 37.0, 10000.0,
            109.0, 37.0, 10000.0
          ])
        }),
        attributes: {
          color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 0.0, 0.2)
        }
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: instance,
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 是否对透明度有影响
          closed: false, // false 两面绘制  true 单面绘制
          faceForward: false, // 为false 不接受光照
          renderState: {
            depthTest: {
              enabled: true// 开启深度测试
            }
          }
        })
      })

      this.viewer.scene.primitives.add(primitive)
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(105, 38.0, 20000),
        orientation: {// 设置相机的Heading，Pitch，Roll
          heading: Cesium.Math.toRadians(90.0),
          pitch: Cesium.Math.toRadians(-40),
          roll: 0.0
        },
        duration: 3
      })
    },
    addPolylineMaterialAppearance () {
      let positions = []
      for (let i = 0; i < 40; i++) {
        positions.push(Cesium.Cartesian3.fromDegrees(-100.0 + i, 48.0))
      }

      let polyline = new Cesium.PolylineGeometry({
        positions: positions,
        width: 10.0,
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
      })

      let geometry = Cesium.PolylineGeometry.createGeometry(polyline)

      let instance = new Cesium.GeometryInstance({
        geometry: geometry,
        id: 'instance'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: instance,
        asynchronous: false,
        appearance: new Cesium.PolylineMaterialAppearance({
          translucent: false,
          flat: true,
          material: Cesium.Material.fromType(Cesium.Material.PolylineGlowType)
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addPolylineColorAppearance () {
      let positions = []
      for (let i = 0; i < 40; i++) {
        positions.push(Cesium.Cartesian3.fromDegrees(-100.0 + i, 48.0))
      }

      let polyline = new Cesium.PolylineGeometry({
        positions: positions,
        width: 10.0,
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
      })

      let geometry = Cesium.PolylineGeometry.createGeometry(polyline)

      let instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0, 0.0, 0.0, 1.0))
        },
        id: 'instance'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: instance,
        asynchronous: false,
        appearance: new Cesium.PolylineColorAppearance({
          translucent: false

        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addMaterialAppearance () {
      let instance = new Cesium.GeometryInstance({
        geometry: new Cesium.WallGeometry({
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            109.0, 37.0, 10000.0,
            109.0, 38.0, 10000.0,
            105.0, 38.0, 10000.0,
            105.0, 37.0, 10000.0,
            109.0, 37.0, 10000.0
          ])
        }),
        materialSupport: Cesium.MaterialAppearance.MaterialSupport.BASIC.vertexFormat

      })

      let primitive = new Cesium.Primitive({
        geometryInstances: instance,
        appearance: new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType(Cesium.Material.PolylineGlowType),
          faceForward: true
        })
      })
      this.viewer.scene.primitives.add(primitive)

      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(105, 38.0, 20000),
        orientation: {// 设置相机的Heading，Pitch，Roll
          heading: Cesium.Math.toRadians(90.0),
          pitch: Cesium.Math.toRadians(-40),
          roll: 0.0
        },
        duration: 3
      })
    }

  }
}
</script>
