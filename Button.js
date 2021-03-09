import { useRef } from 'react';

export default function Button({ children, type, onClick, disabled, invertStyle, width, style }) {
  const hoverRef = useRef(null);

  const buttonStyles = {
      width: width || '100%', // dynamic (props)
      margin: width ? '5px auto' : '5px',
      padding: '7px 15px',
      backgroundColor: invertStyle ? 'transparent' : 'var(--red)', // dynamic (props)
      color: invertStyle ? 'var(--white)' : '#000', // dynamic (props)
      fontSize: '16px',
      border: '1px solid var(--red)',
      borderRadius: '7px',
      position: 'relative',
    },
    hoverStyles = {
      visibility: 'hidden', // dynamic (on hover)
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      borderRadius: '7px',
      backgroundColor: invertStyle ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)', // dynamic (props)
    };

  return (
    <button
      style={{ ...buttonStyles, ...style }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => (hoverRef.current.style.visibility = 'visible')}
      onMouseLeave={() => (hoverRef.current.style.visibility = 'hidden')}>
      <div ref={hoverRef} style={hoverStyles} />
      {children}
    </button>
  );
}
