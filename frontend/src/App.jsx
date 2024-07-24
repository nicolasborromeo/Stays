import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SignupFormPage from "./components/SignUpFormPage";
import Navigation from '../src/components/Navigation'
import * as sessionActions from './store/session'

function Layout() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=> {
    dispatch(sessionActions.restoreUser()).then(()=> {
      setIsLoaded(true)
    });
  }, [dispatch])



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (<h1>Welcome!</h1>)
      },
      {
        path: "/signup",
        element: <SignupFormPage />
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
