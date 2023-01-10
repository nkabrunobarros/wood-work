function GetStyles () {
  const styling = {
    main: {
      width: 'fit-content',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '30px',
      border: '1px solid palette.primary.main',
      fontSize: 'typography.fontSize',
      borderRadius: '4px',
      paddingRight: '1rem',
      paddingLeft: '1rem',
      transition: 'ease -in -out 0.3s',
      cursor: 'pointer',
      backgroundColor: 'primary.main',
    },

  };

  return styling;
}

export default GetStyles;
