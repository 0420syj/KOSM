/*
    로그인 후 왼쪽 리스트 버튼을 눌렀을 때 나오는 제목 부분
*/
import React from 'react';
import {MdStar, MdStarBorder} from 'react-icons/md'
import {IconContext} from 'react-icons';
import './AfterMainSource.scss';
const AfterMainSource = ({isFavorite, favoriteClick, name, title, date}) => {
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

export default AfterMainSource;