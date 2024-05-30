import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Users from "../components/UserComponents/Users";
import UserList from "../components/UserComponents/UserList";
import RegisterForm from "../components/UserComponents/RegisterForm";  
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
import AuthrozationRoute from "../components/Guard/AuthrozationRoute";
import Approvement from "../components/ApprovementComponents/Approvement";
import ApprovementList from "../components/ApprovementComponents/ApprovementList";
import Approval from "../components/ApprovementComponents/Approval";
import HistoryList from "../components/HistoryComponents/HistoryList";
import HistoryDetail from "../components/HistoryComponents/HistoryDetail";


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
                    element: <AuthrozationRoute component={Divisions} roles={['ROLE_ADMIN']} />,
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
                    element: <AuthrozationRoute component={Categories} roles={['ROLE_ADMIN']} />,
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
                    element: <AuthrozationRoute component={ProcurementCategories} roles={['ROLE_ADMIN']} />,
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
                    element: <AuthrozationRoute component={Items} roles={['ROLE_ADMIN']} />,
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
                            path: ":id",
                            element: <ProcurementDetail />,
                        }
                    ]
                },
                {
                    path: "history",
                    element: <HistoryList />,
                    children: [
                        {
                            path: "id",
                            element: <HistoryDetail />,
                        }
                    ]
                },
                {
                    path: "approvements",
                    element:<AuthrozationRoute component={Approvement} roles={['ROLE_MANAGER']} />,
                    children: [
                        {
                            index:true,
                            element: <ApprovementList />,
                        },
                        {
                            path: ":id",
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
                    path: "user",
                    element: <AuthrozationRoute component={Users} roles={['ROLE_ADMIN', 'ROLE_MANAGER']} />,
                    children: [
                        {
                            index:true,
                            element: <UserList />,
                        },
                        {
                            path: "register",
                            element: <RegisterForm />,
                        }
                    ]
                }
            ]
        }
      ]
    }
  ]);
  