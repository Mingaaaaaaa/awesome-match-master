/* eslint-disable jsx-quotes */
import { Fragment, useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import { Button, View, Picker } from "@tarojs/components";
import { formatDate } from "../../utils/index";
import MemoryCard from "../../components/Memory/MemoryCard";
import "./index.scss";

interface record {
  name: string;
  id: string;
  introduction: string;
  label: string;
  team1: string;
  endTime: string;
}
export default function Index() {
  const today = formatDate(new Date());
  const [records, setRecords] = useState<Array<record>>([
    {
      name: "",
      id: "",
      introduction: "",
      label: "", //85
      team1: "", //24
      endTime: "",
    },
  ]);
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupNames, setGroupNames] = useState(["全部"]);
  const groups = useRef([{ name: "全部", id: 0 }]);
  const token = useRef();
  useEffect(() => {
    console.log(1);
    Taro.getStorage({
      key: "token",
      success: function (res) {
        token.current = res.data;
        //2  find allteam
        Taro.request({
          url: "https://ysjy.alplune.top/yun/api/team/findTeamAll",
          method: "GET",
          header: { token: res.data },
          success: (res1: any) => {
            //console.log(res1);
            Taro.setStorage({
              key: "user_id",
              data: res1.data.data[0].user_id,
            });
            groups.current.push.apply(groups.current, res1.data.data);
            getRecords(1, 100, []);
            setGroupNames(groups.current.map((i) => i.name));
            // groupNames.current= groups.current.map((i)=>i.name)
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
      url: "https://ysjy.alplune.top/yun/api/record/findRecord",
      method: "GET",
      header: { token: token.current },
      data: {
        page: page,
        size: size,
        start_time: "1900-01-01",
        end_time: today,
        teams: teams,
      },
      success: (res1) => {
        console.log(res1);
        setRecords(res1.data.data.current_data);
      },
    });
  };
  Taro.usePullDownRefresh(() => {
    getRecords(1, 100, []);
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 200);
  });
  return (
    <Fragment>
      {records.length >= 1 ? (
        <View className="index">
          <View className="wrap">
            <View className="header">
              <Picker
                className="select"
                mode="selector"
                range={groupNames}
                onChange={(e) => {
                  Taro.showLoading({
                    title: "加载中",
                  });
                  //console.log(e);
                  setGroupIndex(Number(e.detail.value));
                  if (e.detail.value == "0") {
                    getRecords(1, 100, []);
                  } else {
                    getRecords(1, 100, [
                      groups.current[Number(e.detail.value)].id,
                    ]);
                  }
                  Taro.hideLoading();
                }}
              >
                {groupNames[groupIndex]}
                <View className="filter-icon"></View>
              </Picker>
            </View>
            {records.map((val: record, index) => {
              if (val.id) {
                return (
                  <MemoryCard
                    msg={{
                      title: val.name,
                      details: {
                        airtime: val.endTime.slice(0, 10),
                        deadline: val.endTime.slice(0, 10),
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
          <View className="btns">
            <Button
              className="export"
              onClick={() => {
                Taro.navigateTo({ url: "/pages/export/index" });
              }}
            >
              导出
            </Button>
            <View
              className="add"
              onClick={() => {
                Taro.navigateTo({ url: "/module1/pages/add/index" });
              }}
            >
              +
            </View>
          </View>
        </View>
      ) : (
        <View className="todo-wrap">
          <View className="header">
            <Picker
              className="select"
              mode="selector"
              range={groupNames}
              onChange={(e) => {
                Taro.showLoading({
                  title: "加载中",
                });
                //console.log(e);
                setGroupIndex(Number(e.detail.value));
                if (e.detail.value == "0") {
                  getRecords(1, 100, []);
                } else {
                  getRecords(1, 100, [
                    groups.current[Number(e.detail.value)].id,
                  ]);
                }
                Taro.hideLoading();
              }}
            >
              {groupNames[groupIndex]}
              <View className="filter-icon"></View>
            </Picker>
          </View>
          <View className="none-wrap">
            <View className="none-bg"></View>
            <View className="none-title">这里记忆是空的</View>
            <View className="none-slg">新增回忆将添加至此</View>
          </View>
          <View className="btns">
            <Button
              className="export"
              onClick={() => {
                Taro.navigateTo({ url: "/pages/export/index" });
              }}
            >
              导出
            </Button>
            <View
              className="add"
              onClick={() => {
                Taro.navigateTo({ url: "/module1/pages/add/index" });
              }}
            >
              +
            </View>
          </View>
        </View>
      )}
    </Fragment>
  );
}
