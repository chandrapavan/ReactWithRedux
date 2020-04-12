import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ error, name, label, value, onChange, placeholder }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += "" + "has-error";
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default TextInput;