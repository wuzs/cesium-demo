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
    // this.addBoxGeometry()
    // this.addBoxOutlineGeometry()
    // this.addCircleGeometry()
    /// this.addCircleOutlineGeometry()
    // this.addCorridorGeometry()
    // this.addCorridorOutlineGeometry()
    // this.addCylinderGeometry()
    // this.addCylinderOutlineGeometry()

    // this.addEllipsoidGeometry()
    // this.addElliposidOutlineGeometry()
    // this.addRectangleGeometry()
    // this.addRectangleOutlineGeometry()
    // this.addPolygonOutlineGeometry()
    // this.addPolylineGeometry()
    // this.addSimplePolylineGeometry()
    // this.addPolylineVolumeGeometry()
    // this.addSphereGeometry()
    // this.addSphereOutlineGeometry()
    // this.addWallGeometry()
    // this.addWallOutlineGeometry()
    // this.addGroundPrimitive()
    this.addGroundPolylineGeometry()
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
    addBoxGeometry () {
      let box1 = new Cesium.BoxGeometry({
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        maximum: new Cesium.Cartesian3(250000.0, 250000.0, 250000.0),
        minimum: new Cesium.Cartesian3(-250000.0, -250000.0, -250000.0)
      })
      let boxGeometry1 = Cesium.BoxGeometry.createGeometry(box1)

      let boxInstance1 = new Cesium.GeometryInstance({
        geometry: boxGeometry1,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)
        ), new Cesium.Cartesian3(0.0, 0.0, 1000000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'bottom'
      })

      let points = Cesium.AxisAlignedBoundingBox.fromPoints(Cesium.Cartesian3.fromDegreesArray([
        -72.0, 40.0,
        -70.0, 35.0,
        -75.0, 30.0,
        -70.0, 30.0,
        -68.0, 40.0
      ]))
      let boxGeometry2 = Cesium.BoxGeometry.fromAxisAlignedBoundingBox(points)
      let boxInstance2 = new Cesium.GeometryInstance({
        geometry: boxGeometry2,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.GREEN)
        },
        id: 'center'
      })

      let box3 = Cesium.BoxGeometry.fromDimensions({
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        dimensions: new Cesium.Cartesian3(500000.0, 500000.0, 500000.0)
      })
      let boxGeometry3 = Cesium.BoxGeometry.createGeometry(box3)

      let boxInstance3 = new Cesium.GeometryInstance({
        geometry: boxGeometry3,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)),
          new Cesium.Cartesian3(0.0, 0.0, 3000000.0), new Cesium.Matrix4()
        ),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'top'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [boxInstance1, boxInstance2, boxInstance3],
        asynchronous: false,
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false,
          closed: true
        })
      })
      this.viewer.scene.primitives.add(primitive)
    },
    addBoxOutlineGeometry () {
      let box = Cesium.BoxOutlineGeometry.fromDimensions({
        dimensions: new Cesium.Cartesian3(500000, 500000, 500000)
      })
      let geometry = Cesium.BoxOutlineGeometry.createGeometry(box)
      let boxInstance = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 3000000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'top'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [boxInstance],
        asynchronous: false,
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false,
          flat: true, // 当为true时，片元着色器将使用平面阴影，不考虑光照
          renderState: {
            lineWidth: Math.min(4.0, this.viewer.scene.maximumAliasedLineWidth)
          }
        })
      })
      this.viewer.scene.primitives.add(primitive)
    },
    addCircleGeometry () {
      let circle = new Cesium.CircleGeometry({
        center: Cesium.Cartesian3.fromDegrees(-85.59777, 20.03883),
        radius: 1000000
      })
      let circleGeometry = Cesium.CircleGeometry.createGeometry(circle)

      let boxInstance = new Cesium.GeometryInstance({
        geometry: circleGeometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-85.59777, 20.03883)), new Cesium.Cartesian3(0.0, 0.0, 1000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)

        },
        id: 'top'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [boxInstance],
        asynchronous: false,
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: true,
          flat: true
        })
      })
      this.viewer.scene.primitives.add(primitive)
    },
    addCircleOutlineGeometry () {
      let circle = new Cesium.CircleOutlineGeometry({
        center: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        radius: 1000000.0
      })

      let geometry = Cesium.CircleOutlineGeometry.createGeometry(circle)
      let boxInstance = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 100.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'top'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [boxInstance],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false,
          flat: true,
          renderState: {
            lineWidth: Math.min(4.0, this.viewer.scene.maximumAliasedLineWidth)
          }
        })
      })
      this.viewer.scene.primitives.add(primitive)
    },
    addCorridorGeometry () {
      let corridor = new Cesium.CorridorGeometry({
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        positions: Cesium.Cartesian3.fromDegreesArray([
          -80.0,
          40.0,
          -85.0,
          40.0,
          -85.0,
          35.0
        ]),
        width: 100000
      })
      let geometry = Cesium.CorridorGeometry.createGeometry(corridor)
      let boxInstance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'top'
      })
      let primitive = new Cesium.Primitive({
        geometryInstances: [boxInstance],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: false// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })
      this.viewer.scene.primitives.add(primitive)
    },
    addCorridorOutlineGeometry () {
      let corridor = new Cesium.CorridorOutlineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray([
          -80.0,
          40.0,
          -85.0,
          40.0,
          -85.0,
          35.0]),
        width: 100000
      })
      let geometry = Cesium.CorridorOutlineGeometry.createGeometry(corridor)

      let boxInstance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'top'
      })
      let primitive = new Cesium.Primitive({
        geometryInstances: [boxInstance],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true, // 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
          renderState: {
            lineWidth: Math.min(4.0, this.viewer.scene.maximumAliasedLineWidth)
          }
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addCylinderGeometry () {
      let cylinder1 = new Cesium.CylinderGeometry({
        length: 200000,
        topRadius: 80000,
        bottomRadius: 200000
      })
      let geometry1 = Cesium.CylinderGeometry.createGeometry(cylinder1)
      let cylinderInstance1 = new Cesium.GeometryInstance({
        geometry: geometry1,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 100.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'cylinderInstance1'
      })

      let cylinder2 = new Cesium.CylinderGeometry({
        length: 800000,
        topRadius: 500000,
        bottomRadius: 500000
      })
      let geometry2 = Cesium.CylinderGeometry.createGeometry(cylinder2)

      let cylinderInstance2 = new Cesium.GeometryInstance({
        geometry: geometry2,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 1000000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'cylinderInstance2'
      })
      let primitive = new Cesium.Primitive({
        geometryInstances: [cylinderInstance1, cylinderInstance2],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })
      this.viewer.scene.primitives.add(primitive)
    },
    addCylinderOutlineGeometry () {
      let cylinder1 = new Cesium.CylinderOutlineGeometry({
        length: 200000,
        topRadius: 80000,
        bottomRadius: 200000
      })
      let geometry1 = Cesium.CylinderOutlineGeometry.createGeometry(cylinder1)

      let cylinderInstance1 = new Cesium.GeometryInstance({
        geometry: geometry1,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 100.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'cylinderInstance1'
      })
      console.log(Cesium.Cartesian3.fromDegrees(0, 0))
      console.log(Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(-85.59777, 20.03883)))
      // console.log(Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
      //   Cesium.Cartesian3.fromDegrees(-85.59777, 20.03883)), new Cesium.Cartesian3(0.0, 0.0, 50000.0), new Cesium.Matrix4()))

      let cylinder2 = new Cesium.CylinderOutlineGeometry({
        length: 800000,
        topRadius: 500000,
        bottomRadius: 500000
      })
      let geometry2 = Cesium.CylinderOutlineGeometry.createGeometry(cylinder2)

      let cylinderInstance2 = new Cesium.GeometryInstance({
        geometry: geometry2,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 1000000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'cylinderInstance2'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [cylinderInstance1, cylinderInstance2],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addEllipsoidGeometry () {
      let ellipsoid1 = new Cesium.EllipsoidGeometry({
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
        radii: new Cesium.Cartesian3(1000000.0, 500000.0, 500000.0)
      })
      let geometry1 = Cesium.EllipsoidGeometry.createGeometry(ellipsoid1)

      let ellipsoidInstance1 = new Cesium.GeometryInstance({
        geometry: geometry1,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-85.59777, 20.03883)), new Cesium.Cartesian3(0.0, 0.0, 50000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'ellipsoidInstance1'
      })
      let ellipsoid2 = new Cesium.EllipsoidGeometry({
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
        radii: new Cesium.Cartesian3(500000.0, 500000.0, 500000.0)
      })
      let geometry2 = Cesium.EllipsoidGeometry.createGeometry(ellipsoid2)

      let ellipsoidInstance2 = new Cesium.GeometryInstance({
        geometry: geometry2,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-85.59777, 20.03883)), new Cesium.Cartesian3(0.0, 0.0, 1500000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'ellipsoidInstance2'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [ellipsoidInstance1, ellipsoidInstance2],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })
      this.viewer.scene.primitives.add(primitive)
    },
    addElliposidOutlineGeometry () {
      let ellipsoid1 = new Cesium.EllipsoidOutlineGeometry({
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
        radii: new Cesium.Cartesian3(1000000.0, 500000.0, 500000.0)
      })
      let geometry1 = Cesium.EllipsoidOutlineGeometry.createGeometry(ellipsoid1)

      let ellipsoidInstance1 = new Cesium.GeometryInstance({
        geometry: geometry1,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-85.59777, 20.03883)), new Cesium.Cartesian3(0.0, 0.0, 50000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'ellipsoidInstance1'
      })

      let ellipsoid2 = new Cesium.EllipsoidOutlineGeometry({
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
        radii: new Cesium.Cartesian3(500000.0, 500000.0, 500000.0)
      })
      let geometry2 = Cesium.EllipsoidOutlineGeometry.createGeometry(ellipsoid2)

      let ellipsoidInstance2 = new Cesium.GeometryInstance({
        geometry: geometry2,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-85.59777, 20.03883)), new Cesium.Cartesian3(0.0, 0.0, 1500000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'ellipsoidInstance2'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [ellipsoidInstance1, ellipsoidInstance2],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addRectangleGeometry () {
      // 1. create a rectangle
      let rectangle1 = new Cesium.RectangleGeometry({
        ellipsoid: Cesium.Ellipsoid.WGS84,
        rectangle: Cesium.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
        height: 10000.0
      })
      let geometry1 = Cesium.RectangleGeometry.createGeometry(rectangle1)

      let rectangleInstance1 = new Cesium.GeometryInstance({
        geometry: geometry1,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'ellipsoidInstance1'
      })

      // 2. create an extruded rectangle without a top
      let rectangle2 = new Cesium.RectangleGeometry({
        ellipsoid: Cesium.Ellipsoid.WGS84,
        rectangle: Cesium.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
        height: 200000.0,
        extrudedHeight: 300000
      })
      let geometry2 = Cesium.RectangleGeometry.createGeometry(rectangle2)

      let rectangleInstance2 = new Cesium.GeometryInstance({
        geometry: geometry2,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'ellipsoidInstance2'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [rectangleInstance1, rectangleInstance2],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addRectangleOutlineGeometry () {
      // 1. create a rectangle
      let rectangle1 = new Cesium.RectangleOutlineGeometry({
        ellipsoid: Cesium.Ellipsoid.WGS84,
        rectangle: Cesium.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
        height: 10000.0
      })
      let geometry1 = Cesium.RectangleOutlineGeometry.createGeometry(rectangle1)

      let rectangleInstance1 = new Cesium.GeometryInstance({
        geometry: geometry1,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'ellipsoidInstance1'
      })

      // 2. create an extruded rectangle without a top
      let rectangle2 = new Cesium.RectangleOutlineGeometry({
        ellipsoid: Cesium.Ellipsoid.WGS84,
        rectangle: Cesium.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
        height: 200000.0,
        extrudedHeight: 300000
      })
      let geometry2 = Cesium.RectangleOutlineGeometry.createGeometry(rectangle2)

      let rectangleInstance2 = new Cesium.GeometryInstance({
        geometry: geometry2,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'ellipsoidInstance2'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [rectangleInstance1, rectangleInstance2],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addPolygonGeometry () {
      let polygon1 = new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArray([
            -109.0, 30.0,
            -95.0, 30.0,
            -95.0, 40.0,
            -109.0, 40.0
          ]),
          [new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
              -107.0, 31.0,
              -107.0, 39.0,
              -97.0, 39.0,
              -97.0, 31.0
            ]),
            [new Cesium.PolygonHierarchy(
              Cesium.Cartesian3.fromDegreesArray([
                -105.0, 33.0,
                -99.0, 33.0,
                -99.0, 37.0,
                -105.0, 37.0
              ]),
              [new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray([
                  -103.0, 34.0,
                  -101.0, 34.0,
                  -101.0, 36.0,
                  -103.0, 36.0
                ])
              )]
            )]
          )]
        )
      })

      let geometry1 = Cesium.PolygonGeometry.createGeometry(polygon1)
      let polygonInstance1 = new Cesium.GeometryInstance({
        geometry: geometry1,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'polygonInstance1'
      })

      // create a polygon from points
      let polygon2 = Cesium.PolygonGeometry.fromPositions({
        positions: Cesium.Cartesian3.fromDegreesArray([
          -72.0, 40.0,
          -70.0, 35.0,
          -75.0, 30.0,
          -70.0, 30.0,
          -68.0, 40.0
        ]),
        extrudedHeight: 300000
      })
      let geometry2 = Cesium.PolygonGeometry.createGeometry(polygon2)
      let polygonInstance2 = new Cesium.GeometryInstance({
        geometry: geometry2,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'polygonInstance2'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [polygonInstance1, polygonInstance2],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })
      this.viewer.scene.primitives.add(primitive)
    },
    addPolygonOutlineGeometry () {
      let polygon1 = new Cesium.PolygonOutlineGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArray([
            -109.0, 30.0,
            -95.0, 30.0,
            -95.0, 40.0,
            -109.0, 40.0
          ]),
          [new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
              -107.0, 31.0,
              -107.0, 39.0,
              -97.0, 39.0,
              -97.0, 31.0
            ]),
            [new Cesium.PolygonHierarchy(
              Cesium.Cartesian3.fromDegreesArray([
                -105.0, 33.0,
                -99.0, 33.0,
                -99.0, 37.0,
                -105.0, 37.0
              ]),
              [new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray([
                  -103.0, 34.0,
                  -101.0, 34.0,
                  -101.0, 36.0,
                  -103.0, 36.0
                ])
              )]
            )]
          )]
        )
      })
      let geometry1 = Cesium.PolygonOutlineGeometry.createGeometry(polygon1)

      let polygonInstance1 = new Cesium.GeometryInstance({
        geometry: geometry1,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'polygonInstance1'
      })

      // create a polygon from points
      let polygon2 = Cesium.PolygonOutlineGeometry.fromPositions({
        positions: Cesium.Cartesian3.fromDegreesArray([
          -72.0, 40.0,
          -70.0, 35.0,
          -75.0, 30.0,
          -70.0, 30.0,
          -68.0, 40.0
        ]),
        extrudedHeight: 300000
      })
      let geometry2 = Cesium.PolygonOutlineGeometry.createGeometry(polygon2)

      let polygonInstance2 = new Cesium.GeometryInstance({
        geometry: geometry2,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'polygonInstance2'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [polygonInstance1, polygonInstance2],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addPolylineGeometry () {
      let positions = []
      let colors = []
      for (let i = 0; i < 40; ++i) {
        positions.push(Cesium.Cartesian3.fromDegrees(-100.0 + i, 48.0))
        colors.push(Cesium.Color.fromRandom({
          alpha: 1.0
        }))
      }

      // A polyline with two connected line segments
      let polyline = new Cesium.PolylineGeometry({
        positions: positions,
        width: 10.0,
        colors: colors
      })
      let geometry = Cesium.PolylineGeometry.createGeometry(polyline)

      let polygonInstance1 = new Cesium.GeometryInstance({
        geometry: geometry,
        id: 'polygonInstance1'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [polygonInstance1],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PolylineColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addSimplePolylineGeometry () {
      let positions = []
      let colors = []
      for (let i = 0; i < 40; ++i) {
        positions.push(Cesium.Cartesian3.fromDegrees(-100.0 + i, 48.0))
        colors.push(Cesium.Color.fromRandom({
          alpha: 1.0
        }))
      }

      // A polyline with two connected line segments
      let polyline = new Cesium.SimplePolylineGeometry({
        positions: positions,
        colors: colors
      })
      let geometry = Cesium.SimplePolylineGeometry.createGeometry(polyline)

      let polygonInstance1 = new Cesium.GeometryInstance({
        geometry: geometry,
        id: 'polygonInstance1'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [polygonInstance1],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addPolylineVolumeGeometry () {
      function computeCircle (radius) {
        let positions = []
        for (let i = 0; i < 360; i++) {
          let radians = Cesium.Math.toRadians(i)
          positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)))
        }
        return positions
      }

      let polyline = new Cesium.PolylineVolumeGeometry({
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
        polylinePositions: Cesium.Cartesian3.fromDegreesArray([
          -85.0,
          32.0,
          -85.0,
          36.0,
          -89.0,
          36.0
        ]),
        shapePositions: computeCircle(100000.0)
      })
      let geometry = Cesium.PolylineVolumeGeometry.createGeometry(polyline)

      let polygonInstance1 = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        id: 'polygonInstance1'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [polygonInstance1],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })
      this.viewer.scene.primitives.add(primitive)
    },
    addSphereGeometry () {
      let sphere = new Cesium.SphereGeometry({
        radius: 100000.0,
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
      })
      let geometry = Cesium.SphereGeometry.createGeometry(sphere)

      let polygonInstance1 = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 10000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
        },
        id: 'polygonInstance1'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [polygonInstance1],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })
      this.viewer.scene.primitives.add(primitive)
    },
    addSphereOutlineGeometry () {
      let sphere = new Cesium.SphereOutlineGeometry({
        radius: 100000.0,
        stackPartitions: 6,
        slicePartitions: 5,
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
      })
      let geometry = Cesium.SphereOutlineGeometry.createGeometry(sphere)

      let polygonInstance1 = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 10000.0), new Cesium.Matrix4()),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
        },
        id: 'polygonInstance1'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [polygonInstance1],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addWallGeometry () {
      let wall1 = new Cesium.WallGeometry({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          -95.0, 50.1, 10000.0,
          -85.0, 50.1, 10000.0,
          -75.0, 50.1, 10000.0
        ])
      })

      let geometry1 = Cesium.WallGeometry.createGeometry(wall1)
      let polygonInstance1 = new Cesium.GeometryInstance({
        geometry: geometry1,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'polygonInstance1'
      })

      let wall2 = Cesium.WallGeometry.fromConstantHeights({
        positions: Cesium.Cartesian3.fromDegreesArray([
          -95.0, 50.0,
          -85.0, 50.0,
          -75.0, 50.0
        ]),
        minimumHeight: 20000,
        maximumHeight: 10000
      })
      let geometry2 = Cesium.WallGeometry.createGeometry(wall2)
      let polygonInstance2 = new Cesium.GeometryInstance({
        geometry: geometry2,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
        },
        id: 'polygonInstance2'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [polygonInstance1, polygonInstance2],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addWallOutlineGeometry () {
      let wall1 = new Cesium.WallOutlineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          -95.0, 50.1, 10000.0,
          -85.0, 50.1, 10000.0,
          -75.0, 50.1, 10000.0
        ])
      })
      let geometry1 = Cesium.WallOutlineGeometry.createGeometry(wall1)
      let polygonInstance1 = new Cesium.GeometryInstance({
        geometry: geometry1,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
        },
        id: 'polygonInstance1'
      })

      let wall2 = Cesium.WallOutlineGeometry.fromConstantHeights({
        positions: Cesium.Cartesian3.fromDegreesArray([
          -95.0, 50.0,
          -85.0, 50.0,
          -75.0, 50.0
        ]),
        minimumHeight: 20000.0,
        maximumHeight: 10000.0
      })

      let geometry2 = Cesium.WallOutlineGeometry.createGeometry(wall2)

      let polygonInstance2 = new Cesium.GeometryInstance({
        geometry: geometry2,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
        },
        id: 'polygonInstance2'
      })

      let primitive = new Cesium.Primitive({
        geometryInstances: [polygonInstance1, polygonInstance2],
        asynchronous: false, // 是否采用多线程
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false, // 半透明
          flat: true// 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
        })
      })

      this.viewer.scene.primitives.add(primitive)
    },
    addGroundPrimitive () {
      let rectangleInstance = new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
          rectangle: Cesium.Rectangle.fromDegrees(-140.0, 30.0, -100.0, 40.0)
        }),
        id: 'rectangle',
        attributes: {
          color: new Cesium.ColorGeometryInstanceAttribute(1.0, 0.0, 0.0, 0.5)
        }

      })
      let color = new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5) // Both instances must have the same color.
      let ellipseInstance = new Cesium.GeometryInstance({
        geometry: new Cesium.EllipseGeometry({
          center: Cesium.Cartesian3.fromDegrees(-115.0, 50.0),
          semiMinorAxis: 300000.0,
          semiMajorAxis: 400000.0
        }),
        id: 'ellipse',
        attributes: {
          color: color
        }
      })
      let groundPrimitive = new Cesium.GroundPrimitive({
        geometryInstances: [rectangleInstance, ellipseInstance]

      })
      this.viewer.scene.primitives.add(groundPrimitive)
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-115.0, 50.0, 1000),
        orientation: {
          heading: Cesium.Math.toRadians(90),
          pitch: Cesium.Math.toRadians(-20),
          roll: 0.0
        },
        duration: 3

      })
    },
    addGroundPolylineGeometry () {
      let instance2 = new Cesium.GeometryInstance({
        geometry: new Cesium.GroundPolylineGeometry({
          positions: Cesium.Cartesian3.fromDegreesArray([
            -112.1340164450331, 36.05494287836128,
            -112.08821010582645, 36.097804071380715,
            -112.13296079730024, 36.168769146801104]),
          loop: true,
          width: 10.0
        }),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString('Yellow').withAlpha(1.0))
        },
        id: 'object returned when this instance is picked and to get/set per-instance attributes'
      })

      let groundPolylinePrimitive2 = new Cesium.GroundPolylinePrimitive({
        geometryInstances: instance2,
        appearance: new Cesium.PolylineColorAppearance()
      })
      this.viewer.scene.primitives.add(groundPolylinePrimitive2)
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-112.1340164450331, 36.05494287836128, 2000),
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
