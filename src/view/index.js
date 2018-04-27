//外部依赖包
import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Theme } from 'teaset';
//内部依赖包
import HomeTabBar from 'view/home-tabbar';
import CameraSearch from 'view/camera-search';
import CameraDetail from 'view/camera-detail';

Theme.set({
  //从 0.5.0 版本开始全面支持 iPhoneX ，只需要设置fitIPhoneX
  fitIPhoneX: true,
  navTintColor: '#333',
  navTitleColor: '#333',
  navStatusBarStyle: 'dark-content',
});

export default class Container extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="HomeTabBar" component={HomeTabBar} hideNavBar />
          <Scene key="CameraSearch" component={CameraSearch} hideNavBar />
          <Scene key="CameraDetail" component={CameraDetail} hideNavBar />
        </Stack>
      </Router>
    );
  }
}
