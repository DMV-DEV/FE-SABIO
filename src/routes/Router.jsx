import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import Classes from '../pages/MyClasses/Classes';
import AIChecker from '../pages/AIChecker/AIChecker';
import Dashboard from '../pages/Dash/Dashboard';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        // errorElement: <ErrorPage/>,
        children:[
            {path: '/Login', element: <Login/>},
            {path: '/myclasses', element: <Classes/>},
            {path: '/account', element: <Profile/>},
            {path: '/checker', element: <AIChecker/>},
            {path: '/dashboard', element: <Dashboard/>},
        ],
    },
]);