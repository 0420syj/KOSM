import React, {Component} from 'react';

class ToggleText extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {isToggleOn: true};

        this.handleClick = this.handleClick.bind(this);
    };

    handleClick()
    {
        this.setState(function(prevState)
        {
            return {isToggleOn : !prevState.isToggleOn};
        });
    };

    getImage = () => this.state.isToggleOn ? '☆' : '★'; // 이미지 링크 설정

    render() {
        const imageSrc = this.getImage();
        return (
            <div className='listContainer' onClick={this.handleClick}>
                {imageSrc}
            </div>
        );
    };
}

export default ToggleText;