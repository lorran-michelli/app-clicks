import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogCloseButton,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react";

export function PopUp({
	reference,
	isOpen,
	onOpen,
	onClose,
	title,
	message,
	onConfirm,
}) {
	return (
		<>
			<AlertDialog
				motionPreset='slideInBottom'
				leastDestructiveRef={reference}
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>Aviso!</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>{message}</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={reference} onClick={onClose}>
							OK
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
