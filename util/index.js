export function fangdou(wait,fn){
    let timer;
    return function (){
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, wait);
    }
}


export function jieliu(wait,fn){
    let timer;
    return function(){
        if(timer) return;
        let args = arguments;
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, wait);
    }
}


export function getArticleTime(time){
    let date  = new Date(time).getTime(),
        year   = new Date(time).getFullYear(),
        day    = new Date(time).getDate()<10 ? '0'+new Date(time).getDate() : new Date(time).getDate();
    let month = new Date(time).getMonth();
    let cMonth = ['一','二','三','四','五','六','七','八','九','十','十一','十二'].splice(month,1);
    return cMonth +'月  ' + day + ' ' + year;
}