import React, { useState } from 'react';
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import { Button, Form, Input } from 'reactstrap';
import {writeBoard} from '../util/APIUtils'
import { useHistory } from "react-router-dom";
import './Write.scss'

const Write = () => {

    let history = useHistory();

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

    const validateCondition = () => {

        var flag = true

        var temp_title = article.title
        var temp_content = article.content

        if(!temp_title.trim().length || !temp_content.trim().length) {
            alert("공백 문자만으로 입력할 수 없습니다.")
            flag = false
        }

        else if(temp_title.trim().length < 5) {
            alert("제목이 너무 짧습니다. (공백 문자 제외, 5자 이상)")
            flag = false
        }

        else if(temp_content.trim().length < 10) {
            alert("내용이 너무 짧습니다. (공백 문자 제외, 10자 이상)")
            flag = false
        }

        return flag
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validateCondition())
            return

        const boardSaveRequest = {
            author: article.username,
            title: article.title,
            content: article.content,
        }
        writeBoard(boardSaveRequest)
        .then(() => {
            history.push('/board')
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
