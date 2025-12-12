// App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/layout";
import Syncpage from "./pages/todos-sync";
import Asyncpage from "./pages/a";
import TodoInfo from "./pages/infoById";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Syncpage /> },
      { path: "a", element: <Asyncpage /> },
      { path: "/todo/:id", element: <TodoInfo /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
