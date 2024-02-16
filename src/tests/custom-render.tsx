import { RenderOptions, render } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { queryClient } from "../lib/query-client";

interface ICustomRenderProviderProps {
  children: ReactNode;
}

export const CustomRenderProvider = ({
  children,
}: ICustomRenderProviderProps) => {
  const routes = [
    {
      path: "/",
      element: children,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export const customRender = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, "wrapper">
) => {
  render(ui, { wrapper: CustomRenderProvider, ...options });
};
