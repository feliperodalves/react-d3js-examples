import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const GenderDropdown = ({ handleChange }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Please select gender
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => handleChange('men')}>Men</Dropdown.Item>
        <Dropdown.Item onSelect={() => handleChange('women')}>Women</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GenderDropdown;
