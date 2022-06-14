import {
  Box,
  Button,
  Flex,
  Text,
  Stack,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { Logo } from "../components/logo";
import { Header } from "../components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const text = router.query.name;
  const options = ["Youtube", "Instagram"];

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!options.includes(text)) {
      router.push("/home");
      setTimeout(() => setLoading(false), 4000);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Box bgColor="gray.50" h="100vh">
      <Header />
      {isLoading ? (
        <Flex align="center" w="100%" h="87%" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mx="auto"
          mt="4vh"
          p="2em"
        >
          <Logo mb=".7rem" height="190px" />

          <Heading fontSize="50px" size="2xl" opacity=".8" p="1rem">
            Falta pouco!
          </Heading>

          <Text color="gray.500" fontSize="lg" opacity="1">
            Para começar a ganhar clique no botão abaixo para ir ao {text} e
            assista seus vídeos 😃.
          </Text>

          <Text fontSize="lg" color="red.400">
            É necessário deixar esta aba e navegador abertos!!!
          </Text>

          <Stack spacing="6" mt="10" pb="5">
            <Button
              as="a"
              href={`https://${text.toLowerCase()}.com`}
              target="_blank"
              rel="noreferrer"
              bgColor="black"
              color="white"
              type="submit"
              px="30px"
              py="6"
              _hover={{ opacity: 0.8 }}
            >
              Abrir {text}!
            </Button>
          </Stack>
        </Flex>
      )}
    </Box>
  );
}
