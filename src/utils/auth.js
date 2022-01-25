import Cookies from 'js-cookie'

export function getUserSig() {
    return Cookies.get('UserSig')
}

export function setUserSig(UserSig) {
    return Cookies.set('UserSig', UserSig)
}

export function getUserID() {
    return Cookies.get('UserID')
}

export function setUserID(UserID) {
    return Cookies.set('UserID', UserID)
}

export function getToken() {
    return Cookies.get('Token')
}

export function setToken(token) {
    return Cookies.set('Token', token)
}

export function removeToken() {
    return Cookies.remove('Token')
}

export function removeUserSig() {
    return Cookies.remove('UserSig')
}

export function removeUserId() {
    return Cookies.remove('UserID')
}