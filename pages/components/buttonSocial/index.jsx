import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const ButtonSocial = ({ text, children }, props) => {
  console.log(props);
  const router = useRouter();
  return (
    <Box mx="auto" mt="1em ">
      <Box
        {...props}
        padding="4em"
        borderRadius="1.2em"
        border="2px solid"
        position="relative"
        cursor="pointer"
        _hover={{ opacity: 0.8 }}
        onClick={() => router.push(`/video/?name=${text}`)}
      >
        <Box
          color="#000"
          position="absolute"
          top="10px"
          left="10px"
          fontWeight="semibold"
        >
          {children}
        </Box>
        <Text
          color="#000"
          position="absolute"
          bottom="10px"
          left="10px"
          fontWeight="semibold"
        >
          {text}
        </Text>
      </Box>
    </Box>
  );
};
