import React from 'react';
import ReactDOM from 'react-dom';
import '../../index.css';
import GoogleApiWrapper from '../map/map';
import {API_KEY, NUMBER_OF_TIMES} from '../../constants';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorFetchingPosition: null,
            errorFetchingPassList: null,
            isLoadedPosition: false,
            isLoadedPassList: false,
            issPosition: {},
            passList: Array(NUMBER_OF_TIMES).fill(null)
        };
    }

/*     getISSPosition() {
        fetch("http://api.open-notify.org/iss-now.json")
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoadedPosition: true,
                    issPosition: result.iss_position
                });
            },
            (errorFetchingPosition) => {
                console.log(errorFetchingPosition);
                this.setState({
                    isLoadedPosition: true,
                    errorFetchingPosition
                });
            }
        );
    } */

    getISSPassList(latitude, longitude, passes) {
        const url = "http://api.open-notify.org/iss-pass.json?lat=" + latitude + "&lon=" + longitude + "&n="  + passes;

        fetch(url)
        .then(response => response.json())
        .then(
            (result) => {
                console.log("What the fuck number2?!" + result);
                this.setState({
                    isLoadedPassList: true,
                    times: result.response
                });
            },
            (errorFetchingPosition) => {
                console.log("ERROR:", errorFetchingPosition);
                this.setState({
                    isLoadedPassList: true,
                    errorFetchingPassList: errorFetchingPosition
                });
            }
        );
    }

    componentDidMount() {
        //this.getISSPassList(34, 48, NUMBER_OF_TIMES);
    }

    render() {
        let passes = this.state.errorFetchingPassList ? "" + this.state.errorFetchingPassList : "";
        if (!this.state.errorFetchingPassList && this.state.isLoadedPassList) {
            for (let index = 0; index < NUMBER_OF_TIMES; index++) {
                const element = this.state.times[index];
                passes += element.duration;
            }
        }

        return (
            <div className="App">
                <h1 style={{textAlign: "center"}}>International Space Station</h1>
                
                <h2>{passes}</h2>
                <GoogleApiWrapper apiKey={API_KEY} />
                
            </div>
        )
    }
}

export default App;