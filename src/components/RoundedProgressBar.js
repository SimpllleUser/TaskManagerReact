import React from "react";

const RoundedProgressBar = ({progress = 0, height = 5}) => (
    <div id="rounded-progress">
        <div className="progress" data-percentage={progress.toFixed(0)}>
		<span className="progress-left">
			<span className="progress-bar"></span>
		</span>

            <span className="progress-right">
			<span className="progress-bar "></span>
		</span>
            <div className="progress-value">
                <div>
                    {progress}%<br/>
                    {/*<span>completed</span>*/}
                </div>
            </div>
        </div>
    </div>
)
export default RoundedProgressBar