import * as Cesium from 'cesium/Cesium'
let _cfg;
let _viewer;

export class CesiumHelper{

  //加载配置文件
  static set config(data){
    _cfg = data
  }

  static get config(){
    return _cfg
  }

  static set viewer(viewer){
    _viewer = viewer
  }
  static get viewer(){
    return _viewer
  }

  /**
   * 初始化球控件
   * @param target
   * @param option
   */
  static initMap(container, option){

    let viewer = new Cesium.Viewer(container,option)
    CesiumHelper.viewer = viewer;

  }
  /**
   * 创建图层
   * @param {Object} opt 参数
   */
  static createDataSource(opt){
    switch (opt.type) {
      case 'wms':
        return new Cesium.WebMapServiceImageryProvider({
          url:opt.url,
          layers:opt.layers,
          parameters:{
            service : 'WMS',
            version : opt.version || '1.1.1',
            request : 'GetMap',
            styles : '',
            format : opt.format || 'image/jpeg'
          },
          getFeatureInfoFormats:{
            service : 'WMS',
            version : opt.version || '1.1.1',
            request : 'GetFeatureInfo'
          },
          enablePickFeatures:opt.enablePickFeatures,
        })

        break;
      case 'wmts':
        return new Cesium.WebMapTileServiceImageryProvider({
          url:opt.url,
          layer:opt.layer,
          style:opt.style ||'default',
          format:opt.format|| 'tiles',
          tileMatrixSetID:opt.tileMatrixSetID,
          credit:opt.credit || '',
          subdomains:opt.subdomains ||[],
          minimumLevel:opt.minimumLevel||0,
          maximumLevel:opt.maximumLevel|| 18
        })
        break;
      case 'tileset':
       return new Cesium.Cesium3DTileset({
          url:'http://39.105.197.110/qg/tileset.json'
        })
        break;


    }

  }


  /**
   * 创建天地图影像地图
   * @param {Object} tk
   */
  static addTdtWMTSImageLayer =function(tk,viewer){

    const img_w={
      type:"wmts",
      url:`http://{s}.tianditu.com/img_w/wmts?tk=${tk}`,
      layer:'img',
      tileMatrixSetID:"w",
      subdomains:["t0", "t1","t2","t3", "t4", "t5", "t6", "t7"]
    }
    const cia_w={
      type:"wmts",
      url:`http://{s}.tianditu.com/cia_w/wmts?tk=${tk}`,
      layer:'cia',
      tileMatrixSetID:"w",
      subdomains:["t0", "t1","t2","t3", "t4", "t5", "t6", "t7"]
    }
    viewer.imageryLayers.addImageryProvider(CesiumHelper.createDataSource(img_w))
    viewer.imageryLayers.addImageryProvider(CesiumHelper.createDataSource(cia_w))
  }


}
