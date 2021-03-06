import axios from 'axios'

export default {
  state: {
    contact: {},
    contactInfo: {}
  },
  mutations: {
    setContact(state, payload) {
      state.contact = payload
    },
    setContactInfo(state, payload) {
      state.contactInfo = payload
    }
  },
  actions: {
    getContact(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URL}/contact/${payload.id}?keyword=${payload.keyword}`
          )
          .then(res => {
            context.commit('setContact', res.data.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    addContact(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/contact`, payload)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    deleteContact(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `${process.env.VUE_APP_BASE_URL}/contact?id=${payload.id}&targetId=${payload.targetId}`
          )
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    }
  },
  getters: {
    contactList(state) {
      return state.contact
    },
    getContactInfo(state) {
      return state.contactInfo
    }
  }
}
