import React, { Component } from 'react';
import MapContainer from './components/Map';
import DetailsContainer from './components/DetailsContainer';


export default class Mainmap extends Component {
	state = {
		mapStatus: false,
	}
	changeMapStatus = () => {
		const presentState = this.state.mapStatus;
        this.setState({
            mapStatus: !presentState
		});
		console.log("called");
		console.log("called");
		console.log("called");
	}
	render () {
		return (
			<div>
				<div className="mainContainer">
					<MapContainer changeMapStatus={this.changeMapStatus}  />	
					<DetailsContainer mapStatus={this.state.mapStatus} /> 
				</div>
			</div>
		);
	}
}

