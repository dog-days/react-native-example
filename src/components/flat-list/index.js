import React from 'react';
import {
  Platform,
  RefreshControl,
  ActivityIndicator,
  Text,
  View,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';

export default class NFlatList extends React.Component {
  static propTypes = {
    //离底部距离触发loadMore设置，默认值50
    loadMoreBottomGap: PropTypes.number,
    loadMoreView: PropTypes.element,
    loadMoreContainerStyle: PropTypes.object,
    loadingView: PropTypes.element,
    onLoadMore: PropTypes.func,
    onRefresh: PropTypes.func,
  };
  state = { loadMoreCount: 0, refreshing: false };
  shouldLoadMoreData = false;
  onScroll = e => {
    let { loadMoreCount } = this.state;
    const { loadMoreBottomGap = 20 } = this.props;
    const target = e.nativeEvent;
    //向上滚动被隐藏的高度
    const scrollHeight = target.contentOffset.y;
    //scroll容器高度，固定的高度
    const containerHeight = e.nativeEvent.layoutMeasurement.height;
    //内容高度，高度会根据内容变化
    const contentHeight = e.nativeEvent.contentSize.height;
    // console.log(
    //   contentHeight - scrollHeight,
    //   containerHeight + loadMoreBottomGap
    // );
    //容器底部100距离触发，加载更多状态
    if (contentHeight - scrollHeight <= containerHeight + loadMoreBottomGap) {
      this.loadMoreEvent();
    }
  };
  loadMoreEvent = () => {
    let { loadMoreCount } = this.state;
    if (!this.shouldLoadMoreData) {
      //统计loadMore触发的次数
      loadMoreCount++;
      this.shouldLoadMoreData = true;
      this.setState(
        {
          loadMoreCount,
        },
        () => {
          const { onLoadMore } = this.props;
          //loadMore的page从2开始
          onLoadMore &&
            /**
             *@param {int} page
             *@param {function}  closeLoadMore
             */
            onLoadMore(loadMoreCount + 1, () => {
              this.shouldLoadMoreData = false;
              //flatList不是全部渲染的，滚动到一定位置才会把后续的渲染
              this.setState({
                random: Math.random(),
              });
            });
        }
      );
    }
  };
  renderLoadMoreView() {
    const {
      loading,
      loadMoreView,
      loadMoreContainerStyle = {},
      loadingColor = '#333',
      noData,
    } = this.props;
    if (loading || noData) {
      //一直显示底部的loadMoreView，触发loading和没数据了。
      //这样能避免FlatList渲染延迟，导致卡顿假象。
      return false;
    }
    if (loadMoreView) {
      return loadMoreView;
    }
    return (
      <View
        style={Object.assign(
          {},
          { paddingTop: 10, paddingBottom: 10 },
          loadMoreContainerStyle
        )}
      >
        <ActivityIndicator size="large" color={loadingColor} />
      </View>
    );
  }
  renderLoading() {
    const { loading, loadingView, loadingColor = '#333' } = this.props;
    if (loading) {
      if (loadingView) {
        return loadingView;
      } else {
        return (
          <ActivityIndicator
            size="large"
            color={loadingColor}
            style={{ marginBottom: 10 }}
          />
        );
      }
    }
  }
  renderPullReleaseView() {}
  renderNoMoreView() {}
  closeRefreshControl = () => {
    this.setState({
      refreshing: false,
    });
  };
  onScrollBeginDrag = e => {};
  onScrollEndDrag = e => {
    const { onRefresh } = this.props;
    const { refreshing } = this.state;
    if (refreshing && Platform.OS === 'ios') {
      onRefresh && onRefresh(this.closeRefreshControl);
    }
  };
  onRefresh = e => {
    const { onRefresh } = this.props;
    this.setState({ refreshing: true });
    if (Platform.OS === 'android') {
      onRefresh && onRefresh(this.closeRefreshControl);
    }
  };
  render() {
    const { data, renderItem, style = {} } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={style}>
        {this.renderLoading()}
        <FlatList
          data={data}
          renderItem={renderItem}
          initialNumToRender={30}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
          onScroll={this.onScroll}
          ListHeaderComponent={this.renderPullReleaseView()}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}
          ListFooterComponent={this.renderLoadMoreView()}
          ref={ref => {
            this.flatListRef = ref;
          }}
        />
      </View>
    );
  }
}
