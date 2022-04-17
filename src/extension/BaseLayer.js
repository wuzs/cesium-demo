"use strict";
class BaseLayer{
  constructor(options) {
    options = options || {}
    this.tk = options.tk
  }

  addTDTImageryLayer(){
    console.log(this.tk)
  }

}
Object.defineProperties(BaseLayer.prototype,{
  tk:{
    set:(tk)=>{
      this.tk = tk
    },
    get:()=>{
      return this.tk
    }
  }
})
let lb = new BaseLayer();
lb.tk="12312"
lb.addTDTImageryLayer()



