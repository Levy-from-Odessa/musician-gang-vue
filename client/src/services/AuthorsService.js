import Api from './Api'

export default {
  index (credentials) {
    return Api().post('authors', credentials)
  },
  CreateAuthor (credentials) {
    return Api().post('CreateAuthor', credentials)
  },
  deleteAuthor (credentials) {
    return Api().post('deleteAuthor', credentials)
  },
  editAuthor (credentials) {
    return Api().post('editAuthor', credentials)
  }

}
