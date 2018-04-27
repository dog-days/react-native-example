//外部依赖包
import React from 'react';
import StyleSheet from 'libs/style-sheet';
import { connect } from 'react-redux';
import { Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SearchInput, Button } from 'teaset';
//内部依赖包
//静态资源和样式
import currrentViewStyles from 'view/style/tabbar-camera-list';

export default class CameraListSearch extends React.Component {
  onPress = () => {
    Actions.CameraSearch();
  };
  render() {
    return (
      <View>
        <Button
          //因为searchInput无法捕获press事件，只能在上层覆盖一层处理
          onPress={this.onPress}
          style={styles.buttonCover}
        />
        <SearchInput
          editable={false}
          placeholder="搜索摄像机"
          style={currrentViewStyles.search}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonCover: {
    height: '100%',
    width: '100%',
    top: 0,
    zIndex: 1000,
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});
