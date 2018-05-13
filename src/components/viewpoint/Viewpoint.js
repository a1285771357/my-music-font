import React from "react"
import moment from 'moment';//格式化时间
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"

import Recommend from "../musichall/recommend/Recommend"
import Ranking from "../musichall/ranking/Ranking"
import SingerList from "../musichall/singer/SingerList"
import Search from "../../containers/Search"
import MusicPlayer from "../musichall/play/MusicPlayer"
import MusicMenu from "../setting/Menu"
import Scroll from "../../common/scroll/Scroll"
import {getDynamicList} from "../../api/api"
import momentZhcn from "../../util/moment-zhcn"
import ReviewList from "./ReviewList"

import localStorage from '../../util/storage'
import { List, Avatar, Icon, Input } from 'antd';
import "../../assets/stylus/reset.styl"
import "../../assets/stylus/font.styl"
import "../App.styl"

momentZhcn();//汉化moment

const { TextArea } = Input;

class Viewpoint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuShow: false,
      listData:[],
      interestData:[],
      currentIndex:0,
      spin:true
    };
  }

  componentDidMount(){
    getDynamicList().then(value => {
      this.setState({
        listData:value.timeRows,
        interestData:value.likeRows
      })
    })
  }


  // handleReviewClick = (index) => {
  //   this.setState({
  //     currentIndex: index
  //   })
  // }
  //
  // check_like_index(index){
  //   return index===this.state.currentIndex ? "Tab_tittle active" : "Tab_tittle";
  // }
  //
  // check_msg_index(index){
  //   return index===this.state.currentIndex ? "Tab_item show" : "Tab_item";
  // }


  render() {
    const IconText = ({ type, text, spin }) => (
      <span>
          < Icon spin={spin} type={type} style={{ marginRight: 8}} />
        {text}
        </span>
    );
    return (
        <Scroll>
          <ReviewList data={this.state.listData} interestData={this.state.interestData ? this.state.interestData : []} />
        </Scroll>
    );
  }
}

export default Viewpoint;
