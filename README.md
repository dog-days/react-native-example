# React Native Example

前提要安装了React Native需要的工具。

### 安装依赖包

```sh
npm install
```

### 安装mock服务

数据都是mock服务提供的。

```sh
npm install -g serve-new
serve -M '{"/tong/v1/([^?#]*)": "/mock/$1.json"}'
```

### 运行

**ios**

```sh
react-native run-ios
```

**android**

先打开安卓模拟器（有时候不会主动打开，我们手动打开）

```sh
adb device #查看是否有设备在
react-native run-android
```

