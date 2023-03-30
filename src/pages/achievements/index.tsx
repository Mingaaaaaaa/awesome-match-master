import { View, Text, Image, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import "./index.scss";

function Achievements() {
  var token;
  const [assets, setAssets] = useState(["论文", "论文", "论文", "论文"]);

  useEffect(() => {
    Taro.getStorage({
      key: "token",
      success: function (res) {
        token = res;
        //2  find allteam
        Taro.request({
          url: "http://124.222.4.79:3310/api/team/findTeamAll",
          method: "GET",
          header: {
            token: res,
          },
          success: (res1) => {
            // setAssets(res1)
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
    setAssets((pre, nex) => {
      return [...pre, "请输入成就组名称..."];
    });
  };
  const handleTeam = (id) => {
    console.log(id);
    // //1 addteam
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/team/addTeam",
    //   method: "GET",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     name: "论文2",
    //   },
    //   success: (res3) => {
    //     console.log(res3);
    //   },
    // });

    // //1 updateteam
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/team/updateTeam",
    //   method: "POST",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     id:
    //     name: "论文2",
    //   },
    //   success: (res3) => {
    //     console.log(res3);
    //   },
    // });
  };
  const deleteTeam = () => {
    //4  delTeam
    Taro.request({
      url: "http://124.222.4.79:3310/api/team/delTeam",
      method: "GET",
      header: {
        token: token,
      },
      data: {
        team1_id: 2,
      },
    });
  };
  return (
    <View className="page">
      {assets.map((item, index) => {
        return (
          <View className="achieve" key={index}>
            <Input
              id={index.toString()}
              value={item}
              className="team-name"
              onBlur={(e) => {
                handleTeam(e.mpEvent.target.id);
              }}
            ></Input>
            <Image
              onClick={() => {
                Taro.navigateTo({ url: "/pages/tags/index" });
              }}
              className="arrow"
              src="../../assets/arrow.png"
            />
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
