import { Outlet } from "react-router-dom";
import { Box, Button, HStack } from "@chakra-ui/react";
import { FaAirbnb } from "react-icons/fa";

export default function Root() {
    return (
        <Box>
            <HStack px={10} py={5} borderBottomWidth={1} justifyContent={"space-between"}>
                <Box color={"red.500"}>
                    <FaAirbnb size={48} />
                </Box>
                <HStack spacing={2}>
                    <Button>Log in</Button>
                    <Button colorScheme={"red"}>Sign up</Button>
                </HStack>
            </HStack>
            <Outlet />
        </Box>
    );
}
