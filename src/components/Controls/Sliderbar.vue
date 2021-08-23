<template>
  <sidebar-menu
    :menu="menu"
    :relative="relative"
    :theme="theme"
    :width="width"
    :widthCollapsed="widthCollapsed"
    :showOneChild="showOneChild"
    @item-click="onItemClick"
  />
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          header: "Main Navigation",
          hidden: true,
        },
        {
          href: "/",
          title: "Scenario",
          icon: "../../assets/场景分组.png",
          child: [
            {
              href: "/",
              title: "场景内容",
            },
            {
              href: "/",
              title: "添加对象",
              child: [
                {
                  href: "/",
                  title: "传感器对象",
                },
              ],
            },
          ],
        },
        {
          href: "/",
          title: "Charts",
          icon: "fa fa-chart-area",
          child: [
            {
              href: "/",
              title: "Sub Link",
            },
          ],
        },
      ],
    };
  },
  props: {
    relative: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "200px",
    },
    widthCollapsed: {
      type: String,
      default: "40px",
    },
    showOneChild: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onItemClick(event, item) {
      if (item.title == "传感器对象") {
        this.$store.dispatch("setisShowContentsAsync");
        console.log(this.$store.state.isShowSatellites);
      } else if (item.title == "场景内容") {
        this.$store.dispatch("setisShowLayersAsync");
        console.log(this.$store.state.isShowLayers);
      }
    },
    // test:function(){
    //   console.log(this.$store.state.isShowContents);
    // }
  },
};
</script>

<style>
</style>
