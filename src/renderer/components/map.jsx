import React, { useState } from 'react';
import { GridLoader } from 'react-spinners';
import './map.sass';

const Map = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="map">
            {loading && 
                <div className="map__loader">
                    <GridLoader color="#ffffff"/>
                </div>
            }

            <iframe onLoad={() => setLoading(false)} className="map__iframe" src="http://45.87.246.29:8123/" frameBorder="0"></iframe>
        </div>
    );
}
 
export default Map;