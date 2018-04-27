import fetch from 'src/libs/fetch';
import axios from 'axios';
import { Toast } from 'antd-mobile';
import { baseURL } from 'src/utils/const';

// import { getCookie } from 'src/libs/cookie';
import { fetchExceptionMessage, fetchTimeoutMessage } from 'src/utils/const';
import debounce from 'lodash.debounce';

const showErrorMessageGapTime = 1 * 1000;
const showErrorMessageDebounce = debounce(function(messageStr, callback) {
  callback && callback();
  Toast.fail(messageStr);
}, showErrorMessageGapTime);

let errorsetTimeout;

//默认的的responseType=json。
function statusCallback(status, data) {
  clearTimeout(errorsetTimeout);
  if (status === 401) {
    Toast.fail('登录失效，需重新登录');
    setTimeout(() => {
      // window.location.href = '/user/login';
    }, 500);
  } else if (!(status >= 200 && status < 300)) {
    //如果后端忘记返回data.message，先使用其他友好提示。
    showErrorMessageDebounce(data.message || fetchExceptionMessage, function() {
      if (!data.message) {
        console.warn('无后端提示信息，请提示后端人员添加！');
      }
    });
  }
}
function errorCallback(error) {
  clearTimeout(errorsetTimeout);
  if (!error.response) {
    //请求取消，不提示
    if (!axios.isCancel(error)) {
      //没有返回数据就是超时，服务器500也会有response
      showErrorMessageDebounce(fetchTimeoutMessage, function() {
        console.warn(new Error(error));
      });
    } else {
      console.log('Request cancel:', error);
    }
  } else {
    showErrorMessageDebounce(fetchExceptionMessage, function() {
      console.warn('服务器出错', error);
    });
  }
}

//设置header Authorization
//这里设置的headers会在fetch.xxx调用后才会被调用，
//这样就不存在token设置顺序问题，因为登录的时候还没token
//所以不能在这里直接使用config处理
function setHeaders() {
  // const headers = {};
  // const token = getCookie('token');
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`;
  // }
  // return headers;
  return {};
}

export default fetch(
  {
    baseURL,
  },
  statusCallback,
  errorCallback,
  setHeaders
);
