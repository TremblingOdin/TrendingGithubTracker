import React, {Component} from 'react';

export default class GitCardToolTip extends Component {
    constructor(props) {
        super(props);

        this.state = {cardToolTip: props.cardToolTip};
    }

    render() {
        return(
            <div className="card-tooltip">
                <div className="card-author">
                    {this.state.cardToolTip.author}
                </div>
                <div className="card-avatar">
                    {this.state.cardToolTip.avatar}
                </div>
                <div className="card-description">
                    {this.state.cardToolTip.description}
                </div>
                <div className="card-language">
                    {this.state.cardToolTip.language}
                </div>
            </div>
        )
    }
}