import React from "react";

class SelectorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "priority-value": "",
            "type-value": "",
            "status-value": "",
            priority: ["Low", "Normal", "Highly"],
            type: ["Feature", "Bug", "Story"],
            status: ["Open", "Inprogress", "Done"],
        };
    }

    componentDidMount() {
        let name = this.props.value;
        if (name) {
            this.setState({
                [this.props.data + "-value"]: name });

        }
    }

    SelectorHandler = (event) => {
        this.props.updateData(event.target.value)
        this.setState({
            [this.props.data + "-value"]: event.target.value });
    };

    render() {
        const Selector = this.state[this.props.data].map((option, index) => ( <
            option key = { index }
            value = { option } > { option } <
            /option>
        ));
        return ( <
            div id = "selector" >
            <
            label className = "my-1 mr-2"
            htmlFor = "priority" > { this.props.data || " " } <
            /label> <
            select className = "custom-select my-1 mr-sm-1"
            id = "priority"
            value = { this.state[this.props.data + "-value"] || this.props.value }
            onChange = { this.SelectorHandler } >
            { Selector } <
            /select> <
            /div>
        );
    }
}

export default SelectorForm;