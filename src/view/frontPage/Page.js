const {
    createElement: el,
    Component
} = require("react");

const { ErrorDialog } = require("../alert/Error");

class Page extends Component {
    render() {
        return this.props.hasError
            ? el(ErrorDialog, this.props.dialogOptions, null)
            : el("pre", null, this.props.preText);
    }
}

module.exports = {
    Page
};
