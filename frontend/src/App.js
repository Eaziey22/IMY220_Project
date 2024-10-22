import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import { SplashPage } from './pages/SplashPage';
import { HomePage } from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { PlaylistsPage } from './pages/PlaylistsPage';
//components
import {Login} from './components/Login';
import { SignUp } from './components/SignUp';
import OnePlaylist  from './pages/OnePlaylist';


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
        path:"/playlists",
        element: <PlaylistsPage/>,
        errorElement: <div>404 Not Found</div>
    },
    {
        path:"/profile/:uId",
        element: <ProfilePage/>,
        errorElement: <div>404 Not Found</div>
    },
    {
        path:"/playlist/:pId",
        element: <OnePlaylist/>,
        errorElement: <div>404 Not Found</div>
    }
]);

class App extends React.Component{
    render(){
        return(
            <div style={{width: '100%', height : '100%'}}>
                <RouterProvider router={router}></RouterProvider>
            </div>
        );
    };
}

export default App;