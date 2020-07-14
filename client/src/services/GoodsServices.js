import Api from './Api'

export default {
  index () {
    return Api().get('goods')
  },
  createGood (credentials) {
    return Api().post('/createGood', credentials)
  },
  deleteGood (credentials) {
    return Api().post('deleteGood', credentials)
  },
  editGood (credentials) {
    return Api().post('editGood', credentials)
  }

}
