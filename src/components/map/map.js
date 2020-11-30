import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import CurrentPosition from './currentPosition';

export class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        issPosition: {}
    };

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onClose = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <CurrentPosition
                centerAroundCurrentPosition
                google={this.props.google}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'ISS position'}
                    icon={{
                        url: '/iss_withBackground.svg',//'/international-space-station-svgrepo-com.svg',
                        scaledSize: new window.google.maps.Size(75, 75),
                    }}
                />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </CurrentPosition>
        );
    }
}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: props.apiKey
    }
))(MapContainer);