import { useState } from "react";
import Taro from "@tarojs/taro";
import { Button, View, Picker, Icon, Input, Image } from "@tarojs/components";
import MemoryCard from "../../components/Memory/MemoryCard";
import "./index.scss";

export default function Index() {
  const [group, setGroup] = useState(0);
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
  const groups = ["所有成就", "成就组1", "成就组3", "成就组2", "成就组4"];
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const findTeamById = () => {
    // //3 findTeamById
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/team/findTeamById",
    //   method: "GET",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     team1_id: 1,
    //   },
    //   success: (res3) => {
    //     console.log(res3);
    //   },
    // });
  };
  const findRecord = () => {
    // //13
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/record/findRecord",
    //   method: "GET",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     page: 1,
    //     size: 10,
    //     start_time: "2022-01-01",
    //     end_time: "2023-01-01",
    //   },
    // });
  };
  return (
    <View className="index">
      <View className="header">
        <View className="search">
          <Icon size="20" type="search" className="search-icon"></Icon>
          <Input className="search-input"></Input>
        </View>
        <Picker
          className="select"
          mode="selector"
          range={groups}
          onChange={(e) => {
            console.log(e);
            setGroup(Number(e.detail.value));
          }}
        >
          当前：{groups[group]}
          <View className="filter-icon"></View>
        </Picker>
      </View>
      {assets.map((val, index) => {
        return (
          <MemoryCard msg={val} key={index} color={colors[index]}></MemoryCard>
        );
      })}
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
  );
}
