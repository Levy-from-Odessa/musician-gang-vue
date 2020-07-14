import Api from './Api'

export default {
  index () {
    return Api().get('musicProgs')
  },
  createMusicProgs (credentials) {
    return Api().post('/createMusicProgs', credentials)
  },
  deleteMusicProgs (credentials) {
    return Api().post('deleteMusicProgs', credentials)
  },
  editMusicProgs (credentials) {
    return Api().post('editMusicProgs', credentials)
  }

}
