import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { BiExit } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";

export const Header = () => {
	return (
		<Flex justify='space-between' align='center' h='90px' bgColor={"white"}>
			<Flex
				align='center'
				px='6'
				fontWeight='semibold'
				fontSize='lg'
				color='#0f0f0f'
			>
				<Box cursor='pointer'>
					<Link href='/'>
						<BiExit />
					</Link>
				</Box>
				<Text ml='4'>Name</Text>
			</Flex>
			<Flex
				align='center'
				px='6'
				fontWeight='semibold'
				fontSize='lg'
				color='#0f0f0f'
			>
				<BsWallet2 />
				<Text ml='4'>R$3,00</Text>
			</Flex>
		</Flex>
	);
};
