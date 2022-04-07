<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import * as Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import image from './images/image.jpg'
export default {
  name: 'ColorMaterial',
  data () {
    return {
      viewer: undefined
    }
  },
  mounted () {
    this.viewer = this.initCesium()

    // this.addColorMaterial()
    // this.addImageMaterial()
    // this.addCheckerboardMaterial()
    // this.addStripeMaterial()
    // this.addGridMaterial()
    // this.addPolylineGlowMaterial()
    // this.addPolylineOutlineMaterial()
    // this.addPolylineArrowMaterial()
    this.addPolylineDashMaterial()
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
    addColorMaterial () {
      this.viewer.entities.add({
        name: 'plane',
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        plane: {
          plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0), // 指定平面的法线和距离
          dimensions: new Cesium.Cartesian2(400000.0, 300000.0), // 指定平面的宽度和高度。
          material: Cesium.Color.RED.withAlpha(0.5), // 材质
          fill: true, // 是否填充
          outline: true,
          outlineColor: Cesium.Color.YELLOWGREEN
        }
      })
      this.viewer.zoomTo(this.viewer.entities)
    },
    addImageMaterial () {
      // 图片材质
      this.viewer.entities.add({
        name: 'plane',
        position: Cesium.Cartesian3.fromDegrees(-107, 40, 300000),
        plane: {
          plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 10000),
          dimensions: new Cesium.Cartesian2(400000, 300000),
          material: new Cesium.ImageMaterialProperty({
            image: image,
            color: Cesium.Color.BLUE,
            transparent: true,
            repeat: new Cesium.Cartesian2(4, 4)// s t  方向的重复次数

          })
        },
        fill: true
      })
      this.viewer.zoomTo(this.viewer.entities)
    },
    addCheckerboardMaterial () {
      this.viewer.entities.add({
        name: 'plane',
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        plane: {
          plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 100000.0),
          dimensions: new Cesium.Cartesian2(400000, 300000),
          material: new Cesium.CheckerboardMaterialProperty({
            evenColor: Cesium.Color.WHITE,
            oddColor: Cesium.Color.BLACK,
            repeat: new Cesium.Cartesian2(4, 4)
          }),
          fill: true
        }
      })
      this.viewer.zoomTo(this.viewer.entities)
    },
    addStripeMaterial () {
      this.viewer.entities.add({
        name: 'plane',
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        plane: {
          plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 100000.0), // 指定平面的法线和距离
          dimensions: new Cesium.Cartesian2(400000.0, 300000.0), // 指定平面的宽度和高度。
          material: new Cesium.StripeMaterialProperty({
            evenColor: Cesium.Color.WHITE, // 默认白色，棋盘的第一个颜色
            oddColor: Cesium.Color.BLACK, // 默认黑色，第二个颜色
            repeat: 32, // 条纹重复次数
            offset: 20, // 偏移量
            orientation: Cesium.StripeOrientation.VERTICAL// 水平或者垂直,默认水平
          }),
          fill: true
        }
      })
      this.viewer.zoomTo(this.viewer.entities)
    },
    addGridMaterial () {
      this.viewer.entities.add({
        name: 'plane',
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        plane: {
          plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 10000),
          dimensions: new Cesium.Cartesian2(400000.0, 300000.0),
          material: new Cesium.GridMaterialProperty({
            color: Cesium.Color.YELLOW, // 网格颜色
            cellAlpha: 0.2, // 单元格透明度
            lineCount: new Cesium.Cartesian2(8, 8),
            lineThickness: new Cesium.Cartesian2(2, 2), // 线粗细
            lineOffset: new Cesium.Cartesian2(2, 2)// 线偏移
          })
        }
      })
      this.viewer.zoomTo(this.viewer.entities)
    },
    addPolylineGlowMaterial () {
      // 发光线
      this.viewer.entities.add({
        name: 'polyline',
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            90.82436,
            38.071506,
            112.82742,
            23.067512,
            112.832166,
            40.058329
          ]),
          width: 20,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.2, // 发光强度 0-1
            color: Cesium.Color.BLUE, // 发光的颜色
            taperPower: 0.5// 根据线的长度计算发光的锥度
          }),
          depthFailMaterial: Cesium.Color.BLUE, // 地下材质颜色 ，不给  地下的线不可见
          clampToGround: false, // 折线固定在地面
          arcType: Cesium.ArcType.GEODESIC// 定义连接点的路径
        }
      })
      this.viewer.zoomTo(this.viewer.entities)
    },
    addPolylineOutlineMaterial () {
      this.viewer.entities.add({
        name: 'polyline',
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            90.82436,
            38.071506,
            112.82742,
            23.067512,
            112.832166,
            40.058329
          ]),
          width: 20,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.BLUE, // 线的颜色
            outlineWidth: 3, // 线纹理宽度
            outlineColor: Cesium.Color.BLACK// 线纹理颜色
          }),
          depthFailMaterial: Cesium.Color.BLUE, // 地下材质颜色 ，不给  地下的线不可见
          clampToGround: false, // 折线固定在地面
          arcType: Cesium.ArcType.GEODESIC// 定义连接点的路径
        }
      })
      this.viewer.zoomTo(this.viewer.entities)
    },
    addPolylineArrowMaterial () {
      this.viewer.entities.add({
        name: 'polyline',
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            90.82436,
            38.071506,
            112.82742,
            23.067512,
            112.832166,
            40.058329
          ]),
          width: 20,
          material: new Cesium.PolylineArrowMaterialProperty(
            Cesium.Color.BLUE // 箭头颜色
          ),
          depthFailMaterial: Cesium.Color.BLUE, // 地下材质颜色 ，不给  地下的线不可见
          clampToGround: false, // 折线固定在地面
          arcType: Cesium.ArcType.GEODESIC// 定义连接点的路径
        }
      })
      this.viewer.zoomTo(this.viewer.entities)
    },
    addPolylineDashMaterial () {
      this.viewer.entities.add({
        name: 'polyline',
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            90.82436,
            38.071506,
            112.82742,
            23.067512,
            112.832166,
            40.058329
          ]),
          width: 20,
          material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.RED,
            dashLength: 50, // 虚线的长度
            // dashPattern: 50, // 虚线的样式
            gapColor: Cesium.Color.BLUE// 虚线的间隔颜色
          }

          ),
          depthFailMaterial: Cesium.Color.BLUE, // 地下材质颜色 ，不给  地下的线不可见
          clampToGround: false, // 折线固定在地面
          arcType: Cesium.ArcType.GEODESIC// 定义连接点的路径
        }
      })
      this.viewer.zoomTo(this.viewer.entities)
    }
  }
}
</script>
