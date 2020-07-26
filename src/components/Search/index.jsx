import React, { Component } from 'react';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            searchArguments: props.searchArguments
        };

        this.refreshSearch = this.refreshSearch.bind(this);
        this.stars = this.stars.bind(this);
        this.forks = this.forks.bind(this);
        this.alphabetAscending = this.alphabetAscending.bind(this);
        this.alphabetDescending = this.alphabetDescending.bind(this);
    }

    refreshSearch = () => {
        let tempState = this.state.searchArguments;

        tempState["SearchString"] = document.getElementById("search-field").value;
        tempState.StateChange = true;

        this.setState({searchArguments: tempState});
        this.props.passArgsFunction(this.state.searchArguments);
    }

    stars = () => {
        let tempState = this.state.searchArguments;

        if(this.state.searchArguments["Stars"] === true) {
            tempState["Stars"] = false;
        } else {
            tempState["Stars"] = true;
        }

        tempState.StateChange = true;

        this.setState({searchArguments: tempState});
        this.props.passArgsFunction(this.state.searchArguments);
    }

    forks = () => {
        let tempState = this.state.searchArguments;

        if(this.state.searchArguments["Forks"] === true) {
            tempState["Forks"] = false;
        } else {
            tempState["Forks"] = true;
        }

        tempState.StateChange = true;

        this.setState({searchArguments: tempState});    
    }

    alphabetAscending = () => {
        let tempState = this.state.searchArguments;

        if(this.state.searchArguments["AlphabetAscending"] === true) {
            tempState["AlphabetAscending"] = false;
        } else {
            tempState["AlphabetAscending"] = true;
        }

        tempState.StateChange = true;

        this.setState({searchArguments: tempState});
    }

    alphabetDescending = () => {
        let tempState = this.state.searchArguments;

        if(this.state.searchArguments["AlphabetDescending"] === true) {
            tempState["AlphabetDescending"] = false;
        } else {
            tempState["AlphabetDescending"] = true;
        }

        tempState.StateChange = true;

        this.setState({searchArguments: tempState});
    }

    render() {
        return (
            <div className="searching">
                <input type="text" id="search-field" onKeyUp={this.refreshSearch} placeholder="Search Repositories"></input>

                <div className="sorting">
                    <h3>Sort By</h3>
                    <button onClick={this.stars}>Stars</button>
                    <button onClick={this.forks}>Forks</button>
                    <button onClick={this.alphabetAscending}>Alphabet A First</button>
                    <button onClick={this.alphabetDescending}>Alphabet Z First</button>
                </div>
                <div className="filtering">
                    <h3>Filter By</h3>
                    
                </div>
            </div>
        );
    }
}