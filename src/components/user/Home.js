import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

import localStorage from '../../util/storage'
import { Card, Icon, Input, Button, Avatar, message, Menu } from 'antd';
import "./home.styl"
import rainbg from "../../assets/imgs/rainbg.jpg"
import open_eye from "../../assets/imgs/open_eye.png"
import close_eye from "../../assets/imgs/close_eye.png"
import Aboute from "./AbouteMe"
import MyDymic from "./MyDymic"
import UserInfo from "./UserInfo"
import {checkLogin, getMyHome, signIn, hideUserInfo, isWatch, watching} from "../../api/api";
import {rsa} from "../../util/rsa";

const { Meta } = Card;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


message.config({
  top: 56,
  duration: 2,
  maxCount: 3,
});


class HOME extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data:{},
      key:"aboutme",
      sigin:false,
      btntext:"签到",
      eyeIcon: true,
      username:localStorage.getUsername(),
      watchText:"关注",
      isWatch:false,
      watchnum:0,
      fansnum:0,
      fanlist:[],
      watchlist:[]
    };

  }

  componentDidMount(){
    var _this = this
    // this.setState({
    //   username : this.props.location.query ? this.props.location.query.username : localStorage.getUsername()
    // })
    if (this.props.location.query && this.props.location.query.username != localStorage.getUsername()){
      isWatch({username:this.props.location.query.username}).then(value => {
        if (value.errorCode == 0) {
          this.setState({
            fansnum: value.data[0].fans.length,
            watchnum: value.data[0].watch.length,
            fanlist:value.data[0].fans,
            watchlist:value.data[0].watch
          })
        }
      })
      isWatch({username:localStorage.getUsername()}).then(value => {
        if (value.errorCode == 0){
          if (value.data[0].watch.indexOf(this.props.location.query.username) > -1 && value.data[0].fans.indexOf(this.props.location.query.username) > -1){
            this.setState({watchText:"互相关注",isWatch:true})
          }else{
            if (value.data[0].watch.indexOf(this.props.location.query.username) == -1){
              this.setState({watchText:"关注",isWatch:false})
            }else {
              this.setState({watchText:"已关注",isWatch:true})
            }
          }

        }
      })
    }else{
      isWatch({username:localStorage.getUsername()}).then(value => {
        if (value.errorCode == 0) {
          this.setState({
            fansnum: value.data[0].fans.length,
            watchnum: value.data[0].watch.length,
            fanlist:value.data[0].fans,
            watchlist:value.data[0].watch
          })
        }
      })
    }

    getMyHome({
      username:this.props.location.query ? this.props.location.query.username : localStorage.getUsername()
    }).then(value => {
      // console.log("我的结果"+JSON.stringify(value))
      if (value.errorCode == 0){
          if (value.data.length > 0){
            this.setState({
              data:value.data[0],
              sigin:value.data[0].signIn
            })
            //判断签到
            if (value.data[0].signIn){
              this.setState({btntext:"已签到"})
            }else{
              this.setState({btntext:"签到"})
            }
            //判断加密
            if (value.data[0].isEncrypt){
              this.setState({
                eyeIcon: false
              })
            }else {
              this.setState({
                eyeIcon: true
              })
            }
            // console.log(this.state.data)
          }
      }else {
        _this.props.history.push("/login")
      }
    })

  }
  /*选中class*/
  active = (key) => {
    return this.state.key == key ? "ant-menu-submenu-active" : ""
  }

  /*显示组件*/
  showSection = (key) => {
    if (this.props.location.query && this.props.location.query.username != localStorage.getUsername() && this.state.data.isEncrypt){//判断自己主页还是他人主页
      return <div className="box" style={{textAlign:"center"}}><img src={close_eye} width="50%" alt=""/><p style={{color:"white",textAlign:"center"}}>主人设置了隐私设置，您无法查看TA的个人信息</p></div>
    }
    if (key == "aboutme"){
      return <Aboute data={this.formatFloat(this.state.data.likenum)} username={this.props.location.query ? this.props.location.query.username : localStorage.getUsername()}/>
    }else if(key == "dymic"){
      return <MyDymic username={this.props.location.query ? this.props.location.query.username : localStorage.getUsername()} />
    }else if(key == "privateinfo"){
      return <UserInfo data={this.state.data} username={this.props.location.query ? this.props.location.query.username : localStorage.getUsername()}/>
    }
  }

  handleSelect = (value) => {
    this.setState({key:value.key});
  }

  /*格式化数字，超过万,四舍五入显示两位小数x.yyW*/
  formatFloat(num){
    if (num >= 10000){
      return Math.floor(num/10000).toFixed(2) + " W"
    }else {
      return num
    }
  }

  /*签到*/
  handleSignIn =() =>{
    if (!this.state.sigin){
      signIn({username:localStorage.getUsername()})
      this.setState({
        sigin:true,
        btntext:"已签到"
      })
    }else {
      return
    }
  }

  /*关注*/
  handleWatched = ()=>{
    if (this.props.location.query && this.props.location.query.username != localStorage.getUsername()){
      watching({
        username:localStorage.getUsername(),
        watchedname:this.props.location.query.username
      }).then(value => {
        if(value.errorCode == 0){
          this.setState({watchText:"已关注",fansnum:this.state.fansnum+1})
        }

      })
    }

  }

  selectEyeIcon = ()=>{//默认true,不加密，睁眼睛
    return this.state.eyeIcon ? open_eye : close_eye
  }

  /*显示关注*/
  showWatch = ()=>{
    if (this.props.location.query && this.props.location.query.username != localStorage.getUsername()){
      return "block"
    }else {
      return "none"
    }
  }
  /*显示签到*/
  showSigin = ()=>{
    if (this.props.location.query && this.props.location.query.username != localStorage.getUsername()){
      return "none"
    }else {
      return "block"
    }
  }

  /*个人信息脱敏*/
  handleEye =()=>{
    if (this.props.location.query && this.props.location.query.username != localStorage.getUsername() && this.state.data.isEncrypt){//判断自己主页还是他人主页
      message.warning("主人设置了隐藏个人隐私")
      return
    }
    if (this.props.location.query && this.props.location.query.username != localStorage.getUsername() && !this.state.data.isEncrypt){//判断自己主页还是他人主页
      message.warning("您可查看主人的个人信息")
      return
    }
    // alert(this.state.data.isVip)
    if (!this.state.data.isVip){
      message.warning("您还不是VIP，不能加密个人信息")
    }else {
      hideUserInfo({
        username:localStorage.getUsername(),
        isEncrypt:this.state.eyeIcon
      }).then(value => {
        if (value.errorCode == 0){
          this.setState({
            eyeIcon: !this.state.eyeIcon
          })
        }
      })
    }
  }



  render() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <div className="wrap">
        <img src={rainbg} height="100%"/>
        <Card
          bordered={false}
          style={{ width: "100%" }}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={this.state.data.username}
            description={[<span onClick={()=>{alert(this.state.watchlist)}}>关注 <span>{this.formatFloat(this.state.watchnum)}</span></span>,<span> | </span>,<span onClick={()=>{alert(this.state.fanlist)}}>粉丝 <span>{this.formatFloat(this.state.fansnum)}</span></span>]}
          />
          <span style={{float:"right",cursor:"pointer"}}>
            <Button onClick={this.handleSignIn} disabled={this.state.sigin} style={{bottom:"4px",right:"4px",display:this.showSigin()}} type="primary" size="small">{this.state.btntext}</Button>
            <Button ghost={true} onClick={this.handleWatched} disabled={this.state.isWatch} style={{bottom:"4px",right:"4px",display:this.showWatch()}} type="danger" size="small">{this.state.watchText}</Button>
            <img onClick={this.handleEye} src={this.selectEyeIcon()} alt="加密个人信息" width="20px"/></span>
        </Card>
        <Menu
          className="nav"
          mode="horizontal"
          onSelect={this.handleSelect}
        >
          <Menu.Item key="aboutme" className={this.active("aboutme")}>
            <Icon type="bell" />关于我
          </Menu.Item><Menu.Item key="dymic" className={this.active("dymic")}>
            <Icon type="mail" />动态
          </Menu.Item><Menu.Item key="privateinfo" className={this.active("privateinfo")}>
            <Icon type="user" />个人资料
          </Menu.Item>
        </Menu>
        <div>
          {this.showSection(this.state.key)}
        </div>

      </div>
    );
  }
}

export default HOME
