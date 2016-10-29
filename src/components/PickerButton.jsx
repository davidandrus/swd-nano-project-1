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
    this._dialog.show();
  }

  render() {
    const dialog = cloneElement(this.props.dialog, {
      ref: (element) => { this._dialog = element; },
      value: moment(this.props.currentValue),
    });

    return (
      <div>
        <IconButton
          onClick={this._openDialog}
          title={this.props.title}>
          {this.props.icon}
        </IconButton>
        {dialog}
      </div>
    );
  }
}

PickerButton.propTypes = {
  icon: PropTypes.node,
  currentValue: PropTypes.string,
  dialog: PropTypes.node,
  title: PropTypes.string,
};
