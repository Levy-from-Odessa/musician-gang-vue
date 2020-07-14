import Api from './Api'

export default {
  index () {
    return Api().get('gangs')
  },
  createGang (credentials) {
    return Api().post('/createGang', credentials)
  },
  deleteGang (credentials) {
    return Api().post('deleteGang', credentials)
  },
  editGang (credentials) {
    return Api().post('editGang', credentials)
  }

}
