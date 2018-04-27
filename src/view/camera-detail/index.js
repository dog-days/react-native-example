//外部依赖包
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Theme, NavigationBar, ListRow, Label, Button } from 'teaset';
import { Actions } from 'react-native-router-flux';
//内部依赖包
import viewClear from 'libs/decorator/view-clear';
import { namespace as cameraDetailDataNamespace } from 'src/model/data/cameras-detail';

import commonStyle from 'view/style/common';

@connect(state => {
  return {
    detailData: state[cameraDetailDataNamespace],
  };
})
@viewClear([cameraDetailDataNamespace])
export default class CameraDetail extends React.Component {
  displayName = 'CameraDetail';
  dispatch = this.props.dispatch;
  componentDidMount() {
    const { cid } = this.props;
    this.dispatch({
      type: `${cameraDetailDataNamespace}/dataSaga`,
      payload: {
        loading: true,
        cid,
      },
    });
  }
  onGobackPress = e => {
    Actions.pop();
  };
  render() {
    const { detailData: { data, loading } } = this.props;
    return (
      //所有的页面的第一个view，最好设置为flex: 1;
      //要不然安卓的滚动有问题。
      <View style={{ flex: 1 }}>
        <NavigationBar
          type="ios"
          title="摄像机详情"
          style={commonStyle.navigationBar}
          leftView={
            <NavigationBar.BackButton
              title="返回"
              onPress={this.onGobackPress}
            />
          }
        />
        <Container>
          <ScrollView>
            <FeatureView>
              <ImageView first>
                <TouchableOpacity activeOpacity={0.5}>
                  <Image source={require('assets/icon_camDeatils_live.png')} />
                </TouchableOpacity>
                <ImageLabel>直播</ImageLabel>
              </ImageView>
              <ImageView>
                <TouchableOpacity activeOpacity={0.5}>
                  <Image
                    source={require('assets/icon_camDeatils_playback.png')}
                  />
                </TouchableOpacity>
                <ImageLabel>录像</ImageLabel>
              </ImageView>
              <ImageView>
                <TouchableOpacity activeOpacity={0.5}>
                  <Image source={require('assets/icon_camDeatils_pic.png')} />
                </TouchableOpacity>
                <ImageLabel>图片</ImageLabel>
              </ImageView>
            </FeatureView>
            {loading && (
              <ActivityIndicator
                style={{ marginTop: 10 }}
                size="large"
                color="#333"
              />
            )}
            {data && (
              <View>
                <FirstListRow
                  title="摄像机名"
                  detail={data.name}
                  accessory="indicator"
                  topSeparator="full"
                  bottomSeparator="indent"
                />
                <ListRow
                  title="分组信息"
                  detail={data.group.name}
                  accessory="indicator"
                  bottomSeparator="indent"
                />
                <ListRow
                  title="位置"
                  detail={data.addr}
                  accessory="indicator"
                  bottomSeparator="indent"
                />
                <ListRow
                  title="场所类型"
                  detail={data.type}
                  accessory="indicator"
                  bottomSeparator="indent"
                />
                <ListRow
                  title="联系电话"
                  detail={data.contact}
                  accessory="indicator"
                  bottomSeparator="full"
                />
                <ListRow
                  style={{ marginTop: 15 }}
                  title="图片抓拍"
                  detail={data.alarm + '' === '1' ? '已开启' : '关闭'}
                  accessory="indicator"
                  topSeparator="full"
                  bottomSeparator="full"
                />
                <ListRow
                  style={{ marginTop: 15 }}
                  title="功能配置信息"
                  accessory="indicator"
                  topSeparator="full"
                  bottomSeparator="indent"
                />
                <ListRow
                  title="摄像机信息"
                  accessory="indicator"
                  bottomSeparator="full"
                />
                <ListRow
                  style={{ marginTop: 15 }}
                  title={<ResetDeviceTitle>重启设备</ResetDeviceTitle>}
                  bottomSeparator="full"
                />
                <DeleteDeviceButton
                  activeOpacity={0.8}
                  size="xl"
                  title={
                    <Label style={{ fontSize: 18, color: '#fff' }}>
                      删除此设备
                    </Label>
                  }
                  type="danger"
                />
              </View>
            )}
          </ScrollView>
        </Container>
      </View>
    );
  }
}

const commomMarginTop = 15;
const Container = styled(View)`
  height: 100%;
  padding-top: ${Theme.statusBarHeight + Theme.navBarContentHeight};
  padding-bottom: 15px;
`;
const FeatureView = styled(View)`
  margin-top: ${commomMarginTop}px;
  flex-direction: row;
  padding: 15px 0;
  width: 100%;
  background-color: #fff;
`;
const ImageView = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-left-width: ${props => {
    if (props.frist) {
      return 0;
    } else {
      return '1px';
    }
  }};
  border-left-color: #ddd;
`;
const ImageLabel = styled(Label)`
  margin-top: 5px;
`;
const FirstListRow = styled(ListRow)`
  margin-top: ${commomMarginTop}px;
`;
const ResetDeviceTitle = styled(Label)`
  color: red;
`;
const DeleteDeviceButton = styled(Button)`
  margin: 15px 10px 0 10px;
  padding: 10px 0;
`;
