import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const ButtonSocial = ({ text, children }, props) => {
	const router = useRouter();
	return (
		<Box mx='auto' mt='1em '>
			<Box
				{...props}
				px='9em'
				py='4em'
				borderRadius='1.2em'
				border='2px solid #00eae7 '
				bgColor='#ff174d'
				position='relative'
				cursor='pointer'
				_hover={{ opacity: 0.8 }}
				onClick={() => router.push(`/video/?name=${text}`)}
			>
				<Box
					color='#000'
					position='absolute'
					top='10px'
					left='10px'
					fontWeight='semibold'
				>
					{children}
				</Box>
				<Text
					color='#000'
					position='absolute'
					bottom='10px'
					left='10px'
					fontWeight='semibold'
				>
					{text}
				</Text>
			</Box>
			<Box fontSize='xs' textAlign='center' mt='2'>
				Clique no botão acima para assistir
			</Box>
		</Box>
	);
};
