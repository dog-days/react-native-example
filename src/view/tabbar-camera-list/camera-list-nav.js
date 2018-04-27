//外部依赖包
import React from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableWithoutFeedback } from 'react-native';
import { NavigationBar, Button, Label } from 'teaset';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';
//内部依赖包
import Modal from 'src/components/modal';
import Search from './search';
import { onlineState } from 'src/utils/const';
import commonStyle from 'view/style/common';
import { namespace as cameraListDataNamespace } from 'src/model/data/tabbar-camera-list/cameras';
import { namespace as cameraSearchStatusNamespace } from 'src/model/state/tabbar-camera-search';
//静态资源和样式
import currrentViewStyles from 'view/style/tabbar-camera-list';

const searchEditedBgColor = '#efeef4';

@connect(state => {
  return {
    cameraListData: state[cameraListDataNamespace],
    searchState: state[cameraSearchStatusNamespace],
  };
})
export default class CameraListNav extends React.Component {
  state = {
    showStatic: false,
  };
  onStatisticsPress = () => {
    this.setState({ showStatic: true });
  };
  onFilterPress = () => {
    Actions.CameraSearch();
  };
  onOkPress = () => {
    this.setState({
      showStatic: false,
    });
  };
  renderInfoModal() {
    const {
      cameraListData: { total, onlineCount, offlineCount, onlineRate },
    } = this.props;
    return (
      <Modal
        title="当前筛选条件下的统计信息"
        isVisible={this.state.showStatic}
        footer={[
          {
            text: '确定',
            onPress: this.onOkPress,
          },
        ]}
      >
        <View style={currrentViewStyles.statisticsModalContent}>
          <Label style={currrentViewStyles.leftLabel}>摄像机总数：</Label>
          <Label style={currrentViewStyles.rightLabel}>{total}台</Label>
        </View>
        <View style={currrentViewStyles.statisticsModalContent}>
          <Label style={currrentViewStyles.leftLabel}>在线：</Label>
          <Label style={currrentViewStyles.rightLabel}>{onlineCount}台</Label>
        </View>
        <View style={currrentViewStyles.statisticsModalContent}>
          <Label style={currrentViewStyles.leftLabel}>离线：</Label>
          <Label style={currrentViewStyles.rightLabel}>{offlineCount}台</Label>
        </View>
        <View style={currrentViewStyles.statisticsModalContent}>
          <Label style={currrentViewStyles.leftLabel}>在线率：</Label>
          <Label style={currrentViewStyles.rightLabel}>
            {(onlineRate * 100).toFixed(2) + '%'}
          </Label>
        </View>
      </Modal>
    );
  }
  renderRightView() {
    const { searchState: { groups, status, order, model } } = this.props;
    let hasFilter = false;
    if ((groups && groups[0]) || status || order || model) {
      hasFilter = true;
    }
    let filterIconSource = require('assets/icon_filter_on.png');
    if (hasFilter) {
      filterIconSource = require('assets/icon_filter_off.png');
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <NavButton
          onPress={this.onStatisticsPress}
          //按钮小，需要使用，hitSlop扩大点击范围
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Image source={require('assets/icon_statistics.png')} />
        </NavButton>
        <NavButton
          onPress={this.onFilterPress}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Image source={filterIconSource} />
        </NavButton>
        {this.renderInfoModal()}
      </View>
    );
  }
  render() {
    const otherProps = {
      statusBarColor: null,
    };
    //必须在ScrollView之后渲染，要不会不显示
    return (
      <NavigationBar
        type="ios"
        title={<Search />}
        style={commonStyle.navigationBar}
        {...otherProps}
        leftView={
          <View>
            <Label style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>
              摄像机
            </Label>
          </View>
        }
        rightView={this.renderRightView()}
      />
    );
  }
}

const NavButton = styled(NavigationBar.Button)`
  padding: 10px;
`;
