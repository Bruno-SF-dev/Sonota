import { createBrowserRouter } from "react-router-dom";
import { Notes } from "./pages/notes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Notes />,
  },
]);
