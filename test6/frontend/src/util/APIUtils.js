import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
const request = (options) => {
    const headers = new Headers({
        'Content-Type' : 'application/json',
    })
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};


const deleteRequest = (options) => {
    const headers = new Headers()

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
}


export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}


export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function writeBoard(boardSaveRequest) {
    return request({
        url: API_BASE_URL + "/api/board/save",
        method: 'POST',
        body: JSON.stringify(boardSaveRequest)
    });
}

export function getBoards() {
    return request({
        url: API_BASE_URL + "/api/board",
        method: 'GET'
    });
}

export function getArticle(id) {
    return request({
        url: API_BASE_URL + "/api/board/" + id,
        method: 'GET'
    })
}

export function getBoardOnce(id) {
    return request({
        url: API_BASE_URL + "/api/board/list/" + id,
        method: 'GET'
    });
}

export function getBoardCount() {
    return request({
        url: API_BASE_URL + "/api/board/count",
        method : 'GET'
    });
}


export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        // http://localhost:5000
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/api/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/api/users/" + username,
        method: 'GET'
    });
}

export function uploadComment(id, username, comment){
    const formData = new FormData();
    formData.append('user', username);
    formData.append('comment', comment);
    return request({
        url: API_BASE_URL + "/saveComment/" + id,
        method: 'POST',
        body: formData
    });
}

export function getComment(id){
    return request({
        url : API_BASE_URL + "/getComment/" + id,
        method: 'GET'
    });
}

export function deleteComment(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteComment/" + id,
        method: 'DELETE'
    });
}

export function fetchRate(id, user){
    return request({
        url : API_BASE_URL + "/fetchRate/" + id + "/" + user,
        method: 'GET'
    });
}

export function getAvgRate(id){
    return request({
        url : API_BASE_URL + "/getAvgRate/" + id,
        method: 'GET'
    });
}

export function setFavorite(favoriteInfo){  
    //즐겨찾기 library, 사용자 이름 전송
    return request({
        // url:  ,
        // method: 'POST'       
        // body: JSON.stringify(favoriteInfo)
    })
}