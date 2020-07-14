import Api from './Api'

export default {
  index () {
    return Api().get('tours')
  },
  createTour (credentials) {
    return Api().post('createTour', credentials)
  },
  deleteTour (credentials) {
    return Api().post('deleteTour', credentials)
  },
  editTour (credentials) {
    return Api().post('editTour', credentials)
  },
  findTour (credentials) {
    return Api().post('findTour', credentials)
  },
  findDistTour (credentials) {
    return Api().get('findDistTour', credentials)
  }

}
