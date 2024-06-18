import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/login/Login';
import AIChecker from '../pages/AIChecker/AIChecker'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        // errorElement: <ErrorPage/>,
        children:[
            {path: '/Login', element: <Login/>},
            {path: '/checker', element: <AIChecker/>},
        ],
    },
]); 