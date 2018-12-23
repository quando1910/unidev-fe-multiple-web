export default {
  SET_TOKEN (state, token) {
    state.token = token
  },
  REMOVE_TOKEN (state) {
    state.token = null
  },
  SET_ROLE (state, role) {
    state.role = role
  },
  REMOVE_ROLE (state) {
    state.role = null
  },
  SET_UID (state, uid) {
    state.uid = uid
  },
  REMOVE_UID (state) {
    state.uid = null
  },
  SET_USER (state, user) {
    state.user = user
  },
  REMOVE_USER (state) {
    state.user = null
  }
}
