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
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Logo } from "./components/logo";
import { PasswordField } from "./components/passwordField";

export default function Login() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => console.log(data);

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
					md: "24",
				}}
				px={{
					base: "0",
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
							{/*                        <HStack spacing="1" justify="center">
                            <Text color="muted">{"Don't have an account?"}</Text>
                            <Button variant="link" colorScheme="blue">
                                Sign up
                            </Button>
                        </HStack> */}
						</Stack>
					</Stack>
					<Box
						bgColor='white'
						py={{
							base: "0",
							sm: "8",
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
										defaultValue='test'
										{...register("email")}
									/>
								</FormControl>
								<PasswordField {...register("password")} />
							</Stack>
							<HStack justify='space-between'>
								<Checkbox defaultChecked colorScheme='gray'>
									Lembrar-me
								</Checkbox>
								<Button variant='link' color='black' size='sm'>
									Esqueceu sua senha?
								</Button>
							</HStack>
							<Stack spacing='6'>
								<Button
									bgColor='black'
									color='white'
									type='submit'
									_hover={{ opacity: 0.8 }}
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
