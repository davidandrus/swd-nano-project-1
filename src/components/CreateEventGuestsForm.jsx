import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uniq from 'lodash/uniq';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import AddGuestForm from './AddGuestForm';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { getters } from '../reducers';

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
    this._handleMessageUpdate = this._handleMessageUpdate.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleEmailDelete = this._handleEmailDelete.bind(this);
    this.state = {
      emails: [],
      message: '',
    };
  }

  componentWillMount() {
    const { emails, message } = this.props;

    this.setState({
      emails: emails || this.state.emails,
      message: message || this.state.emails,
    })
  }

  _handleMessageUpdate(e) {
    this.setState({
      message: e.target.value,
    });
  }

  _handleAddEmail(values) {
    this.setState({
      emails: uniq([...this.state.emails, values['guest-email']]),
    }, () => {
      this._addGuestForm.reset();
    });
  }

  _handleEmailDelete(deletedEmail) {
    this.setState({
      emails: this.state.emails.filter(email => email !== deletedEmail)
    });
  }

  _handleSubmit() {
    this.props.onSubmit({
      emails: this.state.emails,
      message: this.state.message,
    });
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
          {this.state.emails.length === 0 &&
            <div style={requiredStyle}>You must add at least one guest Email Address</div>
          }
          {this.state.emails.map(email => (
            <div
              style={chipWrapper}
              key={email}
            >
              {/* TODO - break into subcomponents to avoid the render binding */}
              <Chip onRequestDelete={() => this._handleEmailDelete(email)}>{email}</Chip>
            </div>
          ))}
        </div>

        {this.state.emails.length > 0 &&
          <TextField
            autoFocus
            multiLine
            fullWidth
            floatingLabelText="Message to Guests"
            hintText="Message to Send Guests"
            rows={2}
            onChange={this._handleMessageUpdate}
          />
        }

        <RaisedButton
          primary
          disabled={this.state.emails.length === 0}
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
export default connect(mapStateToProps)(themed);
