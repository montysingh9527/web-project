'use strict'
const DB_NAME = 'UG'
const VERSION = 1

const IndexDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
let db = null

export const openIndexDB = () => {
    const request = IndexDB && IndexDB.open(DB_NAME, VERSION);

    return new Promise((resolve, reject) => {
        if (db) {
            return resolve(db)
        }

        request.onsuccess = (e) => {
            db = e.target.result
            resolve(db)
        }

        request.onupgradeneeded = (e) => {
            // 更新对象存储空间和索引 ....
            db = e.target.result

            if (!db.objectStoreNames.contains('ajax_cache_table')) {

                const objectStore  = db.createObjectStore('ajax_cache_table', {keyPath: 'url'});

                objectStore.createIndex('url', 'url', {unique: true})
            }
        }

        request.onerror = function (e) {
            db = null
            reject({status: e.target.errorCode, msg: '创建数据库出错'})
        }
    })
}

export function setItem(data) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject({status: 500, msg: '数据库没有建立链接,请刷新再试'})
        }

        let request = db.transaction(['ajax_cache_table'], 'readwrite')
            .objectStore('ajax_cache_table')
            .add(data)


        request.onsuccess = (e) => {
            resolve({status: 200, msg: '数据插入成功!'})
        }

        request.onerror = (e) => {
            reject({status: 403, msg: '数据插入失败!', key: data.url})
        }
    })
}

export function getItem(key) {
    return new Promise((resolve, reject) => {
        if (!db) {
            openIndexDB();
            reject({status: 500, msg: '数据库没有建立链接,请刷新再试'})
        }

        const request = db.transaction(['ajax_cache_table'], 'readonly')
            .objectStore('ajax_cache_table')
            .get(key);

        request.onsuccess = (e) => {
            let res = e.target.result

            if (res) {
                resolve({data: res, status: 200})
            } else {
                resolve({status: 404, msg: '没有数据缓存'})
            }
        }

        request.onerror = () => {
            resolve({status: 500, msg: '读取数据失败'})
        }
    })
}

export function update(data) {
    return new Promise((resolve, reject) => {
        if (!db) {
            openIndexDB()
            reject({status: 500, msg: '数据库没有建立链接,请刷新再试'})
        }


        const request = db.transaction(['ajax_cache_table'], 'readwrite')
            .objectStore('ajax_cache_table')
            .put(data);

        request.onsuccess = (e) => {
            const result = e.target.result
            resolve(result)
        }

        request.onerror = (e) => {
            reject()
        }
    })
}

export function deleteItem(key) {
    console.log('删除数据' + key)
    return new Promise((resolve, reject) => {
        if (!db) {
            openIndexDB()
            reject({status: 500, msg: '数据库没有建立链接,请刷新再试'})
        }

        const request = db.transaction(['ajax_cache_table'], 'readwrite')
            .objectStore('ajax_cache_table')
            .delete(key);

        request.onsuccess = () => {
            console.log('删除成功')
            resolve()
        }

        request.onerror = (e) => {
            reject()
        }
    })
}

export function clearIndexDB() {
    return new Promise((resolve, reject) => {
        if (!db) {
            openIndexDB()
            reject({status: 500, msg: 'indexDB没有建立链接,请刷新再试'})
        }

        const request = db.transaction(['ajax_cache_table'], 'readwrite')
            .objectStore('ajax_cache_table')
        // 游标
        const index = request.index('url');

        index.openCursor().onsuccess = function (event) {
            const cursor = event.target.result

            if (cursor) {
                deleteItem(cursor.key)
                cursor.continue();
            } else {
                resolve()
            }
        }
    })
}

































