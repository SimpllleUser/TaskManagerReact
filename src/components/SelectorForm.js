import React, { useState, useEffect } from "react";
const SelectorForm = (props) => {
  const [selectorData, setSelectorData] = useState({
    "priority-value": "",
    "type-value": "",
    "status-value": "",
    priority: ["Low", "Normal", "Highly"],
    type: ["Feature", "Bug", "Story"],
    status: ["Open", "Inprogress", "Done"],
  });
  useEffect(() => {
    const initSelector = () => {
      const name = props.value;
      if (name) {
        setSelectorData({ ...selectorData, [props.data + "-value"]: name });
      }
    };
    initSelector();
  }, []);

  const SelectorHandler = (event) => {
    setSelectorData({
      ...selectorData,
      [props.data + "-value"]: event.target.value,
    });
    props.updateData(event.target.value);
  };

  const Selector = selectorData[props.data].map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));
  return (
    <div id="selector">
      <div className="selector-name badge badge-light">
        {props.data}
      </div>
      <select
        className="custom-select my-1 mr-sm-1"
        id="priority"
        value={setSelectorData[props.data + "-value"] || props.value}
        onChange={SelectorHandler}
      >
        {Selector}
      </select>
    </div>
  );
};

export default SelectorForm;
