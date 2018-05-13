import React from "react"
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"

import Recommend from "../musichall/recommend/Recommend"
import Ranking from "../musichall/ranking/Ranking"
import SingerList from "../musichall/singer/SingerList"
import Search from "../../containers/Search"
import MusicPlayer from "../musichall/play/MusicPlayer"
import MusicMenu from "../setting/Menu"

import { Card } from 'antd';
import banner1 from "../../assets/imgs/banner_thumb_1.jpg"
import banner2 from "../../assets/imgs/banner_thumb_2.jpg"
import banner3 from "../../assets/imgs/banner_thumb_3.jpg"
import "../../assets/stylus/reset.styl"
import "../../assets/stylus/font.styl"
import "../App.styl"

const { Meta } = Card;

class Vip extends React.Component {
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
      <Card
        hoverable
        cover={<img alt="example" src={banner1} />}
      >
        <Meta
          title="Europe Street beat"
          description="www.instagram.com"
        />
      </Card>
      <Card
        hoverable
        cover={<img alt="example" src={banner2} />}
      >
        <Meta
          title="Europe Street beat"
          description="www.instagram.com"
        />
      </Card>
    <Card
        hoverable
        cover={<img alt="example" src={banner3} />}
      >
        <Meta
          title="Europe Street beat"
          description="www.instagram.com"
        />
      </Card>
      </div>
    );
  }
}

export default Vip;
