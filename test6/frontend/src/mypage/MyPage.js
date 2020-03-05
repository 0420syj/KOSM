import React from 'react';
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import MyData from './MyData';
const MyPage = () => {

    return ( 
        <div>
            <div>
                {
                    sessionStorage.getItem('isLogin') === 'false' ?
                    <BeforeMenu/> :
                    <AfterMenu/>
                }
            </div>
            <div style={{width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <MyData/>
                </div>
            </div>
        </div>
    )
}

export default MyPage;