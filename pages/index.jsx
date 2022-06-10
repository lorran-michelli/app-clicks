import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Text,
  Progress,
  CircularProgress,
  Spacer,
} from "@chakra-ui/react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Logo } from "./components/logo";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { ButtonSocial } from "./components/buttonSocial";

export default function Home() {
  return (
    <Flex
      bgColor="white"
      w="full"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Logo mb="1.5rem" height="140px" />

      <Text mb="3rem">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu metus
        eleifend, commodo leo in, pharetra nisl. Duis ut odio enim. Vestibulum
        iaculis dui ac.
      </Text>

      <Flex width="30%">
        <Text>0%</Text>
        <Spacer />
        <Text end>100%</Text>
      </Flex>

      <Box width="30%">
        <Progress value={80} />
      </Box>

      <Flex gap="8">
        <ButtonSocial text="Instagram">
          <FaInstagram size="25" />
        </ButtonSocial>
        <ButtonSocial text="Youtube">
          <FaYoutube size="25" />
        </ButtonSocial>
      </Flex>
    </Flex>
  );
}
