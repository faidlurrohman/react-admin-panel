import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

// protected || unprotected
import Protected from "./protected";
import Unprotected from "./unprotected";

// pages
import { Categories, Dashboard, Login, NotFound, Products } from "pages";
import { Wrapper } from "components";

// routers
const router = createBrowserRouter([
  // dashboard
  {
    path: "/",
    element: (
      <Protected>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </Protected>
    ),
    children: [{ index: true, element: <Dashboard /> }],
  },
  // master
  {
    path: "/master",
    element: (
      <Protected>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </Protected>
    ),
    children: [
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
    ],
  },
  // auth
  {
    path: "login",
    element: (
      <Unprotected>
        <Outlet />
      </Unprotected>
    ),
    children: [{ index: true, element: <Login /> }],
  },
  // 404
  { path: "*", element: <NotFound /> },
]);

export default function Routers() {
  return <RouterProvider router={router} />;
}
