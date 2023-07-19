/**
 * 1. 数据的分析
 * 省
 *  省信息
 *      市集合
 *          市信息
 *              区县集合
 *                  区县信息
 *
 * 2. 响应式数据
 *  provinces ?
 *  cities
 *  counties
 *
 * 3. 视图
 *  省选择器 select  展示条件是什么show?  有没有 provinces
 *      空
 *      [ 省集合 ]
 *  市选择器 select 展示条件是什么show? 有没有 cities provinces
 *      空
 *      [ 市集合 ]
 *  区县选择器 select 展示条件是什么show? 有没有 city cities
 *      空
 *      [ 区县集合 ]
 *
 * 4. 渲染逻辑
 *  Province selector => [ 省集合 ]
 *      handleSelect => code/name => province 四川 => cities
 *          data[name].cities
 *              data[name].cities[cityName].counties[countyName].code / name
 *
 *
 * 策略性数据
 * {
 *  四川省: {
 *      name,
 *      code,
 *      cities: {
 *          成都市: {
 *              name,
 *              code,
 *              counties: {
 *                  锦江区: {
 *                      name,
 *                      code
 *                  }
 *              }
 *          }
 *      }
 *  }
 * }
 */

export default [
  {
    provinceCode: "11",
    provinceName: "北京市",
    provinceType: 1,
    cities: [
      {
        cityCode: "1101",
        cityName: "市辖区",
        cityType: 1,
        isCapital: true,
        counties: [
          { countyCode: "110101", countyName: "东城区", isCity: false },
          { countyCode: "110102", countyName: "西城区", isCity: false },
          { countyCode: "110105", countyName: "朝阳区", isCity: false },
          { countyCode: "110106", countyName: "丰台区", isCity: false },
          { countyCode: "110107", countyName: "石景山区", isCity: false },
          { countyCode: "110108", countyName: "海淀区", isCity: false },
          { countyCode: "110109", countyName: "门头沟区", isCity: false },
          { countyCode: "110111", countyName: "房山区", isCity: false },
          { countyCode: "110112", countyName: "通州区", isCity: false },
          { countyCode: "110113", countyName: "顺义区", isCity: false },
          { countyCode: "110114", countyName: "昌平区", isCity: false },
          { countyCode: "110115", countyName: "大兴区", isCity: false },
          { countyCode: "110116", countyName: "怀柔区", isCity: false },
          { countyCode: "110117", countyName: "平谷区", isCity: false },
          { countyCode: "110118", countyName: "密云区", isCity: false },
          { countyCode: "110119", countyName: "延庆区", isCity: false },
        ],
      },
    ],
  },
  {
    provinceCode: "12",
    provinceName: "天津市",
    provinceType: 1,
    cities: [
      {
        cityCode: "1201",
        cityName: "市辖区",
        cityType: 1,
        isCapital: true,
        counties: [
          { countyCode: "120101", countyName: "和平区", isCity: false },
          { countyCode: "120102", countyName: "河东区", isCity: false },
          { countyCode: "120103", countyName: "河西区", isCity: false },
          { countyCode: "120104", countyName: "南开区", isCity: false },
          { countyCode: "120105", countyName: "河北区", isCity: false },
          { countyCode: "120106", countyName: "红桥区", isCity: false },
          { countyCode: "120110", countyName: "东丽区", isCity: false },
          { countyCode: "120111", countyName: "西青区", isCity: false },
          { countyCode: "120112", countyName: "津南区", isCity: false },
          { countyCode: "120113", countyName: "北辰区", isCity: false },
          { countyCode: "120114", countyName: "武清区", isCity: false },
          { countyCode: "120115", countyName: "宝坻区", isCity: false },
          { countyCode: "120116", countyName: "滨海新区", isCity: false },
          { countyCode: "120117", countyName: "宁河区", isCity: false },
          { countyCode: "120118", countyName: "静海区", isCity: false },
          { countyCode: "120119", countyName: "蓟州区", isCity: false },
        ],
      },
    ],
  },
  {
    provinceCode: "14",
    provinceName: "山西省",
    provinceType: 2,
    cities: [
      {
        cityCode: "1401",
        cityName: "太原市",
        cityType: 3,
        isCapital: true,
        counties: [
          { countyCode: "140105", isCity: false, countyName: "小店区" },
          { countyCode: "140106", isCity: false, countyName: "迎泽区" },
          { countyCode: "140107", isCity: false, countyName: "杏花岭区" },
          { countyCode: "140108", isCity: false, countyName: "尖草坪区" },
          { countyCode: "140109", isCity: false, countyName: "万柏林区" },
          { countyCode: "140110", isCity: false, countyName: "晋源区" },
          { countyCode: "140121", isCity: false, countyName: "清徐县" },
          { countyCode: "140122", isCity: false, countyName: "阳曲县" },
          { countyCode: "140123", isCity: false, countyName: "娄烦县" },
          {
            countyCode: "140171",
            isCity: false,
            countyName: "山西转型综合改革示范区",
          },
          { countyCode: "140181", isCity: false, countyName: "古交市" },
        ],
      },
      {
        cityCode: "1402",
        cityName: "大同市",
        cityType: 3,
        isCapital: true,
        counties: [
          { countyCode: "140212", isCity: false, countyName: "新荣区" },
          { countyCode: "140213", isCity: false, countyName: "平城区" },
          { countyCode: "140214", isCity: false, countyName: "云冈区" },
          { countyCode: "140215", isCity: false, countyName: "云州区" },
          { countyCode: "140221", isCity: false, countyName: "阳高县" },
          { countyCode: "140222", isCity: false, countyName: "天镇县" },
          { countyCode: "140223", isCity: false, countyName: "广灵县" },
          { countyCode: "140224", isCity: false, countyName: "灵丘县" },
          { countyCode: "140225", isCity: false, countyName: "浑源县" },
          { countyCode: "140226", isCity: false, countyName: "左云县" },
          {
            countyCode: "140271",
            isCity: false,
            countyName: "山西大同经济开发区",
          },
        ],
      },
      {
        cityCode: "1403",
        cityName: "阳泉市",
        cityType: 3,
        isCapital: true,
        counties: [
          { countyCode: "140302", isCity: false, countyName: "城区" },
          { countyCode: "140303", isCity: false, countyName: "矿区" },
          { countyCode: "140311", isCity: false, countyName: "郊区" },
          { countyCode: "140321", isCity: false, countyName: "平定县" },
          { countyCode: "140322", isCity: false, countyName: "盂县" },
        ],
      },
      {
        cityCode: "1404",
        cityName: "长治市",
        cityType: 3,
        isCapital: true,
        counties: [
          { countyCode: "140403", isCity: false, countyName: "潞州区" },
          { countyCode: "140404", isCity: false, countyName: "上党区" },
          { countyCode: "140405", isCity: false, countyName: "屯留区" },
          { countyCode: "140406", isCity: false, countyName: "潞城区" },
          { countyCode: "140423", isCity: false, countyName: "襄垣县" },
          { countyCode: "140425", isCity: false, countyName: "平顺县" },
          { countyCode: "140426", isCity: false, countyName: "黎城县" },
          { countyCode: "140427", isCity: false, countyName: "壶关县" },
          { countyCode: "140428", isCity: false, countyName: "长子县" },
          { countyCode: "140429", isCity: false, countyName: "武乡县" },
          { countyCode: "140430", isCity: false, countyName: "沁县" },
          { countyCode: "140431", isCity: false, countyName: "沁源县" },
          {
            countyCode: "140471",
            isCity: false,
            countyName: "山西长治高新技术产业园区",
          },
        ],
      },
      {
        cityCode: "1405",
        cityName: "晋城市",
        cityType: 3,
        isCapital: true,
        counties: [
          { countyCode: "140502", isCity: false, countyName: "城区" },
          { countyCode: "140521", isCity: false, countyName: "沁水县" },
          { countyCode: "140522", isCity: false, countyName: "阳城县" },
          { countyCode: "140524", isCity: false, countyName: "陵川县" },
          { countyCode: "140525", isCity: false, countyName: "泽州县" },
          { countyCode: "140581", isCity: false, countyName: "高平市" },
        ],
      },
    ],
  },
];
