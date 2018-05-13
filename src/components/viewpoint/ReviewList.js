import React from "react"
import moment from 'moment';//格式化时间
import localStorage from '../../util/storage'
import {sendDynamic, isLiked} from "../../api/api"

import "../../assets/stylus/reset.styl"
import "../../assets/stylus/font.styl"
import "../App.styl"
import "./reviewList.styl"
import gold from "../../assets/imgs/gold_medal.png"
import silver from "../../assets/imgs/silver_medal.png"
import copper from "../../assets/imgs/copper_medal.png"
import fire from "../../assets/imgs/fire.png"
import { Card, Icon, Avatar, Collapse, List, Input, Select, Radio, Button, message } from 'antd';
import momentZhcn from "../../util/moment-zhcn";

const { Meta } = Card;
const Panel = Collapse.Panel;
const { TextArea } = Input;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

momentZhcn();//汉化moment


class ReviewList extends React.Component{

  constructor(){
    super();
    this.state={
      currentIndex : [],
      fireCurrentIndex : [],
      fireIndex : [],
      likedIndex:[],
      reviewIndex:"99",
      selectedColor:{},
      reviewdata:{},
      imgArr:[gold, silver, copper],
      temp:"none",
      textColor:"#333"
    };
  }

  check_like_index(index,liked){//点赞
    return this.state.currentIndex.indexOf(index)>-1 ? "likeStyle" : "";
  }

  check_like_fire(index,liked){//热评点赞
    if (liked){//初始化
      return "likeStyle";
    }else{//点击后变化
      return this.state.fireCurrentIndex.indexOf(index)>-1 ? "likeStyle" : "";
    }
  }

  check_item_index(index){//评论
    return index===this.state.reviewIndex ? "list show_list" : "list hide_list";
  }

  handelChange = (e)=>{
    if (localStorage.getLoginStatus()){
      let b = e.target.value, a = {};
      a[b]="√";
      this.setState({selectedColor:a,textColor:b})
    }else {
      message.warning('登录之后再来选颜色吧');
    }

  }

  handleClick = () =>{
    if (localStorage.getLoginStatus()){
      if (document.getElementById("dynamicReview").value == false){
        message.warning("输入一些内容吧");
        return
      }
      sendDynamic({
        username:localStorage.getUsername(),
        color:this.state.textColor,
        dynamicreview: document.getElementById("dynamicReview").value
      }).then((value)=>{
        console.log(value)
        if(value.errorCode == 0){
          this.setState({reviewdata:value.data,temp:"block"})
        }else {
          message.warning(value.errorMessage);
        }
      })
    }else {
      message.warning('登录之后再来发动态吧');
    }
  }


