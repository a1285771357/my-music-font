//顶级父组件
import {connect} from "react-redux"
import {showTips} from "../redux/actions"
import Login from "../components/user/Login"

const mapStateToProps = (state) => ({//将state绑定到组件的props
  visible: state.showTips,
});

const mapDispatchToProps = (dispatch) => ({//将触发action，动态改变样式方法绑定到props
  showTips: (visible) => {
    dispatch(showTips(visible));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)