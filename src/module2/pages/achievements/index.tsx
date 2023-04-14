/* eslint-disable jsx-quotes */
import { View, Image, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import "./index.scss";

function Achievements() {
  const [assets, setAssets] = useState([
    { id: 0, name: "请输入成就组名称..." },
  ]);
  const token = useRef("");
  const ids = useRef([0]);
  useEffect(() => {
    Taro.getStorage({
      key: "token",
      success: function (res) {
        token.current = res.data;
        //2  find allteam
        Taro.request({
          url: "https://ysjy.alplune.top/yun/api/team/findTeamAll",
          method: "GET",
          header: {
            token: res.data,
          },
          success: (res1: any) => {
            console.log(res1);
            if (res1.data.data.length != 0) {
              setAssets(res1.data.data);
              ids.current = res1.data.data.map((i) => {
                return i?.id;
              });
            } else {
              handleTeam("0", "请输入成就组名称...");
            }
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
      fail: function () {},
    });
  }, []);

  const addTeam = () => {
    console.log(assets);
    setAssets((pre) => {
      console.log(pre);
      return [
        ...pre,
        { id: assets[assets.length - 1].id + 1, name: "请输入成就组名称..." },
      ];
    });
    handleTeam(assets[assets.length - 1].id + 1, "请输入成就组名称...");
  };

  const handleTeam = (id: string, name: string) => {
    //console.log(id + name);
    //console.log(ids);
    if (!ids.current.includes(Number(id)) || id == 0) {
      //1 addteam
      Taro.request({
        url: "https://ysjy.alplune.top/yun/api/team/addTeam",
        method: "GET",
        header: {
          token: token.current,
        },
        data: {
          name: name,
        },
        success: (res3) => {
          if (res3.data.code == 0) {
            Taro.showToast({
              title: "添加成功",
              icon: "success",
              duration: 1000,
            });
          } else {
            Taro.showToast({
              title: res3.data.msg,
              icon: "error",
              duration: 1000,
            });
          }
        },
      });
    } else {
      //1 updateteam
      Taro.request({
        url: "https://ysjy.alplune.top/yun/api/team/updateTeam",
        method: "POST",
        header: {
          token: token.current,
        },
        data: {
          id: Number(id),
          name: name,
        },
        success: (res3) => {
          if (res3.data.code == 0) {
            Taro.showToast({
              title: "更新成功",
              icon: "success",
              duration: 1000,
            });
          } else {
            Taro.showToast({
              title: res3.data.msg,
              icon: "error",
              duration: 1000,
            });
          }
        },
      });
    }
  };

  return (
    <View className="page">
      {assets.map((item, index) => {
        return (
          <View
            className="achieve"
            key={index}
            onClick={() => {
              Taro.navigateTo({
                url: `/module2/pages/tags/index?id=${item.id}`,
              });
            }}
          >
            <Input
              disabled
              id={item.id}
              value={item.name}
              className="team-name"
              // onBlur={(e) => {
              //   handleTeam(e.mpEvent.target.id, e.detail.value);
              // }}
            ></Input>
            <Image className="arrow" src="../../../assets/arrow.png" />
          </View>
        );
      })}
      <button
        className="add"
        onClick={() => {
          addTeam();
        }}
      >
        新建
      </button>
    </View>
  );
}

export default Achievements;
