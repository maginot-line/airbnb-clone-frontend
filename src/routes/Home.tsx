import { Box, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Home() {
    return (
        <Grid mt={10} px={40} columnGap={4} rowGap={8} templateColumns={"repeat(5, 1fr)"}>
            <VStack alignItems={"flex-start"}>
                <Box overflow={"hidden"} mb={2} rounded={"3xl"}>
                    <Image
                        h={"280"}
                        src="https://a0.muscache.com/im/pictures/miso/Hosting-47181423/original/39c9d4e7-78d0-4807-9f0d-3029d987d02a.jpeg?im_w=720"
                    />
                </Box>
                <Box>
                    <Grid gap={2} templateColumns={"6fr 1fr"}>
                        <Text display={"block"} as={"b"} noOfLines={1} fontSize={"md"}>
                            Cheomdangwahak-ro, Jeongeup-si, North Jeolla Province, South Korea
                        </Text>
                        <HStack spacing={1}>
                            <FaStar size={15} />
                            <Text fontSize={"sm"}>4.97</Text>
                        </HStack>
                    </Grid>
                    <Text fontSize={"sm"} color={"gray.600"}>
                        Seoul, S. Korea
                    </Text>
                </Box>
                <Text fontSize={"sm"} color={"gray.600"}>
                    <Text as={"b"}>$72</Text> / night
                </Text>
            </VStack>
        </Grid>
    );
}
