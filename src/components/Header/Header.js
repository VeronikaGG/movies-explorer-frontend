import "./Header.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

const Header = ({ loggedIn }) => {
  const { pathname } = useLocation();

  const getHeaderThemeClass = () => {
    const isHomepage = pathname === "/";
    return isHomepage ? "blue" : "white";
  };

  const headerThemeClass = getHeaderThemeClass();

  const HeaderContent = () => (
    <header className={`header header_theme_${headerThemeClass}`}>
      <Logo />
      <Navigation loggedIn={loggedIn} />
    </header>
  );
  return (
    <Routes>
      <Route path="/" element={<HeaderContent />} />
      <Route path="/movies" element={<HeaderContent />} />
      <Route path="/saved-movies" element={<HeaderContent />} />
      <Route path="/profile" element={<HeaderContent />} />
    </Routes>
  );
};

export default Header;
