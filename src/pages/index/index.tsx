/* eslint-disable jsx-quotes */
import { Fragment, useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import { Button, View, Picker, Icon, Input } from "@tarojs/components";
import { formatDate } from "../../utils/index";
import MemoryCard from "../../components/Memory/MemoryCard";
import "./index.scss";

export default function Index() {
  const today = formatDate(new Date());
  const [records, setRecords] = useState([{ endTime: "" }]);
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupNames, setGroupNames] = useState(["ALL"]);
  const groups = useRef([{ name: "All", id: 0 }]);
  const token = useRef();
  useEffect(() => {
    Taro.getStorage({
      key: "token",
      success: function (res) {
        token.current = res.data;
        getRecords(3, 100, []);
        //2  find allteam
        Taro.request({
          url: "http://124.222.4.79:3310/api/team/findTeamAll",
          method: "GET",
          header: { token: res.data },
          success: (res1: any) => {
            console.log(res1);
            Taro.setStorage({
              key: "user_id",
              data: res1.data.data[0].user_id,
            });
            groups.current.push.apply(groups.current, res1.data.data);
            setGroupNames(groups.current.map((i) => i.name));
            // groupNames.current= groups.current.map((i)=>i.name)
            console.log(groups.current);
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
  const assets = [
    {
      title: "论文发表",
      details: {
        airtime: "7月9日",
        deadline: "7月9日",
        group: "科研",
        tag: "论文发表",
        description:
          "2022年7月8日论文被SCI期刊接收，IF=1，从投稿到接收历时六个月。",
      },
    },
    {
      title: "论文发表",
      details: {
        airtime: "7月9日",
        deadline: "7月9日",
        group: "科研",
        tag: "论文发表",
        description:
          "2022年7月8日论文被SCI期刊接收，IF=1，从投稿到接收历时六个月。",
      },
    },
    {
      title: "论文发表",
      details: {
        airtime: "7月9日",
        deadline: "7月9日",
        group: "科研",
        tag: "论文发表",
        description:
          "2022年7月8日论文被SCI期刊接收，IF=1，从投稿到接收历时六个月。",
      },
    },
    {
      title: "论文发表",
      details: {
        airtime: "7月9日",
        deadline: "7月9日",
        group: "科研",
        tag: "论文发表",
        description:
          "2022年7月8日论文被SCI期刊接收，IF=1，从投稿到接收历时六个月。",
      },
    },
    {
      title: "论文发表",
      details: {
        airtime: "7月9日",
        deadline: "7月9日",
        group: "科研",
        tag: "论文发表",
        description:
          "2022年7月8日论文被SCI期刊接收，IF=1，从投稿到接收历时六个月。",
      },
    },
    {
      title: "论文发表",
      details: {
        airtime: "7月9日",
        deadline: "7月9日",
        group: "科研",
        tag: "论文发表",
        description:
          "2022年7月8日论文被SCI期刊接收，IF=1，从投稿到接收历时六个月。",
      },
    },
    {
      title: "论文发表",
      details: {
        airtime: "7月9日",
        deadline: "7月9日",
        group: "科研",
        tag: "论文发表",
        description:
          "2022年7月8日论文被SCI期刊接收，IF=1，从投稿到接收历时六个月。",
      },
    },
    {
      title: "论文发表",
      details: {
        airtime: "7月9日",
        deadline: "7月9日",
        group: "科研",
        tag: "论文发表",
        description:
          "2022年7月8日论文被SCI期刊接收，IF=1，从投稿到接收历时六个月。",
      },
    },
  ];
  const colors = [
    {
      pointColor: "#00A2FF",
      bgColor: "linear-gradient(208.63deg, #39A1F7 0%, #A875FF 100%)",
      shadow: "0px 1px 15px 0px #4A90E2",
    },
    {
      pointColor: "#97D9E1",
      bgColor: "linear-gradient(67deg, #D9AFD9 0%, #97D9E1 100%)",
      shadow: "0px 1px 15px 0px #BAC5DE",
    },
    {
      pointColor: "#FF8D1A",
      bgColor: "linear-gradient(62deg, #F7CE68 0%, #FBAB7E 50%)",
      shadow: "0px 1px 15px 0px #FF8D1A",
    },
    {
      pointColor: "#FF8D1A",
      bgColor: "linear-gradient(62deg, #F7CE68 0%, #FBAB7E 50%)",
      shadow: "0px 1px 15px 0px #FF8D1A",
    },
    {
      pointColor: "#FF8D1A",
      bgColor: "linear-gradient(62deg, #F7CE68 0%, #FBAB7E 50%)",
      shadow: "0px 1px 15px 0px #FF8D1A",
    },
    {
      pointColor: "#FF8D1A",
      bgColor: "linear-gradient(62deg, #F7CE68 0%, #FBAB7E 50%)",
      shadow: "0px 1px 15px 0px #FF8D1A",
    },
    {
      pointColor: "#FF8D1A",
      bgColor: "linear-gradient(62deg, #F7CE68 0%, #FBAB7E 50%)",
      shadow: "0px 1px 15px 0px #FF8D1A",
    },
    {
      pointColor: "#FF8D1A",
      bgColor: "linear-gradient(62deg, #F7CE68 0%, #FBAB7E 50%)",
      shadow: "0px 1px 15px 0px #FF8D1A",
    },
  ];
  const getRecords = (page: number, size: number, teams: Array<number>) => {
    //8   find all records
    Taro.request({
      url: "http://124.222.4.79:3310/api/record/findRecord",
      method: "GET",
      header: { token: token.current },
      data: {
        page: page,
        size: size,
        start_time: "2022-01-01",
        end_time: today,
        teams: teams,
      },
      success: (res1) => {
        console.log(res1);
        setRecords(res1.data.data.current_data);
      },
    });
  };

  return (
    <Fragment>
      {records.length > 1 ? (
        <View className="index">
          <View className="wrap">
            <View className="header">
              <View className="search">
                <Icon size="20" type="search" className="search-icon"></Icon>
                <Input className="search-input"></Input>
              </View>
              <Picker
                className="select"
                mode="selector"
                range={groupNames}
                onChange={(e) => {
                  Taro.showLoading({
                    title: "加载中",
                  });
                  console.log(e);
                  setGroupIndex(Number(e.detail.value));
                  if(e.detail.value=='0'){
                    getRecords(1, 100, [])
                  }
                  else{
                    getRecords(1, 100, [groups.current[Number(e.detail.value)].id]);
                  }
                  Taro.hideLoading();
                }}
              >
                当前：{groupNames[groupIndex]}
                <View className="filter-icon"></View>
              </Picker>
            </View>
            {records.map((val, index) => {
              console.log(val);
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
                    },
                  }}
                  key={index}
                ></MemoryCard>
              );
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
                Taro.navigateTo({ url: "/pages/add/index" });
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
                console.log(e);
                setGroupIndex(Number(e.detail.value));
                if(e.detail.value=='0'){
                  getRecords(1, 100, [])
                }
                else{
                  getRecords(1, 100, [groups.current[Number(e.detail.value)].id]);
                }
                Taro.hideLoading();
              }}
            >
              当前：{groupNames[groupIndex]}
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
                Taro.navigateTo({ url: "/pages/add/index" });
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
