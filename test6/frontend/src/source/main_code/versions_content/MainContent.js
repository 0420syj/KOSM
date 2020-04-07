/*
    취약점 리스트를 그리는 컴포넌트
*/
// import React, {useState, useEffect, memo} from 'react';
import React, {memo} from 'react';
import ContentList from './content_list/ContentList';
import './MainContent.scss';
const MainContent = memo(({data, name}) => {
    let idx = 0;
    return ( 
        <div >
            <hr className='hr'/>
            <div className='mainContent'>
                {
                    data.map((item) => {
                        return (
                            <div key={idx++}>
                                <ContentList
                                    date={item.date}
                                    summary={item.summary}
                                    score={item.score}
                                    title={item.title}
                                    name={name}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
});

export default MainContent;