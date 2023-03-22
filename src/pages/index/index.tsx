import Taro from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
import MemoryCard from "../../components/Memory/MemoryCard";
import "./index.scss";

export default function Index() {
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
  return (
    <View className='index'>
      {assets.map((val, index) => {
        return (
          <MemoryCard msg={val} key={index} color={colors[index]}></MemoryCard>
        );
      })}
      <View className='btns'>
        <Button className='export'
          onClick={() => {
            Taro.navigateTo({ url: "/pages/export/index" });
          }}
        >导出</Button>
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
  );
}
