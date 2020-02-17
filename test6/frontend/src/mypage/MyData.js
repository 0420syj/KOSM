import React, {useState} from 'react';
const NewPassword = () => {
    return (
        <div>
            <div>새 비밀번호</div>
            <input type='text'/>
            <div>새 비밀번호 확인</div>
            <input type='text'/>
        </div>
    )
}

const MyData = () => {
    const [changePassword, setPassword] = useState(false);
    console.log(localStorage.getItem('email'));
    return ( 
        <div>
            <h2>정보 관리</h2>
            <div>
                <div>이메일</div>
                <input readOnly type='text' placeholder={localStorage.getItem('email')}/>
            </div>
            <div>
                <div>닉네임</div>
                <input type='text'/>
            </div>
            <div>
                <div>기존 비밀번호</div>
                <input type='password'/>
            </div>
            <div onClick={() => {setPassword(!changePassword)}}>비밀번호를 변경하시겠습니까?</div>
            {
                changePassword === false ? 
                null :
                <NewPassword/>
            }
            <div style={{display: 'flex'}}>
                <div>
                    <button>탈퇴</button>
                    <button>회원정보 수정</button>
                </div>
            </div>

        </div>
    )
}

export default MyData;