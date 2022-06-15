import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	VStack,
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
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = React.useState(false);

	const onSubmit = async (data) => {
		setLoading(true);
		const options = {
			method: "PATCH",
			url: `${AIRTABLE}/forgot`,
			data: {
				password: data.password1,
				cpf: data.cpf.split(".").join("").split("-").join(""),
			},
			timeout: 5000,
		};
		await axios(options)
			.then((res) => {
				if (res.status == 200) {
					setLoading(false);
					toast({
						title: "Senha atualizada com sucesso!",
						status: "success",
					});
					router.push("/");
					return;
				}
			})
			.catch((err) => {
				if (err.response.status == 422) {
					toast({
						title: "CPF não encontrado, verifique seu CPF e tente novamente!",
						status: "error",
					});
					setLoading(false);
					return;
				}
				toast({
					title:
						"Erro, tente novamente mais tarde ou entre em contato com o suporte.",
					status: "error",
				});
				setLoading(false);
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
					md: "10",
				}}
				px={{
					base: "4",
					sm: "8",
				}}
			>
				<Stack spacing='8'>
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
							<VStack spacing='1'>
								<Text color='muted'>
									{"Digite seu CPF para redefinir a sua senha."}
								</Text>
								<Button
									variant='link'
									colorScheme='blue'
									onClick={() => router.push("/create")}
								>
									Caso ainda não tenha uma conta, clique aqui para criar!
								</Button>
							</VStack>
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
									<FormLabel>CPF:</FormLabel>
									<Input
										id='cpf'
										type='text'
										placeholder='Digite seu CPF'
										{...register("cpf", {
											required: true,
											minLength: 11,
											maxLength: 14,
										})}
									/>
									{errors.cpf && (
										<Text fontSize={"xs"} mt='2px' color='red'>
											{"Digite um CPF válido."}
										</Text>
									)}
								</FormControl>
								<PasswordField
									{...register("password1")}
									placeholder='Digite sua nova senha'
									formlabel='Senha:'
								/>
							</Stack>

							<Stack spacing='6'>
								<Button
									bgColor='black'
									color='white'
									type='submit'
									_hover={{ opacity: 0.8 }}
									isLoading={loading}
								>
									Enviar
								</Button>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Container>
		</Flex>
	);
}
