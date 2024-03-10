// module.exports = {
//   presets: [
//     [
//       '@vue/app',
//       {
//         useBuiltIns: 'entry'
//       }
//     ]
//   ]
// }

module.exports = {
  "presets": [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  "plugins": [
    ["component", {"libraryName": "element-ui", "styleLibraryName": "theme-chalk"}],
    // ["import", {"libraryName": "vant", "styleLibraryName": "es", "style": true}],
  ]
}


