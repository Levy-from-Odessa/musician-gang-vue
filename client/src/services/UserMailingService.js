import Api from './Api'

export default {
  index () {
    return Api().get('userMailings')
  },
  createUserMailing (credentials) {
    return Api().post('/createUserMailing', credentials)
  },
  deleteUserMailing (credentials) {
    return Api().post('deleteUserMailing', credentials)
  },
  editUserMailing (credentials) {
    return Api().post('editUserMailing', credentials)
  }

}
