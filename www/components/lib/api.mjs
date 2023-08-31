import { API_BASE_URL } from "./shared.mjs"

export function getUserList() {
    //return Promise.reject('NOT IMPLEMENTED')
    return fetch(API_BASE_URL)
    .then(req => {
        return req.json()
    })
    .catch(err => {
        console.error(err)
    })
}

export function createUser(body) {
    return Promise.reject('NOT IMPLEMENTED')
}