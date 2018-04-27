//外部依赖包
import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import { Theme, SearchInput, Label } from 'teaset';
import { Actions } from 'react-native-router-flux';
//内部依赖包
import { primaryColor } from 'view/style/const';
import { namespace as cameraSearchStatusNamespace } from 'src/model/state/tabbar-camera-search';

@connect(state => {
  return {
    searchState: state[cameraSearchStatusNamespace],
  };
})
export default class Search extends React.Component {
  dispatch = this.props.dispatch;
  onGoBack = e => {
    Actions.pop();
  };
  onChangeText = text => {
    this.dispatch({
      type: `${cameraSearchStatusNamespace}/q`,
      payload: text,
    });
  };
  render() {
    const { searchState: { q } } = this.props;
    return (
      <SearchContainer>
        <SearchInputContainer>
          <CustomSearchInput
            value={q}
            onChangeText={this.onChangeText}
            placeholder="搜索摄像机"
            autoFocus
            clearButtonMode="always"
          />
        </SearchInputContainer>
        <TouchableWithoutFeedback
          hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
          onPress={this.onGoBack}
        >
          <View>
            <Cancel>取消</Cancel>
          </View>
        </TouchableWithoutFeedback>
      </SearchContainer>
    );
  }
}

const SearchContainer = styled(View)`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ebeaea;
  padding-top: ${Theme.statusBarHeight};
`;

const SearchInputContainer = styled(View)`
  flex: 1;
`;
const CustomSearchInput = styled(SearchInput)`
  height: 35px;
  border-width: 0;
`;
const Cancel = styled(Label)`
  font-size: 16px;
  margin-left: 10px;
  color: ${primaryColor};
`;
