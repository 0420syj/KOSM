import React, {useState} from 'react';
import { deleteUser } from '../util/APIUtils';

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
