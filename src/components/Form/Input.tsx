import React, { forwardRef, ForwardRefRenderFunction } from "react";
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  required?: boolean;
  error?: FieldError;
  isHiddenField?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, required, error, isHiddenField, ...rest },
  ref,
) => {
  return (
    <FormControl isRequired={required} isInvalid={!!error}>
      {!!label && (
        <FormLabel
          htmlFor={name}
          fontStyle="normal"
          fontWeight="normal"
          fontSize="17px"
          lineHeight="132%"
          isTruncated
        >
          {label}
        </FormLabel>
      )}
      <ChakraInput
        width={isHiddenField ? "0px" : "100%"}
        id={name}
        name={name}
        focusBorderColor="gray.300"
        bgColor="#ffffff"
        border="1px solid"
        borderColor="gray.300"
        variant="filled"
        _hover={{
          bgColor: "#ffffff",
        }}
        _focus={{ bgColor: "#ffffff", borderColor: "gray.400" }}
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
export const Input = forwardRef(InputBase);