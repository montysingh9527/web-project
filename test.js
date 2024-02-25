/*
 * @Description:
 * @Date: 2023-09-29 18:14:01
 * @FilePath: \web-project\test.js
 */

let objdata = {
  day: {
    img1: "1xx.img",
    url1type: "11111",
    img1url: "http://www.baidu4444.com",
    img2: "",
    url2type: "",
    img2url: "",
    img3: "33333x.img",
    url3type: "33333",
    img3url: "http://www.baidu5555.com",
  },
  dayconf: {
    img1: "",
    url1type: "",
    img1url: "",
    img2: "",
    url2type: "",
    img2url: "",
    img3: "898989.img",
    url3type: "33333",
    img3url: "http://www.baidu222.com",
  },
  top: 1,
};

function comput_data(rowData) {
    let objs = {};
    let nums = 1;
    for(let i = 1; i< 30; i++){
        if(rowData.dayconf[`img${i}`] || rowData.dayconf[`url${i}type`] || rowData.dayconf[`img${i}url`]){
            objs[`img${nums}`] = rowData.dayconf[`img${i}`]
            objs[`url${nums}type`] = rowData.dayconf[`url${i}type`]
            objs[`img${nums}url`] = rowData.dayconf[`img${i}url`]
            nums++;
        }
    }
    for(let i = 1; i< 30; i++){
        if(rowData.day[`img${i}`] || rowData.day[`url${i}type`] || rowData.day[`img${i}url`]){
            objs[`img${nums}`] = rowData.day[`img${i}`]
            objs[`url${nums}type`] = rowData.day[`url${i}type`]
            objs[`img${nums}url`] = rowData.day[`img${i}url`]
            nums++;
        }
    }
    console.log('---logs-objs--',objs);
    
}

comput_data(objdata)