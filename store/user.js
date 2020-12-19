export const state = () => ({
        admin:false
})



export const mutations =  {
    changeAdmin(state,text){
        state.admin = text
    }
}


