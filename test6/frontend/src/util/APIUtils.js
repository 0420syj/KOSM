import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
const request = (options) => {
    const headers = new Headers({
        'Content-Type' : 'application/json',
    })
    if(sessionStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN))
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
const String_Request = (options) => {
    const headers = new Headers({
        'Content-Type' : 'application/json',
    })
    if(sessionStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
     .then(response=>
         response.text().then(text=>{
         return text;
     })
     );
};

const deleteRequest = (options) => {
    const headers = new Headers()

    if(sessionStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN))
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
export function Crawl(CrawlRequest) {
    return request({        
        url: API_BASE_URL + "/api/auth/webcrawler",
        method: 'POST',
        body:JSON.stringify(CrawlRequest)
    });
}
export function detailCrawl(CrawlRequest) {
    return request({        
        url: API_BASE_URL + "/api/auth/detailcrawler",
        method: 'POST',
        body:JSON.stringify(CrawlRequest)
    });
}
export function forgot(CrawlRequest) {
    console.log(CrawlRequest);
    return String_Request({
        url: API_BASE_URL + "/api/auth/forgot",
        method: 'POST',
        body:JSON.stringify(CrawlRequest)
    });
}
export function Mail(CrawlRequest) {
    return String_Request({
        url: API_BASE_URL + "/api/auth/main",
        method: 'POST',
        body:JSON.stringify(CrawlRequest)
    });
}
export function signup(signupRequest) {
    console.log(signupRequest);
    return request({
        url: API_BASE_URL + "/api/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}
export function signok(HashRequest) {
    console.log(HashRequest);
    return request({
        url: API_BASE_URL + "/api/auth/signok",
        method: 'POST',
        body: JSON.stringify(HashRequest)
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
        url: API_BASE_URL + "/api/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        // http://localhost:5000
        url: API_BASE_URL + "/api/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!sessionStorage.getItem(ACCESS_TOKEN)) {
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

export function getProjectAll(){  //DB에서 프로젝트 가져오기
    return request({
        url:  API_BASE_URL + "/project/list",
        method: 'GET'            
    });
}

export function getFavProject(id) {     //사용자 아이디를 보내면 즐겨찾기 한 이름을 가져 옴
    return request({
        url: API_BASE_URL + "/api/user/getFavProject/"+ id,
        method : 'GET'
    });
}

export function addFavProject(favRequest) {     //즐겨찾기 추가
    //사용자 아이디, 프로젝트 아이디
    return request({
        url: API_BASE_URL + "/api/user/addFavProject",
        method : 'POST',
        body : JSON.stringify(favRequest)
    });
}

export function deleteFavProject(favRequest) {
    return request({
        url: API_BASE_URL + "/api/user/deleteFavProject",
        method : 'DELETE',
        body : JSON.stringify(favRequest)
    });
}

export function deleteUser(deleteUserRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/deleteUser",
        method: 'DELETE',
        body: JSON.stringify(deleteUserRequest)
    })
}

export function changeName(changeRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/changeName",
        method: "PUT",
        body: JSON.stringify(changeRequest)
    });
}

export function changePassword(changeRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/changePassword",
        method: "PUT",
        body: JSON.stringify(changeRequest)
    });
}