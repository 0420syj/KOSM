import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OpenSourceData from '../data/OpenSourceData';
import './SourceList.scss';
import { WIDTH, HEIGHT } from '../constants';
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
                height: '915px',
                width: `444px`,
                background: '#414141',
                paddingLeft: `${WIDTH * 48}px`,
                paddingTop: `${HEIGHT * 38}px`,
            }}>
            <div
                style={{
                    color: '#e4e4e4',
                    width: `${WIDTH * 121}px`,
                    height: '41px',
                    fontFamily: 'NotoSans',
                    fontSize: '30px',
                    fontWeight: 'bold',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: '1.37',
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    marginBottom: '33px'
                }}>
                Projects
                </div>
            <div>
                <label
                    style={{
                        justifyContent: 'left',
                        display: 'flex'
                    }}>
                    <input
                        type='text'
                        placeholder='Search...'
                        style={{
                            fontFamily: 'NotoSans',
                            width: '361px',
                            height: '44px',
                            border: 'none',
                            borderRadius: '9px',
                            backgroundColor: '#f5f5f5',
                            padding: '2px 8px',
                            marginBottom: '52px'
                        }}
                        onChange={onChange} />
                </label>
            </div>
            <div
                style={{
                    overflowY: 'scroll',
                    height: '702px'
                }}>
                <ul
                    style={{
                        listStyleType: 'none',
                        paddingLeft: '9px',
                        fontFamily: 'NotoSans',
                        fontSize: '20px',
                        lineHeight: '34px',
                        letterSpacing: '2px',
                    }}>
                    {
                        Data.length === 0 ?
                            OpenSourceData.map(item => {
                                return <li key={item.id}>
                                    <Link to={`/source/${item.value}`}
                                        className='sourceList'>
                                        {item.value}
                                    </Link>
                                </li>
                            }) :

                            Data.map(item => {
                                return <li key={item.id} >
                                    <Link
                                        to={`/source/${item.value}`}
                                        className='sourceList'>
                                        {item.value}
                                    </Link>
                                </li>
                            })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SourceList;
