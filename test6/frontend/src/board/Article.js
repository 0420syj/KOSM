import React, { Component } from 'react'
import {getArticle} from '../util/APIUtils'

const Article = ({match}) => {

    console.log(match.params.id)

    const data = new Object();

    getArticle(match.params.id).then(res => {
        localStorage.removeItem("article");
        data.id = res.id;
        data.title = res.title;
        data.content = res.content;
        data.author = res.author;
        data.status = res.status;
        data.date = res.createdDate;
        localStorage.article = JSON.stringify(data);
    })

    return (
        <div>
            <h2>제목 : {JSON.parse(localStorage.article).title}</h2>
            <h2>내용 : {JSON.parse(localStorage.article).content}</h2>
        </div>
    );
}

export default Article;
