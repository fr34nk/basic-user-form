import { connect } from 'react-redux'
import {
  addUserAction, resetUserAction,
} from '../../store/user/actions'
import DEFAULT_SETTINGS from '../../store/user/settings';

const mapDispatchToProps = (dispatch: any) => ({
  handleSubmits: (value: any) => {
    dispatch(addUserAction(value))
    dispatch('user', DEFAULT_SETTINGS.edit)
  },
  handleCancel: () => {
    dispatch(resetUserAction())
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
