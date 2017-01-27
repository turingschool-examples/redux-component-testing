import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dashboard from '../components/Dashboard';

function mapStateToProps(state) {
  return { username: state.user.name };
}

export default connect(mapStateToProps)(Dashboard);
