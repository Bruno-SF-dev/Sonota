import { createBrowserRouter } from "react-router-dom";
import { CustomComponent } from "./components/custom-component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomComponent />,
  },
]);
