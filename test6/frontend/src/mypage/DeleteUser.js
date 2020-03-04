import React, {useState} from 'react';
import { deleteUser } from '../util/APIUtils';
import { Button } from 'reactstrap';

import './DeleteUser.scss'

const DeleteUser = () => {

    const [userInfo, setUserInfo] = useState({
        email:localStorage.getItem('email'),
        password:'',
    })

    const onChange= (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // alert('email : ' + userInfo.email + '\npassword : ' + userInfo.password);
        deleteUser(userInfo)
        .then(() => {
            alert("삭제 성공")
            window.location.href = '/';
            }).catch((error) => {
                alert("삭제 실패")
                console.log(error)
            });
        };

    
    return ( 
        <div className="delete-user-container">
            <div className="delete-user-title">회원탈퇴 하시겠습니까?</div>
            <div className="delete-user-content">비밀번호를 입력해주세요</div>
            <div className="delete-user-form">
                <form onSubmit={onSubmit}>
                    <input
                        name="password"
                        onChange={onChange}
                        type="password"
                        className="input-delete-user-password"
                        />
                    <Button className="delete-user-button">
                        확인
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default DeleteUser;
