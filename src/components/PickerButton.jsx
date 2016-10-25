import React, {
  cloneElement,
  Component,
  PropTypes,
} from 'react';
import IconButton from 'material-ui/IconButton';

export default class PickerButton extends Component {
  constructor(...args) {
    super(...args);
    this._openDialog = this._openDialog.bind(this);
  }

  _openDialog() {
    this._dialog.show();
  }

  render() {
    const dialog = cloneElement(this.props.dialog, {
      ref: (element) => { this._dialog = element; },
    });

    return (
      <div>
        <IconButton onClick={this._openDialog}>
          {this.props.icon}
        </IconButton>
        {dialog}
      </div>
    );
  }
}

PickerButton.propTypes = {
  icon: PropTypes.node,
  dialog: PropTypes.node,
};
