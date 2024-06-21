import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import Classes from '../pages/MyClasses/Classes';
import AIChecker from '../pages/AIChecker/AIChecker';
import Dashboard from '../pages/Dash/Dashboard';
import ClassesDocuments from '../pages/classesDocuments/ClassesDocuments';
import StudentsList from '../pages/studentsList/StudentsList';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        // errorElement: <ErrorPage/>,
        children:[
            {path: '/Login', element: <Login/>},
            {path: '/myclasses', element: <Classes/>},
            {path: '/classesdocuments', element: <ClassesDocuments/>},
            {path: '/accountsettings', element: <Profile/>},
            {path: '/checker', element: <AIChecker/>},
            {path: '/dashboard', element: <Dashboard/>},
            {path: '/students', element: <StudentsList/>},

        ],
    },
]);