import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { TextField } from 'redux-form-material-ui';
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Dialog from 'material-ui/Dialog';

export default class DataList extends Component {
  constructor(...args) {
    super(...args);
    this._handleFocus = this._handleFocus.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
    this._handleMenuChange = this._handleMenuChange.bind(this);
    this.state = {
      open: false,
      value: this.props.value || '',
    };
  }

  _handleFocus(e) {
    this.setState({
      open: true,
    });
    ['html', 'body'].forEach(item => {
      document.querySelector(item).style.overflow = 'hidden';
    })
    this.props.input.onFocus(e);
  }

  _closeMenu(e) {
    this.setState({
      open: false,
    });
    ['html', 'body'].forEach(item => {
      document.querySelector(item).style.overflow = 'visible';
    })
    this.props.input.onBlur(e);
  }

  _handleMenuChange(e, value) {
    this.setState({
      open: false,
      value,
    }, () => {
      this.props.input.onChange(value);
      this.props.input.onBlur();
    });
  }

  render() {
    const { input, label, meta: { touched, error }, ...custom } = this.props;

    return (
      <div>
        <TextField
          ref={(node => { this._input = node; })}
          {...custom}
          onFocus={this._handleFocus}
          value={this.state.value}
          errorText={touched && error}
        />
        <Dialog
          onRequestClose={this._closeMenu}
          open={this.state.open}
         >
           <Menu
             maxHeight={window.innerHeight - 70}
             onChange={this._handleMenuChange}
             value={this.state.value}
           >
             <MenuItem primaryText="Sucka 1" value={'1'} />
             <MenuItem primaryText="Sucka 2" value={'2'} />
             <MenuItem primaryText="Sucka 3" value={'3'} />
           </Menu>
         </Dialog>
      </div>
    )
  }
}
