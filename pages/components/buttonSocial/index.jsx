import { Box, Text } from "@chakra-ui/react";

export const ButtonSocial = ({ text, children }) => {
  return (
    <Box mx="auto" mt="1em ">
      <Box
        padding="4em"
        bgColor="blue.400"
        borderRadius="1.2em"
        position="relative"
      >
        <Box color="white" position="absolute" top="10px" left="10px">
          {children}
        </Box>
        <Text color="white" position="absolute" bottom="10px" left="10px">
          {text}
        </Text>
      </Box>
    </Box>
  );
};
