/**
 * Created by zlf on 2018/3/1.
 * 品牌车系数据转换
 */
let win = window;
let doc = document;
import * as $ from 'jquery';

export default class Phones {
    constructor(opt) {
        this.default = {
            server: '/getData',

        };
        this.options = Object.assign({}, this.default, opt)
    }

    init() {
        let _this = this;
        !this.__proto__.isDBReady && (this.__proto__.isDBReady = true) && $.post(this.options.server, function (response) {
            //todo 验证本地库版本号是否一致进行更新或初始化
            let dbWorker = new Worker('/src/initDB.worker.js');//todo 应该根据条件进行加载
            response.version="1";
            dbWorker.postMessage([response,[]]);
            dbWorker.onerror = function (e) {
                console.log(e);
            };
            dbWorker.onmessage = function (evt) {
                if (evt.data === 'clear') {

                }
                if (evt.data === 'DBReady') {
                    console.log('DB ready!');
                    _this.worker = new Worker('/src/query.worker.js');
                    _this.bindEvent();
                    $(doc).trigger('DBReady');
                }
            };
        });
        return this;
    }

    bindEvent() {

    }

    getMapKey(id) {
        let worker = this.worker;
        return new Promise((resolve, reject) => {
            worker.postMessage(['getMapKey', 'demoDatabase', 'phoneMap', 'key', id]);
            worker.onerror = (evt) => {
                reject(evt);
            };
            let workerCallBack = (evt) => {
                resolve(evt.data[0]);
                worker.removeEventListener('message', workerCallBack);
            };
            worker.addEventListener('message', workerCallBack, false);

        });
    }


    //获取品牌
    getBrand() {
        let worker = this.worker;
        return new Promise((resolve, reject) => {
            worker.postMessage(['getMKey', 'demoDatabase', 'phoneMap', 'phonesInit']);
            worker.onerror = (evt) => {
                reject(evt);
            };
            let workerCallBack = (evt) => {
                resolve(evt.data[0]);
                worker.removeEventListener('message', workerCallBack);
            };
            worker.addEventListener('message', workerCallBack, false);

        });

    }

    //获取品牌
    getMKey(id, index) {
        let worker = this.worker;
        return new Promise((resolve, reject) => {
            worker.postMessage(['getMapKey', 'demoDatabase', 'phones', index, id]);
            worker.onerror = (evt) => {
                reject(evt);
            };
            let workerCallBack = (evt) => {
                resolve(evt.data[0]);
                worker.removeEventListener('message', workerCallBack);
            };
            worker.addEventListener('message', workerCallBack, false);

        });

    }


    //通过M O Key查询
    getMOKey(ids, index, isSingle) {
        let worker = this.worker;
        return new Promise((resolve, reject) => {
            worker.postMessage(['getOKey', 'demoDatabase', 'phones', 'moKey|mnoKey', ids, index, isSingle]);
            worker.onerror = (evt) => {
                reject(evt);
            };
            let workerCallBack = (evt) => {
                if (evt.data) {
                    resolve(evt.data);
                }
                worker.removeEventListener('message', workerCallBack);
            };
            worker.addEventListener('message', workerCallBack, false);

        });

    }


}