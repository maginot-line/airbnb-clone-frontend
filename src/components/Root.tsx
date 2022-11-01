import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./Header";

export default function Root() {
    return (
        <Box>
            <Header />
            <Outlet />
            <ReactQueryDevtools />
        </Box>
    );
}
