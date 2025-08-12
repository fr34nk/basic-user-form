import { connect } from 'react-redux'
import {
  addUser, resetUser,
} from '../../store/user/actions'
import DEFAULT_SETTINGS from '../../store/user/settings';

const mapDispatchToProps = (dispatch: any) => ({
  handleSubmits: (value: any) => {
    dispatch(addUser(value))
    dispatch('user', DEFAULT_SETTINGS.edit)
  },
  handleCancel: () => {
    dispatch(resetUser())
    dispatch('user', DEFAULT_SETTINGS.edit)
  }
})

const mapstateToProps = (state: any) => {
  return {
    initialValues: state.user.edit,
  }
}

export default connect(
  mapstateToProps,
  mapDispatchToProps
)
