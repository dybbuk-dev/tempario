import { forwardRef, ForwardRefRenderFunction } from "react";
import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  values: string[] | number[];
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, values, required, placeholder, error, ...rest },
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
      <ChakraSelect
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
        {...rest}
      >
        {!!values && values.map((value, index) => (
          placeholder? (<option value={value} key={index}>{value} {placeholder}</option>) : (<option value={value} key={index}>{value}</option>)
        ))
        }
      </ChakraSelect>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
export const Select = forwardRef(SelectBase);