import React from "react"
import {BrowserRouter as Router, Route, NavLink, Redirect} from "react-router-dom"

import Viewpoint from "./viewpoint/Viewpoint"
import Vip from "./vip/Vip"
import Musichall from "./musichall/Musichall"
import Login from "./user/Login"
import Search from "../containers/Search";
import SingerList from "./musichall/singer/SingerList";
import Recommend from "./musichall/recommend/Recommend";
import Ranking from "./musichall/ranking/Ranking";
import MusicPlayer from "./musichall/play/MusicPlayer"
import MusicMenu from "./setting/Menu"
import localStorage from '../util/storage'
import {getPublicRsa, checkLogin} from "../api/api";

import logo from "../assets/imgs/logo.png"
import "../assets/stylus/reset.styl"
import "../assets/stylus/font.styl"
import "./App.styl"

import { Layout, Menu, Avatar, Tooltip } from 'antd';
const { Header } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuShow: false,
      defaultIndex:"1",
      visible:true
    };
  }

  componentDidMount(){
    this.rsaPublicKey()
    checkLogin().then((value)=>{
      // console.log(value)
      if (value.errorCode === -1){
        localStorage.setLoginStatus(false)
      }else {
        localStorage.setLoginStatus(true)
      }

    })

  }

  rsaPublicKey(){
    if (!localStorage.getPublicKey()){
      let rsaPublicKey = "";
      getPublicRsa().then(
        (value)=>{
          rsaPublicKey = value.publicKey;
          localStorage.setPublicKey(rsaPublicKey)
        });
    }
  }

  render() {
    return (
        <Router>
          <div className="app skin-app">
            <header className="app-header skin-app-header">
              <i className="icon-et-more app-more" onClick={() => {this.setState({menuShow: true});}}></i>
              <img src={logo} className="app-logo" alt="logo" />
              <h1 className="app-title">Mango Music</h1>
              <NavLink to="/login">
                <Tooltip placement="left" title="点我登录" visible={!localStorage.getLoginStatus()}>
                  <Avatar className="app-ava" style={{background:"gray",float:"right",textAlign:"center"}} size="default" icon="user" ></Avatar>
                </Tooltip>
              </NavLink>
            </header>
            <Layout className="layout">
              <Header>
                <div className="logo" />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={[this.state.defaultIndex]}
                  style={{ lineHeight: '64px' }}
                >
                  <Menu.Item key="1"><NavLink to="/musichall/recommend">音乐馆</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to="/viewpoint">音乐圈</NavLink></Menu.Item>
                  <Menu.Item key="3"><NavLink to="/vip">V&nbsp;I&nbsp;P</NavLink></Menu.Item>
                </Menu>
              </Header>
            </Layout>
            <div className="music-view">
              {/*
                Switch组件用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示
                Redirect重定向到列表页
              */}
                <Route path="/musichall" component={Musichall} >
                  <Route path="/musichall/recommend" component={Recommend}/>
                  <Route path="/musichall/ranking" component={Ranking}/>
                  <Route path="/musichall/singer" component={SingerList}/>
                  <Route path="/musichall/search" component={Search}/>
                </Route>
                <Route path="/viewpoint" component={Viewpoint} />
                <Route path="/vip" component={Vip} />
                <Route path="/login" component={Login} />
            </div>
            <MusicPlayer/>
            <MusicMenu show={this.state.menuShow}
                       closeMenu={() => {
                         this.setState({menuShow: false});
                       }}/>
          </div>
        </Router>
    );
  }
}

export default App;
