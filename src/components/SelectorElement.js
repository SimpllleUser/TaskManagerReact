import React from "react";

const data = {
  priority: [
    { name: "Low", value: 1, class: "success" },
    { name: "Normal", value: 2, class: "warning" },
    { name: "Highly", value: 3, class: "danger" },
  ],
    type:[
        { name: "Feature", value: 1, class: "primary" },
        { name: "Bug", value: 2, class: "warning" },
        { name: "Story", value: 3, class: "info" },
    ],
    status: [
      { name: "Open", value: 1, class: "primary" },
      { name: "Inprogress", value: 2, class: "warning" },
      { name: "Done", value: 3, class: "info" },
    ]
};

const SelectorElement = (props) => {
  var select_element = data[props.type].find(
    (elem) => elem.name === props.name
  );

  return select_element ? (
    <div className="selected-element-option">
      <div
        className={"badge badge-pill badge-" + select_element.class}
        data-toggle="tooltip"
        title={props.type}
      ></div>

      <span data-toggle="tooltip" title={props.type}>
        {select_element.name}
      </span>
    </div>
  ) : (
    `<h3>Ошибка словлена<h3>`
  );
};

export default SelectorElement;
