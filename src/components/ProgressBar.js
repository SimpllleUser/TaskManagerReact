import React  from "react";

const ProgressBar = ({progress}) => (
    <div className="progress border border-white border-top-1">
        <div className="progress-bar bg-success" role="progressbar" style={{width:`${progress}%`}} aria-valuenow="25"
             aria-valuemin="0" aria-valuemax="100">Progress: {progress}%</div>
    </div>
)
export  default  ProgressBar