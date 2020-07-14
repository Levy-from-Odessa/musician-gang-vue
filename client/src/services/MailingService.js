import Api from './Api'

export default {
  index () {
    return Api().get('mailings')
  },
  createMailing (credentials) {
    return Api().post('/createMailing', credentials)
  },
  deleteMailing (credentials) {
    return Api().post('deleteMailing', credentials)
  },
  editMailing (credentials) {
    return Api().post('editMailing', credentials)
  }

}
