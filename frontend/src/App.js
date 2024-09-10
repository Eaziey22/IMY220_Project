import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import { SplashPage } from './pages/SplashPage';
import { HomePage } from './pages/HomePage';
import { PlaylistPage } from './pages/PlaylistPage';

//components
import {Login} from './components/Login';
import { SignUp } from './components/SignUp';


const router = createBrowserRouter([
    {
        path: "/",
        element: <SplashPage/>,
        errorElement: <div>404 Not Found</div>
    },
    {
        path:"/login",
        element: <Login/>,
        errorElement: <div>404 Not Found</div>
    },
    {
        path:"/signUp",
        element: <SignUp/>,
        errorElement: <div>404 Not Found</div>
    },
    {
        path:"/home",
        element: <HomePage/>,
        errorElement: <div>404 Not Found</div>
    },
    {
        path:"/playlist",
        element: <PlaylistPage/>,
        errorElement: <div>404 Not Found</div>
    }
]);

class App extends React.Component{
    render(){
        return(
            <RouterProvider router={router}></RouterProvider>
        );
    };
}

export default App;