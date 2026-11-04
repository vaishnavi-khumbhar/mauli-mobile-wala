import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Button({ to, href, variant = "primary", children, className = "", arrow = true, ...rest }) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button className={cls} {...rest}>{inner}</button>;
}
