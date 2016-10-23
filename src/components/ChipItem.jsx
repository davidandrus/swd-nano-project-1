import React, {
  Component,
  PropTypes,
} from 'react';
import Chip from 'material-ui/Chip';
import { chipWrapper } from '../constants/styles';

export default class ChipItem extends Component {
  constructor(...args) {
    super(...args);
    this._handleDelete = this._handleDelete.bind(this);
  }

  _handleDelete() {
    this.props.onDelete(this.props.text);
  }

  render() {
    const { onDelete, text } = this.props;
    const passProps = {
      onRequestDelete: onDelete ? this._handleDelete : undefined,
    };

    return (
      <div
        style={chipWrapper}
        key={text}
      >
        <Chip {...passProps}>{text}</Chip>
      </div>
    );
  }
}

ChipItem.propTypes = {
  text: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};
