import React, { useEffect, useState } from 'react';
import './Board.scss';
import {getBoardOnce, getBoardCount, getBoards} from '../util/APIUtils'
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router } from 'react-router-dom';

const Write = () => {
    return (
        <>
            <div>
                {
                    localStorage.getItem('isLogin') === 'false' ?
                    <BeforeMenu/>:
                    <AfterMenu/>
                }
            </div>
            <div className='container'>
                <h1>게시판 작성</h1>
                <Form>
                    <Input
                    type="text"
                    name="title"
                    id="articleTitle"
                    placeholder="제목을 입력해주세요.">
                    </Input>
                    <Input
                    type="textarea"
                    name="content"
                    id="articleContent"
                    placeholder="내용을 입력해주세요.">
                    </Input>
                    <Button>확인</Button>
                </Form>
            </div>
        </>
    )
};

export default Write;
