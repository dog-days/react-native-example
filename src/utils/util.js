import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

/**
 *  merge方式处理payload，并返回给reducer，payload的字段会覆盖已有的state字段。
 */
export function mergeReducer(state, { payload }) {
  return {
    ...state,
    ...payload,
  };
}
/**
 *  指定字段reducer处理，action.payload的数据会替换到指定state的字段中。
 *  这样在使用dispatch时看起来就跟容易理解。
 */
export function replaceFieldReducer(field) {
  return function(state, { payload }) {
    return {
      ...state,
      [field]: payload,
    };
  };
}
/**
 *  merge方式处理action.payload的model样板
 *@param {string} namespace redux-saga-model namespace
 *@param {object} initState redux-saga-model中model中的初始state
 *@param {function} clearFunction 上面指定的namespace/clear 触发的reducer函数
 *                  如果没定义clearFunction，默认是返回initState
 */
export function replaceStateModelTemplate(
  namespace,
  initState = {},
  clearFunction
) {
  return function() {
    const model = {
      namespace,
      //cloneDeep，可以防止initState被篡改
      state: cloneDeep(initState),
      reducers: {
        clear: function(state, action) {
          if (clearFunction) {
            return clearFunction.bind(this)(state, action);
          } else {
            //cloneDeep防止被篡改
            return cloneDeep(initState);
          }
        },
      },
    };
    for (var stateName in initState) {
      if (!model.reducers) {
        model.reducers = {};
      }
      if (model.reducers[stateName]) {
        console.warn(`stateName ${stateName}已存在，请重新命名。`);
      } else {
        model.reducers[stateName] = replaceFieldReducer(stateName);
      }
    }
    return model;
  };
}
export function delay(ms) {
  if (isNaN(ms)) {
    console.error('请输入正确的毫秒！');
    return;
  }

  let timeoutId = 0;
  const promise = new Promise(function(resolve) {
    timeoutId = setTimeout(function() {
      return resolve(true);
    }, ms);
  });
  promise.clearTimeout = function() {
    clearTimeout(timeoutId);
  };
  return promise;
}
/**
 * params json对象(一级)拼接url ?后面的参数
 * @param  {String} url  需要拼接的url
 * @param  {Objct}  params 需要拼接的url json参数
 * @return {String}    拼接的url
 */
export function joinUrlParams(url, params) {
  let p = '';
  let i = 0;
  for (var key in params) {
    let value = params[key];
    if (i === 0 && !~url.indexOf('?')) {
      p += '?' + key + '=' + value;
    } else {
      p += '&' + key + '=' + value;
    }
    i++;
  }
  return url + p;
}
/**
 * 根据传进来的分钟数和参考起始时间
 * 获取指定分钟数内的开始和结束时间戳（毫秒）
 * @param { number } minuteCount 分钟总数
 * @param { object } referenceDate 参考时间，默认是当天当前时间
 * @return { array } 0:begin,1:end;
 */
export function getBeginAndEndTimestampWithMinute(
  minuteCount,
  referenceDate = new Date()
) {
  let date = moment(referenceDate);
  let end = Math.floor(+date / 1000);
  let begin = Math.floor(+date.subtract(minuteCount, 'minute') / 1000);
  return [begin, end];
}
/**
 * 根据传进来的小时数和参考起始时间
 * 获取指定时间数内的开始和结束时间戳（毫秒）
 * @param { number } hourCount 时间总数
 * @param { object } referenceDate 参考时间，默认是当天当前时间
 * @return { array } 0:begin,1:end;
 */
export function getBeginAndEndTimestampWithHour(
  hourCount,
  referenceDate = new Date()
) {
  let date = moment(referenceDate);
  let end = Math.floor(+date / 1000);
  let begin = Math.floor(+date.subtract(hourCount, 'hour') / 1000);
  return [begin, end];
}
/**
 * 根据传进来的天数和参考起始时间
 * 获取指定天数内的开始和结束时间戳（毫秒）
 * @param { number } dayCount 天总数
 * @param { boolean } fromNow 为true时结束时间是否从现在开始算，为false时结束时间是前一天的23:59:59。
 * @param { object } referenceDate 参考时间，默认是当天当前时间
 * @return { array } 0:begin,1:end;
 */
