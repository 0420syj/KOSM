import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import OpenSourceData from '../data/OpenSourceData';
import './SourceList.scss';
import {WIDTH, HEIGHT} from '../constants';
const SourceList = () => {
    const [Data, setData] = useState([]);
    const onChange = (e) => {
        setData(OpenSourceData.filter(item => {
            return item.value.indexOf(e.target.value) !== -1
        }));
    }
    return ( 
        <div 
            style={{
                width: `444px`, 
                background: '#414141', 
                paddingLeft: `${WIDTH * 48}px`}}>
            <div>
                <div
                    style={{
                        color: '#e4e4e4',
                        width: `${WIDTH * 121}px`,
                        height: '41px',
                        fontFamily: 'NotoSans',
                        fontSize:'30px',
                        fontWeight: 'bold',
                        fontStretch: 'normal',
                        fontStyle: 'normal',
                        lineHeight: '1.37',
                        letterSpacing: 'normal',
                        textAlign: 'left'}}>
                    Projects
                </div>
                <div>
                    <label 
                        style={{
                            justifyContent:'center', 
                            display: 'flex'}}>
                        <input 
                            type='text' 
                            placeholder='search...' 
                            onChange={onChange}/>
                    </label>
                </div>
            </div>
            <ul 
                style={{
                    overflowY: 'scroll', 
                    height: `990px`, 
                    maxHeight: `990px`, 
                    listStyleType: 'none',
                    margin:'0px 0px 0px 0px',
                    padding: '0px 0px 0px 0px'}}>
                {
                    Data.length === 0 ?
                    OpenSourceData.map(item => {
                        return  <li key={item.id}>
                            <Link to={`/source/${item.value}`}
                                className='sourceList'>
                                {item.value}
                            </Link>
                        </li>
                    }):
                    
                    Data.map(item => {
                        return <li key={item.id} >
                            <Link 
                                to = {`/source/${item.value}`}
                                className='sourceList'>
                                {item.value}
                            </Link>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default SourceList;