//外部依赖包
import React from 'react';
import { connect } from 'react-redux';
import { Image, Text } from 'react-native';
import { TabView } from 'teaset';
//内部依赖包
import TabbarCameraList from 'view/tabbar-camera-list';
import TabbarMine from 'view/tabbar-mine';
import { backLikeTextColor, grayTextColor } from 'view/style/const';
import { namespace as commonUiStateNamespace } from 'src/model/state/common-ui-state';
//静态资源
import tabIcon_mine from 'assets/tabIcon_mine.png';
import tabIcon_mine_selected from 'assets/tabIcon_mine_select.png';
import tabIcon_cam from 'assets/tabIcon_cam.png';
import tabIcon_cam_selected from 'assets/tabIcon_cam_select.png';
import tabIcon_add from 'assets/add.png';

@connect(state => {
  return {
    selectedTab: state[commonUiStateNamespace].selectedTab,
  };
})
export default class HomeTabBar extends React.Component {
  displayName = 'HomeTabBar';
  dispatch = this.props.dispatch;
  switchTabEvent = key => {
    return () => {
      this.dispatch({
        type: `${commonUiStateNamespace}/selectedTab`,
        payload: key,
      });
    };
  };
  getTabTextStyle(tabName) {
    const { selectedTab } = this.props;
    const selectedTextStyle = {
      color: backLikeTextColor,
    };
    const unselectedTextStyle = {
      color: grayTextColor,
    };
    return selectedTab === tabName ? selectedTextStyle : unselectedTextStyle;
  }
  render() {
    return (
      <TabView
        style={{ flex: 1 }}
        type="projector"
        barStyle={{
          backgroundColor: '#fff',
          borderTopWidth: 0,
          shadowColor: '#ccc',
          shadowOpacity: 0.4,
        }}
      >
        <TabView.Sheet
          title={<Text style={this.getTabTextStyle('camera')}>摄像机</Text>}
          icon={<Image source={tabIcon_cam} />}
          activeIcon={<Image source={tabIcon_cam_selected} />}
          onPress={this.switchTabEvent('camera')}
        >
          <TabbarCameraList />
        </TabView.Sheet>
        <TabView.Sheet
          type="button"
          icon={<Image source={tabIcon_add} style={{ marginBottom: 8 }} />}
          active={true}
          onPress={() => {
            alert('暂无功能');
          }}
        />
        <TabView.Sheet
          title={<Text style={this.getTabTextStyle('me')}>我的</Text>}
          icon={<Image source={tabIcon_mine} />}
          activeIcon={<Image source={tabIcon_mine_selected} />}
          onPress={this.switchTabEvent('me')}
        >
          <TabbarMine />
        </TabView.Sheet>
      </TabView>
    );
  }
}
