import {
	Box,
	Button,
	Flex,
	Text,
	Stack,
	Heading,
	Spinner,
	useToast,
} from "@chakra-ui/react";
import { Logo } from "../../components/logo";
import { Header } from "../../components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Video() {
	const router = useRouter();
	const toast = useToast();
	const text = router.query.name;
	const options = ["Tiktok"];
	const [isLoading, setLoading] = useState(true);
	const [name, setName] = useState("");
	const [progress, setProgress] = useState(0);
	const AIRTABLE = "/api/airtable";

	useEffect(() => {
		setName(localStorage.getItem("user"));
		if (!options.includes(text)) {
			router.push("/home");
			setTimeout(() => setLoading(false), 15000);
		} else {
			const options = {
				method: "POST",
				url: `${AIRTABLE}/me`,
				data: {
					id: localStorage.getItem("id"),
				},
				timeout: 3000,
			};
			axios(options)
				.then((res) => {
					setProgress(res.data.bank);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					toast({
						title: `Erro, tente novamente mais tarde!`,
						status: "error",
						isClosable: true,
					});
					router.push("/home");
				});
		}
	}, []);

	const handleClickEvent = async () => {
		const random = (min, max) => Math.random() * (max - min) + min;
		const options = {
			method: "PATCH",
			url: `${AIRTABLE}/update`,
			data: {
				id: localStorage.getItem("id"),
				bank: String(Number(progress) + random(0.2, 0.34)),
			},
			timeout: 3000,
		};
		await axios(options)
			.then((response) => {
				console.log(response);
				setTimeout(() => router.push("/home"), 60000);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Box bgColor='black' h='100vh' color='white'>
			<Header name={name} backIcon={true} />
			{isLoading ? (
				<Flex align='center' w='100%' h='87%' justify='center'>
					<Spinner size='xl' />
				</Flex>
			) : (
				<Flex
					w='full'
					justifyContent='center'
					alignItems='center'
					flexDirection='column'
					mx='auto'
					mt='4vh'
					p='2em'
				>
					<Logo mb='.7rem' height='190px' />

					<Heading fontSize='50px' size='2xl' opacity='.8' p='1rem'>
						Falta pouco!
					</Heading>

					<Text color='gray.500' fontSize='lg' opacity='1'>
						Para começar a ganhar clique no botão abaixo para ir ao {text} e
						assista seus vídeos 😃.
					</Text>

					<Text fontSize='lg' color='red.400'>
						É necessário deixar esta aba e navegador abertos!!!
					</Text>

					<Stack spacing='6' mt='10' pb='5'>
						<Button
							as='a'
							href={`https://${text.toLowerCase()}.com`}
							onClick={handleClickEvent}
							target='_blank'
							rel='noreferrer'
							bgColor='#00eae7 '
							color='black'
							type='submit'
							px='30px'
							py='6'
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
