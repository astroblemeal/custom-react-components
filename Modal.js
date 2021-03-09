import useMediaQuery from '../../hooks/useMediaQuery';

export default function Modal({ children, width, height, layout, closeModal }) {
  const isDesktop = useMediaQuery('(min-width: 768px)'),
    modalBgStyles = {
      width: '100vw',
      minHeight: '100vh',
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '999',
      display: 'grid',
      placeItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalStyles = {
      maxWidth: isDesktop ? '600px' : '768px',
      width: width || '100%',
      minHeight: isDesktop ? height || 'fit-content' : '100vh',
      padding: '1em',
      backgroundColor: 'rgb(42, 42, 42)',
      borderRadius: isDesktop && '1em',
      position: 'relative',
    },
    closeBtnStyles = {
      position: 'absolute',
      top: '10px',
      right: '15px',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '33px',
      fontWeight: 'bold',
      color: 'var(--red)',
    };

  return (
    <div style={modalBgStyles}>
      <div style={{ ...modalStyles, ...layout }}>
        <button style={closeBtnStyles} onClick={closeModal}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
