import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const MapStyle ={
    width: '100%',
    height: '100%',
    margin: '0px',
}
export class MapContainer extends Component {
  state = {
      selectedPlace : {
          name : 'Chennai'
      }
  }

  render() {
    return (
      <div>
        <Map google={this.props.google} zoom={12} style ={MapStyle}  initialCenter={{lat: 13.027271,lng: 80.271369}}>
      
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBGkDumezTWqlCXMjnog68fqh_-TrSxmVw')
})(MapContainer)