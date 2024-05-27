import { createBrowserRouter } from "react-router-dom";
import App from "../App";
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
import ProfileUser from "../components/ProfileComponents/ProfileUser";
import Login from "../pages/Login.page";
import MenuComponent from "../components/Menu.component";
import AuthGuard from "../components/Guard/AuthGuard";
import LayoutMain from "../components/Layouts/LayoutMain/LayoutMain";


  export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
        {
            path: 'auth',
            element: <AuthGuard/>,
            children: [
                {
                    path: 'login',
                    element: <Login/>
                },
            ] 
        },
        {
            path: '',
            element: <LayoutMain/>,
            children: [
                {
                    index:true,
                    element: <MenuComponent />,
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
                            index:true,
                            element: <ProfileUser />,
                        },
                        {
                            path: "edit",
                            element: <ProfileEdit />,
                        }
                    ]
                },
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
                }
            ]
        }
      ]
    }
  ]);
  