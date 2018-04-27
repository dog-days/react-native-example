//外部依赖包
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl, View } from 'react-native';
import { Theme, ListRow } from 'teaset';
import { Actions } from 'react-native-router-flux';
//内部依赖包
import FlatList from 'src/components/flat-list';
import CameraListTitle from './camera-list-title';
import CameraListDetail from './camera-list-detail';
import Nav from './camera-list-nav';
import commonStyle from 'view/style/common';
import { primaryColor } from 'view/style/const';
import { namespace as cameraListStateNamespace } from 'src/model/state/tabbar-camera-list';
import { namespace as cameraListDataNamespace } from 'src/model/data/tabbar-camera-list/cameras';
//静态资源和样式
import currrentViewStyles from 'view/style/tabbar-camera-list';

@connect(state => {
  return {
    // searchEdited: state[cameraListStateNamespace].searchEdited,
    cameraListData: state[cameraListDataNamespace],
  };
})
export default class CameraList extends React.Component {
  displayName = 'CameraList';
  dispatch = this.props.dispatch;
  componentDidMount() {
    this.getData({
      loading: true,
    });
  }
  getData(params = {}, sccessCallback, failureCallback) {
    this.dispatch({
      type: `${cameraListDataNamespace}/dataSaga`,
      payload: params,
      successCallback: () => {
        sccessCallback && sccessCallback();
      },
      failureCallback: () => {
        failureCallback && failureCallback();
      },
    });
  }
  onLoadMore = (page, closeLoadMore) => {
    this.getData(
      {
        page,
        loadMoreData: true,
      },
      () => {
        closeLoadMore();
      },
      () => {
        closeLoadMore();
      }
    );
  };
  onRefresh = closeRefreshControl => {
    this.getData(
      {},
      () => {
        closeRefreshControl();
      },
      () => {
        closeRefreshControl();
      }
    );
  };
  onListRowPress = data => {
    return () => {
      Actions.CameraDetail({ cid: data.cid });
    };
  };
  render() {
    const { cameraListData: { data, loading } } = this.props;
    return (
      <View style={commonStyle.view}>
        <FlatList
          style={{
            flex: 1,
            marginTop: Theme.statusBarHeight + Theme.navBarContentHeight + 10,
          }}
          loading={loading}
          data={data || []}
          onLoadMore={this.onLoadMore}
          onRefresh={this.onRefresh}
          renderItem={({ item, index }) => {
            return (
              <ListRow
                onPress={this.onListRowPress(item)}
                title={<CameraListTitle data={item} />}
                detail={<CameraListDetail data={item} />}
                accessory="indicator"
                bottomSeparator="none"
                style={{ marginBottom: 10 }}
              />
            );
          }}
        />
        <Nav />
      </View>
    );
  }
}
