export default defineAppConfig({
  pages: [
    'pages/index/index',  //展示记忆
    'pages/todo/index',   //展示todo  
    'pages/profile/index',//我的
    // 'pages/add/index',//新增 计划/回忆 
    // 'pages/edit/index',//修改 计划/回忆 
    // 'pages/feedback/index',
    // 'pages/achievements/index',
    // 'pages/tags/index',
    // 'pages/agreeMent/index',
    'pages/export/index',
    'pages/graph/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [{
      pagePath: 'pages/index/index',
      text: '记忆',
      iconPath: "assets/know.png", // 激活前的图片
      selectedIconPath: "assets/know_sel.png", // 激活后的图片
    }, {
      pagePath: 'pages/todo/index',
      text: '计划',
      iconPath: "assets/design.png", // 激活前的图片
      selectedIconPath: "assets/design_sel.png", // 激活后的图片
    },
    {
      pagePath: 'pages/graph/index',
      text: '图谱',
      iconPath: "assets/map.png", // 激活前的图片
      selectedIconPath: "assets/map_sel.png", // 激活后的图片
    }, {
      pagePath: 'pages/profile/index',
      text: '我的',
      iconPath: "assets/profile.png", // 激活前的图片
      selectedIconPath: "assets/profile_sel.png", // 激活后的图片
    }
    ],
    'color': '#000',
    'selectedColor': '#037AFF',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
  subpackages: [
    {
      'root': "module1",
      'pages': [
        'pages/add/index',
        'pages/edit/index'
      ]
    },
    {
      'root': "module2",
      'pages': [
        'pages/achievements/index',
        'pages/feedback/index',
        'pages/agreeMent/index',
        'pages/tags/index',
        // 'pages/profile/index',
      ]
    },
 
  ]
})
