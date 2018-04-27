export default [
  //公共数据model //目前还没有公共数据
  //公共状态model
  require('src/model/state/common-ui-state').default,
  //页面数据model
  require('src/model/data/tabbar-camera-list/cameras').default,
  require('src/model/data/cameras-detail').default,
  //页面状态model
  require('src/model/state/tabbar-camera-list').default,
  require('src/model/state/tabbar-camera-search').default,
];
