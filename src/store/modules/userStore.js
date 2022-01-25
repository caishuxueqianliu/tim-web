import {getListEuipment} from '../../api/user'

const UserStore = {
    state: {
        storeList: []
    },
    mutations: {
        SET_STORELIST(state, storeList) {
           let list =  storeList.map(item=>{
                return  item.userStore.name
            })
            state.storeList = list
            console.log(storeList)
        }
    },
    actions:{
        getStoreInfo(context,{userID,token}) {
            getListEuipment(userID,token).then(res=>{
               context.commit('SET_STORELIST',res)
            })
        }
    }
}

export default UserStore