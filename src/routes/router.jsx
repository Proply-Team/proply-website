import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard.page";
import Register from "../components/RegisterComponents/Register";
import RegisterForm from "../components/RegisterComponents/RegisterForm";  
import Divisions from "../components/DivisionComponents/Divisions";
import DivisionList from "../components/DivisionComponents/DivisionList";
import DivisionForm from "../components/DivisionComponents/DivisionForm";
import Categories from "../components/CategoryComponents/Categories";
import CategoryList from "../components/CategoryComponents/CategoryList";
import CategoryForm from "../components/CategoryComponents/CategoryForm";
import ProcurementCategories from "../components/ProcurementCategoryComponents/ProcurementCategories";
import ProcurementCategoryList from "../components/ProcurementCategoryComponents/ProcurementCategoryList";
import ProcurementCategoryForm from "../components/ProcurementCategoryComponents/ProcurementCategoryForm";
import Items from "../components/ItemComponents/Items";
import ItemList from "../components/ItemComponents/ItemList";
import ItemForm from "../components/ItemComponents/ItemForm";
import Procurements from "../components/ProcurementComponents/Procurements";
import ProcurementList from "../components/ProcurementComponents/ProcurementList";
import ProcurementForm from "../components/ProcurementComponents/ProcurementForm";
import ProcurementDetail from "../components/ProcurementComponents/ProcurementDetail";
import Profile from "../components/ProfileComponents/Profile";
import ProfileEdit from "../components/ProfileComponents/ProfileEdit";
import Login from "../pages/Login.page";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "register",
            element: <Register />,
            children: [
                {
                    path: "admin",
                    element: <RegisterForm />,
                },
                {
                    path: "manager",
                    element: <RegisterForm />,
                },
                {
                    path: "employee",
                    element: <RegisterForm />,
                },
            ]
        },
        {
            path: "divisions",
            element: <Divisions />,
            children: [
                {
                    index:true,
                    element: <DivisionList />,
                },
                {
                    path: "form",
                    element: <DivisionForm />,
                }
            ]
        },
        {
            path: "item-categories",
            element: <Categories />,
            children: [
                {
                    index:true,
                    element: <CategoryList />,
                },
                {
                    path: "form",
                    element: <CategoryForm />,
                }
            ]
        },
        {
            path: "procurement-categories",
            element: <ProcurementCategories />,
            children: [
                {
                    index:true,
                    element: <ProcurementCategoryList />,
                },
                {
                    path: "form",
                    element: <ProcurementCategoryForm />,
                }
            ]
        },
        {
            path: "items",
            element: <Items />,
            children: [
                {
                    index:true,
                    element: <ItemList />,
                },
                {
                    path: "form",
                    element: <ItemForm />,
                }
            ]
        },
        {
            path: "procurements",
            element: <Procurements />,
            children: [
                {
                    index:true,
                    element: <ProcurementList />,
                },
                {
                    path: "form",
                    element: <ProcurementForm />,
                },
                {
                    path: "id",
                    element: <ProcurementDetail />,
                }
            ]
        },
        {
            path: "profile",
            element: <Profile />,
            children: [
                {
                    path: "edit",
                    element: <ProfileEdit />,
                }
            ]
        }
      ]
    },
    {
        path: "/login",
        element: <Login />,
    }
  ]);
  