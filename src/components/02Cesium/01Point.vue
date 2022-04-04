<template>
  <div id="cesiumContainer">

  </div>
</template>

<script>
  import * as Cesium from 'cesium/Cesium';
  import billborad from './images/billboard.png'
  import 'cesium/Widgets/widgets.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      viewer:undefined,
    }
  },
  mounted() {
    this.initCesium();

   // this.addPoint()
    //this.addBillboard()
    //this.addBox()
    //this.addCorridor()
    this.addCylinder()
  },
  methods:{
    initCesium(){
      Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYWQyYWYyMS05Y2VmLTQ2YTItYmZkZC02YTQyNTE2ZGI1OWQiLCJpZCI6MzQwNzAsImlhdCI6MTU5OTcwNDE2NH0.ufpLgxJYiCPsBtANhyXpJxNeJs_oP7jOLBjrM9nTV14";

      this.viewer = new Cesium.Viewer("cesiumContainer",{
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

        terrainProvider:new Cesium.EllipsoidTerrainProvider(),//地形图层提供则，仅baseLayerPicker设为false 有效
      });

      this.viewer._cesiumWidget._creditContainer.style.display = "none";
    },
    addPoint(){
      let point =this.viewer.entities.add({
        position:Cesium.Cartesian3.fromDegrees(-107,40,0.0),
        point:{
          color:Cesium.Color.RED,
          pixelSize:10,
          outlineColor:Cesium.Color.YELLOWGREEN,
          outlineWidth:2,
          heightReference:Cesium.HeightReference.CLAMP_TO_GROUND
        }
      })
      this.viewer.trackedEntity = point
    },
    addBillboard(){
      //添加广告牌
        let entity = this.viewer.entities.add({
          id:1,
          name:"billboard",
          position:Cesium.Cartesian3.fromDegrees(-107,40,0.0),
          point:{
            color:Cesium.Color.RED,
            pixelSize: 10,
            outlineColor:Cesium.Color.YELLOWGREEN,
            outlineWidth:2,
            heightReference:Cesium.HeightReference.NONE
          },
          billboard: {
            image:billborad,
            show:true,//是否显示
            sacle:1,//放大倍数
           // pixelOffset: new Cesium.Cartesian2(100,200),//偏移像素
            //eyeOffset:new Cesium.Cartesian3(0.0,1000000.0,0.0),//视野偏移
           // horizontalOrigin:Cesium.HorizontalOrigin.LEFT,//相对于原点的水平位置
            //verticalOrigin: Cesium.VerticalOrigin.BOTTOM//相对于原点的垂直位置
           // heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,//标识相对于地形的位置，CLAMP_TO_GROUND	位置固定在地形上。RELATIVE_TO_GROUND	位置高度是指地形上方的高度
          //  color:Cesium.Color.RED.withAlpha(0.8),//图像的颜色
          //  width:96,//图像宽度
            //heigth:96,//图像高度
            //scaleByDistance:new Cesium.NearFarScalar(1.5e2, 2.5, 8.0e6,0.0),//设置广告牌的近距离和远距离缩放属性
            //translucencyByDistance:new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6,0.0),//根据距摄像机的距离来指定广告牌的透明度
            //pixelOffsetScaleByDistance:new Cesium.NearFarScalar(1.5e2, 20, 8.0e6,0.0),//根据距照相机的距离指定广告牌的像素偏移
            //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(100000.0, 2000000.0),//根据与相机的与广告牌远近确定可见性
            disableDepthTestDistance:0,//获取或设置与相机的距离，在深度处禁用深度测试,Number.POSITIVE_INFINITY无穷大，不会应用深度测试，0始终应用深度测试，应用深度测试避免地形的遮挡
          }
        })
      this.viewer.trackedEntity = entity
      //克隆 一个实体
      let clone = entity.billboard.clone();
      let cloneEntity = new Cesium.Entity();
      cloneEntity.position = Cesium.Cartesian3.fromDegrees(-107.1,40);
      cloneEntity.billboard = clone;
      this.viewer.entities.add(cloneEntity)
    },
    addBox(){
      this.viewer.entities.add({
        position:Cesium.Cartesian3.fromDegrees(-114,40,0.0),
        box:{
          dimensions:new Cesium.Cartesian3(400000,400000,400000),//长宽高
          material:Cesium.Color.BLUE,
          fill:true,//是否填充
          outline:true,//是否绘制边框
          outlineColor:Cesium.Color.RED,//边框颜色
          outlineWidth:10,//边框线宽
          shadows:Cesium.ShadowMode.ENABLED//开启接收投射阴影

        }
      })
    },
    addCorridor(){
      //走廊
      this.viewer.entities.add({
        id:1,
        name:'corridor',
        corridor:{
          positions: Cesium.Cartesian3.fromDegreesArray([
            -100,40,
            -105,40,
            -105,35,
            -110,35,
            -110,40,
            -115,45
          ]),
          width:100000,
          height:200000,
          extrudedHeight:200000,//拉伸高度
          material:Cesium.Color.RED,
          cornerType:Cesium.CornerType.BEVELED,//拐角样式
          granularity:Cesium.Math.RADIANS_PER_DEGREE,//指定每个纬度和经度之间的距离
          zIndex:0//层级
        }

      })
    },
    addCylinder(){
      //圆柱圆锥
      let entity =this.viewer.entities.add({
        name:"cylinder",
        position:Cesium.Cartesian3.fromDegrees(-170,40),
        cylinder:{
          length:40000,
          topRadius:30000,
          bottomRadius:30000,
          material:Cesium.Color.RED,
          slices:100,
          numberOfVerticalLines:100
        }
      })
      this.viewer.trackedEntity = entity
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
