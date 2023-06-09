/* eslint-disable jsx-quotes */
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import "./MemoryCard.scss";

function MemoryCard(props) {
  const { msg } = props;
  const [tagName, setTagName] = useState("");
  const [color, setColor] = useState("");
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    Taro.getStorage({
      key: "token",
      success: (res) => {
        Taro.request({
          url: "https://ysjy.alplune.top/yun/api/team/findTeamById",
          method: "GET",
          header: {
            token: res.data,
          },
          data: {
            team1_id: msg.details.group,
          },
          success: (res3) => {
            Taro.request({
              url: "https://ysjy.alplune.top/yun/api/label/detailLabel",
              method: "GET",
              header: {
                token: res.data,
              },
              data: {
                label_id: msg.details.tagId,
              },
              success: (data) => {
                console.log(data);
                setTagName(data.data.data.name);
                setColor(data.data.data.color);
                setTeamName(res3.data.data.name);
              },
            });
          },
        });
      },
    });
  }, []);
  const [showDetail, setShowDetail] = useState(false);
  return (
    <View className="memory-card-wrap">
      <View className="card-point" style={{ background: color }}></View>
      <View className="card-msg">
        <View className="card-date">{msg.details.airtime}</View>
        <View
          className="card-content"
          onClick={() => {
            setShowDetail((prev) => {
              return !prev;
            });
          }}
          style={{
            background: color,
          }}
        >
          <View className="card-top">
            <View className="title1">{msg.title}</View>
            <View className="top-bg"></View>
            {showDetail ? (
              <View
                className="change-icon"
                onClick={(event) => {
                  event.stopPropagation();
                  Taro.navigateTo({
                    url: `/module1/pages/edit/index?name=${msg.title}&time=${msg.details.airtime}&remarks=${msg.details.description}&id=${msg.details.id}&teamId=${msg.details.group}&tagId=${msg.details.tagId} `,
                  });
                }}
              ></View>
            ) : null}
          </View>
          <View
            className="card-detail"
            style={showDetail ? { height: `${320}rpx` } : {}}
          >
            <View className="detail-item">{msg.details.deadline}</View>
            <View className="detail-item">成就组：{teamName}</View>
            <View className="detail-item">{tagName}</View>
            <View className="detail-item">{msg.details.description}</View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MemoryCard;
