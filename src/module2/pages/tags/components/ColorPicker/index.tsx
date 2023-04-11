/* eslint-disable jsx-quotes */
import { PageContainer, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import "./index.scss";

export default function ColorPicker(props) {
  const colors = [
    "#206CCF",
    "#D9480F",
    "#C92A2A",
    "#CB1E83",
    "#0E42D2",
    "#551DB0",
    "#0DA5AA",
    "#CC9213",
    "#4E5969",
    "#3491FA",
    "#37B24D",
    "#F7BA1E",
    "#14C9C9",
    "#722ED1",
    "#165DFF",
    "#F5319D",
    "#CB272D",
    "#F76707",
    "#37B24D",
    "#86909C",
  ];
  const [active, setActive] = useState();
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
  const colorChange = (changeColor) => {
    console.log(changeColor);
    props.setTags((pre) => {
      console.log(pre);
      pre[props.changeTagIndex].color = changeColor;
      return pre;
    });
  };
  useEffect(() => {
    wx.getSystemInfo({
      success: function (res) {
        //console.log(res);
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
      duration={300}
      onLeave={() => {
        props.setIsShow(false);
      }}
      onClickOverlay={() => {
        props.setIsShow(false);
      }}
    >
      <View className="title">选一个喜欢的标签颜色吧~</View>
      <View className="color-container">
        {colors.map((item, index) => {
          return (
            <View
              key={index}
              className={active == index ? "color-item active" : "color-item"}
              style={{ background: item }}
              onClick={(e) => {
                setActive(index);
                console.log(colors[index]);
                colorChange(colors[index])
              }}
            ></View>
          );
        })}
      </View>
      {/* <color-picker
        className="picker"
        colorData={colorData}
        rpxRatio={1.2}
        onchangecolor={(e) => {
          console.log(e);
          colorChange(e);
          //console.log(rate);
        }}
      ></color-picker> */}
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
