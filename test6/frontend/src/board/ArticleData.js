// 게시글 테스트 데이터
const data = [
    {
        id: 1,
        title: '안녕하세요',
        name: '강파고',
        time: '2020.01.31',
    },
    {
        id: 2,
        title: '이럴수가',
        name: '완파고',
        time: '2020.02.04',
    },
    {
        id: 3,
        title: '정말',
        name: '손파고',
        time: '2020.01.29',
    },
    {
        id: 4,
        title: '멋져요',
        name: '백파고',
        time: '2020.02.03',
    },
];

for(var i = 5; i<=100; i++)
    data.push({
        id: i,
        title: data[i%4].title,
        name: data[i%4].name,
        time: data[i%4].time,
    })

export default data;