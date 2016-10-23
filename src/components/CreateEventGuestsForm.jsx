import React, { Component, PropTypes } from 'react';
import uniq from 'lodash/uniq';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import AddGuestForm from './AddGuestForm';

const chipContainer = {
  marginBottom: '20px',
};

const chipWrapper = {
  display: 'inline-block',
  margin: '0 20px 20px 0',
};

export default class CreateEventGuestsForm extends Component {
  constructor(...args) {
    super(...args);
    this._handleAddEmail = this._handleAddEmail.bind(this);
    this.state = {
      emails: []
    };
  }

  _handleAddEmail(values) {
    this.setState({
      emails: uniq([...this.state.emails, values['guest-email']]),
    }, () => {
      this._addGuestForm.reset();
    });
  }

  render() {
    console.log('rendering', this.state)
    return (
      <div>
        <AddGuestForm
          onSubmit={this._handleAddEmail}
          ref={form => this._addGuestForm = form}
        />
        <div style={chipContainer}>
          {this.state.emails.length === 0 &&
            <div>You must add at least one guest Email Address</div>
          }
          {this.state.emails.map(email => (
            <div
              style={chipWrapper}
              key={email}
            >
              <Chip onRequestDelete={() => { }}>{email}</Chip>
            </div>
          ))}

        </div>

        <RaisedButton
          primary
          disabled={this.state.emails.length === 0}
          label="Add Event"
          type="submit"
        />
      </div>
    );
  }
}

CreateEventGuestsForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};
