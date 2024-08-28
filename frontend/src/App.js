import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import Users from "./pages/Users";
import Team from "./pages/Team";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <Toaster toastOptions={{ duration: 4000 }} />
      <Sidebar className="w-full md:w-1/5 bg-gray-800 text-white" />
      <main className="flex-1 bg-gray-900 text-white overflow-y-auto">
        <Outlet />
      </main>
      <aside className="hidden md:flex md:w-1/4 bg-gray-800 p-4">
        <Profile />
      </aside>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "/",
        element: <Users />,
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <h1 className="text-center text-white">404 - Not Found</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
