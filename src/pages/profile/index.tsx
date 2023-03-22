import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

function Profile() {

  const login = () => {
    let userInfo
    //islogin?
    Taro.getUserProfile({
      desc: '用于获取用户的头像和呢称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        console.log(res);
        userInfo = res;
        Taro.login({
          success: (res1) => {
            console.log(res1);
            Taro.request({
              url: 'http:124.222.4.79:3310/api/user/login',
              method: 'POST',
              data: {
                code: res1.code,
                raw_data: userInfo.rawData,
                signature: userInfo.signature,
                encrypted_data: userInfo.encryptedData,
                iv: userInfo.iv,
                user_info: userInfo.userInfo,
              },
              success: (res2) => {
                console.log(res2);
              }
            })
          }
        })
      }
    })

    Taro.request({
      url: 'http:124.222.4.79:3310/api/user/detail',
      method: 'GET',
      success: (res2) => {
        console.log(res2);
      }
    })
  }
  return (
    <View className='user-wrap'>
      <View className='head-wrap'>
        <View className='avatar-wrap' onClick={login}>
          <View
            className='avatar'
          // style={{ backgroundImage: `url(${userInfo.avatarUrl})` }}
          ></View>
        </View>
      </View>
      <View className='bottom-wrap'>
        {/* <View className='bottom-item'>
          <View className='item-icon icon1'></View>
          <View className='item-msg'>
            <View className='msg-detail'>自定义标签</View>
            <View className='msg-left'></View>
          </View>
        </View> */}
        <View className='bottom-item' onClick={()=>{Taro.navigateTo({url:'/pages/achievements/index'})}}>
          <View className='item-icon icon2'></View>
          <View className='item-msg'>
            <View className='msg-detail'>成就组管理</View>
            <View className='msg-left'></View>
          </View>
        </View>
        <View className='bottom-item' onClick={()=>{Taro.navigateTo({url:'/pages/feedback/index'})}}>
          <View className='item-icon icon3'></View>
          <View className='item-msg'>
            <View className='msg-detail' >帮助与反馈</View>
            <View className='msg-left'></View>
          </View>
        </View>
        <View className='bottom-item' onClick={()=>{Taro.navigateTo({url:'/pages/agreeMent/index'})}}>
          <View className='item-icon icon4'></View>
          <View className='item-msg'>
            <View className='msg-detail'>用户协议</View>
            <View className='msg-left'></View>
          </View>
        </View>
        <View className='bottom-item'>
          <View className='item-icon icon5'></View>
          <View className='item-msg'>
            <View className='msg-detail'>更新日志</View>
            <View className='msg-left'></View>
          </View>
        </View>
      </View>
      <View
        className='submit'
        onClick={login}
      >
        退出登陆
      </View>
    </View>
  );
}

export default Profile;
