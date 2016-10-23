import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AddGuestForm from './AddGuestForm';
import { getters } from '../reducers';
import * as actions from '../actions';

const chipContainer = {
  marginBottom: '20px',
};

const chipWrapper = {
  display: 'inline-block',
  margin: '0 20px 20px 0',
};

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
    console.log('adding email', this.props);
    this.props.addGuest(values['guest-email']);
    this._addGuestForm.reset();
  }

  _handleSubmit() {
    this.props.onSubmit();
  }

  render() {
    const requiredStyle = {
      color: this.props.muiTheme.textField.errorColor,
    };

    return (
      <div>
        <AddGuestForm
          onSubmit={this._handleAddEmail}
          ref={(form) => { this._addGuestForm = form; }}
        />
        <div style={chipContainer}>
          {this.props.emails.length === 0 &&
            <div style={requiredStyle}>You must add at least one guest Email Address</div>
          }
          {this.props.emails.map(email => (
            <div
              style={chipWrapper}
              key={email}
            >
              {/* TODO - break into subcomponents to avoid the render binding */}
              <Chip onRequestDelete={() => this.props.removeGuest(email)}>{email}</Chip>
            </div>
          ))}
        </div>

        {this.props.emails.length > 0 &&
          <TextField
            autoFocus
            multiLine
            fullWidth
            floatingLabelText="Message to Guests"
            hintText="Message to Send Guests"
            rows={2}
            value={this.props.message}
            onChange={this._handleMessageUpdate}
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
  onSubmit: PropTypes.func,
};

const themed = muiThemeable()(CreateEventGuestsForm);
const mapStateToProps = state => ({ ...getters.getCreateEventGuests(state) });
const mapDispatchToProps = dispatch => ({
  addGuest: bindActionCreators(actions.addGuest, dispatch),
  removeGuest: bindActionCreators(actions.removeGuest, dispatch),
  updateMessage: bindActionCreators(actions.updateMessage, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(themed);
