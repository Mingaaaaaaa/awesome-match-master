/* eslint-disable jsx-quotes */
import { PageContainer, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import "./index.scss";

export default function ColorPicker(props) {
  console.log(props);
  const [rate, setRate] = useState<Number>(1);
  const [colorData, setColorData] = useState({
    //基础色相(色盘右上顶点的颜色)
    hueData: {
      colorStopRed: 255,
      colorStopGreen: 0,
      colorStopBlue: 0,
    },
    //选择点的信息
    pickerData: {
      x: 240,
      y: 240,
      red: 0,
      green: 0,
      blue: 0,
      hex: "#000000",
    },
    //色相控制条位置
    barY: 0,
  });
  const onChangeColor = (e) => {
    setColorData(e.detail.colorData);
    let changeColor = e.detail.colorData.pickerData.hex;
    props.setTags((pre) => {
      console.log(pre);
      pre[props.changeTagIndex].color = changeColor;
      return pre;
    });
  };
  useEffect(() => {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        setRate(Number((res.windowWidth / 750).toFixed(2)));
      },
    });
  }, []);
  return (
    <PageContainer
      show={props.show}
      round
      zIndex={2}
      closeOnSlideDown
      overlayStyle="background-color: rgba(0, 0, 0, 0.05);"
      customStyle="padding-top: 20px ;padding-left:40px"
      duration={300}
      onLeave={() => {
        props.setIsShow(false);
      }}
      onClickOverlay={() => {
        props.setIsShow(false);
      }}
    >
      <color-picker
        className="picker"
        colorData={colorData}
        rpxRatio={1}
        onChangeColor={(e) => {
          onChangeColor(e);
          console.log(rate);
        }}
      ></color-picker>
      <View
        className="select"
        onClick={() => {
          props.setIsShow(false);
          props.handleTag(props.changeTagIndex);
        }}
      >
        选好啦
      </View>
    </PageContainer>
  );
}
