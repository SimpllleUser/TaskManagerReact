import React, { useState } from "react";
import { MoreVertical } from "react-feather";

const Options = ({ items }) => {
  const [togleState, setTogleState] = useState(false);
  const itemsList = items.map((item, index) => <span key={index}>{item}</span>);
  return (
    <div id="options" className="options-block">
      <ul className="list-group">

          <div className="dropdown">
              <a className="btn btn-white dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <MoreVertical
                      size="24"
                      onClick={() => {
                          setTogleState(!togleState);
                      }}
                  />
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  {items && itemsList}
              </div>
          </div>

      </ul>
    </div>
  );
};
export default Options;
