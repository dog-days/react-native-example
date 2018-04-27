//外部依赖包
import React from 'react';
import { Image, View } from 'react-native';
import { Label } from 'teaset';
//静态资源和样式
import currrentViewStyles from 'view/style/tabbar-camera-list';

export default class CameraListTitle extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <View style={currrentViewStyles.listTitleContainer}>
        <Image
          source={{ uri: data.cover }}
          style={[currrentViewStyles.cover]}
        />
        <View style={currrentViewStyles.listMiddleLabelContainer}>
          <Label style={currrentViewStyles.labelName}>{data.name}</Label>
          <View style={{ position: 'absolute', bottom: 0 }}>
            <Label style={currrentViewStyles.labelSN}>SN：{data.sn}</Label>
            <Label style={currrentViewStyles.labelGroup}>
              分组：{data.group}
            </Label>
          </View>
        </View>
      </View>
    );
  }
}
