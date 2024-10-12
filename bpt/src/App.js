import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./page/Home/Home"
import Navbar from './components/Navbar/Navbar';
import HomeAdmin from "./page_admin/HomeAdmin"
import Dramas from './page/Dramas/Dramas';
import Artists from './page/Artists/Artists';
import DramaInfo from './page/DramaInfo/DramaInfo';
import Profile from "./page/Profile/Profile"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AddArtist from './page/AddArtist/AddArtist';
import AddDrama from './page/AddDrama/AddDrama';
import Rankings from './page/Rankings/Rankings';
function App() {

  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <div>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<Layout />),
      children: [
        {
          path: "/",
          element: <Home />,
        }, {
          path: "/drama",
          element: <Dramas />,
        }, {
          path: "/artist",
          element: <Artists />,
        }, {
          path: "/info-drama/:id",
          element: <DramaInfo />,
        }, {
          path: "/profile/:id",
          element: <Profile />,
        }, {
          path: "/ranking",
          element: <Rankings />,
        }, {
          path: "/add-artist",
          element: <AddArtist />,
        }, {
          path: "/add-drama",
          element: <AddDrama />,
        }
      ]
    },
    {
      path: "/admin",
      element: (<HomeAdmin />),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
