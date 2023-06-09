/* eslint-disable jsx-quotes */
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { Button, View } from "@tarojs/components";
import "./index.scss";

function Profile() {
  var token;
  const [avatarUrl, serAvatarUrl] = useState("../../assets/user.jpeg");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    Taro.getStorage({
      key: "token",
      success: function (res) {
        setIsLogin(true);
        token = res.data;
      },
      fail: function () {
        setIsLogin(false);
        token = "";
      },
    });
  }, []);
  const login = () => {
    let userInfo;
    //console.log(isLogin);
    //islogin?
    if (isLogin) {
      Taro.clearStorage();
      setIsLogin(false);
      Taro.showToast({
        title: "退出成功",
        icon: "success",
        duration: 1000,
      });
    } else {
      Taro.getUserProfile({
        desc: "用于获取用户的头像和呢称", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
          userInfo = res;
          delete userInfo.userInfo.is_demote;
          Taro.login({
            success: (res1) => {
              //console.log(res1.code);
              Taro.request({
                url: "https://ysjy.alplune.top/yun/api/user/login",
                method: "POST",
                data: {
                  code: res1.code,
                  raw_data: userInfo.rawData,
                  signature: userInfo.signature,
                  encrypted_data: userInfo.encryptedData,
                  iv: userInfo.iv,
                  user_info: {
                    nickName: "微信用户",
                    gender: 0,
                    language: "",
                    city: "",
                    province: "",
                    country: "",
                    avatarUrl: "",
                  },
                  // user_info: userInfo.userInfo,
                },
                success: (res2) => {
                  setIsLogin(true);
                  //console.log(res2);
                  try {
                    Taro.setStorageSync("token", res2.data.data[0]);
                  } catch (e) {
                    Taro.showToast({
                      title: "出错了",
                      icon: "error",
                      duration: 1000,
                    });
                  }
                  Taro.setStorage({
                    key: "user_id",
                    data: res2.data.data[1],
                  });

                  Taro.showToast({
                    title: "登录成功",
                    icon: "success",
                    duration: 1000,
                  });
                  setTimeout(() => {
                    Taro.reLaunch({ url: "/pages/index/index" });
                  }, 1000);
                },
              });
            },
          });
        },
      });
    }
  };
  return (
    <View className="user-wrap">
      <View className="head-wrap">
        <View className="avatar-wrap">
          <Button
            className="avatar"
            openType="chooseAvatar"
            onChooseAvatar={(e) => {
              serAvatarUrl(e.detail.avatarUrl);
            }}
            style={{ backgroundImage: `url(${avatarUrl})` }}
          />
        </View>
        <text>{isLogin ? "今天也是元气满满的一天哦!" : "点击获取头像"}</text>
      </View>
      <View className="bottom-wrap">
        {/* <View className='bottom-item'>
          <View className='item-icon icon1'></View>
          <View className='item-msg'>
            <View className='msg-detail'>自定义标签</View>
            <View className='msg-left'></View>
          </View>
        </View> */}
        <View
          className="bottom-item"
          onClick={() => {
            Taro.navigateTo({ url: "/module2/pages/achievements/index" });
          }}
        >
          <View className="item-icon icon2"></View>
          <View className="item-msg">
            <View className="msg-detail">成就组管理</View>
            <View className="msg-left"></View>
          </View>
        </View>
        <View
          className="bottom-item"
          onClick={() => {
            Taro.navigateTo({ url: "/module2/pages/feedback/index" });
          }}
        >
          <View className="item-icon icon3"></View>
          <View className="item-msg">
            <View className="msg-detail">帮助与反馈</View>
            <View className="msg-left"></View>
          </View>
        </View>
        <View
          className="bottom-item"
          onClick={() => {
            Taro.navigateTo({ url: "/module2/pages/agreeMent/index" });
          }}
        >
          <View className="item-icon icon4"></View>
          <View className="item-msg">
            <View className="msg-detail">用户协议</View>
            <View className="msg-left"></View>
          </View>
        </View>
        {/* <View className="bottom-item">
          <View className="item-icon icon5"></View>
          <View className="item-msg">
            <View className="msg-detail" onClick={()=>{Taro.navigateTo({url:"pages/graph/index"})}}>图谱功能</View>
            <View className="msg-left"></View>
          </View>
        </View> */}
      </View>
      <View className="submit" onClick={login}>
        {isLogin ? "退出登录" : "登录"}
      </View>
    </View>
  );
}

export default Profile;
