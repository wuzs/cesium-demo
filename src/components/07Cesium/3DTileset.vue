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
  export default {
    name: 'Primitive',
    data() {
      return {
        viewer: undefined
      }
    },
    mounted() {
      this.viewer = this.initCesium()
      //this.add3DTileset()
      //this.addVedio()
      //this.add3DStyle()
      this.addCesium3DTileFeature()

    },
    methods: {
      initCesium() {
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
      add3DTileset() {
        this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: "http://39.105.197.110/Cesium1.91/Apps/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json",
          show: true,
          backFaceCulling: true //背面绘制
        })).readyPromise.then(tileset => {
          let heightOffset = 1000;
          let boundingSphere = tileset.boundingSphere;
          let cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center)
          let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
          let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset)
          let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3())
          tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
          this.viewer.zoomTo(tileset)
        })
      },
      addVedio() {
        this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: "http://39.105.197.110/Cesium1.91/Apps/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json",
          show: true,
          backFaceCulling: true //背面绘制
        })).readyPromise.then(tileset => {
          this.viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.5, tileset.boundingSphere.radius * 2.0))
        })
        let vid = document.getElementById("video")
        this.viewer.entities.add({
          // polygon:{
          //   hierarchy:new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray([
          //       -75.61624258093384 ,40.04529252303976,
          //       -75.60840755744098 ,40.044998364483384,
          //       -75.60974857977195 ,40.04107654882398,
          //       -75.61456198007131, 40.041150985945414
          //   ])),
          //   material:vid,
          //   classificationType:Cesium.ClassificationType.BOTH
          // }
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
              100000,
              100000,
              100000,
              100000,
              100000,
              100000,
              100000,
              100000,
              100000,
              100000
            ],
            minimumHeights: [ // 设定每个点的最小高度
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            material: vid,
            outline: true,
            outlineColor: Cesium.Color.BLACK
          }
        })
        new Cesium.VideoSynchronizer({
          clock: this.viewer.clock,
          element: vid
        })
        this.viewer.clock.shouldAnimate = true;
        vid.style.display = 'none';


      },
      add3DStyle() {
        this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: "http://39.105.197.110/Cesium1.91/Apps/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json",
          maximumScreenSpaceError: 20, //最大屏幕空间误差
          maximumNumberOfLoadedTiles: 10000, //最大加载瓦片个数
        })).readyPromise.then(tileset => {
          var transparentStyle = new Cesium.Cesium3DTileStyle({
            color: 'color("white",0.3)',
            show: true
          })
          var properties = tileset.properties;
          if (Cesium.defined(properties)) {
            for (var name in properties) {
              console.log(name + "---" + properties[name])
            }
          }

          var heightStyle = new Cesium.Cesium3DTileStyle({
            color: {
              conditions: [
                ["${Height}>=100", "rgba(45, 0, 75, 0.5)"],
                ["${Height} >= 75", "rgb(102, 71, 151)"],
                ["${Height} >= 50", "rgb(170, 162, 204)"],
                ["${Height} >= 35", "rgb(224, 226, 238)"],
                ["${Height} >= 25", "rgb(252, 230, 200)"],
                ["${Height} >= 10", "rgb(248, 176, 87)"],
                ["${Height} >= 5", "rgb(198, 106, 11)"],
                ["true", "rgb(127, 59, 8)"]
              ]
            }
          })
          console.log(tileset.boundingSphere.center)
          var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
          var longitude = Cesium.Math.toDegrees(cartographic.longitude);
          var latitude = Cesium.Math.toDegrees(cartographic.latitude)
          let distanceStyle = new Cesium.Cesium3DTileStyle({
            defines: {
              distance: "distance(vec2(${Longitude},${Latitude}),vec2(" + longitude + "," + latitude + "))"
            },
            color: {
              conditions: [
                ["${distance} > 0.00001", "color('blue')"],
                ["${distance} < 0.00002", "color('green')"],
                ["${distance} < 0.00003", "color('yellow')"],
                ["${distance} < 0.00004", "color('red')"],
                ["true", "color('white')"],
              ]
            }
          })
          var style = new Cesium.Cesium3DTileStyle();
          style.anchorLineColor = 'true';
          style.anchorLineColor = {
            conditions: [
              ['${Height} >2', 'color("cyan")'],
              ['true', 'color("blue")']
            ]
          }
          tileset.style = heightStyle;
          this.viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.5, tileset.boundingSphere.radius * 2.0))


        })

      },
      addCesium3DTileFeature() {
        this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: "http://39.105.197.110/Cesium1.91/Apps/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json",
          maximumScreenSpaceError: 20, //最大屏幕空间误差
          maximumNumberOfLoadedTiles: 10000, //最大加载瓦片个数
        })).readyPromise.then(tileset => {
          var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
          var longitude = Cesium.Math.toDegrees(cartographic.longitude)
          var latitude = Cesium.Math.toDegrees(cartographic.latitude)
          var distanceStyle= new Cesium.Cesium3DTileStyle({
            defines:{
              distance:"distance(vec2(${feature['Longitude']},${feature[Latitude]}),vec2("+longitude+","+latitude+"))"
            },
            color:{
              conditions:[
                 ["${distance} < 0.00001", "color('blue')"],
                 ["${distance} > 0.00002", "color('green')"],
                 ["${distance} < 0.00003", "color('yellow')"],
                 ["${distance} < 0.00004", "color('red')"],
                 ["true", "color('white')"],
              ]
            }

          })
          tileset.style = distanceStyle;
          this.viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.5, tileset.boundingSphere.radius * 2.0));
        })
        //高亮选中
        var previousPickedEntity={
          feature:undefined,
          originalColor:undefined
        }
        var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas)
        handler.setInputAction(movement=>{
          var pickingEntity = this.viewer.scene.pick(movement.position)
          if(pickingEntity instanceof Cesium.Cesium3DTileFeature){
            var propertyNames = pickingEntity.getPropertyNames();
            var length = propertyNames.length;
            for(var i=0;i<length;i++){
              var propertyName = propertyNames[i]
              console.log(propertyName + ': ' + pickingEntity.getProperty(propertyName));
            }
            if(pickingEntity !=previousPickedEntity.feature){
              if(previousPickedEntity.feature){
                previousPickedEntity.feature.color = previousPickedEntity.originalColor;
                previousPickedEntity.feature = pickingEntity;
                previousPickedEntity.originalColor = pickingEntity.color;
              }
               previousPickedEntity.feature = pickingEntity;
               previousPickedEntity.originalColor = pickingEntity.color;
            }
            pickingEntity.color = Cesium.Color.YELLOW
          }

        },Cesium.ScreenSpaceEventType.LEFT_CLICK)

      }
    }
  }
</script>
