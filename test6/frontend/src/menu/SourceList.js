import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import './SourceList.scss';
import { useEffect } from 'react';
import {getProjectAll} from '../util/APIUtils'
import OpenSourceData from '../data/OpenSourceData';
import {communicationApplication, database, developmentTool, websiteSoftware, imageMedia, office, others} from '../data/OpenSourceData';
import { Collapse, Button } from 'reactstrap';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const pushArr = (response, arrName, setOpenSource) => {
    response.map(item => {
        arrName.push(
            <li key={item.id}>
                <Link to={`/source/${item.name}`} className='sourceList'>{item.name}</Link>
            </li>
        )
        setOpenSource(openSource => [...openSource, item])
        OpenSourceData.push(item);
        return true;
    })
}

const SourceList = memo(() => {
    const [data, setData] = useState([]);                       //검색했을 때 나오는 리스트를 담은 배열
    const [inputText, setInputText] = useState('');             //검색창에 들어가는 데이터
    // Warning 삭제
    // eslint-disable-next-line
    const [openSource, setOpenSource] = useState([]);       //검색하기 전 오픈소스 리스트

    // 카테고리 Open 상태관리
    const [isOpenWeb, setIsOpenWeb] = useState(true);
    const [isOpenCommun, setIsOpenCommun] = useState(true);
    const [isOpenDevel, setIsOpenDevel] = useState(true);
    const [isOpenData, setIsOpenData] = useState(true);
    const [isOpenImage, setIsOpenImage] = useState(true);
    const [isOpenOthers, setIsOpenOthers] = useState(true);
    const [isOpenOffice, setIsOpenOffice] = useState(true);
    // 카테고리별 토글 Function
    const toggleWeb = () => setIsOpenWeb(!isOpenWeb);
    const toggleCommun = () => setIsOpenCommun(!isOpenCommun);
    const toggleDevel = () => setIsOpenDevel(!isOpenDevel);
    const toggleData = () => setIsOpenData(!isOpenData);
    const toggleImage = () => setIsOpenImage(!isOpenImage);
    const toggleOthers = () => setIsOpenOthers(!isOpenOthers);
    const toggleOffice = () => setIsOpenOffice(!isOpenOffice);

    const onChange = (e) => {
        setInputText(e.target.value);     //검색하는 문자들을 소문자로 변환해준다.
        setData(OpenSourceData.filter(item => {
            return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
        }));
    };

    useEffect(() => {       //화면이 렌더링 되기 전에 getProjectAll()를 이용해서 서버에서 오픈소스 리스트들을 받아온다.
        reset(setOpenSource);
    }, [])

    const Category = memo(({title, body, toggle, isOpen}) => {
        return (
            <>
                <Button 
                    color="secondary" 
                    onClick={toggle} 
                    className="btn-category">
                    {isOpen ? <IoIosArrowDown/> : <IoIosArrowForward/>} {title} ({body.length})
                </Button>
                <Collapse 
                    isOpen={isOpen}
                    className="opensource-item">
                    {body}
                </Collapse>
            </>
        )
    })

    return (
        <div className='source-list-container'>
            <div className='project'>
                Projects
            </div>
            <div>
                <label className='label'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='input'
                        onChange={onChange} />
                </label>
            </div>
            <div
                style={{
                    overflowY: 'scroll',
                    height: 'calc(100% - 178px)' // 원래길이 699px
                }}>
                <ul className="opensource-item">
                    {
                        inputText.length === 0 ?            //아무런 검색이 안될 때
                        <div>
                            {
                                OpenSourceData.length !== 0 &&
                                <>
                                    <Category title={'web-software'} body={websiteSoftware} toggle={toggleWeb} isOpen={isOpenWeb}/>
                                    <Category title={'communication-application'} body={communicationApplication} toggle={toggleCommun} isOpen={isOpenCommun}/>
                                    <Category title={'development-tool'} body={developmentTool} toggle={toggleDevel} isOpen={isOpenDevel}/>
                                    <Category title={'database'} body={database} toggle={toggleData} isOpen={isOpenData}/>
                                    <Category title={'image/media'} body={imageMedia} toggle={toggleImage} isOpen={isOpenImage}/>
                                    <Category title={'office-software'} body={office} toggle={toggleOffice} isOpen={isOpenOffice}/>
                                    <Category title={'Others'} body={others} toggle={toggleOthers} isOpen={isOpenOthers}/>
                                </>
                            }
                        </div> : 
                        data.map(item => {
                            return (
                            <li key={item.id}>
                                <Link
                                    to={`/source/${item.name}`}
                                    className='sourceList'>
                                    {item.name}
                                </Link>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
});

const reset = (setOpenSource) => {
    if(OpenSourceData.length === 0){
        getProjectAll()
            .then(res => {
                console.log(res);
                pushArr(res.communication_application, communicationApplication, setOpenSource);
                pushArr(res.database, database, setOpenSource);
                pushArr(res.development_tool, developmentTool, setOpenSource);
                pushArr(res.website_software, websiteSoftware, setOpenSource);
                pushArr(res.image_media, imageMedia, setOpenSource);
                pushArr(res.others, others, setOpenSource);
                pushArr(res.office_software, office, setOpenSource);
            })
            .catch(e => console.log(e));
    }
}
export default SourceList;
