//顶级父组件
import {connect} from "react-redux"
import {showLogTips} from "../redux/actions"
import Login from "../components/user/Login"
// import App from "../components/App"

const mapStateToProps = (state) => ({//将state绑定到组件的props
  visible: state.visible
});

const mapDispatchToProps = (dispatch) => ({//将触发action，动态改变样式方法绑定到props
  showLogTips: (visible) => {
    dispatch(showLogTips(visible));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)