import { replaceFieldReducer } from 'src/utils/util';

export const namespace = 'common-ui-state';
export default function() {
  return {
    namespace,
    state: {
      //主页selectedTab
      selectedTab: 'camera',
    },
    reducers: {
      selectedTab: replaceFieldReducer('selectedTab'),
      clear: function(state, { payload }) {
        return this.state;
      },
    },
    sagas: {},
  };
}
