import {videos,imgs} from './pics'
const imgLoader = url => {
    return new Promise((resolve,reject)=>{
        let image = new Image();
        image.onload = function(){
            resolve(url)
        }
        image.onerror = function(e){
            console.log(e);
            reject(url)
        }
        image.src = url;
    }) 
}

const videoLoader = url => {
    return new Promise((resolve,reject)=>{
        let video ;
        if(url.split('.')[url.split('.').length-1] == 'mp4'){
            video = document.createElement('video');
        }else{
            video = document.createElement('audio');
        }
        video.autoplay = false;
        video.onloadeddata = function(e){
            console.log(e);
        }
        video.oncanplay = (e) =>{
            resolve(url);
        }
        video.onerror = function(e){
            console.log(e);
            reject(url)
        }
        video.src = url;
        video.autoplay=1;
    })
}

const imgsLoader = imgs => {
    let promiseArr = [];
    imgs.forEach(element => {
        promiseArr.push(imgLoader(element))
    });
    return Promise.all(promiseArr.map(p=>p.catch(e=>e)))
}

const videosLoader = videos => {
    let promiseArr = [];
    videos.forEach(element => {
        promiseArr.push(videoLoader(element))
    })
    return Promise.all(promiseArr.map(
        p=>
        p.catch(e=>e))
        )
}

function videoLoaderPlay(){
    return videosLoader(videos);
}
 function imgLoaderPlay(){
    return imgsLoader(imgs)
}

export {
    videoLoaderPlay,
    imgLoaderPlay,
}