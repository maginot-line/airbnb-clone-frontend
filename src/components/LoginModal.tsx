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
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        if (name === "username") {
            onChangeUsername(value);
        } else if (name === "password") {
            onChangePassword(value);
        }
    };
    const onSubmit = (event: React.SyntheticEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log(username, password);
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={"form"} onSubmit={onSubmit}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaUserNinja />
                                    </Box>
                                }
                            />
                            <Input required name={"username"} onChange={onChange} value={username} variant={"filled"} placeholder="Username" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaLock />
                                    </Box>
                                }
                            />
                            <Input required name={"password"} onChange={onChange} value={password} type="password" variant={"filled"} placeholder="Password" />
                        </InputGroup>
                    </VStack>
                    <Button type={"submit"} mt={4} colorScheme={"red"} w={"100%"}>
                        Log in
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
