import AdminPage from "../components/pages/admin";
import HomePage from "../components/pages/home";
import LoginPage from "../components/pages/login";
import SignupPage from "../components/pages/signup";
import UserPage from "../components/pages/user";
import PetPage from "../components/pages/pet";

const routes = [
  {
    path: '/pets',
    component: <HomePage />,
    label: 'Home',
    protected: true,
  },
  {
    path: '/pets/:petId',
    component: <PetPage />,
    label: 'Pet page',
    protected: true,
    hidden: true,
  },
  {
    path: '/user',
    component: <UserPage />,
    label: 'User',
    protected: true,
  },
  {
    path: '/admin',
    component: <AdminPage />,
    label: 'Admin Panel',
    protected: true,
    admin: true,
  },
  {
    path: '/login',
    component: <LoginPage />,
    label: 'Login',
    protected: false,
  },
  {
    path: '/signup',
    component: <SignupPage />,
    label: 'Signup',
    protected: false,
  }
]

export default routes;