  render(){

    let _this=this;
    const IconText = ({ type, text, spin, clickFn, likeStyle }) => (
      <span onClick={clickFn}>
          < Icon spin={spin} type={type} style={{ marginRight: 8}} className={likeStyle} />
        {text}
      </span>
    );

    return(
      <div>
        <div>
          <div>
            <RadioGroup onChange={()=>{}} defaultValue="a" size="default" onChange={this.handelChange}>
              <RadioButton value="gold" style={{background:"gold",color:"white"}}>{this.state.selectedColor.gold ? this.state.selectedColor.gold : ""}</RadioButton>
              <RadioButton value="green" style={{background:"green",color:"white"}}>{this.state.selectedColor.green ? this.state.selectedColor.green : ""}</RadioButton>
              <RadioButton value="pink" style={{background:"pink",color:"white"}}>{this.state.selectedColor.pink ? this.state.selectedColor.pink : ""}</RadioButton>
              <RadioButton value="red" style={{background:"red",color:"white"}}>{this.state.selectedColor.red ? this.state.selectedColor.red : ""}</RadioButton>
              <RadioButton value="purple" style={{background:"purple",color:"white"}}>{this.state.selectedColor.purple ? this.state.selectedColor.purple : ""}</RadioButton>
            </RadioGroup>
            <div className="textAreaBox">
              <TextArea id="dynamicReview" style={{color:this.state.textColor}} placeholder="一起聊聊吧" rows={4} />
              <Button type="primary" className="box_botton" onClick={this.handleClick}>发送</Button>
            </div>
          </div>
        </div>
        {/*发布动态之后出现的*/}
        <div style={{display:this.state.temp}}>
          <List.Item className="temp_item">
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
              title={<a href="https://ant.design">{this.state.reviewdata.username}</a>}
              description={<div style={{color:this.state.reviewdata.color}}>{this.state.reviewdata.dynamicreview}</div>}
            />
            <div className="time" style={{float: "right"}}>{moment(this.state.reviewdata.time).startOf("hour").fromNow()}</div>
          </List.Item>
        </div>
        {/*热评*/}
        <div className="Tab_tittle_wrap">
          <p className={this.props.interestData.length>0 ? "fireShow" : "fireHide"}><img src={fire} width="20px"/>热门动态</p>
          { this.props.interestData.map((element,index) => {
            return(
              <div>
              <Card
                hoverable={true}
                actions={[<IconText
                            clickFn={()=>{
                              if (!localStorage.getLoginStatus()){
                                message.warning('登录之后再来点赞吧');
                                return
                              };
                              if (!element.liked){
                                isLiked({id:element._id}).then((value)=>{
                                  if (value.errorCode == 0){
                                    if (this.state.fireIndex.indexOf(index) == -1){
                                      this.state.fireIndex.push(index);
                                      this.setState({fireCurrentIndex:this.state.fireIndex});
                                    }
                                  }else{
                                    message.warning(value.errorMessage);
                                  }
                                })
                              }
                            }
                            }
                            likeStyle={this.check_like_fire(index,element.liked)}
                            type="like-o" text={element.likenum}
                            spin={true}/>,
                  <IconText
                    type="message" text={element.reviewsnum}
                    clickFn={()=>{
                      if (!localStorage.getLoginStatus()){
                        message.warning('登录之后再来评论吧');};
                      this.state.reviewIndex == index ? this.setState({reviewIndex:"A"}) : this.setState({reviewIndex:index})}} />
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                  title={element.username}
                  description={<div style={{color:element.color}}>{element.dynamicreview}</div>}
                />
                <img src={this.state.imgArr[index]} width="20px" />
                <div className="time" style={{float:"right"}}>{moment(element.time).endOf("hour").fromNow()}</div>
              </Card>
                <List
                  className={this.check_item_index(index)}
                  itemLayout="horizontal"
                  dataSource={element.reviewdata}
                  header={<div><Input placeholder={"评论"} disabled={!localStorage.getLoginStatus()} addonAfter={<Icon type="rocket" />}/></div>}
                  renderItem={item => (
                    <List.Item className="list_item">
                      <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.username}</a>}
                        description={item.reviewcontents}
                      />
                      <div className="time" style={{float:"right"}}>{moment(item.time).endOf("hour").fromNow()}</div>
                    </List.Item>
                  )}
                />
              </div>
            );
          }) }
        </div>
        {/*全部评论*/}
        <div className="Tab_tittle_wrap">
          <p className="fireShow">全部动态</p>
          { this.props.data.map((element,index) => {
            return(
              <div>
              <Card
                hoverable={true}
                actions={[<IconText clickFn={()=>{if (!localStorage.getLoginStatus()){message.warning('登录之后再来点赞吧');return};if (this.state.likedIndex.indexOf(index) == -1){this.state.likedIndex.push(index);this.setState({currentIndex:this.state.likedIndex});}}} likeStyle={this.check_like_index(index)} type="like-o" text={element.likenum} spin={true}/>,
                  <IconText type="message" text={element.reviewsnum} clickFn={()=>{if (!localStorage.getLoginStatus()){message.warning('登录之后再来评论吧');};this.state.reviewIndex == index ? this.setState({reviewIndex:"A"}) : this.setState({reviewIndex:index})}} />]}
              >
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                  title={element.username}
                  description={<div style={{color:element.color}}>{element.dynamicreview}</div>}
                />
                <div className="time" style={{float:"right"}}>{moment(element.time).startOf("hour").fromNow()}</div>
              </Card>
                <List
                  className={this.check_item_index(index)}
                  itemLayout="horizontal"
                  dataSource={element.reviewdata}
                  header={<div><Input placeholder={"评论"} disabled={!localStorage.getLoginStatus()} addonAfter={<Icon type="rocket" />}/></div>}
                  renderItem={item => (
                    <List.Item className="list_item">
                      <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.username}</a>}
                        description={item.reviewcontents}
                      />
                      <div className="time" style={{float:"right"}}>{moment(item.time).startOf("hour").fromNow()}</div>
                    </List.Item>
                  )}
                />
              </div>
            );
          }) }
        </div>
      </div>
    );
  }
}

export default ReviewList