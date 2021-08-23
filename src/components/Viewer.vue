<template>
  <div id="cesiumViewer"></div>
</template>

<script>
import { Viewer } from "cesium";
import * as Cesium from "cesium"; //这里是不是因为那个插件的问题？
// import * as Cesium from 'cesium/Cesium';
import { onMounted } from "@vue/runtime-core";
import { initViewer } from "../utils/viewerutils.js";
export default {
  name: "Viewer",
  setup() {
    onMounted(() => {
      initViewer("cesiumViewer");
    });
    return {};
  },
};
</script>

<style>
#cesiumViewer {
  position: absolute;
  box-sizing: border-box;
  z-index: 0;
  margin: 0 0 0;
  padding: 0px;
  width: 100%;
  height: calc(100% - 50px);
}
</style>