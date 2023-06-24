const daydata = {
  data: {
    animalsYear: "鼠",
    avoid: "出行.祈福.栽种",
    date: "2023-4-23",
    lunar: "四月二十三",
    lunarYear: "庚子年",
    suit: "安床 祈福 求嗣 冠笄 伐木 架马 开池 作厕 结 除服 成服",
    weekday: "星期一",
    "year-month": "2023-4",
  },
};

const monthdata = {
  data: {
    holiday: "[{'desec':'6月25至6月27日放假3天'}]",
    holiday_array: [
      {
        desc: "6月25至6月27日放假3天, 6月28日上班",
        festival: "2023-6-25",
        list: [{ date: "2023-6-25", status: "1" }],
        "list#num#": 4,
        list_num: 4,
        name: "端午节",
        rest: "2023年6月22日至2023年月24日请假3天",
      },
    ],
    year: "2023",
    "year-month": "2023-7",
  },
};

const yeardata = {
  data: {
    holiday_list: [
      { name: "元旦", startday: "2023-1-1" },
      { name: "除夕", startday: "2023-2-4" },
      { name: "春节", startday: "2023-2-5" },
      { name: "清明节", startday: "2023-4-5" },
      { name: "劳动节", startday: "2023-5-1" },
      { name: "端午节", startday: "2023-6-7" },
      { name: "中秋节", startday: "2023-9-13" },
      { name: "国庆节", startday: "2023-10-1" },
    ],
    holidaylist:
      '[{"name":"元旦","startday":"2023-1-1"},{"name":"除夕","startday":"2023-2-4"},{"name":"春节","startday":"2023-2-5"},{"name":"清明节","startday":"2023-4-5"},{"name":"劳动节","startday":"2023-5-1"},{"name":"端午节","startday":"2023-6-7"},{"name":"中秋节","startday":"2023-9-13"},{"name":"国庆节","startday":"2023-10-1"}]',
    year: 2023,
  },
};

module.exports = {
  daydata,
  monthdata,
  yeardata,
};
