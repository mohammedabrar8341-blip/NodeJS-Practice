import "./App.css";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import ProfileUser from "./Components/Profile";
import { Error } from "./Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "me",
        element: <ProfileUser />,
      },
    ],
  },
]);

function RootLayout() {
  return (
    <div className="page-shell">
      <div className="form-stack">
        <Outlet />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Signup />
      <Signin />
      <ProfileUser />
    </>
  );
}

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
