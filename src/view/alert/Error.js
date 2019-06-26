const React = require("react");
const { ipcRenderer } = require("electron"); // eslint-disable-line import/no-unresolved
const { withStyles } = require("@material-ui/core/styles");
const Button = require("@material-ui/core/Button").default;
const Dialog = require("@material-ui/core/Dialog").default;
const MuiDialogTitle = require("@material-ui/core/DialogTitle").default;
const MuiDialogContent = require("@material-ui/core/DialogContent").default;
const MuiDialogActions = require("@material-ui/core/DialogActions").default;
const IconButton = require("@material-ui/core/IconButton").default;
const CloseIcon = require("@material-ui/icons/Close").default;
const Typography = require("@material-ui/core/Typography").default;
const i18n = require("../../app/i18n");
const EVENTS = require("../../app/constants/events");
const {
    createElement: el
} = React;

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

const DialogTitle = withStyles(styles)(
    (props) => {
        const { children, classes, onClose } = props;
        return el(
            MuiDialogTitle,
            {
                disableTypography: true,
                className: classes.root
            },
            el(Typography, { variant: "h6" }, children),
            onClose
                ? el(
                    IconButton,
                    {
                        "aria-label": "Close",
                        className: classes.closeButton,
                        onClick: onClose
                    },
                    el(CloseIcon)
                )
                : null
        );
    }
);

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);

class ErrorDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    handleClose() {
        this.setState({ open: false });
        ipcRenderer.send(EVENTS.FILEPIE.OS_NOT_SUPPORTED_ACCEPTED);
    }

    render() {
        return el(
            Dialog,
            {
                key: "Dialog",
                onClose: () => this.handleClose(),
                "aria-labelledby": "customized-dialog-title",
                open: this.state.open
            },
            [
                el(
                    DialogTitle,
                    {
                        key: "DialogTitle",
                        id: "customized-dialog-title",
                        onClose: () => this.handleClose()
                    },
                    i18n.app.components.dialog.TITLE
                ),
                el(
                    DialogContent,
                    {
                        key: "DialogContent",
                        dividers: true
                    },
                    /* eslint-disable max-len */
                    el(
                        Typography,
                        { gutterBottom: true },
                        i18n.app.errors.SYSTEM_NOT_SUPPORTED
                    )
                ),
                el(
                    DialogActions,
                    { key: "DialogActions" },
                    el(
                        Button,
                        {
                            color: "primary",
                            onClick: () => this.handleClose()
                        },
                        i18n.app.components.dialog.ACCEPT
                    ),
                )
            ]
        );
    }
}

module.exports = {
    ErrorDialog
};
