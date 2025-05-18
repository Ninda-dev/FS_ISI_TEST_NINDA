import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
]);

export const DeclaredRouter = () => {
    return <RouterProvider router={router} />
}