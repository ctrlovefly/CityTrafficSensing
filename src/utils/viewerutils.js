
import * as Cesium from 'cesium'
import store from '../store/index.js'
// let sensors=require('../utils/CesiumSensors.js');
import * as sensors from '../utils/CesiumSensors.js'

export const staticParams= {
  viewer:undefined,
  choosedSats:undefined,
  choosedSatName:undefined,
  layerName:[],
  terrainName:[],
  entitiesName:[],
  guid:4,
  defaultguid:[3,4],
  addname:undefined,
  // CZMLObjects:[],
  // entityObjects:[],
  // jsonObjects:[],
  assetsObjects:[],

  // data:[],

}

/**
 * 初始化三维视图
 * @param {Viewer对应的容器} _viewerId
 */
export function initViewer(_viewerId){

     //Cesium.Ion.defaultAccessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjAxZmNjOC02ZGJkLTQzYzMtODllMC01YTcwOTEwOTVlNzgiLCJpZCI6NjM3NzEsImlhdCI6MTYyODUxNTc5MH0.q9wXELW9fmP4KNeenCcnmf-MGiYt8MGxDrXIWjxILAg';
     Cesium.Ion.defaultAccessToken =
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjAxZmNjOC02ZGJkLTQzYzMtODllMC01YTcwOTEwOTVlNzgiLCJpZCI6NjM3NzEsImlhdCI6MTYyODUxNTc5MH0.q9wXELW9fmP4KNeenCcnmf-MGiYt8MGxDrXIWjxILAg";
    //  const airplaneUri = await Cesium.IonResource.fromAssetId(549884);
     staticParams.viewer = new Cesium.Viewer(_viewerId, {
     animation: true,
     baseLayerPicker: false,
     geocoder: false,
     homeButton: false, // 隐藏home按钮
     sceneModePicker: false,
     timeline: true, // 隐藏时间轴
     navigationHelpButton: false,
     fullscreenButton: false, // 隐藏全屏
     shouldAnimate: true,
     terrainProvider: Cesium.createWorldTerrain(),
   });
   staticParams.viewer.scene.debugShowFramesPerSecond = true; // 显示当前帧速度
   //Add Cesium OSM Buildings.
   const buildingsTileset = staticParams.viewer.scene.primitives.add(
     Cesium.createOsmBuildings()
   ); //
  //  console.log(buildingsTileset);
   // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
   staticParams.viewer.camera.flyTo({
     destination: Cesium.Cartesian3.fromDegrees(114.40699, 30.523685, 4000),
   });
}
/**
 * 初始化三维视图
 * @param {Viewer实例} _viewer
 * 
 */
export function czmlAddSat(_viewer, _czml){
/**加载Czml数据 ，从czml文件中 由Cesium.CzmlDataSource 数据加载器加载轨道信息**/
 Cesium.CzmlDataSource.load(_czml).then(function(ds){
    //将外部Czml添加到dataSource中
    _viewer.dataSources.add(ds);
    //设置Czml对象的实体对象（即卫星模型）
    const satModel=ds.entities.values[0];    
    satModel.model = {
      uri: './src/assets/satellite.gltf',
      minimumPixelSize : 128,
      maximumScale : 2000,
   
    };
    satModel.orientation=new Cesium.VelocityOrientationProperty(satModel.position);
    satModel.model.alignedAxis=new Cesium.VelocityVectorProperty(satModel.position,true);
    // ds.show=true;
    //更新图层管理树节点
    guidadd();
    staticParams.assetsObjects[staticParams.guid]=ds; //更新全局对象变量
    store.dispatch("treeData3DAsync",{id:staticParams.guid,label:satModel.label.text._value});//改变节点绑定数据
    store.dispatch("setdefaultCheckedAsync",staticParams.guid);//【删】改变默认选中数据，实际上是无用的
    setcheckednode(staticParams.guid);//改变添加节点选中状态
  });
}

/****************可能有用的代码分界线头******************/
export function layerLoader(_viewer){
  //AXIOS读取后端数据库固定加载图层

  //获取现有图层
  let imageryLayers = _viewer.scene.imageryLayers;
  
  for (let i = 0; i < imageryLayers.length; i++) {
    let layer = imageryLayers.get(i);
    if (layer._isBaseLayer==true){
      layer.name="默认底图";
      // console.log(layer._imageryProvider._imageryProvider.__proto__.constructor.name);
    }
    else {
      // console.log(layer._imageryProvider._imageryProvider.__proto__.constructor.name);
    }
    // if (!layer.name) {
    //   layer.name = layer.imageryProvider._resource.url;
    //    }
    //   !layer.name && (layer.name = "[未命名]");
    // self.layers[layer.label].show = true;
    staticParams.layerName.push(layer.name);
  };
  console.log(staticParams.layerName);

}

export function terrainLoader(_viewer){
  // let terrain = _viewer.terrainProvider;
  //后端数据库加载图层

  staticParams.terrainName.push("默认地形");
}

export function entityLoader(_viewer){

  const layers = _viewer.entities.values.length;
  const count_layers=_viewer.dataSources.length;
//  console.log(layers);
  for (let i = 0; i < count_layers; i++) {
    const layer = _viewer.dataSources.get(i);
    let satid=layer.entities.values[0].label.text._value;//获得卫星标签的名称
    // console.log(satid);
    staticParams.entitiesName.push(satid);
    // !layer.name && (layer.name = "[未命名]");
    // layer.name = layer.name.replace(/^(.*[\/\\])?(.*)*(\.[^.?]*.*)$/, '$2')
    // this.entityLayers.push(layer);
   
  }
}