export function getBeginAndEndTimestampWithDay(
  dayCount,
  fromNow = true,
  referenceDate = new Date()
) {
  let date;
  if (!fromNow) {
    date = moment(referenceDate)
      .subtract(1, 'day')
      .endOf('day');
  } else {
    date = moment(referenceDate);
  }
  let end = Math.floor(+date / 1000);
  let begin = Math.floor(+date.subtract(dayCount, 'day') / 1000);
  return [begin, end];
}
/**
 * 根据传进来的月数获取起始时间
 * 开始时间是从0点开始，结束时间是在23:59:59
 * @param { number } monthCount
 * @return { array } 0:begin,1:end;
 */
export function getBeginAndEndTimestampThisMonth(monthCount) {
  let end = Math.floor(+moment().endOf('hour') / 1000) - 1;
  let begin = Math.floor(+moment().startOf('M') / 1000);
  return [begin, end];
}
/**
 * 根据传进来的月数获取起始时间
 * 开始时间是从0点开始，结束时间是在23:59:59
 * @param { number } monthCount
 * @return { array } 0:begin,1:end;
 */
export function getBeginAndEndTimestampWithMonth(monthCount) {
  let end = Math.floor(
    +moment()
      .subtract(1, 'M')
      .endOf('M') / 1000
  );
  let begin = Math.floor(
    +moment()
      .subtract(monthCount, 'M')
      .startOf('M') / 1000
  );
  return [begin, end];
}

//获取上月的起始和结束时间
export function getBeginAndEndTimestampLastMonth() {
  let end = Math.floor(
    +moment()
      .subtract(1, 'M')
      .endOf('M') / 1000
  );
  let begin = Math.floor(
    +moment()
      .subtract(1, 'M')
      .startOf('M') / 1000
  );

  return [begin, end];
}
/**
 *  单位转换
 *@param {number} value 转换值
 *@param {array} unitArray 单位数组，用来决定的顺序
 *@param {object} options 配置选项，默认值如下
 * {
 *    scale: 1, //转换进制
 *    decimals: false,//是否展示小数
 *    showUnit: true,//是否展示单位
 * }
 */
export function unitTransform(value, unitArray = [], options) {
  if (value === undefined || value === null) {
    console.warn('value参数没定义或者为null');
    return value;
  }
  if (isNaN(value)) {
    console.warn('value参数不是数字类型');
    return value;
  }
  if (Object.prototype.toString.apply(unitArray) !== '[object Array]') {
    console.warn("unitArray参数必须是数组，如['bps','Kbps']");
    return value;
  }
  value = parseInt(value, 10);
  if (value === 0) {
    return value;
  }
  //负数处理，上面已经处理是否位数字了
  let negative = false;
  if (value < 0) {
    negative = true;
    value = -value;
  }
  let opt = {
    scale: 1,
    decimals: false,
    showUnit: true,
  };
  options = {
    ...opt,
    ...options,
  };
  let re = value;
  unitArray.forEach((v, k) => {
    let current_scale = options.scale;
    if (k === 0) {
      current_scale = 0;
    }
    if (k > 1) {
      for (let i = 0; i < k - 1; i++) {
        current_scale *= options.scale;
      }
    }
    if (value >= current_scale) {
      if (k !== 0) {
        if (!options.decimals) {
          re = (value / current_scale).toFixed(0);
        } else {
          if (
            Object.prototype.toString.apply(options.decimals) ===
            '[object Boolean]'
          ) {
            //默认两位数
            options.decimals = 2;
          }
          re = (value / current_scale).toFixed(options.decimals);
        }
      }
      if (options.showUnit) {
        re += v;
      }
    }
  });
  if (negative) {
    re = '-' + re;
  }
  return re;
}
/**
 * 通过（最小单位）获取合适的单位
 *@param {number} value 值
 *@param {array} unitArray 单位数组，用来决定的顺序
 *@param {number} scale 进制
 *@return {string} unit
 */
export function getUinitByValue(value, unitArray = [], scale) {
  if (value === undefined || value === null) {
    console.warn('value参数没定义或者为null');
    return value;
  }
  if (isNaN(value)) {
    console.warn('value参数不是数字类型');
    return value;
  }
  if (Object.prototype.toString.apply(unitArray) !== '[object Array]') {
    console.warn("unitArray参数必须是数组，如['bps','Kbps']");
    return value;
  }
  value = parseInt(value, 10);
  //负数处理，上面已经处理是否位数字了
  if (value < 0) {
    value = -value;
  }
  if (value === 0) {
    return unitArray[0];
  }
  let ret = '';
  unitArray.forEach((v, k) => {
    if (value >= Math.pow(scale, k)) {
      ret = v;
    }
  });
  return ret;
}
/**
 * 通过（最小单位）获取合适的单位
 *@param {number} value 值，必填
 *@param {array} unitArray 单位数组，用来决定的顺序，必填
 *@param {string} unit 单位，必填
 *@param {string} options 配置参数和默认值如下
 * {
 *   showUnit: false,
 *   scale: 1,
 *   decimals: 2,
 * }
 *@return {string} 返回值
 */
