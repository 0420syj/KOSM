import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import OpenSourceData from '../data/OpenSourceData';
// import styled from 'styled-components';
// const ListStyle = styled.div`

// `;

const SourceList = () => {
    const [Data, setData] = useState([]);
    const onChange = (e) => {
        setData(OpenSourceData.filter(item => {
            return item.value.indexOf(e.target.value) !== -1
        }));
    }
    
    return ( 
        <div style={{borderRight:'3px solid #000000', width: '350px'}}>
            <h2>Open Source</h2>
            <div style={{width: '100%'}}>
                <input 
                    type='text'
                    style={{width: '70%',
                        justifyContent:'center'}}
                    onChange={onChange}/>
            </div>
            <ul>
                {
                    Data.length === 0 ?
                    OpenSourceData.map(item => {
                        return  <li key={item.id}>
                            <Link to={`/source/${item.value}`}>{item.value}</Link>
                        </li>
                    }):
                    
                    Data.map(item => {
                        return <li key={item.id}>
                            <Link to = {`/source/${item.value}`}>{item.value}</Link>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default SourceList;