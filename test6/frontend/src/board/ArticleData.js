import {getBoardOnce, getBoards} from '../util/APIUtils'
// 게시글 테스트 데이터

const data = [
    {
        id: 1,
        title: '안녕하세요',
        author: '강파고',
        time: '2020.01.31',
    },
    {
        id: 2,
        title: '이럴수가',
        author: '완파고',
        time: '2020.02.04',
    },
    {
        id: 3,
        title: '정말',
        author: '손파고',
        time: '2020.01.29',
    },
    {
        id: 4,
        title: '멋져요',
        author: '백파고',
        time: '2020.02.03',
    },
];

getBoardOnce()
    .then(response => {
        data.push({
            id: response.id,
            title: response.title,
            author: response.author,
            time: response.created_date,
        });
        localStorage.articles = JSON.stringify(data); // 게시글 데이터 localStorage.data에 저장
    });



// getBoards()
//     .then(response => {
//         console.log(response);
//     });



export default data;