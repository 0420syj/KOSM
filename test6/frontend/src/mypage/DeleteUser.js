import React, {useState} from 'react';
import { deleteUser } from '../util/APIUtils';

const DeleteUser = () => {
    
    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     login(userinfo)
    //     .then(res => {
    //         localStorage.setItem('accessToken', res.accessToken);
    //         getCurrentUser()
    //         .then(res => {
    //             localStorage.setItem('isLogin', 'true');
    //             localStorage.setItem('email', res.email);
    //             localStorage.setItem('username', res.username);
    //             localStorage.setItem('userId', res.id);
    //             console.log(localStorage.getItem('userId'));
    //             alert('로그인 완료');
    //             history.goBack();
    //             return ;
    //         }).catch(e => {
    //             alert('아이디/비밀번호가 다릅니다.');
    //             console.log(e);
    //         })
    //     }).catch(e => {
    //         alert('아이디/비밀번호가 다릅니다.');
    //         console.log(e);
    //     })
    // }

    const [userInfo, setUserInfo] = useState({
        email:localStorage.getItem('email'),
        // email: '',
        password:'',
    })

    const onChange= (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
        console.log(userInfo);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        alert('email : ' + userInfo.email + '\npassword : ' + userInfo.password);
        deleteUser(userInfo)
        .then(res => {
            console.log(res);
            alert('삭제완료');
            // window.location.href = '/'; // 탈퇴 완료되면, 홈으로 이동
        }).catch(e => {
            alert('삭제실패');
            console.log(e);
    })};

    
    return ( 
        <div
            style={{color:'white', fontSize:'50px'}}
            >
            회원탈퇴 하시겠습니까?<br/>비밀번호를 입력주세요.
            <form onSubmit={onSubmit}>
                <input
                    name="password"
                    onChange={onChange}
                    type="password"
                    />
                <button>
                    탈퇴
                </button>
            </form>
        </div>
    )
}

export default DeleteUser;
