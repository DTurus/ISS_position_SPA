import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper, Marker } from 'google-maps-react';
import Map from './map';

export class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        issPosition: {}
    };

    render() {
        return (
            <Map
                centerAroundCurrentPosition
                google={this.props.google}
            >
                <Marker
                    clickable={false}
                    name={'ISS'}
                    icon={{
                        url: '/iss_withBackground.svg',//'/international-space-station-svgrepo-com.svg',
                        scaledSize: new window.google.maps.Size(75, 75),
                    }}
                />
            </Map>
        );
    }
}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: props.apiKey,
    }
))(MapContainer)