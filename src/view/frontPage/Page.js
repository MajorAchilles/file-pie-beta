const {
    createElement: el,
    Component
} = require("react");

class Page extends Component {
    render() {
        return el("pre", null, this.props.preText);
    }
}

module.exports = {
    Page
};
