// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/main",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "members",
    path: "/dashboard/members",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "orders",
    path: "/dashboard/order",
    icon: getIcon("ant-design:ordered-list-outlined"),
  },
  {
    title: "books",
    path: "/dashboard/book",
    icon: getIcon("eva:book-open-outline"),
  },
  {
    title: "solutions",
    path: "/dashboard/solution",
    icon: getIcon("ep:document"),
  },
  {
    title: "categories",
    path: "/dashboard/category",
    icon: getIcon("bx:category"),
  },
  {
    title: "waiting list",
    path: "/dashboard/waiting-list",
    icon: getIcon("medical-icon:i-waiting-area"),
  },
  {
    title: "search logs",
    path: "/dashboard/searchlog",
    icon: getIcon("fa-solid:search-plus"),
  },
  {
    title: "site settings",
    path: "/dashboard/site-setting",
    icon: getIcon("clarity:settings-solid-badged"),
  },
];

export default navConfig;
