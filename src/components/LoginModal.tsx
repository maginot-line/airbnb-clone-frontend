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
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables, usernameLogin } from "../api";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation: UseMutationResult<IUsernameLoginSuccess, IUsernameLoginError, IUsernameLoginVariables, unknown> = useMutation(usernameLogin, {
        onMutate: () => {
            console.log("mutation starting");
        },
        onSuccess: (data) => {
            toast({ title: "welcome back", status: "success" });
            onClose();
            queryClient.refetchQueries(["me"]);
        },
        onError: (error) => {
            console.log("mutation has an error");
        },
    });
    const onSubmit = ({ username, password }: IForm) => {
        mutation.mutate({ username, password });
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
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
                                required
                                type="password"
                                variant={"filled"}
                                placeholder="Password"
                            />
                        </InputGroup>
                    </VStack>
                    <Button isLoading={mutation.isLoading} type={"submit"} mt={4} colorScheme={"red"} w={"100%"}>
                        Log in
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
