import Api from './Api'

export default {
  index () {
    return Api().get('bookmarks')
  },
  createBookmark (credentials) {
    return Api().post('/createBookmark', credentials)
  },
  deleteBookmark (credentials) {
    return Api().post('deleteBookmark', credentials)
  },
  editBookmark (credentials) {
    return Api().post('editBookmark', credentials)
  },
  userBookmark (credentials) {
    return Api().post('userBookmark', credentials)
  },
  userCountBookmark (credentials) {
    return Api().post('userCountBookmark', credentials)
  }
}
