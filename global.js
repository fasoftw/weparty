import Vue from 'vue'

export const userKey = '__weparty_user'
//export const baseApiUrl = 'http://localhost:3000'
export const baseApiUrl = 'http://wepartygamesapi-net.umbler.net' //production

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }