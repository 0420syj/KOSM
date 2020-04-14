/*
    취약점 리스트를 그리는 컴포넌트
*/
// import React, {useState, useEffect, memo} from 'react';
import React, {memo} from 'react';
import ContentList from './content_list/ContentList';
import './MainContent.scss';
const MainContent = memo(({rendering, data, name}) => {
    let idx = 0;
    return ( 
        <div >
            {
                rendering === false ?
                <div className='waiting'>
                    <div className='content'>
                        <div 
                            style={{color: '#e4e4e4', justifySelf:'center'}} 
                            className='spinner-border' 
                            role='status'/>
                    </div>
                </div> :
                <div>
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
            }
        </div>
    )
});

export default MainContent;