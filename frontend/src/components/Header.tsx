import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

function Header() {
  const location = useLocation();

  function isActive(path: string) {
    return location.pathname === path ? "underline underline-offset-8  " : "";
  }
  return (
    <header className="bg-gray-200 text-white p-4 shadow-md ">
      <div className="w-full ">
      <Button variant="link" asChild className={isActive("/")}>
        <Link to="/" >Home</Link>
      </Button>
      <Button variant="link" asChild className={isActive("/dashboard")}>
        <Link to="/dashboard">Dashboard</Link>
      </Button>
      <Button variant="link" asChild className={isActive("/list")}>
        <Link to="/list">Listar Ordens de Serviço</Link>
      </Button></div>
    </header>
  );
}

export default Header;
