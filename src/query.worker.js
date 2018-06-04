/**
 * Created by zlf on 2018/3/6.
 */
class Query {
    //遍历所有品牌
    getMKey(evt) {
        let DBName = evt.data[1];
        let storeName = evt.data[2];
        let flag = evt.data[3];
        let request = indexedDB.open(DBName);
        request.onerror =  (event)=> {
            console.log('indexedDB error!')
        };
        request.onsuccess = (event)=> {
            let db = request.result;
            let transaction = db.transaction([storeName]);
            let objectStore = transaction.objectStore(storeName);
            let openCursor = objectStore.openCursor();
            let temp = [];
            openCursor.onsuccess =  (evt)=> {
                let cursor = evt.target.result;
                if (cursor) {
                    temp.push(cursor.value);
                    cursor.continue();
                }

            };
            transaction.oncomplete = (evt)=> {
                postMessage([temp, flag])
            };

        };
    }

    //提取指定品牌
    getMapKey(evt) {
        let DBName = evt.data[1];
        let storeName = evt.data[2];
        let tempIndex = evt.data[3];
        let id = evt.data[4];
        let request = indexedDB.open(DBName);
        request.onerror = (event) => {
            console.log('indexedDB error!')
        };
        request.onsuccess = (event) => {
            let db = request.result;
            let transaction = db.transaction([storeName]);
            let objectStore = transaction.objectStore(storeName);
            let index = objectStore.index(tempIndex);
            let tempData;
            index.get(id).onsuccess = (event) => {
                tempData = event.target.result;
            };

            transaction.oncomplete = (evt) => {
                postMessage([tempData]);
            };
        };
    }

    getOKey(evt) {
        let DBName = evt.data[1];
        let storeName = evt.data[2];
        let flag = evt.data[3];
        let id = evt.data[4];
        let tempIndex = evt.data[5];
        let isSingle = evt.data[6];
        let request = indexedDB.open(DBName);
        request.onerror = (event) => {
            console.log('indexedDB error!')
        };
        request.onsuccess = (event) => {
            let db = request.result;
            let transaction = db.transaction([storeName]);
            let objectStore = transaction.objectStore(storeName);
            let index = objectStore.index(tempIndex);
            let singleKeyRange = IDBKeyRange.only(id);
            let temp=[];

            let cursor = index.openCursor(singleKeyRange, IDBCursor.NEXT);
            cursor.onsuccess = (evt) => {
                let cursor = evt.target.result;
                if (cursor) {
                    temp.push(cursor.value);
                    !isSingle && cursor.continue();
                }
            };
            cursor.onerror = (evt) => {
                console.log(evt);
            };

            transaction.oncomplete = (evt) => {
                postMessage(temp);
                console.log(temp, flag)
            };

        };
    }
}
let query = new Query();

onmessage = function (evt) {
    query[evt.data[0]](evt)
};
