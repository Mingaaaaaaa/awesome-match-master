import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";

function Achievements() {
  const [assets, setAssets] = useState(["论文", "论文", "论文", "论文",])
  return (
    <View className="page">
      {assets.map((item, index) => {
        return (
          <View
            className='achieve'
            key={index}
            onClick={() => { Taro.navigateTo({ url: "/pages/tags/index" }) }}
          >
            <Text>{item}</Text>
            <Image className='arrow' src='../../assets/arrow.png' />
          </View>
        )
      })}
      <button
        className='add'
        onClick={() => {
          setAssets((pre, nex) => {
            return [...pre, "请输入成就组名称..."]
          })
        }}
      >
        新建
      </button>
    </View>
  );
}

export default Achievements;
