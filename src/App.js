import {
  BrowserRouter as Router,
  Navigate,
  Routes as Switch, // in react-router-dom v6, Switch is now Routes
  Route,
} from "react-router-dom";
import './App.css';

import Layout from './components/layout/layout';
import routes from './config/routes';
import useAuth from './hooks/useAuth';
import AuthContext from './contexts/authContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { useToast } from "@chakra-ui/react";
import { useMemo } from "react";

const queryClient = new QueryClient();


function App() {
  const toast = useToast();
  queryClient.setDefaultOptions({
    mutations: {
      onError: (error) => {
        if (['FormError', 'AccessError'].includes(error.response?.data?.errorType)) {
          toast({
            title: error.response?.data?.errorType,
            description: error.response.data.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
        // reset of errors if you wish to handle
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <InnerApp />
    </QueryClientProvider>
  );
}

const InnerApp = () => {
  const auth = useAuth(); // { ..., isLoggedIn }
  const { isLoggedIn } = auth;
  const filterFunc = useMemo(() => {
    const isAdmin = isLoggedIn?.accessLevel === 'admin';
    if (isAdmin) return (route) => route.protected || route.admin;
    if (isLoggedIn) return (route) => route.protected && !route.admin;
    return (route) => !route.protected;
  }, [isLoggedIn]);
  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <Layout>
          <Switch>
            {routes.filter(filterFunc).map((route) => ( // element={Component} is also v6 feature
              <Route key={route.path} path={route.path} element={route.component} />
            ))}
            <Route path="*" element={<Navigate to={isLoggedIn ? '/pets' : '/login'} />} />
          </Switch>
        </Layout>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
