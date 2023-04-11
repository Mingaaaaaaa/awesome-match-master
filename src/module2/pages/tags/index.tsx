/* eslint-disable jsx-quotes */
import { View, Image, Input, Button } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import ColorPicker from "./components/ColorPicker";
import "./index.scss";

function Tags() {
  const teamId = useRouter().params.id;
  const [isShow, setIsShow] = useState(false);
  const [tags, setTags] = useState([]);
  const [changeTagIndex, setChangeTageIndex] = useState();
  const [changeTagId, setChangeTageId] = useState();
  const [teamName, setTeamName] = useState("");
  const [f5, setF5] = useState(false);
  const token = useRef("");
  const userId = useRef("");
  useEffect(() => {
    Taro.getStorage({
      key: "user_id",
      success: (res) => {
        userId.current = res.data;
      },
      fail: (res) => {
        Taro.showToast({
          title: "获取userId失败",
          icon: "error",
          duration: 1000,
        });
      },
    });
    //  7
    //console.log(teamId);
    Taro.getStorage({
      key: "token",
      success: (res) => {
        token.current = res.data;
        Taro.request({
          url: "http://124.222.4.79:3310/api/label/findLabelByTeam",
          method: "GET",
          header: {
            token: res.data,
          },
          data: {
            team1_id: teamId,
          },
          success: (res1) => {
            //console.log(res1);
            setTags(res1.data.data);
          },
        });

        //3 findTeamById
        Taro.request({
          url: "http://124.222.4.79:3310/api/team/findTeamById",
          method: "GET",
          header: {
            token: res.data,
          },
          data: {
            team1_id: teamId,
          },
          success: (res3) => {
            setTeamName(res3.data.data.name);
          },
        });
      },
    });
  }, []);
  const deleteTag = (deleIndex) => {
    //9
    Taro.request({
      url: "http://124.222.4.79:3310/api/label/delLabel",
      method: "GET",
      header: {
        token: token.current,
      },
      data: {
        label_id: tags[deleIndex].id,
      },
      success: () => {
        Taro.showToast({
          title: "删除成功",
          icon: "success",
          duration: 700,
        });
      },
    });
    setTags((pre) => {
      pre.splice(deleIndex, 1);
      return pre;
    });
    setF5(!f5);
  };
  const handleTag = (index, name = tags[index].name) => {
    //console.log(tags[index]);
    //console.log(name);
    if (name) {
      if (tags[index].id == -1) {
        // 5  add label
        Taro.request({
          url: "http://124.222.4.79:3310/api/label/addLabel",
          method: "GET",
          header: {
            token: token.current,
          },
          data: {
            color: tags[index].color,
            name: name,
            team1: teamId,
          },
          success: () => {
            setTags((pre) => {
              pre[index].id = 0;
              return pre;
            });
          },
        });
      } else {
        // 6  update label
        Taro.request({
          url: "http://124.222.4.79:3310/api/label/updateLabel",
          method: "POST",
          header: {
            token: token.current,
          },
          data: {
            id: tags[index].id,
            color: tags[index].color,
            name: name,
            team1: teamId,
            user_id: userId.current,
          },
        });
      }
    }
  };
  const handleTeam = (id: string, name: string) => {
    //1 updateteam
    Taro.request({
      url: "http://124.222.4.79:3310/api/team/updateTeam",
      method: "POST",
      header: {
        token: token.current,
      },
      data: {
        id: id,
        name: name,
        user_id: userId.current,
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
  };
  const deleteTeam = () => {
    //console.log(tags);
    // 4  delTeam
    Taro.request({
      url: "http://124.222.4.79:3310/api/team/delTeam",
      method: "GET",
      header: {
        token: token.current,
      },
      data: {
        team1_id: teamId,
      },
      success: () => {
        Taro.showToast({
          title: "删除成功",
          icon: "success",
          duration: 1000,
        });
        setTimeout(() => {
          Taro.navigateTo({ url: "/module2/pages/achievements/index" });
        }, 700);
      },
    });
  };
  return (
    <View className="wrap">
      <Input
        className="achieveName"
        value={teamName}
        onBlur={(e) => {
          setTeamName(e.detail.value);
          handleTeam(teamId, e.detail.value);
        }}
      ></Input>
      <View className="divide"></View>
      <View className="tags-wrap">
        {tags.map((item, index) => {
          return (
            <View className="tag-item" key={index}>
              <View
                id={item.id}
                key={index}
                className="tag-color"
                style={{ background: `${item.color}` }}
                onClick={(e) => {
                  setIsShow(true);
                  //console.log(index);
                  setChangeTageIndex(index);
                  setChangeTageId(item.id);
                }}
              ></View>
              <Input
                className="tag-name"
                value={item.name}
                id={index}
                placeholder="输入标签名称"
                onBlur={(e) => {
                  //console.log(e);
                  //console.log(tags);
                  setTags((pre) => {
                    pre[e.mpEvent.target.id].name = e.detail.value;
                    return pre;
                  });
                  handleTag(e.mpEvent.target.id, e.detail.value);
                  // handleTag(tags[e.mpEvent.target.id].color, e.detail.value);
                }}
              ></Input>
              <Image
                id={index}
                className="delete"
                src="../../../assets/delete.png"
                onClick={(e) => {
                  deleteTag(e.mpEvent.target.id);
                }}
              ></Image>
            </View>
          );
        })}
      </View>

      <ColorPicker
        show={isShow}
        setIsShow={setIsShow}
        setTags={setTags}
        changeTagIndex={changeTagIndex}
        teamId={teamId}
        tagId={changeTagId}
        handleTag={handleTag}
      />
      <Button
        className="add"
        onClick={() => {
          setTags((pre) => {
            return [
              ...pre,
              {
                id: -1,
                name: "",
                color: "#D9C8B6",
              },
            ];
          });
        }}
      >
        新建
      </Button>
      <View className="delete-team" onClick={deleteTeam}>
        删除该成就组
      </View>
    </View>
  );
}
export default Tags;
