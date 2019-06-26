const { ipcRenderer } = require("electron"); // eslint-disable-line import/no-unresolved
const {
    createElement: el,
    Component
} = require("react");

const EVENTS = require("../../app/constants/events");
const { ErrorDialog } = require("../alert/Error");

class Page extends Component {
    constructor(props) {
        super(props);
        // ipcRenderer.on(EVENTS.FILEPIE.SHOW_ERROR_DIALOG, () => {
        //     this.props.children = 
        // });
    }
    render() {
        return this.props.hasError
            ? el(ErrorDialog, null, null)
            : el("pre", null, this.props.preText);
    }
}

module.exports = {
    Page
};
