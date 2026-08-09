import Link from "next/link";
import { useRouter } from "next/router";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaLayerGroup,
  FaShoppingCart,
  FaUsers,
  FaStar,
  FaTicketAlt,
  FaBlog,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menus = [

  {
    title: "Dashboard",
    icon: <FaTachometerAlt />,
    url: "/admin/dashboard",
  },

  {
    title: "Products",
    icon: <FaBoxOpen />,
    url: "/admin/products",
  },

  {
    title: "Categories",
    icon: <FaLayerGroup />,
    url: "/admin/categories",
  },

  {
    title: "Brands",
    icon: <FaTags />,
    url: "/admin/brands",
  },

  {
    title: "Orders",
    icon: <FaShoppingCart />,
    url: "/admin/orders",
  },

  {
    title: "Customers",
    icon: <FaUsers />,
    url: "/admin/customers",
  },

  {
    title: "Reviews",
    icon: <FaStar />,
    url: "/admin/reviews",
  },

  {
    title: "Coupons",
    icon: <FaTicketAlt />,
    url: "/admin/coupons",
  },

  {
    title: "Blog",
    icon: <FaBlog />,
    url: "/admin/blogs",
  },

  {
    title: "Contact",
    icon: <FaEnvelope />,
    url: "/admin/contact",
  },

  {
    title: "Settings",
    icon: <FaCog />,
    url: "/admin/settings",
  },

];

const AdminSidebar = () => {

  const router = useRouter();

  const logout = () => {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    router.push("/admin/login");

  };

  return (

    <div className="admin-sidebar">

      <div className="logo">

        <h3>ShizzB Admin</h3>

      </div>

      <ul>

        {

          menus.map((item,index)=>(

            <li
              key={index}
              className={
                router.pathname===item.url
                  ? "active"
                  : ""
              }
            >

              <Link href={item.url}>

                {item.icon}

                <span>{item.title}</span>

              </Link>

            </li>

          ))

        }

        <li onClick={logout}>

          <FaSignOutAlt/>

          <span>Logout</span>

        </li>

      </ul>

    </div>

  );

};

export default AdminSidebar;