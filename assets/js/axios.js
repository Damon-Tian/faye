import axios from 'axios'
import {Message} from 'element-ui'
export var url = 'http://tj.awatermelon.cn/l';
// var url = '/api/l';
axios.interceptors.request.use(config=>{
    return config;
},
error => {        
    return Promise.error(error); 
})



axios.interceptors.response.use(
    res=>{
        if(res.data.status_code == 100){
            return res
        }else{
            Message({message:res.data.error_msg,type:'error'})
            return Promise.reject(res.data.error_msg);
        }
    },
    err=>{
        Message({message:res.data.error_msg,type:'error'})
        return new Promise(()=>{})   
    }
)

function post(urls,formdatas){
    let formdata = getFormData(formdatas);
    return axios.post(url+urls,formdata);
}
function get(urls){
    return axios.get(url+urls);
}
function getFormData(obj){
    let formdata = new FormData();
    let keys = [];
    for(let i in obj){
        keys.push(i);
    }
    for(let j = 0;j<keys.length;j++){
        formdata.append(keys[j],obj[keys[j]]);
    }
    return formdata;
}
function success(content){
    Message({message:content,type:'success'})
}
function error(content){
    Message({message:content,type:'error'})
}
function warning(content){
    Message({message:content,type:'warning'})
}

export {axios,post,getFormData,success,error,warning,get};