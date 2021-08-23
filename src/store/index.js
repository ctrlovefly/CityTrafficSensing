import {createStore} from 'vuex'

const store=createStore({
    state:{
        msg:'！',
        isShowContents:false,
        isShowSatellites:false,
        isShowLayers:false,
        selectedSatellites:undefined,
        treeData:[
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
          ],
        defaultChecked:[3,4],

    },
    mutations:{
        setisShowContents(state){
            if( state.isShowContents==false){
                state.isShowContents=true;
            }
            else
            {
                state.isShowContents=false;
            }
        },
        setisShowSatellites(state){
            if( state.isShowSatellites==false){
                state.isShowSatellites=true;
            }
            else
            {
                state.isShowSatellites=false;
            }
        },
        setselectedSatellites(state,payload){
            state.selectedSatellites=payload;
         
        },
        setisShowLayers(state){
            if( state.isShowLayers==false){
                state.isShowLayers=true;
            }
            else
            {
                state.isShowLayers=false;
            }
        },
        treeData3D(state,payload){
            state.treeData[1].children.push(payload);
            console.log(state.treeData);       
        },
        setdefaultChecked(state,payload){
            state.defaultChecked.push(payload);
            console.log(state.defaultChecked);       
        },
    },//可以操作state属性的方法
    actions:{
        //
        setisShowContentsAsync({commit}){
            commit('setisShowContents');
        },
        setisShowSatellitesAsync({commit}){
            commit('setisShowSatellites');
        },
        setselectedSatellitesAsync({commit},payload){
            commit('setselectedSatellites',payload);
        },
        setisShowLayersAsync({commit}){
            commit('setisShowLayers');
        },
        treeData3DAsync({commit},payload){
            // console.log("进来啊");
            commit('treeData3D',payload);
           
        },
        setdefaultCheckedAsync({commit},payload){
            console.log("进来啊");
            commit('setdefaultChecked',payload);
           
        },
    }

})

export default store