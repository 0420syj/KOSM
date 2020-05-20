import React, { useState, useEffect } from 'react';
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import SourceList from '../menu/SourceList';
import Footer from '../menu/Footer'
import { Button, Badge } from 'reactstrap';
import { MdEmail, MdHome } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import './About.scss';

const About = () => {

    const renderTopMenu = () => {
        if (sessionStorage.getItem('isLogin') !== 'false')
            return <AfterMenu />
        else
            return <BeforeMenu />
    };

    const MemberItem = ({ img, name, job, univ, email, icon, github }) => {
        return (
            <div style={{ width: '390px', marginLeft: "20px", marginRight: '20px' }}>
                <div className="member-info">
                    <img src={img ? img : '/icons/member.png'} alt={name} title={name} className="member-img" />
                    <div className="member-text">
                        <p className="member-name">{name}</p>
                        <p className="member-job">{job}</p>
                        <p className="member-univ">{univ}</p>
                    </div>
                </div>
                <div className='member-contact'>
                    <p className='member-email'><MdEmail /> {email ? email : '이메일을 입력해주세요'}</p>
                    <p className='member-github'>{!icon && <MdHome/>}
                        <a href={github} target='_blank' rel="noopener noreferrer">
                            <img src={icon == 'github' ? '/icons/github.png' : ''} alt='' className='github-icon'/>{github ? github : '주소를 입력해주세요'}
                        </a>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="top">
                {renderTopMenu()}
            </div>
            {/* <div className="left">
                <SourceList />
            </div> */}
            <div className="about">
                <div className='about-container'>
                    <div className='about-kosm'>
                        <div className='title' style={{ color:'hsl(177, 50%, 45%)' }}>KOSM</div>
                        <div className='content' style={{ fontSize: '28px' }}>Kangpago OpenSource Management</div>
                    </div>
                    <div className='about-us'>
                        <div className='title' style={{ textAlign: 'left', marginBottom: '40px' }}>만든 사람들</div>
                        <div className='member-row'>
                            <MemberItem
                                // img={'http~~'}
                                name={'강태완'}
                                job={'Front-End Developer'}
                                univ={'광운대학교 소프트웨어학부(15)'}
                                email={'king6096211@naver.com'}
                                icon={'github'}
                                github={'https://github.com/taewankang'}
                                
                            />
                            <MemberItem
                                // img={'https://avatars1.githubusercontent.com/u/22449484?s=460&u=cc26a7d57d32d35faeb2950845ae551eae301606&v=4'}
                                name={'심 완'}
                                job={'Front-End Developer'}
                                univ={'광운대학교 소프트웨어학부(15)'}
                                email={'0420syj@naver.com'}
                                icon={'github'}
                                github={'https://github.com/0420syj'}
                            />
                        </div>
                        <div className='member-row'>
                            <MemberItem
                                // img={'http~~'}
                                name={'백근우'}
                                job={'Back-End Developer'}
                                univ={'광운대학교 소프트웨어학부(15)'}
                                email={'geunu3751@gmail.com'}
                                icon={'github'}
                                github={'https://github.com/geunwoo'}
                            />
                            <MemberItem
                                // img={'http~~'}
                                name={'손창환'}
                                job={'Back-End Developer'}
                                univ={'광운대학교 소프트웨어학부(15)'}
                                email={'sonch12@naver.com'}
                                icon={'github'}
                                github={'https://github.com/Changhwan-Son'}
                            />
                        </div>
                        <div className='member-row'>
                            <MemberItem
                                // img={'http~~'}
                                name={'김예원'}
                                job={'Web Designer'}
                                univ={'광운대학교 미디어커뮤니케이션학부(16)'}
                                email={''}
                                github={''}
                            />
                            <MemberItem
                                // img={'http~~'}
                                name={'허채원'}
                                job={'Web Designer'}
                                univ={'광운대학교 미디어커뮤니케이션학부(16)'}
                                email={''}
                                github={''}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <Footer />
            </div>
        </div>
    )
}

export default About;
