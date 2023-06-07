import React from 'react';
import PropTypes from 'prop-types';
import './progress.sass';

const Progress = (props) => {
    return (
        <div className={props.disabled?"progress progress_disabled":"progress"}>
            <progress max={props.status.total} value={props.status.current}></progress>
            <p className='progress__file'>Downloading: {props.status.type}</p>
        </div>
    );
}

Progress.propTypes = {
    disabled: PropTypes.bool.isRequired,
    status: PropTypes.shape({
        total: PropTypes.number.isRequired,
        current: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }),
}
 
export default Progress;