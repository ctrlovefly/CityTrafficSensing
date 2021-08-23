<template>
  <div class="layers" v-show="$store.state.isShowLayers">
    <div class="frmheadbox">
      <span class="frmheadtext"> 场景内容 </span>
      <div class="close-btn">
        <img src="../../assets/关闭.png" alt="" @click="close" />
      </div>
    </div>
    <div class="inner-box3">
      <el-scrollbar ref="scrollbar" height="365px" always>
        <el-tree
          ref="tree"
          :data="data"
          :default-checked-keys="defaultchoosed"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @check="handleChange"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <a @click="remove(node, data)" v-show="node.id > 4"> 删除 </a>
              </span>
            </span>
          </template>
        </el-tree>
        <el-button @click="sensor()"> 测试 </el-button>
        <el-button @click="setcheckednode(5)"> 测试2 </el-button>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import * as Viewutils from "../../utils/viewerutils.js";
export default {
  data() {
    return {
      // da: 777,
      // data: Viewutils.staticParams.data, //检验data是否是JSON格式的
    };
  },
  created() {
    // 在created ()里定义是为了确保vue组件加载完成后，再执行window 全局方法
    window.setcheckednode = this.setcheckednode; // 将vue中要被调用的方法定义成 window 全局方法
  },
  mounted() {
    // Viewutils.initaldata();
    // console.log(Viewutils.staticParams.data);
    // console.log(this.data);
  },
  updated() {
    // getCheckedKeys(defaultchoosed);
    // console.log("现在" + this.defaultchoosed);
  },
  computed: {
    data: {
      get() {
        return this.$store.state.treeData;
      },
      set(value) {
        // this.$store.commit('updateMessage', value)
      },
    },
    defaultchoosed: {
      get() {
        return this.$store.state.defaultChecked;
      },
      set(value) {},
    },
  },
  methods: {
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      this.data = [...this.data];
    },
    setcheckednode(id) {
      this.$nextTick(function () {
        this.$refs.tree.setChecked(id, true);
      }); //nextTick是下一个eventLoop里面的一个待执行的钩子函数。vue数据驱动视图更新的逻辑是：data变化-->nextTick触发-->更新vdom-->新旧vdom对比-->生成dom更新视图。js单线程的原因，nextTick里面写的代码会在生成dom这步后面执行，所以一般在这里拿最新的dom，这也是nextTick的应用场景，
    },
    handleChange(data, checked, node) {
      // this.$refs.tree.getCheckedKeys());
      console.log("hello");
      if (Viewutils.staticParams.assetsObjects[data.id] != undefined) {
        Viewutils.staticParams.assetsObjects[data.id].show =
          !Viewutils.staticParams.assetsObjects[data.id].show;
      }
    },
    close() {
      this.$store.dispatch("setisShowLayersAsync");
    },
    sensor() {
      console.log(Viewutils.staticParams.assetsObjects[5].entities.values[0]);
      // Viewutils.sensorVolumes(
      //   Viewutils.staticParams.assetsObjects[5].entities.values[0]
      // );
      Viewutils.entityAddSensor(
        Viewutils.staticParams.viewer,
        Viewutils.staticParams.assetsObjects[5].entities.values[0]
      );
    },
  },
};
</script>

<style>
.layers {
  position: absolute;
  width: 300px;
  height: 400px;
  background-color: hsl(240, 5%, 17%, 0.6);
  top: 55px;
  right: 400px;
  border-radius: 2px;
}
.inner-box3 {
  height: 365px;
  background-color: white;
}
.el-tree {
  background: transparent;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  background: transparent;
  /* background-color: thistle; */
  /* color:; */
}
.el-tree .el-tree-node__content label.el-checkbox {
  display: none;
}
.el-tree .el-tree-node__children label.el-checkbox {
  display: inline-block;
  margin-left: -17px;
}
</style>