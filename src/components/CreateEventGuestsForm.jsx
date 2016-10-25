import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AddGuestForm from './AddGuestForm';
import Chips from './Chips';
import { getters } from '../reducers';
import * as actions from '../actions';
import { standardMarginBottom } from '../constants/styles';

export class CreateEventGuestsForm extends Component {
  constructor(...args) {
    super(...args);
    this._handleAddEmail = this._handleAddEmail.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleMessageUpdate = this._handleMessageUpdate.bind(this);
  }

  _handleMessageUpdate(e) {
    this.props.updateMessage(e.target.value);
  }

  _handleAddEmail(values) {
    this.props.addGuest(values['guest-email']);
    this._addGuestForm.reset();
  }

  _handleSubmit() {
    this.props.onSubmit();
  }

  render() {
    const requiredStyle = {
      ...standardMarginBottom,
      color: this.props.muiTheme.textField.errorColor,
      marginTop: '10px',
    };

    return (
      <div>
        <AddGuestForm
          onSubmit={this._handleAddEmail}
          ref={(form) => { this._addGuestForm = form; }}
        />
        <div>
          {this.props.emails.length === 0 &&
            <h3 style={requiredStyle}>You must add at least one guest Email Address</h3>
          }
          <Chips
            items={this.props.emails}
            onDelete={this.props.removeGuest}
          />
        </div>

        {this.props.emails.length > 0 &&
          <TextField
            autoFocus
            multiLine
            fullWidth
            floatingLabelText="Message to Guests"
            hintText="Message to Send Guests"
            onChange={this._handleMessageUpdate}
            rows={2}
            style={standardMarginBottom}
            value={this.props.message}
          />
        }

        <RaisedButton
          primary
          disabled={this.props.emails.length === 0}
          label="Add Event"
          type="submit"
          onClick={this._handleSubmit}
        />
      </div>
    );
  }
}

CreateEventGuestsForm.propTypes = {
  muiTheme: PropTypes.shape({
    textField: PropTypes.shape({
      errorColor: PropTypes.string,
    }),
  }),
  emails: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func,
  addGuest: PropTypes.func,
  message: PropTypes.string,
  removeGuest: PropTypes.func,
  updateMessage: PropTypes.func,
};

const themed = muiThemeable()(CreateEventGuestsForm);
const mapStateToProps = state => ({ ...getters.getCreateEventGuests(state) });
const mapDispatchToProps = dispatch => ({
  addGuest: bindActionCreators(actions.addGuest, dispatch),
  removeGuest: bindActionCreators(actions.removeGuest, dispatch),
  updateMessage: bindActionCreators(actions.updateMessage, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(themed);
