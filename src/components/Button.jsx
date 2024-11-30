const Button = ({ children, onClick, style, key = null }) => {
  return (
    <button type="button" key={key} onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default Button;
