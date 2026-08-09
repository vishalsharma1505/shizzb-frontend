import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import menu_data from "@/data/menu-data";

const Menus = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  return (
    <ul>
      {menu_data.map((menu) => (
        <li key={menu.id}>
          <Link href={menu.link}>{menu.title}</Link>
        </li>
      ))}

      <li
        className={
          router.pathname === "/"
            ? "header-login-menu-item home-login-menu-item"
            : "header-login-menu-item"
        }
      >
        <Link
          href={user ? "/profile" : "/login"}
          className="header-login-btn"
        >
          {user ? "My Profile" : "Login"}
        </Link>
      </li>
    </ul>
  );
};

export default Menus;