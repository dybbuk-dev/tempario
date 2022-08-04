import { ReactNode, useRef, } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input as ChakraInput,
    InputGroup,
    InputProps as ChakraInputProps,
    FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FileUploadProps extends ChakraInputProps {
    register: UseFormRegisterReturn;
    accept?: string;
    multiple?: boolean;
    children?: ReactNode;
    label?: string;
    required?: boolean;
    error?: FieldError;
}

const FileUpload = (props: FileUploadProps,) => {
    const { register, accept, multiple, children, label, required, error } = props;
    const inputRef = useRef<HTMLElement | null>(null);
    const { ref, ...rest } = register as { ref: (instance: HTMLElement | null) => void };

    const handleClick = () => inputRef.current?.click();
    return (
        <FormControl isRequired={required} isInvalid={!!error}>
            {!!label && (
                <FormLabel
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize="17px"
                    lineHeight="132%"
                    isTruncated
                >
                    {label}
                </FormLabel>
            )}
            <InputGroup onClick={handleClick} display="flex" flexDirection="column">
                <ChakraInput
                    type="file"
                    multiple= {multiple || false}
                    accept={accept}
                    focusBorderColor="gray.300"
                    bgColor="#ffffff"
                    border="1px solid"
                    borderColor="gray.300"
                    variant="filled"
                    _hover={{
                        bgColor: "#ffffff",
                    }}
                    _focus={{ bgColor: "#ffffff", borderColor: "gray.400" }}
                    {...rest}
                    ref={(e) => {
                        ref(e)
                        inputRef.current = e;
                    }}
                />
                <Box>
                    {children}
                </Box>
            </InputGroup>
            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};
export default FileUpload;