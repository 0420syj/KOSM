import React from 'react';
import {WIDTH, HEIGHT} from '../../constants';
const Description = () => {
    return ( 
        <div
            style={{
                marginLeft: `${WIDTH * 170}px`,
                marginTop: `${HEIGHT * 80}px`,
            }}>
            <div 
                style={{
                    width: '437px', 
                    height: '186px',
                    fontFamily: 'NotoSans',
                    fontSize: '80px',
                    fontWeight: 'bold',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: '0.96',
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    color: '#eaeaea'}}>
                <div>Built for</div>
                <div>developers</div>
            </div>
            <div
                style={{
                    width: '693px',
                    marginTop: '50px',
                    height: '353px',
                    fontFamily: 'NotoSans',
                    fontWeight: '300',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: '1.37',
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    color: '#eaeaea',
                }}>
                    <div>KOSM is a development platform inspried by the way</div>
                    <div>you work. From <span style={{fontWweight: 'bold'}}>open source</span> to <span style={{fontWeight: 'bold'}}>business,</span> you</div>
                    <div>can host and review code, manageprojects, and</div>
                    <div>build software alongside 40 million developers.</div>
            </div>
        </div>
    )
}

export default Description;