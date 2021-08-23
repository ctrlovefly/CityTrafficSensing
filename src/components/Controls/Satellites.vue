<template>
  <div class="frm-table" v-show="$store.state.isShowSatellites">
    <div class="frmheadbox">
      <span class="frmheadtext"> 卫星列表 </span>
      <div class="close-btn" @click="close">
        <img src="../../assets/关闭.png" alt="" />
      </div>
    </div>
    <div class="inner-box2">
      <el-row id="row-search" justify="start" align="middle">
        <el-col :span="2" :push="1"><span> 卫星搜索</span> </el-col>
        <el-col :span="10" :push="1"
          ><el-input
            id="sat-box"
            placeholder="请搜索卫星NORAD号"
            v-model="input"
            :disabled="false"
          >
            <template #append>
              <el-button
                icon="el-icon-search"
                @click="searchSats()"
              ></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4" :push="2">
          <n-button color="#4285f4" @click="choosed"> 添加 </n-button>
        </el-col>
      </el-row>
      <el-row id="table-body" justify="center" align="middle">
        <el-col :span="23">
          <el-table
            ref="singleTable"
            :data="
              resultData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            highlight-current-row
            @current-change="handleCurrentChange2"
            style="width: 100%"
            height="350"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column property="no" label="NARAD码" width="120">
            </el-table-column>
            <el-table-column property="name" label="卫星名" width="120">
            </el-table-column>
            <el-table-column property="sensor" label="传感器名" width="120">
            </el-table-column>
            <el-table-column
              property="sensorswath"
              label="传感器幅宽"
              width="120"
            >
            </el-table-column>
            <el-table-column property="topic" label="主题"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row id="pages" justify="start" align="middle">
        <el-col :span="15" :push="1">
          <el-pagination
            background
            small
            layout="prev, pager, next"
            :total="tableData.length"
            :page-size="pageSize"
            pager-count="5"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as Viewutils from "../../utils/viewerutils.js";
export default {
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    choosed() {
      Viewutils.staticParams.choosedSats = this.currentRow.no;
      // Viewutils.staticParams.choosedSatName = this.currentRow.name;
      console.log(this.currentRow.no);
      // console.log(Viewutils.staticParams.choosedSatName);
      this.$store.dispatch("setselectedSatellitesAsync", this.currentRow.name);
      console.log(this.$store.state.selectedSatellites);
      this.$store.dispatch("setisShowSatellitesAsync");
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange2(val) {
      this.currentRow = val;
    },
    searchSats() {
      this.resultData = this.tableData.filter((data) => {
        console.log(this.input);
        if (data.no == this.input) {
          //此处根据具体需求判断
          return true;
        } else if (this.input == "" || this.input == undefined) {
          return true;
        }
      });
    },
    close() {
      this.$store.dispatch("setisShowSatellitesAsync");
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 7,
      input: undefined,
      resultData: [
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35034,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35034,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
      ],
      tableData: [
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35034,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35034,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
        {
          no: 35035,
          name: "GAOFEN-1",
          sensor: "HST",
          sensorswath: "52km",
          topic: "环境",
        },
      ],
      currentRow: null,
    };
  },
  // created() {
  //   this.tableData = window.MOCK_DATA_LIST.slice(0, 6);
  // },
};
</script>
<style>
.frm-table {
  position: absolute;
  background-color: hsl(240, 5%, 17%, 0.6);
  left: 50%;
  top: 50%;
  width: 800px;
  height: 500px;
  margin-left: -400px;
  margin-top: -250px;
  border-radius: 2px;
}
#row-search {
  top: 15px;
  color: white;
}
.inner-box2 {
  height: 465px;
  background-color: transparent;
  /* border: 3px solid red; */
}
#table-body {
  top: 30px;
  color: white;
  /* border: 3px solid tomato; */
}
#pages {
  top: 42px;
  color: white;
  /* background-color: white; */
}
.el-table thead th {
  height: 30px;
  font-size: 14px;
  padding: 0px 10px 0px 10px;
  color: #47494e;
  font-weight: 500;
  background: #f8f8f8 !important;
}
.el-table__body td,
.el-table__body th {
  height: 30px;
  padding: 0px 10px 0px 10px;
  color: #757575;
  font-size: 14px;
}
.el-table__body tr:hover > td {
  background: #eaf2fe;
}
.el-table--group,
.el-table--border {
  border-top: 1px solid #d5dbeb;
  border-left: 1px solid #d5dbeb;
}
.el-table th.is-leaf,
.el-table td {
  border-bottom: 1px solid #d5dbeb;
  border-right: 1px solid #d5dbeb;
}
.el-table tr td {
  border-bottom: 1px solid #d5dbeb;
  border-right: 1px solid #d5dbeb;
}
.el-table--group::after,
.el-table--border::after,
.el-table::before {
  content: "";
  position: absolute;
  background-color: #d5dbeb;
  z-index: 1;
}

/* .el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: hsl(240, 5%, 17%, 0.3);
  background-color: hsl(240, 5%, 17%, 0.3);
  color: white;
}
/*修改element-ui的table 在鼠标悬停hover时的高亮颜色*/
/* .el-table tbody tr:hover > td {
  background-color: hsl(240, 5%, 17%, 0.3) !important;
}  */
</style>