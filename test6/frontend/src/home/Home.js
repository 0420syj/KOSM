import React, {useState} from 'react';
import Menu from '../menu/Menu';


const Home = () => {
    const [menuSelector, setMenuSelector] = useState(0);

    return (
        <div>
            <Menu menuSelector = {menuSelector} setMenuSelector={setMenuSelector}/>
        </div>
    )
}

export default Home;