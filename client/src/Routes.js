import Search from "@mui/icons-material/Search";
import LayoutMain from "./Components/LayoutMain";
import Logout from "./Components/Logout";
import PageNotFound from "./Components/PageNotFound";
import AboutUs from "./Components/Pages/AboutUs";
import Home from "./Components/Pages/Home";
import Product from "./Components/Pages/Product";

export default function Routes() {
  return [
    {
      path: "/",
      element: <LayoutMain />,
      children: [
        { index: true, element: <Home /> },
        { path: "logout", element: <Logout /> },
        {
          path: "product/:productId",
          element: <Product />,
        },
        {
          path: "/aboutus",
          element: <AboutUs />,
        },
        { path: "/search/:id", element: <Search /> },
      ],
    },
    { path: "*", element: <PageNotFound /> },
  ];
}
