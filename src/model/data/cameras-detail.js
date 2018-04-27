//外部依赖包

//内部依赖包
import { requestApi, apiAddress, cancel } from 'src/service/camera-<cid>';
import { mergeReducer } from 'src/utils/util';

export const namespace = apiAddress;

export default function() {
  return {
    namespace,
    state: {
      loading: true,
    },
    reducers: {
      dataReducer: mergeReducer,
      clear(state, action) {
        //如果使用this.state，clear函数不能用箭筒函数方式
        cancel();
        return this.state;
      },
    },
    sagas: {
      *dataSaga(
        { payload = {}, successCallback, failureCallback },
        { put, call }
      ) {
        let apiData = yield call(requestApi, payload);
        if (!apiData || apiData.__error__) {
          //没数据，或者非200数据
          yield put({
            type: 'dataReducer',
            payload: {
              loading: false,
            },
          });
          failureCallback && failureCallback();
          return;
        }
        successCallback && successCallback(apiData);
        let { data } = apiData;
        yield put({
          type: 'dataReducer',
          payload: {
            data,
            loading: false,
          },
        });
      },
    },
  };
}
