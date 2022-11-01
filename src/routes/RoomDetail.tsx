import { Avatar, Box, Grid, GridItem, Heading, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomPk], getRoom);
    const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<IReview[]>(["rooms", roomPk, "reviews"], getRoomReviews);
    return (
        <Box mt={10} px={{ base: 10, lg: 40 }}>
            <Skeleton height={"43px"} width={"25%"} isLoaded={!isLoading}>
                <Heading>{data?.name}</Heading>
            </Skeleton>
            <Grid mt={8} rounded={"xl"} overflow={"hidden"} gap={3} height="60vh" templateRows={"1fr 1fr"} templateColumns={"repeat(4, 1fr)"}>
                {[0, 1, 2, 3, 4].map((index: number) => (
                    <GridItem colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1} overflow={"hidden"} key={index}>
                        <Skeleton isLoaded={!isLoading} h={"100%"} w={"100%"}>
                            <Image objectFit={"cover"} w={"100%"} h={"100%"} src={data?.photos[index].file} />
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>
            <HStack w={"40%"} justifyContent={"space-between"} mt={10}>
                <VStack alignItems={"flex-start"}>
                    <Skeleton isLoaded={!isLoading} h={"30px"}>
                        <Heading fontSize={"2xl"}>House hosted by {data?.owner.name}</Heading>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading}>
                        <HStack justifyContent={"flex-start"} w={"100%"}>
                            <Text>
                                {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                            </Text>
                            <Text>•</Text>
                            <Text>
                                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                            </Text>
                        </HStack>
                    </Skeleton>
                </VStack>
                <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
            </HStack>
            <Box mt={10}>
                <Heading fontSize={"2xl"} w={"20%"}>
                    <Skeleton isLoaded={!isLoading}>
                        <HStack>
                            <FaStar />
                            <Text>{data?.rating.toFixed(2)}</Text>
                            <Text>•</Text>
                            <Text>
                                {reviewsData?.length} Review{reviewsData?.length === 1 ? "" : "s"}
                            </Text>
                        </HStack>
                    </Skeleton>
                </Heading>
            </Box>
        </Box>
    );
}
