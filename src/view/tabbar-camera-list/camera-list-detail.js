//外部依赖包
import React from 'react';
import { View } from 'react-native';
import { Label } from 'teaset';
//内部依赖包
import { onlineState } from 'src/utils/const';
//静态资源和样式
import currrentViewStyles from 'view/style/tabbar-camera-list';

export default class CameraListDetail extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <View style={currrentViewStyles.statusContainer}>
        <View
          style={[
            currrentViewStyles.statusCircle,
            { backgroundColor: parseInt(data.status) === 1 ? 'green' : 'red' },
          ]}
        />
        <Label style={currrentViewStyles.statusLabel}>
          {onlineState[data.status]}
        </Label>
      </View>
    );
  }
}
