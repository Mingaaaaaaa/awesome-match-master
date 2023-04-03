/* eslint-disable jsx-quotes */
import { Fragment, useState } from "react";
import {
  View,
  Text,
  Picker,
  Checkbox,
  CheckboxGroup,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { formatDate } from "../../utils/index";
import calendarIcon from "../../assets/calendar.png";
import "./index.scss";

function Export() {
  //改之前获取相应数据
  const today = formatDate(new Date());
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [startTime, setStartTime] = useState(today);
  const [endTime, setEndTime] = useState(today);
  const achievements = ["A", "B", "C"];
  const [achievement, setAchievement] = useState(0);
  const [selTag, setSelTag] = useState(0);
  const [inclusion, setInclusion] = useState(["4"]);
  const [order, setOrder] = useState(1);
  const orderName = ["按成就组排序", "按时间排序"];
  const exportRecord = (
    name,
    remarks,
    startTime,
    endTime,
    inclusion,
    order
  ) => {
    Taro.getStorage({
      key: "user_id",
      success: (res) => {
        //16
        Taro.getStorage({
          key: "token",
          success: (res1) => {
            console.log(inclusion);

            Taro.request({
              url: "http://124.222.4.79:3310/api/record/findRecord",
              method: "GET",
              header: { token: res1.data },
              data: {
                page: 1,
                size: 1111,
                start_time: "2022-01-01",
                end_time: today,
                teams: [],
              },
              success: (res2) => {
                console.log(res2.data.data.current_data);
                let choice = res2.data.data.current_data.map((item) => {
                  return {
                    team_id: item.team1,
                    labels: [item.label],
                  };
                });
               console.log(choice);
                Taro.request({
                  url: "http://124.222.4.79:3310/api/export/intro",
                  method: "POST",
                  header: {
                    token: res1.data,
                  },
                  data: {
                    type: "文本",
                    start_time: startTime,
                    end_time: endTime,
                    choice: choice,
                    inclusion: inclusion,
                    order: Number(order) + 1,
                    user_id: res.data,
                  },
                  success: (res3) => {
                    console.log(res3.data.data);
                    let data = res3.data.data.replace(/↵/g, "\n");
                    Taro.showModal({
                      title: "复制到剪切板？",
                      content: data,
                      success: function (res) {
                        if (res.confirm) {
                          console.log("用户点击确定");
                        } else if (res.cancel) {
                          console.log("用户点击取消");
                        }
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  };
  return (
    <Fragment>
      <Text className="title">记忆导出</Text>
      <View className="form-wrap">
        <View className="form-item">
          <Text className="form-label">导出类型</Text>
          <View className="form-inner">
            <Picker
              mode="selector"
              // range={["文字导出", "图片导出", "文件导出"]}
              range={["文字导出"]}
              value={0}
              onChange={(e) => {
                console.log(e.currentTarget);
              }}
            >
              文字导出
            </Picker>
            <View className="form-icon"></View>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <Text className="form-label">日期约束</Text>
          <View className="form-inner">
            <Picker
              style={{ marginRight: "10px" }}
              mode="date"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.detail.value);
              }}
            >
              {startTime}
            </Picker>{" "}
            ~{" "}
            <Picker
              style={{ marginLeft: "10px" }}
              mode="date"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.detail.value);
              }}
            >
              {endTime}
            </Picker>
            <View
              className="form-icon"
              style={{
                backgroundImage: `url(${calendarIcon})`,
              }}
            ></View>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <Text className="form-label">成就组与标签选择</Text>
          <View className="form-inner">
            <Picker
              mode="multiSelector"
              range={[
                ["成就组1", "成就组2", "成就组3", "成就组4"],
                ["标签1", "标签2", "标签3", "标签4"],
              ]}
              value={0}
              onChange={(e) => {
                console.log("成就组与标签选择");
                console.log(e);
              }}
            >
              选择要导出的记忆
            </Picker>
            <View className="form-icon"></View>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <Text className="form-label">格式选择</Text>
          <View className="form-inner tags">
            <CheckboxGroup
              onChange={(e) => {
                console.log(e);
                setInclusion(e.detail.value);
              }}
            >
              <Checkbox value={1}>日期</Checkbox>
              <Checkbox value={2}>成就组</Checkbox>
              <Checkbox value={3}>标签</Checkbox>
              <Checkbox value={4} checked>
                简介
              </Checkbox>
            </CheckboxGroup>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <View className="form-label ">排序方式</View>
          <View className="tag-wrap ">
            <Picker
              range={orderName}
              value={order}
              onChange={(e) => {
                console.log(e);
                setOrder(e.detail.value);
              }}
            >
              {orderName[order]}
            </Picker>
          </View>
          <View className="form-divide last-divide"></View>
        </View>
        <View className="form-item">
          <View
            className="form-btn"
            onClick={() => {
              exportRecord(name, remarks, startTime, endTime, inclusion, order);
              console.log(
                startTime,
                endTime,
                // achievement,
                // selTag,
                inclusion,
                order
              );
            }}
          >
            导出
          </View>
        </View>
      </View>
    </Fragment>
  );
}

export default Export;
