import Phones from 'phones';
import * as $ from 'jquery'

let doc=document;
let phones = new Phones();
export class Main{
    constructor(opt){
        this.defaults={
            mQuery:'[data-query="mkey"]',
            moQuery:'[data-query="mokey"]',
            mnoQuery:'[data-query="mnokey"]',
            result:'[data-query="result"]'
        };
        this.options=Object.assign({},this.defaults,opt)
    }
    init(){

        phones.init();
        this.bindEvent();

    }
    bindEvent(){
        let options =this.options;
        $(doc).on('click',options.mQuery,()=>{
            let promise=phones.getMOKey("1",'mKey');
            promise.then((data)=>{
                $(options.result).text(JSON.stringify(data))

            }).catch((e)=>{
                console.log(e)
            })
        });
        $(doc).on('click',options.moQuery,()=>{
            let promise=phones.getMOKey(["1","111"],'moKey');
            promise.then((data)=>{
                $(options.result).text(JSON.stringify(data))

            }).catch((e)=>{
                console.log(e)
            })
        });
        $(doc).on('click',options.mnoQuery,()=>{
            let promise=phones.getMOKey(["1","13","131"],'mnoKey');
            promise.then((data)=>{
                $(options.result).text(JSON.stringify(data))

            }).catch((e)=>{
                console.log(e)
            })
        });
    }
}