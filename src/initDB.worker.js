/**
 * Created by zlf on 2018/3/2.
 */
class DB {
    constructor() {

    }

    init() {

        onmessage = (evt) => {
            if (evt.data) {
                this.insertData(...evt.data, evt.data.version);
            }
        };


    }


    insertData(array, tempData, version) {
        let request = indexedDB.open("demoDatabase", version);
        request.onerror = function (event) {
            console.log('indexedDB error!')
        };
        request.onsuccess = function (event) {
            postMessage('DBReady');
            request.result.close();
            close();
        };
        request.onupgradeneeded = function (event) {
            let db = event.target.result;
            let objectStore;
            let mapStore;
            if (event.oldVersion < 1) {
                objectStore = db.createObjectStore("phones", {keyPath: "index", autoIncrement: true});
                objectStore.createIndex("mKey", "mKey", {unique: false});
                objectStore.createIndex("mnoKey", ['mKey', 'nKey', 'oKey'], {unique: false});
                objectStore.createIndex("moKey", ['mKey', 'oKey'], {unique: false});
                mapStore = db.createObjectStore('phoneMap', {keyPath: 'index', autoIncrement: true});
                mapStore.createIndex("key", "key", {unique: true});
                for (let v of tempData) {
                    mapStore.put(v)
                }
                for (let v of array) {
                    v.qKey && objectStore.put(v);
                }
            } else {
                let transaction = request.transaction;
                mapStore = transaction.objectStore('phoneMap');
                objectStore = transaction.objectStore('phones');
                transaction.oncomplete = () => {
                    console.log('update complete !')
                };
                let clearMap = mapStore.clear();
                clearMap.onsuccess = () => {
                    for (let v of tempData) {
                        mapStore.put(v)
                    }
                    console.log('map ok')
                };
                let clearCars = objectStore.clear();
                clearCars.onsuccess = () => {
                    for (let v of array) {
                        v.qKey && objectStore.put(v);
                    }
                    console.log('cars ok')
                };
            }
        }
    }
}

new DB().init();