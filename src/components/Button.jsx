const Button = ({ children, onClick, style }) => {
  return (
    <button type="button" onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default Button;
