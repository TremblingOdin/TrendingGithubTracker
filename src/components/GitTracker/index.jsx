import React, { Component} from 'react';
import {GitCardToolTip} from '..';
import {BubbleSort} from '..';
import {Search} from '..';

export default class GitTracker extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            cardData: null, 
            loadArgs: {
                Amount: 10,
                StateChanged: false,

                "SearchString": "",
                "Stars": false,
                "Forks": false,
                "AlphabetAscending": false,
                "AlsphabetDescending": false,

                "CodeLanguage": "",
                "Time": "daily",
                "SpokenLanguage": ""
            }
        };

        this.PrepLoadCards = this.PrepLoadCards.bind(this);
        this.LoadCards = this.LoadCards.bind(this);
    }

    componentDidMount() {
        this.PrepLoadCards();
    }

    PrepLoadCards = () => {
        let tempState = this.state.loadArgs;
        tempState.StateChanged = false;

        if(this.state.cardData === null)
            this.LoadCards();

        
        let tempRenderCards = [];
        if(this.state.loadArgs["SearchString"] !== "") {
            for(let j = 0; j < this.state.loadArgs.Amount; j++) {
                for(let i = 0; i < this.state.cardData.length; i++){
                    if(this.state.cardData[i].name.includes(this.state.loadArgs["SearchString"]) || this.state.cardData[i].description.includes(this.state.loadArgs["SearchString"])) {
                        tempRenderCards.push(this.state.cardData[i]);
                        break;
                    }
                }
            }
        } else {
            tempRenderCards = this.state.renderCards;
        }

        if(this.state.loadArgs["Stars"] === true) {
            for(let i = 0; i<tempRenderCards.length; i++) {
                console.log(tempRenderCards[i]["stars"]);
            }

            //This would normally be either quick, but due to a timelimit I went with the simplest sort to code
            tempRenderCards = BubbleSort(tempRenderCards, "stars");

            for(let i = 0; i<tempRenderCards.length; i++) {
                console.log(tempRenderCards[i]["stars"]);
            }
        }

        if(this.state.loadArgs["Forks"] === true) {

        }

        if(this.state.loadArgs["AlphabetAscending"] === true) {

        }

        if(this.state.loadArgs["AlphabetDescending"] === true) {

        }

        //With JS sometimes it's worth being redundant
        this.setState({
            cardData: this.state.cardData,
            loadArgs: tempState,
            renderCards: tempRenderCards
        })
    }

    LoadCards = () => {
        let getRequestString = "https://ghapi.huchen.dev/repositories?";

        getRequestString += "language=";
        if(this.state.loadArgs["CodeLanguage"]) { 
            getRequestString += this.state.loadArgs["CodeLanguage"]; 
        }
        getRequestString += "&";
        
        getRequestString += "since=";
        if(this.state.loadArgs["Time"]) {
            getRequestString += this.state.loadArgs["Time"]; 
        }
        getRequestString += "&";

        getRequestString += "spoken_language_code=";
        if(this.state.loadArgs["SpokenLanguage"]) {
            getRequestString += this.state.loadArgs["spoken_language_code"]; 
        }
    
        this.RequestAPIs(getRequestString, this.UpdateCardData)
    }

    RequestAPIs = (getRequestString, callback) => {
        var request = new XMLHttpRequest();

        request.open('GET', getRequestString);

        request.onreadystatechange = function() {
            if(this.readyState === 4) {
                callback(this.responseText);
            }
        };

        request.send();

    }

    UpdateCardData = (newCardData) => {
        this.setState(() => ({
            cardData: newCardData
        }));

        this.setState(() => ({
            cardData: JSON.parse(this.state.cardData)
        }));

        let tempRenderData = [];

        for(let i = 0; i < this.state.loadArgs.Amount; i++) {
            tempRenderData[i] = this.state.cardData[i];
            tempRenderData[i].index = i;
        }

        this.setState(() => ({
            renderCards: tempRenderData
        }));
    }

    cardEnter = (index) => {
        this.props.setIsShown(true);
        this.props.setShowIndex(index);
    }

    cardExit = () => {
        this.props.setIsShown(false);
        this.props.setShowIndex(-99);
    }

    updateArgs = (newArgs) => {
        this.setState(() => ({
            loadArgs: newArgs
        }));

        this.PrepLoadCards();
    }

    render() {
        if(this.state.loadArgs.StateChanged === true) {
            this.PrepLoadCards();
        }

        if(this.state.renderCards) {
            //small note, I don't know how to handle what I assume is Mandarin because I am a giant nerd and can actually read japanese
            //I'm leaving all non-romantic script descriptions as they are because I only have 90 minutes, but if I had more time I'd like to try and clean it up
            //Not completely get rid of it just make it so that it's spaced well and doesn't trip up anyone's dyslexia or anything when it's right next to english

            return (
                <div className="Tracker">
                    <Search searchArguments={this.state.loadArgs} passArgsFunction={this.updateArgs} />
                    <div className="row">
                        {this.state.renderCards.map((card) => {
                            return(
                                <div className="card" 
                                    onMouseEnter={() => this.cardEnter(card.index)}
                                    onMouseLeave={() => this.cardExit()}>
                                    
                                    {this.props.isShown && this.props.showIndex === card.index && (
                                        <GitCardToolTip cardToolTip={card} />
                                    )}

                                    <div className="card-display">
                                        <div className="card-head card-info">
                                            {card.name}
                                        </div>
                                        <div className="card-link card-info">
                                            <a href={card.url}>
                                                {card.url}
                                            </a>
                                        </div>
                                        <div className="card-stars card-info">
                                            Stars: {card.stars}
                                        </div>
                                        <div className="card-forks card-info">
                                            Forks: {card.forks}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="Tracker">
                    <Search searchArguments={this.state.loadArgs}/>
                    <div className="row">
                        
                    </div>
                </div>
            );
        }
    }
}