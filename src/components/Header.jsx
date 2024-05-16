import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <header className="bg-green-300 p-4 flex justify-center items-center shadow-md">
      <Link
        className={`text-lg font-bold text-gray-900 mx-4 ${
          location.pathname === "/" && "text-gray-900"
        }`}
        to="/"
      >
        질문하기
      </Link>
      <Link
        className={`text-lg font-bold text-gray-900 mx-4 ${
          location.pathname === "/chat-list" && "text-gray-900"
        }`}
        to="/chat-list"
      >
        내 질문리스트
      </Link>
    </header>
  );
};

export default Header;
