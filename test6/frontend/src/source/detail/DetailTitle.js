/*
    버전별 세부사항 제목 컴포넌트
*/
import React from 'react';
import BeforeMenu from '../../menu/before/BeforeMenu';
import AfterMenu from '../../menu/after/AfterMenu';
const DetailTitle = () => {
    return ( 
        <div>
            {
                sessionStorage.getItem('isLogin') === 'false' ?
                <BeforeMenu/> :
                <AfterMenu/>                
            }
        </div>
    )
}

export default DetailTitle;