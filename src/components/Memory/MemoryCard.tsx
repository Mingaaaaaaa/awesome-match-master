import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import "./MemoryCard.scss";

function MemoryCard(props: { msg; color }) {
  const { msg, color } = props;
  const [showDetail, setShowDetail] = useState(false);
  return (
    <View className='memory-card-wrap'>
      <View
        className='card-point'
        style={{ background: `${color.pointColor}` }}
      ></View>
      <View className='card-msg'>
        <View className='card-date'>{msg.details.airtime}</View>
        <View
          className='card-content'
          onClick={() => {
            setShowDetail((prev) => {
              return !prev;
            });
          }}
          style={{
            background: `${color.bgColor}`,
            boxShadow: `${color.shadow}`,
          }}
        >
          <View className='card-top'>
            <View className='title'>{msg.title}</View>
            <View className='top-bg'></View>
            {showDetail ? (
              <View
                className='change-icon'
                onClick={(event) => {
                  event.stopPropagation();
                  Taro.navigateTo({ url: "/pages/edit/index" });
                }}
              ></View>
            ) : null}
          </View>
          <View
            className='card-detail'
            style={showDetail ? { height: `${320}rpx` } : {}}
          >
            <View className='detail-item'>{msg.details.deadline}</View>
            <View className='detail-item'>{msg.details.group}</View>
            <View className='detail-item'>{msg.details.tag}</View>
            <View className='detail-item'>{msg.details.description}</View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MemoryCard;
