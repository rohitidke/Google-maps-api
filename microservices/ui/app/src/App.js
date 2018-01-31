import React, { Component } from 'react';
import MapContainer from './components/Map';
import DetailsContainer from './components/DetailsContainer';


export default class Mainmap extends Component {
	render () {
		return (
			<div>
				<div className="mainContainer">
					<MapContainer />	
					<DetailsContainer /> 
				</div>
			</div>
		);
	}
}

