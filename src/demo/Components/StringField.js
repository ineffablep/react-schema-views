import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import PropTypes from 'prop-types';
/*eslint-disable*/
const alphaRegex = /^$|[A-Z]+$/i;

class StringField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  validateInput(event) {
    if (alphaRegex.test(event.target.value)) {
      this.setState({ value: event.target.value });
    }
  }

  render() {
    const { label, name, help, ...rest } = this.props;
    return (
      <FormGroup controlId={name}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl componentClass="input" name={name} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
}

StringField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  help: PropTypes.string
};

export default StringField;