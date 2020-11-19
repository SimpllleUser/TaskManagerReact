import React from "react";
const ProgressBar = ({progress = 0, height = 5}) => (
    <div className="progress border border-white border-top-1" style={{height:height+'px'}} >
            <div className={`progress-bar bg-${progress >= 50 ? 'success' : 'warning'}`} role="progressbar" aria-valuemin="0" aria-valuemax="100"
                 style={{width: progress != 0  ? `${progress && progress.toFixed(0) }%` : '100%'}}
                 aria-valuemin="0" aria-valuemax="100">Progress: {progress > 0 ?  progress.toFixed(1) : 0}%</div>
    </div>
)
export default ProgressBar