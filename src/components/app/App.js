import React from "react";
import ReactDOM from "react-dom";
import "../../index.css";
import GoogleApiWrapper from "../map/map";
import { API_KEY, NUMBER_OF_TIMES } from "../../constants";

import $ from "jquery";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            isLoadedPassList: false,
            passList: Array(NUMBER_OF_TIMES).fill(null),
		};
	}

	getISSPassList(latitude, longitude, passes) {

        const url = 'http://api.open-notify.org/iss-pass.json?lat=' + latitude + '&lon=' + longitude + '&n=' + passes + '&callback=?'

/*         let array = [];
        $.getJSON(url, function(data) {
            data['response'].forEach(function (d) {
                var date = new Date(d['risetime']*1000);
                console.log("DATE ->", d);
                array.push(date.toString());
                //$('#isspass').append('<li>' + date.toString() + '</li>');
            });
        }) */


        $.getJSON(url).then(
            (res) => {
                this.setState({
                    isLoadedPassList: true,
                    passList: res.response,
                });
            },
            (err) => {
                console.log("ERROR -> getISSPassList ->", err);
            }
        );
    }

	componentDidMount() {
		this.getISSPassList(46.070966, 13.234905, NUMBER_OF_TIMES);
	}

	render() {
		let passes = "";
		if (this.state.isLoadedPassList) {
			for (let index = 0; index < NUMBER_OF_TIMES; index++) {
				const element = this.state.passList[index];
                passes += new Date(element.risetime * 1000) + "\n";
                console.log("Element " + index + " -> " + JSON.stringify(element));
                console.log("Date " + index + " -> " + (new Date(element.risetime * 1000)));
			}
		}

		return (
			<div className="App">
				<h1 style={{ textAlign: "center" }}>International Space Station</h1>
                <h2 style={{ textAlign: "center" }}>{passes}</h2>
				<GoogleApiWrapper apiKey={API_KEY} />
			</div>
		);
	}
}

export default App;
