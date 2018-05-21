import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

import { Card, Icon, Input, Button, Avatar, message, Menu, Collapse, List } from 'antd';
import {updataUserProverbs} from "../../api/api";
import localstorage from "../../util/storage"
import edit from "../../assets/imgs/edit.png"
import "./home.styl"
import female from "../../assets/imgs/female.png"
import male from "../../assets/imgs/male.png"
import novip from "../../assets/imgs/novip.png"
import vip from "../../assets/imgs/vip.png"

const { Meta } = Card;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Panel = Collapse.Panel;


message.config({
  top: 56,
  duration: 2,
  maxCount: 3,
});


class Info extends React.Component {
  constructor(props) {
    super(props);

    this.state = {showInput:"none",showP:"block"};
  }

  showSex = (sex) =>{
    if (sex == "female"){
      return female
    }else if(sex == "male"){
      return male
    }
  }

  showVip = (isVip) =>{
    if (isVip){
      return vip
    }else if(!isVip){
      return novip
    }
  }

  /*编辑*/
  handleShowInput = ()=>{
    if (this.props.username != localstorage.getUsername()){
      return
    }
    this.setState({
      showInput:"block",
      showP:"none"
    })
  }

  /*完成*/
  handleEdit = () =>{
    if(document.getElementById("proverbs").value == ""){
      message.error("写点东西吧")
    }else{
      updataUserProverbs({username:localstorage.getUsername(),proverbs:document.getElementById("proverbs").value}).then(value => {
        if(value.errorCode == 0){
          this.setState({
            showInput:"none",
            showP:"block"
          })
          document.getElementById("text").innerText =  document.getElementById("proverbs").value
        }
      })

    }
  }



  render() {
    return (
      <div className="info">
        <div>
          <h3>个人信息</h3>
          <p style={{width:"65px",height:"20px",borderRadius:"5px",border:"1px solid #B59143",color:"#B59143",padding:"2px"}}> 等级：<span>{this.props.data.level}</span></p>
          <p>性别：<span><img src={this.showSex(this.props.data.sex)} alt="" width="20px" /></span></p>
          <p>VIP：<span> <img src={this.showVip(this.props.data.isVip)} alt="" width="20px" /></span></p>
          <p>积分：<span>{this.props.data.jifen}</span></p>
        </div>
        <div>
          <h3>个人简介 <img onClick={this.handleShowInput} src={edit} alt="" width="15px"/></h3>
          <p id="text" style={{display:this.state.showP}}>{this.props.data.proverbs}</p>
          <p style={{display:this.state.showInput}}><Input id="proverbs" type="text" style={{width:"90%"}} defaultValue={this.props.data.proverbs} /><Button onClick={this.handleEdit} type="primary">完成</Button></p>
        </div>
      </div>
    );
  }
}

export default Info
