/* eslint-disable jsx-quotes */
import { View, Text, Picker } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Fragment, useEffect, useRef, useState } from "react";
import MemoryCard from "../../components/Memory/MemoryCard";
import { formatDate } from "../../utils/index";
import "./index.scss";

function Todo() {
  const today = formatDate(new Date());
  const [records, setRecords] = useState([
    {
      name: " ",
      id: "",
      introduction: "",
      label: "",
      team1: "",
      endTime: "",
    },
  ]);
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupNames, setGroupNames] = useState(["全部"]);
  const groups = useRef([{ name: "全部", id: 0 }]);
  const token = useRef();
  useEffect(() => {
    Taro.getStorage({
      key: "token",
      success: function (res) {
        token.current = res.data;
        getRecords(1, 100, []);
        //2  find allteam
        Taro.request({
          url: "http://124.222.4.79:3310/api/team/findTeamAll",
          method: "GET",
          header: { token: res.data },
          success: (res1: any) => {
            //console.log(res1);
            Taro.setStorage({
              key: "user_id",
              data: res1.data.data[0].user_id,
            });
            groups.current.push.apply(groups.current, res1.data.data);
            setGroupNames(groups.current.map((i) => i.name));
            //console.log(groups.current);
          },
          fail: () => {
            Taro.showToast({
              title: "获取成就组失败",
              icon: "error",
              duration: 2000,
            });
          },
        });
      },
      fail: function () {
        Taro.showToast({
          title: "请先登录",
          icon: "error",
          duration: 2000,
        });
        setTimeout(() => {
          Taro.switchTab({ url: "/pages/profile/index" });
        }, 1000);
      },
    });
  }, []);

  const getRecords = (page: number, size: number, teams: Array<number>) => {
    //8   find all records
    Taro.request({
      url: "http://124.222.4.79:3310/api/record/findRecord",
      method: "GET",
      header: { token: token.current },
      data: {
        page: page,
        size: size,
        start_time: today,
        end_time: "3032-01-01",
        teams: teams,
      },
      success: (res1) => {
        setRecords(res1.data.data.current_data);
      },
    });
  };

  Taro.usePullDownRefresh(() => {
    getRecords(3, 100, []);
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 200);
  });
  return (
    <Fragment>
      {records.length < 1 ? (
        <View className="todo-wrap">
          <View className="header">
            <Text className="title1">待做计划</Text>
            <Picker
              className="select"
              mode="selector"
              range={groupNames}
              onChange={(e) => {
                //console.log(e);
                setGroupIndex(Number(e.detail.value));
                if (e.detail.value == "0") {
                  getRecords(1, 100, []);
                } else {
                  getRecords(1, 100, [
                    groups.current[Number(e.detail.value)].id,
                  ]);
                }
              }}
            >
              {groupNames[groupIndex]}
              <View className="filter-icon"></View>
            </Picker>
          </View>
          <View className="none-wrap">
            <View className="none-bg"></View>
            <View className="none-title">计划清单是空的</View>
            <View className="none-slg">创建计划将添加至此</View>
          </View>
        </View>
      ) : (
        <View className="wrap">
          <View className="header">
            <Text className="title1">待做计划</Text>
            <Picker
              className="select"
              mode="selector"
              range={groupNames}
              onChange={(e) => {
                //console.log(e);
                setGroupIndex(Number(e.detail.value));
                if (e.detail.value == "0") {
                  getRecords(1, 100, []);
                } else {
                  getRecords(1, 100, [
                    groups.current[Number(e.detail.value)].id,
                  ]);
                }
              }}
            >
              {groupNames[groupIndex]}
              <View className="filter-icon"></View>
            </Picker>
          </View>

          {records.map((val, index) => {
            if (val.id) {
              return (
                <MemoryCard
                  msg={{
                    title: val.name,
                    details: {
                      airtime: val.endTime.substring(0, 10),
                      deadline: val.endTime.substring(0, 10),
                      group: val.team1,
                      tagId: val.label,
                      description: val.introduction,
                      id: val.id,
                    },
                  }}
                  key={index}
                ></MemoryCard>
              );
            } else {
              Taro.showToast({
                title: "加载中ing",
                icon: "loading",
                duration: 500,
              });
            }
          })}
        </View>
      )}
      <View
        className="add"
        onClick={() => {
          Taro.navigateTo({ url: "/module1/pages/add/index" });
        }}
      >
        +
      </View>
    </Fragment>
  );
}

export default Todo;
