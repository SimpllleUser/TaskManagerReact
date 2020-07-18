import React from "react"

const SelectorElement = (props) => {
const data = {     "priority":  [
        { name: "Low", value: 1, class: "success" },
        { name: "Normal", value: 2, class: "warning" },
        { name: "Highly", value: 3, class: "danger" },
      ],
      "status":  [
        { name: "Open", value: 1, class: "primary" },
        { name: "Inprogress", value: 2, class: "warning" },
        { name: "Done", value: 3, class: "info" },
      ]}

      var select_element = data[props.type].find(elem => elem.name == props.data)
    return <div className="selected-element-option">
      <div className={'badge badge-pill badge-' + select_element.class}>  
      </div>
      {select_element.name}
    </div>
}

export default SelectorElement