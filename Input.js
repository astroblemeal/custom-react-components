import { useState, useRef } from 'react';

export default function Input({ width, label, type, name, value, onChange, textArea, formChange }) {
  const [manipulatedType, setManipulatedType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null),
    focusOnInput = () => inputRef.current.focus();

  const groupStyles = {
      position: 'relative',
      width: width || '100%',
      margin: '5px auto',
      backgroundColor: 'transparent',
      border: `1px solid ${isFocused ? 'var(--red)' : '#808080'}`, // dynamic (on focus)
      borderRadius: '5px',
      cursor: 'text',
      transition: 'all 0.2s',
    },
    inputStyles = {
      width: '90%',
      margin: '18px 5px 3px 5px', // defines the group (div) dimensions
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      transition: 'all 0.2s',
    },
    labelStyles = {
      position: 'absolute',
      top: isFocused || value ? '2px' : '10px', // dynamic (on focus OR not empty)
      left: isFocused || value ? '5px' : '10px', // dynamic (on focus OR not empty)
      fontSize: isFocused || value ? '12px' : '16px', // dynamic (on focus OR not empty)
      backgroundColor: 'transparent',
      color: '#818181',
      cursor: 'text',
      transition: 'all 0.2s',
    };

  return (
    <div style={groupStyles} onClick={focusOnInput}>
      {textArea ? (
        <textarea
          ref={inputRef}
          id={name}
          name={name}
          rows='1'
          style={{ ...inputStyles, resize: 'none' }}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            // The following auto-resizes the textarea to the number of rows typed
            inputRef.current.style.height = 'auto';
            inputRef.current.style.padding = '0';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : (
        <input
          ref={inputRef}
          id={name}
          name={name}
          type={manipulatedType}
          style={inputStyles}
          value={value ? value : ''}
          onChange={(e) => (formChange ? formChange(e) : onChange(e.target.value))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}

      {/* show/hide icon for input with type "password" */}
      {type === 'password' && manipulatedType === 'password' ? (
        <PasswordIcon show onClick={() => setManipulatedType('text')} />
      ) : type === 'password' && manipulatedType === 'text' ? (
        <PasswordIcon hide onClick={() => setManipulatedType('password')} />
      ) : null}

      <label style={labelStyles} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

function PasswordIcon({ show, hide, onClick }) {
  const passIconStyles = {
    width: '20px',
    height: '20px',
    position: 'absolute',
    top: '55%',
    right: '15px',
    transform: 'translateY(-50%)',
    fill: 'var(--white)',
    cursor: 'pointer',
  };

  if (hide) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        style={passIconStyles}
        onClick={onClick}
        viewBox='0 0 16 16'>
        <path d='M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.027 7.027 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.088z' />
        <path d='M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6l-12-12 .708-.708 12 12-.708.707z' />
      </svg>
    );
  }

  if (show) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        style={passIconStyles}
        onClick={onClick}
        viewBox='0 0 16 16'>
        <path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
        <path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z' />
      </svg>
    );
  }
}