export function guidadd(){
  staticParams.guid= staticParams.guid+1;
}

export function initaldata(){
  staticParams.data=[
    {
      id: 1,
      label: "底图图层",
      // disabled: true,
      children: [
        {
          id: 3,
          label: "默认底图",
          disabled: true,
        },
        {
          id: 4,
          label: "默认地形",
          disabled: true,
        },
      ],
    },
    {
      id: 2,
      label: "三维模型",
      children:[],
    },
  ];
}

/****************可能有用的代码分界线尾******************/

// export function sensorVolumes(_entity){//需要挂载视域的实例
//   console.log(_entity);
//   _entity.addProperty('conicSensor');
//   _entity.conicSensor = new CesiumSensorVolumes.ConicSensorGraphics({
//     show: true,
//     radius: 1000000.0,
//     innerHalfAngle: 0,
//     outerHalfAngle: 0.7,
//     minimumClockAngle: 0,
//     maximumClockAngle: 2*Math.PI//一整个圆而不是半圆
//   });
//     staticParams.viewer.scene.preRender.addEventListener((scene,time)=>{ // preRender: 获取在场景更新之后以及场景渲染之前立即引发的事件。事件的订阅者将Scene实例作为第一个参数，将当前时间作为第二个参数。
//     let modelMatrix  = _entity.computeModelMatrix(time); // 在指定时间计算实体转换的模型矩阵, -> Matrix4
//     console.log(modelMatrix);
//     let orientation = Cesium.Matrix3.multiply(// 方向   Cesium.Matrix3.multiply(矩阵，矩阵，将结果存储到对象) 计算两个矩阵的乘积。返回修改后的结果
//     Cesium.Matrix3.multiply(Cesium.Matrix3.fromRotationZ(20), Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(180.0)), new Cesium.Matrix3()),// Cesium.Matrix3.fromRotationZ （角度，结果） 创建围绕z轴的旋转矩阵
//     Cesium.Matrix3.fromRotationX(120), new Cesium.Matrix3());
//     let newMatrix4= Cesium.Matrix4.multiply(modelMatrix, Cesium.Matrix4.fromRotationTranslation(orientation,Cesium.Cartesian3.ZERO), new Cesium.Matrix4());// multiply 计算两个矩阵的乘积;  fromRotationTranslation 从表示旋转的Matrix3和表示平移的Catresian3中计算Matrix4实例
//     _entity.conicSensor.modelMatrix = newMatrix4;
//     // console.log(_entity.conicSensor.modelMatrix);
//     // console.log("有完完");
// });
// let modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(staticParams.viewer.scene.globe.ellipsoid.cartographicToCartesian(new Cesium.Cartographic(120.3, 32.5, 100000)));
// let orientation = Cesium.Matrix3.multiply(Cesium.Matrix3.multiply(Cesium.Matrix3.fromRotationZ(0.0), Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(15.0)), new Cesium.Matrix3()),Cesium.Matrix3.fromRotationX(0.0), new Cesium.Matrix3());
// // _entity.conicSensor.modelMatrix=Cesium.Matrix4.multiply(modelMatrix, Cesium.Matrix4.fromRotationTranslation(orientation, Cesium.Cartesian3.ZERO), new Cesium.Matrix4());
// _entity.conicSensor.intersectionColor = new Cesium.ConstantProperty(new Cesium.Color(0.1, 0.2, 0.3, 0.4));
// // console.log("运行结束没");
// }

// export function sensorVolumes(_entity){//需要挂载视域的实例



// }

/*以上是错误的代码*/

export function entityAddSensor(viewer, satellite) {// 场景，卫星实体
    // viewer.scene.primitives.removeAll();// 删除所有传感器
    var rectangularPyramidSensor = new CesiumSensors.RectangularPyramidSensorVolume(); // 矩形棱锥传感器体积
    rectangularPyramidSensor.radius = 20000000.0;
    rectangularPyramidSensor.xHalfAngle = Cesium.Math.toRadians(25.0);// 矩形的长
    rectangularPyramidSensor.yHalfAngle = Cesium.Math.toRadians(15.0);// 矩形的宽
    rectangularPyramidSensor.lateralSurfaceMaterial = Cesium.Material.fromType('Color');// 侧面材料
    rectangularPyramidSensor.lateralSurfaceMaterial.uniforms.color = new Cesium.Color(0.0, 1.0, 1.0, 0.5);

    viewer.scene.preRender.addEventListener((scene,time)=>{ // preRender: 获取在场景更新之后以及场景渲染之前立即引发的事件。事件的订阅者将Scene实例作为第一个参数，将当前时间作为第二个参数。
        let modelMatrix  = satellite.computeModelMatrix(time); // 在指定时间计算实体转换的模型矩阵, -> Matrix4
        Cesium.Matrix4.multiply(modelMatrix, Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(-180))), modelMatrix)// multiply 计算两个矩阵的乘积;  fromRotationTranslation 从表示旋转的Matrix3和表示平移的Catresian3中计算Matrix4实例
        rectangularPyramidSensor.modelMatrix = modelMatrix
    })
    viewer.scene.primitives.add(rectangularPyramidSensor);
    viewer.trackedEntity=satellite;
}
