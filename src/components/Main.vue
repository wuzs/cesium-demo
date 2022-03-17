<template>
    <div class="main">
        <div id="cesiumContainer"></div>


    </div>
</template>

<script>

  import 'cesium/Widgets/widgets.css'
  import {CesiumHelper}  from '@/utils/CesiumHelper'
  // import * as Cesium from 'cesium/Cesium.js'
  //import url from '../assets/bluemarble-2048.png'
  export default{
    name:"Main",
    data(){
      return {
        viewer:undefined
      }
    },
    mounted() {
       Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
       let option ={
         animation: false, //是否创建动画小器件，左下角仪表
         baseLayerPicker: false, //是否显示图层选择器
         fullscreenButton: false, //是否显示全屏按钮
         geocoder: false, //是否显示geocoder小器件，右上角查询按钮
         homeButton: false, //是否显示Home按钮
         infoBox: false, //是否显示信息框
         selectionIndicator: false, //是否显示选取指示器组件
         timeline: false, //是否显示时间轴
         navigationHelpButton: false, //是否显示右上角的帮助按钮
         fullscreenElement: document.body, //全屏时渲染的HTML元素,
         useDefaultRenderLoop: true, //如果需要控制渲染循环，则设为true
         targetFrameRate: undefined, //使用默认render loop时的帧率
         showRenderLoopErrors: false, //如果设为true，将在一个HTML面板中显示错误信息
         automaticallyTrackDataSourceClocks: true, //自动追踪最近添加的数据源的时钟设置
         contextOptions: undefined, //传递给Scene对象的上下文参数（scene.options）
         sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式
         sceneModePicker: false, //是否显示3D/2D选择器
         scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
         //creditContainer: opt.creditContainer,

         imageryProvider: new Cesium.SingleTileImageryProvider({
           url:'../../static/image/bluemarble-2048.png'
         }),

         terrainProvider: null
       }


       CesiumHelper.initMap("cesiumContainer",option)
       this.viewer = CesiumHelper.viewer;

      this.addTilesLayer()

      //viewer.imageryLayers.addImageryProvider()

      this.loadGeoJson()


     let  entities = this.viewer.entities.add({
                name : '风机设备',
        		    code:"123456789",

        		    position : Cesium.Cartesian3.fromDegrees( 108.953726,34.265776 ),
        		    // point : { //点
        		    //     pixelSize : 5,
        		    //    // color : Cesium.Color.RED,
        		    //     //outlineColor : Cesium.Color.WHITE,
        		    //     //outlineWidth : 2
        		    // },
        		    label : { //文字标签
        		        text : '风机设备',
        		        font : '14pt monospace',
        		        style : Cesium.LabelStyle.FILL,
        		        outlineWidth : 2,
        		        verticalOrigin : Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
        		        pixelOffset : new Cesium.Cartesian2( 0, -9 )   //偏移量
        		    },
        		    billboard : { //图标
        		        image  : '../../static/image/logo.png',
        		        width : 16,
        		        height : 16
        		    }


      })

      this.viewer.zoomTo(entities)

       var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
              handler.setInputAction((click)=> {
                  var pick = this.viewer.scene.pick(click.position);
                  debugger
                  //选中某模型   pick选中的对象
                  if(pick && pick.id && pick.id instanceof Cesium.Entity){
                  	alert(pick.id._code);
                  }

               }, Cesium.ScreenSpaceEventType.LEFT_CLICK  );

    },
    methods:{
      addTilesLayer(){
          let tilesLayer = new Cesium.Cesium3DTileset({
            url:'http://39.105.197.110/qg/tileset.json'
          })
          this.viewer.scene.primitives.add(tilesLayer)

          // this.viewer.flyTo(tilesLayer, {
          // });

      },
      loadGeoJson(){

        let geoPromise= Cesium.GeoJsonDataSource.load(require('@/data/fukang.json'),{
          clampToGround : true,
          stroke: Cesium.Color.RED,
          fill: Cesium.Color.PINK,
          strokeWidth: 3,
          markerSymbol: '?'
        })

        geoPromise.then(dataSource=>{
          this.viewer.dataSources.add(dataSource);
          //this.viewer.flyTo(dataSource)

           let entities = dataSource.entities.values;
                              for (let i = 0; i < entities.length; i++) {
                                  let entity = entities[i];
                                  // entity.polygon.material = new Cesium.PolylineOutlineMaterialProperty({
                                  //     color: Cesium.Color.WHITE,
                                  //     outlineWidth: 2,
                                  //     outlineColor: Cesium.Color.BLACK
                                  // });
    //Cesium.Color.RED.withAlpha(0)
                                  entity.polygon.fill = false
                                  entity.polygon.outline = true
                                  entity.polygon.outlineColor=Cesium.Color.RED
                                  entity.polygon.width =100
                                  entity.polygon.index=1000

                              }

        })

        // this.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(require('@/data/fukang.json'),{
        //   clampToGround : true
        // }))

      }
    }


  }
</script>

<style>
    .main{
      width: 100%;
      height: 100%;

    }
    #cesiumContainer{
      width: 100%;
      height: 100%;
      position: absolute;
    }
</style>
