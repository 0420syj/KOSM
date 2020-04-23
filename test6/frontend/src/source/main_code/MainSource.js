/*
    즐겨찾기, 취약점을 버전별로 보여주는 페이지
*/

import React, { useState, useEffect, memo } from 'react';
import { Crawl, getFavProject } from '../../util/APIUtils';
import { MdStar, MdStarBorder } from 'react-icons/md'
import { IconContext } from 'react-icons';
import { addFavProject, deleteFavProject } from '../../util/APIUtils';
import OpenSourceData from '../../data/OpenSourceData';
import AfterMainSource from './versions_after_login_title/AfterMainSource';
import MainContent from './versions_content/MainContent';
import Radio from '@material-ui/core/Radio';
import {V3, V2} from '../../util/APIUtils';
import './MainSource.scss';

const MainSource = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [idKey, setIdKey] = useState(0);
    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');
    const [rendering, setRendering] = useState(true);
    const [selected, setSelected] = useState(1);    //선택된 페이지 저장
    const [severity, setSeverity] = useState('normal');

    useEffect(() => {
        if(severity === 'normal'){
        } 
        else if(severity === 'ver3'){
            const first_url = "https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=" + props.name; //이거는 keyword에 오픈소스이름넣어서 보내는거
            const signupRequest = {
                url: first_url,
                name: props.name
            }
            V3(signupRequest)
            .then(res => {
                console.log(res);
            })
            .catch(e => console.log(e));
        }else if(severity === 'ver2'){
            const first_url = "https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=" + props.name; //이거는 keyword에 오픈소스이름넣어서 보내는거
            const signupRequest = {
                url: first_url,
                name: props.name
            }
            V2(signupRequest)
            .then(res => {
                console.log(res);
            })
            .catch(e => console.log(e));
        }
    }, [severity])

    useEffect(() => {               //즐겨찾기 버튼에 색 추가
        if (sessionStorage.getItem('isLogin') === 'true') {   //로그인 된 상태라면
            setIsFavorite(false);
            getFavProject(sessionStorage.getItem('userId'))
                .then(res => {  //내가 즐겨찾기 한 목록과 이름이 일치하면 즐겨찾기 버튼 추가
                    res.map((items) => {
                        return items.name === props.name && setIsFavorite(true);
                    })
                })
                .catch(e => { console.log(e) })
        }
    }, [props.name]);

    useEffect(() => {       //크롤링하는 부분
        setData([]);
        setSelected(1);
        const first_url = "https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=" + props.name; //이거는 keyword에 오픈소스이름넣어서 보내는거
        const signupRequest = {
            url: first_url,
            name: props.name
        }

        Crawl(signupRequest)
            .then(res => {
                setData(res);
                OpenSourceData.map((res) => {       //내가 어떤 데이터를 추가할건지를 setIdKey함수를 통해서 설정
                    return res.name === props.name && setIdKey(res.id);
                })
            })
            .catch(e => console.log(e));
    }, [props.name])

    useEffect(() => {       //누른 페이지에 따라 링크가 변함
        setUrl(`https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=${props.name}&startIndex=${(selected - 1) * 20}`);
        setRendering(false);
    }, [props.name, selected])

    useEffect(() => {       //페이지 번호 눌렀을 때 들어오는 값
        if (url !== '') {
            Crawl({
                url: url,
                name: props.name
            })
                .then(res => {
                    setData(res);
                    OpenSourceData.map((res) => {       //내가 어떤 데이터를 추가할건지를 setIdKey함수를 통해서 설정
                        return res.name === props.name && setIdKey(res.id);
                    })
                    setRendering(true);
                })
                .catch(e => console.log(e));
        }
    }, [props.name, url]);

    const favoriteClick = () => {
        isFavorite === false ? function () {
            addFavorite()
            alert('즐겨찾기가 추가 되었습니다')
        }()
            : function () {
                deleteFavorite()
                alert('즐겨찾기를 삭제하였습니다.')
            }()
        setIsFavorite(!isFavorite);
    };

    const addFavorite = () => {
        const obj = {
            project_id: idKey,
            user_id: sessionStorage.getItem('userId')
        }
        if (idKey !== 0)
            addFavProject(obj)
    };

    const deleteFavorite = () => {
        if (idKey === 0) return;
        const obj = [];
        obj[0] = {
            id: 0,
            name: sessionStorage.getItem('email')
        }
        obj.push({
            id: idKey,
            name: props.name
        })
        deleteFavProject(obj)
            .catch(e => console.log(e));
    };
    
    return (
        <div>
            <div>
                <div>
                    <span>
                        {
                            sessionStorage.getItem('isLogin') === 'true' && data.length !== 0 ?
                            <span>
                                <After
                                    isFavorite={isFavorite}
                                    favoriteClick={favoriteClick}
                                    graph={data[0].graph}
                                    github={data[0].Link}
                                    name={props.name} />
                            </span> :
                            <div className='before'>
                                {props.name}
                                <span>
                                    {
                                        data.length !== 0 &&
                                        <Link graph={data[0].graph} github={data[0].Link} />
                                    }
                                </span>
                            </div>
                        }
                    </span>
                </div>
            </div>
            {
                data.length === 0 ?    //데이터가 없다면
                    <div style={{ width: '100%', justifyContent: 'center' }}>
                        <div style={{ marginTop: '80px' }} className="text-center">
                            <div style={{ color: '#e4e4e4' }} className="spinner-border" role="status">
                            </div>
                        </div>
                    </div> :
                    <div>
                        <div className='minititle'>
                            <AfterMainSource
                                github={data[0].Link}   //github 사이트
                                graph={data[0].graph}   //graph url
                                release={data[0].Release}   //깃허브의 release 버전
                                releaseDate={data[0].ReleaseDate}   //깃허브 release된 날짜
                                date={data[0].date}     //취약점 시간
                            />
                        </div>
                        <div className='vul'>
                            Vulnerability <span>검색결과 : {data[0].total}건</span>
                        </div>
                        <div className='mainRadioGroup'>
                            <RadioGroup severity={severity} setSeverity={setSeverity}/>
                        </div>
                        <div className='vul-content-title'>
                            <div className='code-number'>Vulnerability ID</div>
                            <div className='description'>Description</div>
                            <div className='severity'>Severity</div>
                        </div>
                        <div className="vul-content">
                            <MainContent data={data} name={props.name} rendering={rendering} selected = {selected}/>
                        </div>
                        <div
                            style={{ justifyContent: 'center', marginTop: '20px' }}
                            className='btn-toolbar'
                            role='toolbar'
                            aria-label="Toolbar with button groups">
                            <ButtonGroup 
                                count={Math.ceil(data[0].total / 20)}   
                                setSelected={setSelected} 
                                selected={selected} />
                        </div>
                    </div>
            }
        </div>
    )
}

