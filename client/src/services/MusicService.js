import Api from './Api'

export default {
  index () {
    return Api().get('music')
  },
  createMusic (credentials) {
    return Api().post('/createMusic', credentials)
  },
  deleteMusic (credentials) {
    return Api().post('deleteMusic', credentials)
  },
  editMusic (credentials) {
    return Api().post('editMusic', credentials)
  }

}
