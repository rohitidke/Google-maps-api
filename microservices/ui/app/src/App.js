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
		console.log(this.state.mapStatus);
	}
	render () {
		return (
			<div>
				<div className="mainContainer">
					<MapContainer changeMapStatus={this.state.changeMapStatus}  />	
					<DetailsContainer mapStatus={this.state.mapStatus} /> 
				</div>
			</div>
		);
	}
}

