export default function Button({ children, textOnly, clsName, ...props }) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += "" + clsName;
  return (
    <button {...props} className={cssClasses}>
      {children}
    </button>
  );
}
