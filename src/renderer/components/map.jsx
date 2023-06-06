import React from 'react';
import './map.sass';

const Map = () => {
    return (
        <div className="map">
            <iframe className="map__iframe" src="http://45.87.246.29:8123/" frameBorder="0"></iframe>
        </div>
    );
}
 
export default Map;