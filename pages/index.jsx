import {
	Box,
	Button,
	Checkbox,
	Container,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Logo } from "../components/logo";
import { PasswordField } from "../components/passwordField";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
	const AIRTABLE = "/api/airtable";

	const router = useRouter();
	const toast = useToast();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = React.useState(false);

	const onSubmit = async (data) => {
		setLoading(true);
		const options = {
			method: "POST",
			url: `${AIRTABLE}/login`,
			data: {
				email: JSON.stringify(data.email),
				password: data.password,
			},
			timeout: 3000,
		};
		await axios(options)
			.then((res) => {
				if (res.data == "Password incorrect" || res.data == "User not found") {
					setLoading(false);
					toast({
						title: "Usuário ou Senha incorretos",
						status: "error",
					});
					return;
				} else {
					localStorage.setItem("id", res.data.id);
					localStorage.setItem("user", res.data.name);
					router.push("/home");
				}
			})
			.catch((err) => {
				setLoading(false);
				toast({
					title: "Usuário ou Senha incorretos",
					status: "error",
				});
				console.log(err, "erro");
			});
	};

	return (
		<Flex
			bgColor='white'
			w='full'
			h='100vh'
			justifyContent='center'
			alignItems='top'
		>
			<Container
				borderRadius='md'
				maxW='lg'
				py={{
					base: "12",
					md: "12",
				}}
				px={{
					base: "4",
					sm: "8",
				}}
			>
				<Stack spacing='5'>
					<Stack spacing='2'>
						<Flex justify='center' align='center'>
							<Logo width='240px' />
						</Flex>
						<Stack
							spacing={{
								base: "2",
								md: "3",
							}}
							textAlign='center'
						>
							<HStack spacing='1' justify='center'>
								<Text color='muted'>{"Não possui uma conta?"}</Text>
								<Button
									variant='link'
									colorScheme='blue'
									onClick={() => router.push("/create")}
								>
									Cadastre-se
								</Button>
							</HStack>
						</Stack>
					</Stack>
					<Box
						bgColor='white'
						py={{
							base: "0",
							sm: "5",
						}}
						px={{
							base: "4",
							sm: "10",
						}}
						bg={useBreakpointValue({
							base: "transparent",
							sm: "bg-surface",
						})}
						boxShadow={{
							base: "none",
							sm: useColorModeValue("md", "md-dark"),
						}}
						borderRadius={{
							base: "none",
							sm: "xl",
						}}
						as='form'
						onSubmit={handleSubmit(onSubmit)}
					>
						<Stack spacing='6'>
							<Stack spacing='5'>
								<FormControl>
									<FormLabel htmlFor='email'>Email</FormLabel>
									<Input
										id='email'
										type='email'
										placeholder='Digite seu email'
										{...register("email")}
									/>
								</FormControl>
								<PasswordField {...register("password")} formlabel='Senha' />
							</Stack>
							<HStack justify='space-between'>
								<Checkbox defaultChecked colorScheme='gray'>
									Lembrar-me
								</Checkbox>
								<Button
									variant='link'
									color='black'
									size='sm'
									onClick={() => router.push("/forgot_password")}
								>
									Esqueceu sua senha?
								</Button>
							</HStack>
							<Stack spacing='6'>
								<Button
									bgColor='black'
									color='white'
									type='submit'
									_hover={{ opacity: 0.8 }}
									isLoading={loading}
								>
									Entrar
								</Button>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Container>
		</Flex>
	);
}
