<template>
  <div class="wrap" v-show="$store.state.isShowContents">
    <div class="frmheadbox">
      <span class="frmheadtext"> 添加地面站 </span>
      <div class="close-btn">
        <img src="../../assets/关闭.png" alt="" @click="close" />
      </div>
    </div>
    <div class="inner-box"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>