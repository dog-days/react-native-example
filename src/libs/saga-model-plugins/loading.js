let loadingSuffixNamesapce = 'loading';
//最终的loading namespace
let loadingNamesapce;
//当前的model命名空间
let currentModelNamespace;

//如果要修改loadingSuffixNamesapce，使用插件时，不要使用已经实例化的createLoading
//通过opts去改变
function createLoading(opts = {}) {
  loadingSuffixNamesapce =
    opts.loadingSuffixNamesapce || loadingSuffixNamesapce;
  return {
    onSaga(prevSaga, { put }, model, actionType) {
      return function*(action) {
        //如果payload设置了loading（suffixNamespace）
        if (action.payload && action.payload[loadingSuffixNamesapce]) {
          //上一个设置了loading的action，通过dispatch触发的model
          const { namespace } = model;
          currentModelNamespace = namespace;
          loadingNamesapce = `${namespace}/${loadingSuffixNamesapce}`;
          const payload = {};
          payload[loadingSuffixNamesapce] = true;
          yield put({
            type: loadingNamesapce,
            payload,
          });
          yield prevSaga(action);
        } else {
          //否则正常运行
          yield prevSaga(action);
        }
        return;
      };
    },
    onReducer(reducer) {
      return function(state, action) {
        switch (action.type) {
          case loadingNamesapce:
            //整合loading state到当前的model state中
            const currentModelState = {
              [currentModelNamespace]: {
                ...state[currentModelNamespace],
                ...action.payload,
              },
            };
            return {
              ...state,
              ...currentModelState,
            };
          default:
            return reducer(state, action);
        }
      };
    },
  };
}

export { createLoading };

export default createLoading();
