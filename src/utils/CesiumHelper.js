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
        break;
      case 'tileset':
        break;


    }

  }




}
