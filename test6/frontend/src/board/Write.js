import React, { useEffect, useState } from 'react';
import './Board.scss';
import {getBoardOnce, getBoardCount, getBoards} from '../util/APIUtils'
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {writeBoard} from '../util/APIUtils'
import { useHistory } from "react-router-dom";
import './Write.scss'

const Write = () => {

    const history = useHistory();

    const [article, setArticle] = useState({
        'username': sessionStorage.getItem('username'),
        'title': '',
        validTitle: false,
        'content': '',
        validContent: false,
    });
    
    const validateTitle = title => {
        setArticle({
            ...article,
            validTitle: true,
            title
        })
        // console.log(article)
    }
    
    const validateContent = content => {
        setArticle({
            ...article,
            validContent: true,
            content
        })
        // console.log(article)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const boardSaveRequest = {
            author: article.username,
            title: article.title,
            content: article.content,
        }
        writeBoard(boardSaveRequest)
        .then(() => {
            history.goBack()
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className="container">
            <div className="top">
                {
                    sessionStorage.getItem('isLogin') === 'false' ?
                    <BeforeMenu/>:
                    <AfterMenu/>
                }
            </div>
            <div className='write-container'>
                <h3 className="write-title">게시판 작성</h3>
                <Form>
                    <Input
                        type="text"
                        name="title"
                        id="articleTitle"
                        className="input-title"
                        placeholder="제목을 입력해주세요."
                        onChange={e => {validateTitle(e.target.value)}}>
                    </Input>
                    <Input
                        type="textarea"
                        name="content"
                        id="articleContent"
                        className="input-content"
                        style={{height:'431px'}}
                        placeholder="내용을 입력해주세요."
                        onChange={e => {validateContent(e.target.value)}}>
                    </Input>
                    <div style={{textAlign:'center'}}>
                        <Button className="okay-button" onClick={handleSubmit}>확인</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
};

export default Write;
