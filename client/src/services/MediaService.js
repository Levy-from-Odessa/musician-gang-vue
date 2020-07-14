import Api from './Api'

export default {
  index () {
    return Api().get('media')
  },
  createMedia (credentials) {
    return Api().post('createMedia', credentials)
  },
  deleteMedia (credentials) {
    return Api().post('deleteMedia', credentials)
  },
  editMedia (credentials) {
    return Api().post('editMedia', credentials)
  }

}
