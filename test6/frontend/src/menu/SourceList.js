import React, {useState} from 'react';
import './SourceList.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import app from '../data/openSourceData';
const os = [
    {id: 1, value: 'Linux'},
    {id: 2, value: 'Unix'},
    {id: 3, value: 'window'}
]

const middleware = [
    {id: 1, value: 'MW1'},
    {id: 2, value: 'MW2'}
]

const osList = os.map(names => <li key={names.id}>{names.value}</li>);
const middlewareList = middleware.map(names => <li key={names.id}>{names.value}</li>);
const appList = app.map(names => {
    return names.value.length > 10 ? <li key={names.id}>{names.value.slice(0, 10)} ...</li> : <li key={names.id}>{names.value}</li>
});

const SourceList = () => {
    const [OSvalue, setOSvalue] = useState(false);
    const [MVvalue, setMVvalue] = useState(false);
    const [OpenSvalue, setOpenSvalue] = useState(false);
    return (
        <div className='listStyle'>
            <button className='listTitle' onClick={() => setOSvalue(!OSvalue)}>OS</button>
            <div>
                {OSvalue === true ? <ul>{osList}</ul> : null}
            </div>
            <button className='listTitle' onClick={() => setMVvalue(!MVvalue)}>Middle Ware</button>
            <div>
                {MVvalue === true ? <ul>{middlewareList}</ul> : null}
            </div>
            <button className='listTitle' onClick={() => setOpenSvalue(!OpenSvalue)}>App</button>
            <div>
                {OpenSvalue === true ? <ul>{appList}</ul> : null}
            </div>
        </div>
    )
}
export default SourceList;