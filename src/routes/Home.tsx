import { Box, Grid } from "@chakra-ui/react";
import RoomSkeleton from "../components/RoomSkeleton";

export default function Home() {
    return (
        <Grid
            mt={10}
            px={{ base: 10, lg: 40 }}
            columnGap={4}
            rowGap={8}
            templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3,1fr)", xl: "repeat(4,1fr)", "2xl": "repeat(5,1fr)" }}
        >
            <Box>
                <RoomSkeleton />
            </Box>
        </Grid>
    );
}
