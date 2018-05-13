import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

import Recommend from "../musichall/recommend/Recommend"
import Ranking from "../musichall/ranking/Ranking"
import SingerList from "../musichall/singer/SingerList"
import Search from "../../containers/Search"

import "../../assets/stylus/reset.styl"
import "../../assets/stylus/font.styl"
import "../App.styl"

class Musichall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuShow: false
    };
  }

  componentDidMount() {
    //如果当前路由没有被激活隐藏加载组件
    if (!this.props.match.isExact) {
      this.setState({loading: false});
    }
  }

  render() {
    return (
      <div>
        <div className="app skin-app">
          <div className="music-tab skin-music-tab">
            <div className="tab-item">
              <NavLink to="/musichall/recommend" className="nav-link">
                <span>推荐</span>
              </NavLink>
            </div>
            <div className="tab-item">
              <NavLink to="/musichall/ranking" className="nav-link">
                <span>排行榜</span>
              </NavLink>
            </div>
            <div className="tab-item">
              <NavLink to="/musichall/singer" className="nav-link">
                <span>歌手</span>
              </NavLink>
            </div>
            <div className="tab-item">
              <NavLink to="/musichall/search" className="nav-link">
                <span>搜索</span>
              </NavLink>
            </div>

          </div>

          <div className="music-view">
            {/*
                Switch组件用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示
                Redirect重定向到列表页
              */}
            <Route path="/musichall/recommend" component={Recommend}/>
            <Route path="/musichall/ranking" component={Ranking}/>
            <Route path="/musichall/singer" component={SingerList}/>
            <Route path="/musichall/search" compone nt={Search}/>
            {/*<Route component={Recommend}/>*/}
          </div>
          {/*<MusicPlayer/>*/}
          {/*<MusicMenu show={this.state.menuShow}*/}
                     {/*closeMenu={() => {*/}
                       {/*this.setState({menuShow: false});*/}
                     {/*}}/>*/}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Musichall;
