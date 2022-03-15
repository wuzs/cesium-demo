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
  static initMap(target, option){

  }

  static addDataSource(opt){
    switch (opt.type) {
      case 'wms':
        break;
      case 'wmts':
        break;
      case 'tileset':
        break;


    }

  }


}


