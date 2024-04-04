const wifi = require('node-wifi');
const SSID = '棉花402'; // 替换为你的 WiFi SSID
const PASSWORD = '4000285255'; // 替换为你的 WiFi 密码
const RETRY_INTERVAL = 5000; // 重试间隔，单位毫秒
const MAX_RETRY_COUNT = 5; // 最大重试次数

let retryCount = 0;

function connectToWifi() {
  wifi.connect({ ssid: SSID, password: PASSWORD }, (error) => {
    if (error) {
      console.error('连接 WiFi 失败：', error);
      retryCount++;
      if (retryCount <= MAX_RETRY_COUNT) {
        console.log(`将在 ${RETRY_INTERVAL / 1000} 秒后重试...`);
        setTimeout(connectToWifi, RETRY_INTERVAL);
      } else {
        console.error('超过最大重试次数，程序退出！');
        process.exit(1);
      }
    } else {
      console.log('连接 WiFi 成功！');
    }
  });
}

wifi.init({
  iface: null // 使用默认网络接口
}, (error) => {
  if (error) {
    console.error('初始化 WiFi 模块失败：', error);
    process.exit(1);
  } else {
    console.log('WiFi 模块已初始化！');
    connectToWifi();
  }
});