export function transformByUnit(
  value,
  unitArray = [],
  unit,
  options = { showUnit: false, scale: 1, decimals: 2 }
) {
  if (value === undefined || value === null) {
    console.warn('value参数没定义或者为null');
    return value;
  }
  if (isNaN(value)) {
    console.warn('value参数不是数字类型');
    return value;
  }
  if (Object.prototype.toString.apply(unitArray) !== '[object Array]') {
    console.warn("unitArray参数必须是数组，如['bps','Kbps']");
    return value;
  }
  value = parseInt(value, 10);
  //负数处理，上面已经处理是否位数字了
  let negative = false;
  if (value < 0) {
    negative = true;
    value = -value;
  }
  if (value === 0) {
    return value;
  }
  let ret = value;
  let { scale, showUnit, decimals } = options;
  unitArray.forEach((v, k) => {
    if (unit === v) {
      ret = value / Math.pow(scale, k);
    }
  });
  if (negative) {
    ret = -ret;
  }
  ret = ret.toFixed(decimals);
  if (showUnit) {
    ret += unit;
  }
  return ret;
}
const bandwidthUnitArray = [
  'bps',
  'Kbps',
  'Mbps',
  'Gbps',
  'Tbps',
  'Pbps',
  'Ebps',
  'Zbps',
  'Ybps',
];
const flowUnitArray = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
/**
 *  带宽比特单位转换为Kb,Mb,Gb单位
 *@param {int} value 转换值
 *@param {object} options 配置选项，默认值如下
 * {
 *    scale: 1, //转换进制
 *    decimals: false,//是否展示小数
 *    showUnit: true,//是否展示单位
 * }
 */
export function bandwidthTransformToKbMbGb(
  value,
  options = { decimals: false }
) {
  let opt = {
    scale: 1024,
  };
  options = {
    ...options,
    ...opt,
  };
  return unitTransform(value, bandwidthUnitArray, options);
}
/**
 *  流量或存储 字节单位转换为KB,MB,GB单位
 *@param {int} value 转换值
 *@param {object} options 配置选项，默认值如下
 * {
 *    scale: 1, //转换进制
 *    decimals: false,//是否展示小数
 *    showUnit: true,//是否展示单位
 * }
 */
export function flowTransformToKBMBGB(value, options = { decimals: false }) {
  let opt = {
    scale: 1024,
  };
  options = {
    ...options,
    ...opt,
  };
  return unitTransform(value, flowUnitArray, options);
}
/**
 *  磁盘读写字节单位转换为KB/s,MB/s,GB/s等单位
 *@param {int} value 转换值
 *@param {object} options 配置选项，默认值如下
 * {
 *    scale: 1, //转换进制
 *    decimals: false,//是否展示小数
 *    showUnit: true,//是否展示单位
 * }
 */
export function discIoTransform(value, options = { decimals: false }) {
  let opt = {
    scale: 1024,
  };
  options = {
    ...options,
    ...opt,
  };
  const discUnitArray = [];
  flowUnitArray.forEach(v => {
    discUnitArray.push(v + '/s');
  });
  return unitTransform(value, discUnitArray, options);
}
/**
 * 秒转换成分，时，天
 *@param {int} value 转换值
 */
export function secondTranformToMHD(value, options = {}) {
  let opt = {
    scale: 1024,
  };
  options = {
    ...options,
    ...opt,
  };
  return unitTransform(value, ['秒', '分', '时', '日'], options);
}
//通过流量值（最小单位）获取合适的单位，也适合存储量
export function getFlowUnitByValue(value) {
  return getUinitByValue(value, flowUnitArray, 1024);
}

//通过带宽值（最小单位）获取合适的单位
export function getBandWidthUnitByValue(value) {
  return getUinitByValue(value, bandwidthUnitArray, 1024);
}
/**
 * 通过具体单位进行流量值（最小单位）转换
 * @param { number } value 转换值
 * @param { string } unit 单位
 * @param { boolean } showUnit 是否展示unit
 * @param { boolean } decimals 精确是否到小数（小数点2位数）
 */