const ButtonGroup = memo(({ count, setSelected, selected }) => {
    const [cnt, setCnt] = useState([]);
    const [select, setSelect] = useState(1);
    useEffect(() => {
        setCnt([])
        for (let i = 1; i <= count; i++) {
            setCnt(item => [
                ...item,
                i
            ]);
        }
    }, [count]);

    const onClick = (e) => {
        setSelected(e.target.value);
        setSelect(e.target.value);
    }

    return (
        <>
            {
                cnt.length !== 0 &&
                cnt.map(item => {
                    return (
                        parseInt(item) === parseInt(select)
                            ? <button
                                className='btn btn-secondary'
                                value={item}
                                key={item}
                                style={{ background: '#000000' }}>{item}</button>
                            : <button
                                className='btn btn-secondary'
                                onClick={onClick}
                                value={item}
                                key={item}>{item}</button>
                    )
                })
            }
        </>
    )
})

const After = ({ isFavorite, favoriteClick, name, github, graph }) => {
    return (
        <span className='after'>
            <span className='star'>
                <IconContext.Provider
                    value={{ color: '#f2cc0c', size: '40px' }}>
                    {
                        isFavorite === true
                            ? <MdStar onClick={favoriteClick} />
                            : <MdStarBorder onClick={favoriteClick} />
                    }
                </IconContext.Provider>
            </span>
            <span className='name'>
                {name}
            </span>
            <span className='link'>
                <Link graph={graph} github={github} />
            </span>
        </span>
    )
}

const RadioGroup = memo(({severity, setSeverity}) => {
    const handleChange = (e) => {setSeverity(e.target.value);}



    return (
        <span className='radioGroup'>
            <span className='radioTitle'>Normal: </span>
            <Radio
                checked={severity === 'normal'}
                onChange={handleChange}
                value="normal"
                color="default"
                name="radio-button-demo"
                className='radioButton'
                size="small"/>
            <span className='radioTitle'>version 3.x</span>
            <Radio
                checked={severity === 'ver3'}
                onChange={handleChange}
                value="ver3"
                color="default"
                name="radio-button-demo"
                className='radioButton'
                size="small"/>
            <span className='radioTitle'>version 2.x</span>
            <Radio
                checked={severity === 'ver2'}
                onChange={handleChange}
                value="ver2"
                color="default"
                name="radio-button-demo"
                className='radioButton'
                size="small"/>
        </span>
    )
})



const Link = ({ graph, github }) => {
    return (
        <span className='linkContainer'>
            <span className='graph'>
                {
                    graph !== null &&
                    <span>
                        <a      //그래프 사이트로 가는 링크
                            href={graph} target="_blank" rel="noopener noreferrer">
                            <img src="/icons/graph.png" alt="Graph" width="25px" height="25px" />
                        </a>
                    </span>
                }
            </span>
            <span className='github'>
                {
                    github !== null &&
                    <span>
                        <a      //깃허브 사이트로 가는 링크
                            href={github} target="_blank" rel="noopener noreferrer">
                            <img src="/icons/github.png" alt="GitHub" width="25px" height="25px" />
                        </a>
                    </span>
                }
            </span>
        </span>
    )
}
export default MainSource;