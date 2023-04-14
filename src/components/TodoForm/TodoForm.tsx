/* eslint-disable jsx-quotes */
import { Fragment, useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Input, Picker } from "@tarojs/components";
import { formatDate } from "../../utils/index";
import featIcon from "../../assets/feat.png";
import calendarIcon from "../../assets/calendar.png";
import "./TodoForm.scss";

function TodoForm(props: {
  mode: "add" | "edit";
  type: "todo" | "memory";
  method: Function;
  data: {
    name: "";
    remarks: "";
    time: "";
    teamId: null;
    tagId: null;
    id: null;
  };
}) {
  console.log(props);
  const { mode, type, method, data } = props;
  //改之前获取相应数据
  const today = formatDate(new Date());
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [ddl, setDdl] = useState(today);
  const [teamIndex, setTeamIndex] = useState(0);
  const [teamNames, setTeamNames] = useState([""]);
  const [Tags, setTags] = useState([{ id: 0 }]);
  const [tagIndex, setTagIndex] = useState(0);
  const token = useRef("");
  const teams = useRef([]);

  const judgeMethod = () => {
    //console.log(teams);
    //console.log(teamIndex);
    if (name && teams.current[teamIndex] && Tags[tagIndex] && ddl) {
      props.method({
        name: name,
        labelId: Tags[tagIndex].id,
        teamId: teams.current[teamIndex].id,
        introduction: remarks ? remarks : "",
        end_time: ddl,
      });
      Taro.showToast({
        title: "操作成功",
        icon: "success",
        duration: 700,
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 700);
    } else {
      Taro.showToast({
        title: "数据哪里有问题捏~",
        icon: "error",
        duration: 1000,
      });
    }
  };
  const changeTeams = (Index, firstTime) => {
    setTeamIndex(Number(Index));
    Taro.request({
      url: "https://ysjy.alplune.top/yun/api/label/findLabelByTeam",
      method: "GET",
      header: {
        token: token.current,
      },
      data: {
        team1_id: teams.current[Number(Index)].id,
      },
      success: (res1) => {
        console.log(res1);
        setTags(res1.data.data);

        if (mode == "edit" && firstTime) {
          res1.data.data.map((item, index) => {
            if (item.id == props.data.tagId) {
              setTagIndex(index);
            }
          });
          Taro.request({
            url: "https://ysjy.alplune.top/yun/api/label/findLabelByTeam",
            method: "GET",
            header: {
              token: token.current,
            },
            data: {
              team1_id: props.data.teamId,
            },
            success: (res) => {
              console.log(res);
              setTags(res.data.data);
            },
          });
        }
      },
    });
  };
  const deleteRecord = () => {
    Taro.getStorage({
      key: "user_id",
      success: (res) => {
        Taro.request({
          url: "https://ysjy.alplune.top/yun/api/record/delRecord",
          method: "GET",
          header: { token: token.current },
          data: { record_id: data.id, user_id: res.data },
          success: (res1: any) => {
            console.log(res1);
            Taro.navigateBack();
          },
          fail: () => {
            Taro.showModal({
              title: "提示",
              content: "删除失败",
            });
          },
        });
      },
    });
  };
  useEffect(() => {
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
            teams.current = res1.data.data;
            setTeamNames(teams.current.map((i) => i.name));
            // teamNames.current= teams.current.map((i)=>i.name)
            changeTeams(0, true);
            if (mode == "edit") {
              //console.log(teams.current);
              teams.current.map((item, index) => {
                if (item.id == props.data.teamId) {
                  setTeamIndex(index);
                }
              });
            }
          },
          fail: () => {
            Taro.showModal({
              title: "提示",
              content: "未找到成就组，请前往创建",
              success: function (res1) {
                if (res1.confirm) {
                  Taro.navigateTo({ url: "/pages/profile/index" });
                } else if (res1.cancel) {
                  Taro.navigateBack();
                }
              },
            });
          },
        });
      },
    });

    if (mode == "edit") {
      setName(props.data.name);
      setRemarks(props.data.remarks);
      setDdl(props.data.time);
    }
  }, []);
  return (
    <Fragment>
      <Text className="title">
        {mode == "add" ? "新增" : "修改"}
        {type == "memory" ? "记忆" : "计划"}
      </Text>
      <View className="form-wrap">
        <View className="form-item">
          <Text className="form-label">
            {type == "todo" ? "计划" : "记忆"}名称
          </Text>
          <View className="form-inner">
            <Input
              type="text"
              value={name}
              onInput={(e) => {
                setName(e.detail.value);
              }}
              placeholder={type == "todo" ? "请输入计划名称" : "请输入记忆名称"}
            />
            <View className="form-icon"></View>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <Text className="form-label">
            {type == "todo" ? "截止" : "完成"}日期
          </Text>
          <View className="form-inner">
            <Picker
              mode="date"
              value={ddl}
              onChange={(e) => {
                setDdl(e.detail.value);
              }}
            >
              {ddl}
              <View
                className="form-icon"
                style={{
                  backgroundImage: `url(${calendarIcon})`,
                }}
              ></View>
            </Picker>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <Text className="form-label">
            {type == "todo" ? "计划" : "记忆"}备注
          </Text>
          <View className="form-inner">
            <Input
              type="text"
              value={remarks}
              onInput={(e) => {
                setRemarks(e.detail.value);
              }}
              placeholder={type == "todo" ? "请输入计划备注" : "请输入记忆备注"}
            />
            <View className="form-icon"></View>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <Text className="form-label">成就组</Text>
          <View className="form-inner">
            <Picker
              mode="selector"
              range={teamNames}
              onChange={(e) => {
                changeTeams(e.detail.value, false);
              }}
            >
              {teamNames[teamIndex]}
              <View
                className="form-icon"
                style={{
                  backgroundImage: `url(${featIcon})`,
                  height: "50rpx",
                }}
              ></View>
            </Picker>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <View className="form-label">标签</View>
          {Tags.length !== 0 ? (
            <View className="tag-wrap">
              {Tags.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="tag-item"
                    onClick={() => {
                      setTagIndex(index);
                    }}
                  >
                    <View
                      className={
                        index === tagIndex ? "tag-color active" : "tag-color"
                      }
                      style={{ background: `${item.color}` }}
                    ></View>
                    <View className="tag-label">{item.name}</View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View
              onClick={() =>
                Taro.navigateTo({ url: "/module2/pages/achievements/index" })
              }
            >
              暂无标签，点击管理
            </View>
          )}
        </View>
        <View className="form-item">
          <View
            className="form-btn"
            onClick={() => {
              judgeMethod();
              //console.log(name, remarks, ddl, teamIndex, tagIndex);
            }}
          >
            {mode === "add" ? "创建" : "修改"}
          </View>
          {mode !== "add" ? (
            <View className="form-del" onClick={deleteRecord}>
              删除
            </View>
          ) : null}
        </View>
      </View>
    </Fragment>
  );
}

export default TodoForm;
