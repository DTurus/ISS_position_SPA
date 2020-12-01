import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        //position: 'absolute',
        width: '100%',
        height: '500px'
    }
};

export class Map extends React.Component {
    constructor(props) {
        super(props);

        const {lat, lng} = this.props.initialCenter;

        this.mapRef = React.createRef();

        this.state = {
            currentPosition: {
                lat: lat,
                lng: lng
            }
        };
    }

    getISSPosition() {
        fetch("http://api.open-notify.org/iss-now.json")
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    currentPosition: {
                        lat: result.iss_position.latitude,
                        lng: result.iss_position.longitude
                    }
                });
            },
            (error) => {
                console.log("ERROR -> getISSPosition ->", error);
            }
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }

        if (prevState.currentPosition !== this.state.currentPosition) {
            this.recenterMap();
            setTimeout(() => {
                this.getISSPosition();
            }, 5000);
        }
    }

    componentDidMount() {
        if (this.props.centerAroundCurrentPosition) {
            this.getISSPosition()
        }
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const maps = this.props.google.maps;

            const node = ReactDOM.findDOMNode(this.mapRef.current);

            let {zoom} = this.props;
            const {lat, lng} = this.state.currentPosition;
            const center = new maps.LatLng(lat, lng);

            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );

            this.map = new maps.Map(node, mapConfig);
        }
    }

    recenterMap() {
        const map = this.map;
        const maps = this.props.google.maps;
        const {lat, lng} = this.state.currentPosition;
        let center = new maps.LatLng(lat, lng);

        if (map) {
            map.panTo(center);
        }
    }

    renderChildren() {
        const {children} = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;

            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentPosition,
                position: this.state.currentPosition
            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);

        return (
            <div>
                <div style={style} ref={this.mapRef}>
                    Loading map...
                </div>
                {this.renderChildren()}
            </div>
        )
    }
}

export default Map;

Map.defaultProps = {
    zoom: 10,
    initialCenter: {
        lat: 46.070966,
        lng: 13.234905
    },
    centerAroundCurrentPosition: false,
    visible: true
};