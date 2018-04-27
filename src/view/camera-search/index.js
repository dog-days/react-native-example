//外部依赖包
import React from 'react';
import styled from 'styled-components';
import { KeyboardAvoidingView, ScrollView, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Label } from 'teaset';
import { Actions } from 'react-native-router-flux';
//内部依赖包
import Search from './search';
import Button from 'src/components/button';
import { viewCommonBgColor } from 'view/style/const';
import commonStyle from 'view/style/common';
import { primaryColor } from 'view/style/const';
import { namespace as cameraSearchStatusNamespace } from 'src/model/state/tabbar-camera-search';
import { namespace as cameraListDataNamespace } from 'src/model/data/tabbar-camera-list/cameras';

@connect(state => {
  return {
    searchState: state[cameraSearchStatusNamespace],
  };
})
//ScrollView不能成为search的容器，要不然，取消事件会被input的blur事件打断，
//只能执行了blur事件后，点击取消才生效，不放在ScrollView就没问题（这是个坑）。
export default class CameraSearch extends React.Component {
  dispatch = this.props.dispatch;
  state = { isReadyToRendered: false };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isReadyToRendered: true,
      });
    }, 0);
  }
  renderButtonGroups(buttons, onPress) {
    return buttons.map((v, k) => {
      let type = 'default';
      if (v.type) {
        type = v.type;
      }
      return (
        <CustomButton key={v.value} type={v.type} onPress={onPress(v.value)}>
          {v.label}
        </CustomButton>
      );
    });
  }
  /**
   * 设置buttons选中状态，可以多选或者单选
   *@param {array} buttons button列表
   *@param {string} key model state的key值
   *@param {string} type 值为single或者mutiple
   */
  setButtonSelectedState(buttons, key, type = 'single') {
    const { searchState } = this.props;
    let currentState = searchState[key];
    buttons.forEach(v => {
      if (type === 'single') {
        if (currentState === v.value) {
          v.type = 'primary';
        }
      } else {
        if (!currentState) {
          currentState = [];
        }
        const index = currentState.indexOf(v.value);
        if (!!~index) {
          v.type = 'primary';
        }
      }
    });
    if (
      (currentState && currentState.length === 0) ||
      (!currentState && currentState !== 0)
    ) {
      //默认选中全部
      buttons[0].type = 'primary';
    }
  }
  /**
   * 获取选中或取消选中按钮，可以使单选或者多选
   *@param {string} key model state的key值
   *@param {string} currentSelectedButtonValue 当前选中的button值
   *@param {string} type 值为single或者mutiple
   */
  getSelectButton(key, currentSelectedButtonValue, type) {
    let { searchState } = this.props;
    let currentState = searchState[key];
    if (type === 'mutiple') {
      const index = currentState.indexOf(currentSelectedButtonValue);
      if (!!~index) {
        currentState.splice(index, 1);
      } else {
        if (currentSelectedButtonValue !== '') {
          //全部不能选择
          currentState.push(currentSelectedButtonValue);
        } else {
          //点击全选或者默认按钮，取消其他按钮的选择
          currentState = [];
        }
      }
    } else if (type === 'single') {
      if (currentSelectedButtonValue !== '') {
        currentState = currentSelectedButtonValue;
      } else {
        currentState = null;
      }
    }
    return currentState;
  }
  renderFilterGroups() {
    const buttons = [
      { value: '', label: '全部' },
      { value: 'unknow', label: '未分组' },
      { value: 'guixi', label: '贵溪' },
      { value: 'demo', label: 'demo' },
      { value: 'demo1', label: 'demo' },
      { value: 'demo2', label: 'demo' },
      { value: 'demo3', label: 'demo' },
      { value: 'demo4', label: 'demo' },
      { value: 'demo5', label: 'demo' },
      { value: 'demo6', label: 'demo' },
      { value: 'demo7', label: 'demo' },
      { value: 'demo8', label: 'demo' },
      { value: 'demo9', label: 'demo' },
      { value: 'demo10', label: 'demo' },
    ];
    this.setButtonSelectedState(buttons, 'groups', 'mutiple');
    return this.renderButtonGroups(buttons, key => {
      return e => {
        const payload = this.getSelectButton('groups', key, 'mutiple');
        this.dispatch({
          type: `${cameraSearchStatusNamespace}/groups`,
          payload,
        });
      };
    });
  }
  renderFilterStatus() {
    const buttons = [
      { value: '', label: '全部' },
      { value: 1, label: '在线' },
      { value: 0, label: '离线' },
    ];
    this.setButtonSelectedState(buttons, 'status', 'single');
    return this.renderButtonGroups(buttons, key => {
      return e => {
        const payload = this.getSelectButton('status', key, 'single');
        this.dispatch({
          type: `${cameraSearchStatusNamespace}/status`,
          payload,
        });
      };
    });
  }
  renderFilterSort() {
    const buttons = [
      { value: '', label: '默认' },
      { value: 'asc', label: '升序' },
      { value: 'desc', label: '降序' },
    ];
    this.setButtonSelectedState(buttons, 'order', 'single');
    return this.renderButtonGroups(buttons, key => {
      return e => {
        const payload = this.getSelectButton('order', key, 'single');
        this.dispatch({
          type: `${cameraSearchStatusNamespace}/order`,
          payload,
        });
      };
    });
  }
  renderFilterModel() {
    const buttons = [
      { value: '', label: '全部' },
      { value: 'AIH', label: 'AIH' },
      { value: 'AIH1', label: 'AIH' },
      { value: 'AIH2', label: 'AIH' },
      { value: 'AIH3', label: 'AIH' },
      { value: 'AIH4', label: 'AIH' },
      { value: 'AIH5', label: 'AIH' },
      { value: 'AIH6', label: 'AIH' },
      { value: 'AIH7', label: 'AIH' },
      { value: 'AIH8', label: 'AIH' },
      { value: 'AIH9', label: 'AIH' },
    ];
    this.setButtonSelectedState(buttons, 'model', 'single');
    return this.renderButtonGroups(buttons, key => {
      return e => {
        const payload = this.getSelectButton('model', key, 'single');
        this.dispatch({
          type: `${cameraSearchStatusNamespace}/model`,
          payload,
        });
      };
    });
  }
  onResetPress = () => {
    this.dispatch({
      type: `${cameraSearchStatusNamespace}/clear`,
    });
  };
  onConfirmPress = () => {
    const { searchState } = this.props;
    Actions.pop();
    setTimeout(() => {
      //setTimeout可以防止卡顿假象，先切换页面在请求数据渲染页面
      this.dispatch({
        type: `${cameraListDataNamespace}/dataSaga`,
        payload: {
          loading: true,
          ...searchState,
        },
      });
    }, 10);
  };
  render() {
    const { isReadyToRendered } = this.state;
    return (
      <ContainerView>
        <Search />
        {isReadyToRendered && (
          <View style={{ flex: 1 }}>
            <FilterView>
              <LeftView>
                <CustomScrollView>
                  <LeftPaddingView>
                    <Label>分组：</Label>
                    {this.renderFilterGroups()}
                  </LeftPaddingView>
                </CustomScrollView>
              </LeftView>
              <RightView>
                <CustomScrollView>
                  <FirstRightViewItem>
                    <Label>在线状态：</Label>
                    {this.renderFilterStatus()}
                  </FirstRightViewItem>
                  <RightViewItem>
                    <Label>以摄像机名排序：</Label>
                    {this.renderFilterSort()}
                  </RightViewItem>
                  <RightViewItem>
                    <Label>摄像机型号：</Label>
                    {this.renderFilterModel()}
                  </RightViewItem>
                </CustomScrollView>
              </RightView>
            </FilterView>
            <NKeyboardAvoidingView behavior="position">
              <BottomButtonView>
                <ResetButton fontSize={18} onPress={this.onResetPress}>
                  重置条件
                </ResetButton>
                <ConfirmButton
                  type="primary"
                  fontSize={18}
                  onPress={this.onConfirmPress}
                >
                  确定
                </ConfirmButton>
              </BottomButtonView>
            </NKeyboardAvoidingView>
          </View>
        )}
      </ContainerView>
    );
  }
}
const ContainerView = styled(View)`
  flex: 1;
`;
const StyledButton = styled(Button)`
  margin-top: 10px;
`;
class CustomButton extends React.Component {
  state = {};
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isReadyToRendered: true,
      });
    }, 0);
  }
  render() {
    const { children } = this.props;
    const { isReadyToRendered } = this.state;
    if (!isReadyToRendered) {
      return false;
    }
    return <StyledButton {...this.props}>{children} </StyledButton>;
  }
}
const FilterView = styled(View)`
  flex: 1;
  background: ${viewCommonBgColor};
  flex-direction: row;
  height: 100%;
  border-top-width: 1;
  border-top-color: #ddd;
  padding-bottom: 50px;
`;
const LeftView = styled(View)`
  flex: 1;
  border-right-width: 1;
  border-right-color: #ddd;
`;
const LeftPaddingView = styled(View)`
  padding: 15px 30px;
`;
const RightView = styled(View)`
  flex: 1;
`;
const CustomScrollView = styled(ScrollView)``;
const RightViewItem = styled(View)`
  margin-bottom: 15;
  border-top-width: 1;
  border-top-color: #ddd;
  padding: 0px 30px;
  padding-top: 15;
  padding-bottom: 0;
`;
const FirstRightViewItem = styled(RightViewItem)`
  border-top-width: 0;
  padding-top: 15px;
`;
const NKeyboardAvoidingView = Platform.select({
  ios: KeyboardAvoidingView,
  android: View,
});
const BottomButtonView = styled(View)`
  flex-direction: row;
  position: absolute;
  bottom: 0;
  z-index: 10000;
  width: 100%;
  height: 50px;
  background: #ddd;
`;

const ResetButton = styled(Button)`
  height: 100%;
  flex: 1;
  border-width: 0;
  border-radius: 0;
`;
const ConfirmButton = styled(ResetButton)``;
