import React, { useState, useEffect } from 'react';
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import SourceList from '../menu/SourceList';
import Footer from '../menu/Footer'
import { Button, Badge } from 'reactstrap';
import { MdEmail } from "react-icons/md";
import './About.scss';

const About = () => {

    const renderTopMenu = () => {
        if (sessionStorage.getItem('isLogin') !== 'false')
            return <AfterMenu />
        else
            return <BeforeMenu />
    };

    // 멤버 아이템 후보1
    const MemberItem = ({ img, name, job, univ, email }) => {
        return (
            <div style={{ width: '390px', marginLeft: "20px", marginRight: '20px' }}>
                <div className="member-info">
                    <img src={img ? img : '/img.png'} alt={name} title={name} className="member-img" />
                    <div className="member-text">
                        <p className="member-name">{name}</p>
                        <p className="member-job">{job}</p>
                        <p className="member-univ">{univ}</p>
                    </div>
                </div>
                <div className='member-contact'>
                    <p className='member-email'><MdEmail /> {email ? email : '이메일을 입력해주세요'}</p>
                    <p className='member-github'>
                        <a href='https://github.com/0420syj' target='_blank' rel="noopener noreferrer">
                            <img src='/icons/github.png' alt='' className='github-icon'/>https://github.com/0420syj
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
                        <div className='title'>KOSM</div>
                        <div className='content'>Kangpago OpenSource Management</div>
                    </div>
                    <div className='about-us'>
                        <div className='title' style={{ textAlign: 'left', marginBottom: '40px' }}>만든 사람들</div>
                        <div className='member-row'>
                            <MemberItem
                                // img={'http~~'}
                                name={'강태완'}
                                job={'Front-End Developer'}
                                univ={'광운대학교 소프트웨어학부(15)'}
                            />
                            <MemberItem
                                // img={'http~~'}
                                name={'심 완'}
                                job={'Front-End Developer'}
                                univ={'광운대학교 소프트웨어학부(15)'}
                                email={'0420syj@naver.com'}
                            />
                        </div>
                        <div className='member-row'>
                            <MemberItem
                                // img={'http~~'}
                                name={'백근우'}
                                job={'Back-End Developer'}
                                univ={'광운대학교 소프트웨어학부(15)'}
                            />
                            <MemberItem
                                // img={'http~~'}
                                name={'손창환'}
                                job={'Back-End Developer'}
                                univ={'광운대학교 소프트웨어학부(15)'}
                            />
                        </div>
                        <div className='member-row'>
                            <MemberItem
                                // img={'http~~'}
                                name={'김예원'}
                                job={'Web Designer'}
                                univ={'광운대학교 미디어커뮤니케이션학부(16)'}
                            />
                            <MemberItem
                                // img={'http~~'}
                                name={'허채원'}
                                job={'Web Designer'}
                                univ={'광운대학교 미디어커뮤니케이션학부(16)'}
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
