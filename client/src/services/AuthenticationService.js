import Api from './Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  index () {
    return Api().get('users')
  },
  delete (credentials) {
    return Api().post('delete', credentials)
  },
  edit (credentials) {
    return Api().post('edit', credentials)
  }

}
