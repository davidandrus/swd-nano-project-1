import React, {
  cloneElement,
  Component,
  PropTypes,
} from 'react';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';

export default class PickerButton extends Component {
  constructor(...args) {
    super(...args);
    this._openDialog = this._openDialog.bind(this);
  }

  _openDialog() {
    // must forceUpdate so dialogs initialize to current date and time
    this.forceUpdate(() => this._dialog.show());
  }

  render() {
    const {
      initialTime,
      initialDate,
      dialog,
      title,
      icon,
    } = this.props;

    /**
     * this is a little strange, but we have to clone on every render to
     * reinitialize initialDate, initialTime
     */
    const dialogClone = cloneElement(dialog, {
      initialDate: initialDate || moment().toDate(),
      initialTime: initialTime || moment().toDate(),
      ref: (element) => { this._dialog = element; },
    });

    return (
      <div>
        <IconButton
          onClick={this._openDialog}
          title={title}
        >
          {icon}
        </IconButton>
        {dialogClone}
      </div>
    );
  }
}

PickerButton.propTypes = {
  icon: PropTypes.node,
  initialDate: PropTypes.instanceOf(Date),
  initialTime: PropTypes.instanceOf(Date),
  dialog: PropTypes.node,
  title: PropTypes.string,
};
