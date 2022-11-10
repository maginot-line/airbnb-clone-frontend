import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUserNinja, FaUserSecret } from "react-icons/fa";
import { signIn } from "../api";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    name: string;
    email: string;
    username: string;
    password: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation(signIn, {
        onSuccess: (data) => {
            toast({ title: "welcome!", status: "success" });
            onClose();
            queryClient.refetchQueries(["me"]);
            reset();
        },
    });
    const onSubmit = ({ name, email, username, password }: IForm) => {
        mutation.mutate({ name, email, username, password });
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign Up</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaUserSecret />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.name?.message)}
                                {...register("name", { required: "Please write a name" })}
                                variant={"filled"}
                                placeholder="Name"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaEnvelope />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.email?.message)}
                                {...register("email", {
                                    required: "Please write a email",
                                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "invalid email address" },
                                })}
                                variant={"filled"}
                                placeholder="Email"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaUserNinja />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.username?.message)}
                                {...register("username", { required: "Please write a username" })}
                                variant={"filled"}
                                placeholder="Username"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaLock />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.password?.message)}
                                {...register("password", { required: "Please write a password" })}
                                variant={"filled"}
                                type="password"
                                placeholder="Password"
                            />
                        </InputGroup>
                    </VStack>
                    {mutation.isError ? (
                        <Text color={"red.500"} textAlign={"center"} fontSize={"sm"}>
                            errors[0].message
                        </Text>
                    ) : null}
                    <Button isLoading={mutation.isLoading} type={"submit"} mt={4} colorScheme={"red"} w={"100%"}>
                        Sign Up
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
