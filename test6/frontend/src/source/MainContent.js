import React, {useState, useEffect} from 'react';
import ContentList from './ContentList';
import './MainContent.scss';
const MainContent = ({data, name}) => {
    const [d, setD] = useState(data);
    console.log(data);
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
}

export default MainContent;