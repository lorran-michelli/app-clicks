import {
	Box,
	Button,
	Flex,
	Text,
	Progress,
	Spacer,
	Stack,
	Spinner,
	useDisclosure,
} from "@chakra-ui/react";
import { Logo } from "./components/logo";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { ButtonSocial } from "./components/buttonSocial";
import { Header } from "./components/header";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { PopUp } from "./components/popUp";

export default function Home() {
	const AIRTABLE = "/api/airtable";
	const router = useRouter();
	const [saldo, setSaldo] = useState(0);
	const [progress, setProgress] = useState(0);
	const [name, setName] = useState("");
	const [isLoading, setLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleProgressValues = (value) => {
		const progress = (value * 100) / 3000;
		return progress;
	};

	useEffect(() => {
		setLoading(true);
		const isLogged = localStorage.getItem("id");
		if (!isLogged) {
			router.push("/");
		}
		const options = {
			method: "POST",
			url: `${AIRTABLE}/me`,
			data: {
				id: isLogged,
			},
			timeout: 3000,
		};
		axios(options)
			.then((res) => {
				setName(res.data.name);
				setProgress(res.data.bank);
				setSaldo(
					new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: "BRL",
					}).format(res.data.bank)
				);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				router.push("/");
			});
	}, []);
	const messages =
		progress < 3000
			? `Voce precisa completar a barra da meta para finalizar seu saque! Ou aguardar um colaborador do Play Premiado te chamar, caso sobre valor de premiação para distribuir.`
			: `Parabéns, entre em contato com um colaborador Play milionário para receber sua premiação!`;

	return (
		<Box bgColor='gray.50' h='100vh'>
			<Header money={saldo} name={name} isLoading={isLoading} />

			<PopUp
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				reference={React.useRef()}
				message={messages}
			/>
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
					maxW='400px'
					mx='auto'
					mt='4vh'
					p='2em'
				>
					<Logo mb='1.5rem' height='190px' />

					<Box width='285px' maxW='900px' mt='8'>
						<Flex mb='4px' fontSize='sm' fontWeight='semibold'>
							<Text>{saldo}</Text>
							<Spacer />
							<Text end>Meta de saque</Text>
						</Flex>
						<Progress
							value={handleProgressValues(progress)}
							size='sm'
							borderRadius='md'
							colorScheme='green'
							bg='gray.300'
						/>
					</Box>

					<Stack spacing='6' mt='4' pb='5'>
						<Button
							bgColor='black'
							color='white'
							type='submit'
							px='50px'
							py='6'
							_hover={{ opacity: 0.8 }}
							onClick={onOpen}
						>
							Quero sacar meu dinhero!
						</Button>
					</Stack>

					<Flex gap='10'>
						<ButtonSocial text='Instagram' bgColor='black'>
							<FaInstagram size='25' />
						</ButtonSocial>
						<ButtonSocial text='Youtube'>
							<FaYoutube size='25' />
						</ButtonSocial>
					</Flex>
				</Flex>
			)}
		</Box>
	);
}
