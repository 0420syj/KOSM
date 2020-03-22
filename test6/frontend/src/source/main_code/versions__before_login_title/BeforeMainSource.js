/*
    로그인 하기 전 상단 메뉴(즐겨찾기 버튼이 없음)
*/

import React from 'react';
import {MdStar, MdStarBorder} from 'react-icons/md'
import {IconContext} from 'react-icons';
import './BeforeMainSource.scss';
const BeforeMainSource = ({name, title, date}) => {
    return ( 
        <div className='beforeMainSource'>
            <span className='topLicense'>
                {title}
            </span>
            <span className='topPage'>
                www.page.com
            </span>
            <span className='topDate'>
                {date}
            </span>
        </div>
    )
}

export default BeforeMainSource;