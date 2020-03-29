import React, { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import OpenSourceData from '../data/OpenSourceData';
import './SourceList.scss';
import { WIDTH, HEIGHT } from '../constants';
import { useEffect } from 'react';
import {getProjectAll} from '../util/APIUtils'
const SourceList = memo(() => {
    const [render, setRender] = useState(false);
    const [Data, setData] = useState([]);
    const [inputText, setInputText] = useState('');
    const [openSourceData, setOpenSource] = useState([]);
    const onChange = useCallback((e) => {
        setInputText(e.target.value.toLowerCase());
        setData(openSourceData.filter(item => {
            return item.name.toLowerCase().indexOf(e.target.value) !== -1
        }));
    });

    useEffect(() => {
    }, [inputText.length])

    useEffect(() => {
        setRender(true);
        getProjectAll()
        .then(res => {
            res.map(item => {
                setOpenSource(items => [
                    ...items,
                    item
                ])                
            })
        })
        .catch(e => console.log(e));
    }, [])

    return (
        <div
            style={{
                width: `444px`,
                height: `915px`,
                background: '#414141',
                paddingLeft: `48px`,
                paddingTop: `38px`,
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
                    marginBottom: '33px' // 41 + 33 = 74
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
                            marginBottom: '52px' // 44 + 52 = 96
                        }}
                        onChange={onChange} />
                </label>
            </div>
            <div
                style={{
                    overflowY: 'scroll',
                    height: '702px' // ì¶”ê?? ê³„ì‚° ?•„?š”
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
                        inputText.length === 0 ?
                        openSourceData.map(item => {
                            return (
                            <li key={item.id}>
                                <Link to={`/source/${item.name}`}
                                    className='sourceList'>
                                    {item.name}
                                </Link>
                            </li>)
                        }) :
                        Data.map(item => {
                            return <li key={item.id}>
                                <Link
                                    to={`/source/${item.name}`}
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
});

export default SourceList;
