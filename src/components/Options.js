import React, { useState } from "react";
import { MoreVertical } from "react-feather";

const Options = ({ items }) => {
  const [togleState, setTogleState] = useState(false);
  const itemsList = items.map((item, index) => <span key={index}>{item}</span>);
  return (
    <div id="options" className="options-block">
      <ul className="list-group">
        <div className="options-block__title">
          <MoreVertical
            size="24"
            onClick={() => {
              setTogleState(!togleState);
            }}
          />
        </div>
        {togleState && (
          <div className="options-block__body">
            <div onClick={() => {setTogleState(false)}}>{items && itemsList}</div>
          </div>
        )}
      </ul>
    </div>
  );
};
export default Options;
