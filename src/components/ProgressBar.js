import React from "react";

const ProgressBar = ({progress}) => (
    <div className="progress border border-white border-top-1">
        {progress != 0 ?
            <div className="progress-bar bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100"
                 style={{width: `${progress}%`}}
                 aria-valuemin="0" aria-valuemax="100">Progress: {progress}%</div> :
            <div className="progress-bar bg-warning" role="progressbar" aria-valuemin="0" aria-valuemax="100"
                 style={{width: `${100}%`}}
                 aria-valuemin="0" aria-valuemax="100">Progress: {0}%</div>
        }

    </div>
)
export default ProgressBar