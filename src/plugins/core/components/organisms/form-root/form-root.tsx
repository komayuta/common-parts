import * as React from "react";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();
interface FormRootProps {
    children: React.ReactNode;
  }
export const FormRoot: React.FC<FormRootProps> = ({children}) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
