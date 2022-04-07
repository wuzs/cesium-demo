<template>
  <div id="cesiumContainer">

  </div>
</template>

<script>
import * as Cesium from 'cesium/Cesium'
import billborad from './images/billboard.png'
import 'cesium/Widgets/widgets.css'
import ellipse from './images/ellipse.jpg'
export default {
  name: 'HelloWorld',
  data () {
    return {
      viewer: undefined
    }
  },
  mounted () {
    this.initCesium()

    // this.addPoint()
    // this.addBillboard()
    // this.addBox()
    // this.addCorridor()
    // this.addCylinder()
    // this.addEllipse()
    // this.addEllipsoid();
    // this.addLabel()
    // this.addModel()
    // this.addPath()
    // this.addPlane()
    // this.addPolygon()
    // this.addPolyline()
    // this.addPolylineVolume()
    // this.addRectangle()
    // this.addWall()
    this.addEntityCluster()
  },
  methods: {
    initCesium () {
      Cesium.Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYWQyYWYyMS05Y2VmLTQ2YTItYmZkZC02YTQyNTE2ZGI1OWQiLCJpZCI6MzQwNzAsImlhdCI6MTU5OTcwNDE2NH0.ufpLgxJYiCPsBtANhyXpJxNeJs_oP7jOLBjrM9nTV14'

      this.viewer = new Cesium.Viewer('cesiumContainer', {
        animation: true, // 是否创建动画小器件，左下角仪表
        baseLayerPicker: false, // 是否显示图层选择器，右上角图层选择按钮
        fullscreenButton: false, // 是否显示全屏按钮，右下角全屏选择按钮
        geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
        homeButton: false, // 是否显示Home 按钮 ，右上角home按钮
        sceneModePicker: false, // 是否显示3D/2D选择器，右上角按钮
        navigationHelpButton: false, // 是否显示右上角的帮助按钮
        selectionIndicator: false, // 是否显示选取指示器组件
        timeline: true, // 是否显示时间轴
        infoBox: false, // 是否显示信息框
        scene3DOnly: true, // 如果设置为true  则所有几何以3D的模式绘制以节约GPU资源
        clock: new Cesium.Clock(), // 用于控制当前的时间的时钟对象
        shouldAnimate: true, // 自动播放动画控件
        shadows: true, // 是否显示光照投射阴影
        terrainShadows: Cesium.ShadowMode.RECEIVE_ONLY, // 地质接收阴影
        sceneMode: Cesium.SceneMode.SCENE3D, // 初始化渲染3D场景
        selectedImageryProviderViewModel: undefined, // 当前图像图层的显示模式，仅baseLayerPicker 设为true 有意义
        imageryProviderViewModels: Cesium
          .createDefaultImageryProviderViewModels(), // 可 供 BaseLayerPicker 选择的图像图层 ProviderViewModel 数组
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          layer: 'tdtVecBasicLayer',
          style: 'default',
          format: 'image/png',
          tileMatrixSetID: 'GoogleMapsCompatible',
          show: true
        }), // 图像图层提供者，仅 baseLayerPicker 设为 false 有意义

        terrainProvider: new Cesium.EllipsoidTerrainProvider() // 地形图层提供则，仅baseLayerPicker设为false 有效
      })

      this.viewer._cesiumWidget._creditContainer.style.display = 'none'
    },
    addPoint () {
      let point = this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-107, 40, 0.0),
        point: {
          color: Cesium.Color.RED,
          pixelSize: 10,
          outlineColor: Cesium.Color.YELLOWGREEN,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      })
      this.viewer.trackedEntity = point
    },
    addBillboard () {
      // 添加广告牌
      let entity = this.viewer.entities.add({
        id: 1,
        name: 'billboard',
        position: Cesium.Cartesian3.fromDegrees(-107, 40, 0.0),
        point: {
          color: Cesium.Color.RED,
          pixelSize: 10,
          outlineColor: Cesium.Color.YELLOWGREEN,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.NONE
        },
        billboard: {
          image: billborad,
          show: true, // 是否显示
          sacle: 1, // 放大倍数
          // pixelOffset: new Cesium.Cartesian2(100,200),//偏移像素
          // eyeOffset:new Cesium.Cartesian3(0.0,1000000.0,0.0),//视野偏移
          // horizontalOrigin:Cesium.HorizontalOrigin.LEFT,//相对于原点的水平位置
          // verticalOrigin: Cesium.VerticalOrigin.BOTTOM//相对于原点的垂直位置
          // heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,//标识相对于地形的位置，CLAMP_TO_GROUND	位置固定在地形上。RELATIVE_TO_GROUND	位置高度是指地形上方的高度
          //  color:Cesium.Color.RED.withAlpha(0.8),//图像的颜色
          //  width:96,//图像宽度
          // heigth:96,//图像高度
          // scaleByDistance:new Cesium.NearFarScalar(1.5e2, 2.5, 8.0e6,0.0),//设置广告牌的近距离和远距离缩放属性
          // translucencyByDistance:new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6,0.0),//根据距摄像机的距离来指定广告牌的透明度
          // pixelOffsetScaleByDistance:new Cesium.NearFarScalar(1.5e2, 20, 8.0e6,0.0),//根据距照相机的距离指定广告牌的像素偏移
          // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(100000.0, 2000000.0),//根据与相机的与广告牌远近确定可见性
          disableDepthTestDistance: 0 // 获取或设置与相机的距离，在深度处禁用深度测试,Number.POSITIVE_INFINITY无穷大，不会应用深度测试，0始终应用深度测试，应用深度测试避免地形的遮挡
        }
      })
      this.viewer.trackedEntity = entity
      // 克隆 一个实体
      let clone = entity.billboard.clone()
      let cloneEntity = new Cesium.Entity()
      cloneEntity.position = Cesium.Cartesian3.fromDegrees(-107.1, 40)
      cloneEntity.billboard = clone
      this.viewer.entities.add(cloneEntity)
    },
    addBox () {
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-114, 40, 0.0),
        box: {
          dimensions: new Cesium.Cartesian3(400000, 400000, 400000), // 长宽高
          material: Cesium.Color.BLUE,
          fill: true, // 是否填充
          outline: true, // 是否绘制边框
          outlineColor: Cesium.Color.RED, // 边框颜色
          outlineWidth: 10, // 边框线宽
          shadows: Cesium.ShadowMode.ENABLED // 开启接收投射阴影

        }
      })
    },
    addCorridor () {
      // 走廊
      this.viewer.entities.add({
        id: 1,
        name: 'corridor',
        corridor: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            -100, 40,
            -105, 40,
            -105, 35,
            -110, 35,
            -110, 40,
            -115, 45
          ]),
          width: 100000,
          height: 200000,
          extrudedHeight: 200000, // 拉伸高度
          material: Cesium.Color.RED,
          cornerType: Cesium.CornerType.BEVELED, // 拐角样式
          granularity: Cesium.Math.RADIANS_PER_DEGREE, // 指定每个纬度和经度之间的距离
          zIndex: 0 // 层级
        }

      })
    },
    addCylinder () {
      // 圆柱圆锥
      let entity = this.viewer.entities.add({
        name: 'cylinder',
        position: Cesium.Cartesian3.fromDegrees(-170, 40),
        cylinder: {
          length: 40000,
          topRadius: 30000,
          bottomRadius: 30000,
          material: Cesium.Color.RED,
          slices: 100,
          numberOfVerticalLines: 100
        }
      })
      this.viewer.trackedEntity = entity
    },
    addEllipse () {
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
        name: 'ellipse',
        ellipse: {
          semiMinorAxis: 300000.0,
          semiMajorAxis: 300000.0,
          height: 200000.0,
          material: Cesium.Color.BLUE,
          rotation: Cesium.Math.PI_OVER_FOUR
        }
      })

      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-100.0, 40, 150000),
        name: 'ellipse',
        ellipse: {
          semiMinorAxis: 200000.0,
          semiMajorAxis: 300000.0,
          height: 200000.0,
          material: ellipse,
          rotation: Cesium.Math.toRadians(90),
          stRotation: Cesium.Math.toRadians(90)
        }
      })
    },
    addEllipsoid () {
      this.viewer.entities.add({
        name: 'Blue sphere',
        position: Cesium.Cartesian3.fromDegrees(-114, 40, 300000),
        ellipsoid: {
          radii: new Cesium.Cartesian3(200000, 200000, 300000), // 用于指定椭球的半径，三个方向半径不相等就是椭球体
          material: Cesium.Color.BLUE
        }
      })
      this.viewer.entities.add({
        name: 'Red sphere',
        position: Cesium.Cartesian3.fromDegrees(-107, 40, 300000),
        ellipsoid: {
          radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0), // 用于指定椭球的半径 三个半径相等 球体
          material: Cesium.Color.RED.withAlpha(0.5),
          innerRadii: new Cesium.Cartesian3(100000.0, 100000.0, 100000.0)
        }
      })
      this.viewer.entities.add({
        name: 'Yellow ellipsoid',
        position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 300000.0),
        ellipsoid: {
          radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
          fill: false,
          outline: true,
          outlineColor: Cesium.Color.YELLOW,
          slicePartitions: 64, // 指定径向切片数量 水平
          stackPartitions: 64, // 指定堆栈数 垂直
          subdivisions: 256 // 指定每个轮廓环的样本数，确定曲率的粒度
        }
      })
    },
    addLabel () {
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300.0),
        point: {
          color: Cesium.Color.RED, // 点位颜色
          pixelSize: 10 // 像素点大小
        },
        label: {
          pixelOffset: new Cesium.Cartesian2(155, -97), // 偏移量
          text: 'Hello Cesium\nLabelGraphics', // 文本内容，\n标识换行
          font: '14pt Source Han Sans CN', // 字体样式
          fillColor: Cesium.Color.BLACK, // 字体颜色
          backgroundColor: Cesium.Color.RED, // 背景颜色
          showBackground: true, // 是否显示背景颜色
          style: Cesium.LabelStyle.FILL, // label样式
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, // 垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT // 水平位置
          // pixelOffset: new Cesium.Cartesian2(10, 0) // 偏移
        }
      })
    },
    addModel () {
      let position = Cesium.Cartesian3.fromDegrees(
        -123.0744619,
        44.0503706,
        10000
      )
      let heading = Cesium.Math.toRadians(135)
      let pitch = 0
      let roll = 0
      let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
      let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

      let entity = this.viewer.entities.add({
        name: 'model',
        position: position,
        orientation: orientation,
        model: {
          uri: 'http://39.105.197.110/Cesium1.91/Apps/SampleData/models/CesiumAir/Cesium_Air.glb',
          scale: 5, // 缩放
          minimumPixelSize: 32, // 指定模型最小的像素大小，不考虑缩放
          maximumSize: 128, // 指定的最大比例尺大小，
          runAnimations: true, // 指定是否应启动模型中指定的glTF动画
          clampAnimations: true, // 指定glTF动画是否应在没有关键帧的持续时间内保持最后一个姿势
          silhouetteSize: 3, // 轮廓大小
          maximumScale: 200, // 设置模型最大的放大大小
          color: Cesium.Color.YELLOWGREEN, // 指定模型渲染混合的颜色
          show: true,
          colorBlendMode: Cesium.ColorBlendMode.MIX, // 颜色混合模式
          colorBlendAmount: 0.6 // 颜色混合比例

        }
      })
      this.viewer.trackedEntity = entity
    },
    addPath () {
      // 起始时间
      let start = Cesium.JulianDate.now()
      // 结束时间
      let stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate())
      // 设置时钟开始时间
      this.viewer.clock.startTime = start.clone()
      // 设置时钟结束时间
      this.viewer.clock.stopTime = stop.clone()
      // 设置时钟当前时间
      this.viewer.clock.currentTime = start.clone()
      // 循环执行，到达终止时间重新从起点开始
      this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP
      // 时间速率 数字越大时间越快
      this.viewer.clock.multiplier = 10
      // 设置时间轴
      // this.viewer.timeline = true

      function computePath (lon, lat) {
        let property = new Cesium.SampledPositionProperty()
        for (let i = 0; i < 10; i++) {
          let time = Cesium.JulianDate.addSeconds(start, i * 60, new Cesium.JulianDate())
          let position = Cesium.Cartesian3.fromDegrees(lon, lat + i * 0.1, 1750)
          property.addSample(time, position)
        }
        return property
      }
      let position = computePath(-120, 40)
      let path = this.viewer.entities.add({
        position: position,
        orientation: new Cesium.VelocityOrientationProperty(position),
        availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
          start: start,
          stop: stop
        })]),
        model: {
          uri: 'http://39.105.197.110/Cesium1.91/Apps/SampleData/models/CesiumAir/Cesium_Air.glb'
        },
        path: {
          resolution: 600, // 指定在对应的位置进行采样时要移动的最大秒数
          leadTime: 0, // 显示path前面的秒数
          trailTime: 1, // 显示在path 尾部的秒数
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 1,
            color: Cesium.Color.ORANGE
          }),
          width: 3
        }

      })
      this.viewer.trackedEntity = path
    },
    addPlane () {
      let entity = this.viewer.entities.add({
        name: 'plane',
        position: Cesium.Cartesian3.fromDegrees(-107, 40, 300000),
        plane: {
          plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 10000),
          dimensions: new Cesium.Cartesian2(400000, 300000), // 水平面的高度宽度
          material: Cesium.Color.RED.withAlpha(0.5), // 材质
          fill: true,
          outline: true,
          outlineColor: Cesium.Color.YELLOWGREEN
        }
      })
      this.viewer.trackedEntity = entity
    },
    addPolygon () {
      this.viewer.entities.add({
        name: 'Blue polygon with holes',
        polygon: {
          hierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray([
              -99.0,
              30.0,
              -85.0,
              30.0,
              -85.0,
              40.0,
              -99.0,
              40.0
            ]),
            holes: [
              {
                positions: Cesium.Cartesian3.fromDegreesArray([
                  -97, 31,
                  -97, 39,
                  -87, 39,
                  -87, 31
                ]),
                holes: [
                  {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                      -95.0,
                      33.0,
                      -89.0,
                      33.0,
                      -89.0,
                      37.0,
                      -95.0,
                      37.0
                    ]),
                    holes: [
                      {
                        positions: Cesium.Cartesian3.fromDegreesArray([
                          -93.0,
                          34.0,
                          -91.0,
                          34.0,
                          -91.0,
                          36.0,
                          -93.0,
                          36.0
                        ])
                      }
                    ]
                  }
                ]
              }

            ]
          },
          material: Cesium.Color.BLUE.withAlpha(0.8),
          height: 0,
          outline: true,
          closeTop: false,
          closeBottom: false,
          extrudedHeight: 1000000,
          extrudedHeightReference: Cesium.HeightReference.CLAMP_TO_EDGE

        }
      })
      this.viewer.zoomTo(this.viewer.entities)
    },
    addPolyline () {
      this.viewer.entities.add({
        name: 'Red line on terrain',
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            90.82436,
            38.071506,
            112.82742,
            23.067512,
            112.832166,
            40.058329
          ]),
          width: 5,
          material: Cesium.Color.RED,
          depthFailMaterial: Cesium.Color.BLUE, // 位于地下的材质，不给地下的材质则位于地下的线是不可见的
          clampToGroud: false,
          arcType: Cesium.ArcType.GEODESIC// 定义连接点采用的路径
        }

      })
      this.viewer.zoomTo(this.viewer.entities)
    },
    addPolylineVolume () {
      function computeCircle (radius) {
        let positions = []
        for (let i = 0; i < 360; i++) {
          let radians = Cesium.Math.toRadians(i)
          positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)))
        }
        return positions
      }
      this.viewer.entities.add({
        name: 'polylineVolume',
        polylineVolume: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            -85, 32,
            -85, 36,
            -89, 36
          ]),
          shape: computeCircle(60000),
          material: Cesium.Color.RED
        }

      })
    },
    addRectangle () {
      this.viewer.entities.add({
        name: 'rectangle',
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(
            -110, 20, -80, 25

          ),
          material: Cesium.Color.RED.withAlpha(0.5)
        }
      })
    },
    addWall () {
      this.viewer.entities.add({
        name: 'Blue Wall sawtooth  heights and outline',
        wall: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            -115.0,
            50.0,
            -112.5,
            50.0,
            -110.0,
            50.0,
            -107.5,
            50.0,
            -105.0,
            50.0,
            -102.5,
            50.0,
            -100.0,
            50.0,
            -97.5,
            50.0,
            -95.0,
            50.0,
            -92.5,
            50.0,
            -90.0,
            50.0
          ]),
          maximumHeights: [ // 设定每个点的最大高度
            100000,
            200000,
            100000,
            200000,
            100000,
            200000,
            100000,
            200000,
            100000,
            200000,
            100000
          ],
          minimumHeights: [// 设定每个点的最小高度
            0,
            100000,
            0,
            100000,
            0,
            100000,
            0,
            100000,
            0,
            100000,
            0
          ],
          material: Cesium.Color.BLUE.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK
        }

      })
    },
    addEntityCluster () {
      let customDataSource = new Cesium.CustomDataSource('customDataSource')
      for (let i = 0; i < 250; i++) {
        let entity = new Cesium.Entity()
        entity.position = Cesium.Cartesian3.fromDegrees(Cesium.Math.randomBetween(-180, 180), Cesium.Math.randomBetween(-75, 75))
        entity.billboard = new Cesium.BillboardGraphics()
        entity.billboard.image = billborad
        entity.billboard.color = Cesium.Color.fromRandom().withAlpha(0.8)
        customDataSource.entities.add(entity)
      }

      this.viewer.dataSources.add(customDataSource)
      let dataSource = customDataSource
      let pixelRange = 5
      let minimumClusterSize = 3
      let enabled = true
      let removeListener = null
      // 开启数据源实体聚合
      dataSource.clustering.enabled = enabled
      // 扩展屏幕空间边框的像素范围
      dataSource.clustering.pixelRange = pixelRange
      // 群集的屏幕空间对象的最小数量
      dataSource.clustering.minimumClusterSize = minimumClusterSize

      function customStyle () {
        if (Cesium.defined(removeListener)) {
          removeListener()
          removeListener = undefined
        } else {
          removeListener = dataSource.clustering.clusterEvent.addEventListener(
            function (clusteredEntities, cluster) {
              cluster.label.show = true
              cluster.label.text = clusteredEntities.length.toString()
              cluster.label.pixelOffset = new Cesium.Cartesian2(-5, 5)
              cluster.label.font = '18px sans-serif'
              cluster.label.style = Cesium.LabelStyle.FILL_AND_OUTLINE
              cluster.label.fillColor = Cesium.Color.RED
              cluster.label.outlineColor = Cesium.Color.BLACK
              cluster.label.outlineWidth = 2
              cluster.billboard.show = true
              cluster.billboard.id = cluster.label.id
              cluster.billboard.image = billborad
            })
        }
        // 强制聚合使用新的样式
        let pixelRange = dataSource.clustering.pixelRange
        dataSource.clustering.pixelRange = 0
        dataSource.clustering.pixelRange = pixelRange
      }
      customStyle()
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