export function tranformFlowValueByUnit(
  unit,
  value,
  showUnit = false,
  decimals = 2
) {
  return transformByUnit(value, flowUnitArray, unit, {
    showUnit,
    scale: 1024,
    decimals,
  });
}
/**
 * 通过具体单位进行带宽值（最小单位）转换
 * @param { string } unit 单位
 * @param { number } value 转换值
 * @param { boolean } showUnit 是否展示unit
 * @param { boolean } decimals 精确是否到小数（小数点2位数）
 */
export function tranformBandWidthValueByUnit(
  unit,
  value,
  showUnit = false,
  decimals = 2
) {
  return transformByUnit(value, bandwidthUnitArray, unit, {
    showUnit,
    decimals,
    scale: 1024,
  });
}
/**
 * 转换成百分比
 *@param {float} decimal 小数值
 *@param {number} fixed 保留位数
 */
export function toPercent(decimal, fixed = 0) {
  return `${(decimal * 100).toFixed(fixed)}%`;
}
/**
 * 转换成百分比
 * @param { value } 当前值
 * @param { total } 总数
 */
export function getPercent(value, total) {
  if (!total) {
    //兼容公共rechart tooltip formater参数格式
    total = 1;
  }
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
}
/**
 * 根据传进来的类型（定义好的）和value获取合适的单位，需要利用上面部分函数
 * @param { string } type 类型
 * @param { number } value 需要定位合适单位的值
 * @param { string } unit_for_replace 用来替换的单位，如果这个定义，以这个单位为准
 */
export function getUnitByType(type, value, unit_for_replace) {
  if (unit_for_replace) {
    return unit_for_replace;
  }
  let unit;
  switch (type) {
    case 'bandwidth':
      unit = getBandWidthUnitByValue(value);
      break;
    case 'traffic':
      unit = getFlowUnitByValue(value);
      break;
    case 'disc-io':
      unit = getFlowUnitByValue(value) + '/s';
      break;
    case 'time-second':
      unit = '秒';
      break;
    case 'num':
      unit = '个';
      break;
    default:
      unit = '';
  }
  return unit;
}
/**
 * 根据传进来的类型（定义好的）和单位获取合适的formatter
 * Y轴formater
 * @param { string } type 类型
 * @param { string } unit 单位
 */
export function getFormatterByUnit(type, unit, maxYvalue) {
  let formatter;
  function getFormatter(unit, formatterFunc, showUnit, decimals) {
    return (value, showUnit = false, decimals) => {
      //如果最大值是0，不需要小数点
      if (parseInt(maxYvalue, 10) === 0) {
        decimals = 0;
      } else {
        decimals = 2;
      }
      return formatterFunc(unit, value, showUnit, decimals);
    };
  }
  switch (type) {
    case 'bandwidth':
      formatter = getFormatter(unit, tranformBandWidthValueByUnit);
      break;
    case 'traffic':
      formatter = getFormatter(unit, tranformFlowValueByUnit);
      break;
    case 'disc-io':
      formatter = getFormatter(unit.split('/')[0], tranformFlowValueByUnit);
      break;
    case 'percent':
      formatter = toPercent;
      break;
    default:
      formatter = value => value;
  }
  return formatter;
}
/**
 * 根据传进来的类型（定义好的）formatter
 * x轴formater
 * @param { string } type 类型
 */
export function getFormatterByType(type) {
  let formatter;
  switch (type) {
    case 'bandwidth':
      formatter = value => {
        return bandwidthTransformToKbMbGb(value, {
          decimals: 2,
        });
      };
      break;
    case 'traffic':
      formatter = value => {
        return flowTransformToKBMBGB(value, {
          decimals: 2,
        });
      };
      break;
    //磁盘读写
    case 'disc-io':
      formatter = value => {
        return discIoTransform(value, {
          decimals: 2,
        });
      };
      break;
    case 'percent':
      formatter = getPercent;
      break;
    default:
      formatter = value => value.toFixed(0);
  }
  return formatter;
}

export function randomKey() {
  return Math.random()
    .toString(36)
    .substring(7)
    .split('')
    .join('.');
}
//中英文字符长度，中文算两个长度
export function strlen(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}
/**
 * 截取中英文字符，从0位置开始算
 *@param {str} 需要截取的字符
 *@param {len} 截取的长度
 */
export function substr(str, len) {
  var num = 0;
  for (let i = 0; i < str.length; i++) {
    var a = str.charAt(i);
    if (/^[\u4e00-\u9fa5]+$/i.test(a)) {
      num += 2;
    } else {
      num += 1;
    }
    if (num == len) {
      return str.substring(0, i + 1);
    }
    if (num > len) {
      return str.substring(0, i);
    }
  }
}
