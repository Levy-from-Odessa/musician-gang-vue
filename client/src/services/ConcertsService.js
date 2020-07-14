import Api from './Api'

export default {
  index () {
    return Api().get('concerts')
  },
  createConcert (credentials) {
    return Api().post('/createConcert', credentials)
  },
  deleteConcert (credentials) {
    return Api().post('deleteConcert', credentials)
  },
  editConcert (credentials) {
    return Api().post('editConcert', credentials)
  },
  findConcert (credentials) {
    return Api().post('findConcert', credentials)
  }

}
