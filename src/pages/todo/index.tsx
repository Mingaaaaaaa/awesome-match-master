import { View, Text, Picker } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Fragment, useState } from "react";
import MemoryCard from "../../components/Memory/MemoryCard";
import "./index.scss";

function Todo() {
  const [group, setGroup] = useState(0)
  const groups = ['所有成就', '成就组1', '成就组3', '成就组2', '成就组4',]
  const plans = [
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
  return (
    <Fragment>
      {plans == null
        ?
        <View className='todo-wrap'>
          <View className='none-wrap'>
            <View className='none-bg'></View>
            <View className='none-title'>计划清单是空的</View>
            <View className='none-slg'>创建计划将添加至此</View>
            <View
              className='add'
              onClick={() => {
                Taro.navigateTo({ url: "/pages/add/index" });
              }}
            >
              +
            </View>
          </View>
        </View>
        :
        <View>
          <View className="header">
            <Text className='title1'>待做计划</Text>
            <Picker
              className='select'
              mode='selector'
              range={groups}
              onChange={(e) => {
                console.log(e);
                setGroup(Number(e.detail.value))
              }}
            >
              当前：{groups[group]}
              <View className="filter-icon"  ></View>
            </Picker>
          </View>


          {plans.map((val, index) => {
            return (
              <MemoryCard msg={val} key={index} color={colors[index]}></MemoryCard>
            );
          })}
        </View>
      }
      <View
        className='add'
        onClick={() => {
          Taro.navigateTo({ url: "/pages/add/index" });
        }}
      >
        +
      </View>
    </Fragment>

  );
}

export default Todo;
