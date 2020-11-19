import React from "react";

const success = '#28a745'
const warning = '#ffc107'
const size = {
    hisght: '150px',
    middle: '100px',
    low: '50px',
}

const RoundedProgressBar = ({progress = 0, height = 5}) => (
    <div id="rounded-progress" style={{width: size.low, height: size.low}}>
        <div className="progress" data-percentage={progress && progress.toFixed(0)} style={{width: size.low, height: size.low}}>
		<span className="progress-left">
			<span className="progress-bar" style={{borderColor: progress >= 50 ? success :warning }}></span>
		</span>

            <span className="progress-right">
			<span className="progress-bar" style={{borderColor: progress >= 50 ? success :warning}}></span>
		</span>
            <div className="progress-value">
                <div>
                    {progress.toFixed(0)}%<br/>
                </div>
            </div>
        </div>
    </div>
)
export default RoundedProgressBar