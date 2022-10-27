import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
    return (
        <Grid
            mt={10}
            px={{ base: 10, lg: 40 }}
            columnGap={4}
            rowGap={8}
            templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3,1fr)", xl: "repeat(4,1fr)", "2xl": "repeat(5,1fr)" }}
        >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((index) => (
                <Room key={index} />
            ))}
        </Grid>
    );
}
