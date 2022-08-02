import {
    Box,
    Button,
    Divider,
    Flex,
    SimpleGrid,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import React, { useState, useMemo, ChangeEvent } from "react";
  import { useForm } from "react-hook-form";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import axios from "axios";
  import { Input } from "../components/Form/Input";
  
  interface FormData {
    cpf_cnpj: string;
    fantasy_name?: string;
    social_reason?: string;
    street_type?: string;
    address?: string;
    address_number?: string;
    complement?: string;
    telephone_1?: string;
    telephone_2: string;
    district?: string;
    zip_code?: string;
    city?: string;
    state?: string;
  }
  
  const formSchema = yup.object().shape({
    cpf_cnpj: yup.string().required("Campo obrigatório"),
    social_reason: yup.string().required("Campo obrigatório"),
    email: yup.string().email().required("Campo obrigatório"),
    telephone_1: yup.string().required("Campo obrigatório"),
    street_type: yup.string().required("Campo obrigatório"),
    address: yup.string().required("Campo obrigatório"),
    address_number: yup.string().required("Campo obrigatório"),
    district: yup.string().required("Campo obrigatório"),
    city: yup.string().required("Campo obrigatório"),
  });
  
  const WorkshopArea: React.FC = () => {
    const { register, handleSubmit, formState, setValue } = useForm({
      resolver: yupResolver(formSchema),
    });
    const toast = useToast();
    const { errors } = formState;
    const [loading, setLoading] = useState<boolean>(false);
    const [hasCnpj, setHasCnpj] = useState<boolean>(false);
    const [document, setDocument] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [telephone1, setTelephone1] = useState<string>("");
    const [telephone2, setTelephone2] = useState<string>("");
    const [companyEmail, setCompanyEmail] = useState<string>("");
  
    function clearFields() {
      setValue("social_reason", "");
      setValue("fantasy_name", "");
      setValue("telephone_2", "");
      setValue("address", "");
      setValue("address_number", "");
      setValue("district", "");
      setValue("zip_code", "");
      setValue("city", "");
      setValue("state", "");
    }
  
    const maskedCNPJ = useMemo((): string => {
      const maskedField = document
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
  
      return maskedField;
    }, [document]);
  
    const maskedZipCode = useMemo((): string => {
      const maskedField = zipCode
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2");
  
      return maskedField;
    }, [zipCode]);
  
    // Needs to create a component to use these masked fields
    const maskedTelephone1 = useMemo((): string => {
      const maskedField = telephone1
        .replace(/\D/g, "")
        .replace(/(\d{1})(\d)/, "($1$2)")
        .replace(/(\d{5})(\d)/, "$1-$2");
  
      return maskedField;
    }, [telephone1]);
  
    const maskedTelephone2 = useMemo((): string => {
      const maskedField = telephone2
        .replace(/\D/g, "")
        .replace(/(\d{1})(\d)/, "($1$2)")
        .replace(/(\d{5})(\d)/, "$1-$2");
  
      return maskedField;
    }, [telephone2]);
  
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
      e.target.maxLength = 18;
      setDocument(e.target.value);
    }
  
    function handleChangeZipCode(e: React.ChangeEvent<HTMLInputElement>): void {
      e.target.maxLength = 10;
      setZipCode(e.target.value);
    }
  
    function handleChangeTelephone1(
      e: React.ChangeEvent<HTMLInputElement>,
    ): void {
      e.target.maxLength = 13;
      setTelephone1(e.target.value);
    }
  
    function handleChangeTelephone2(
      e: React.ChangeEvent<HTMLInputElement>,
    ): void {
      e.target.maxLength = 13;
      setTelephone2(e.target.value);
    }
    // ---------------------------------------------------------------
  
    async function handleCnpj(event: ChangeEvent<HTMLInputElement>) {
      event.preventDefault();
      setLoading(true);
      try {
        if (document !== "") {
          const cnpj = document.replace(/\D/g, "");
  
          // unnoficial token
          const token =
            "6062b15c-5f52-4d52-966e-33debcd6adaa-d1ff5a41-8821-4c6e-8100-be3d428fb016";
          const result = await axios.get(`https://api.cnpja.com/office/${cnpj}`, {
            headers: {
              Authorization: `${token}`,
            },
          });
  
          if (cnpj.length === 0) {
            clearFields();
            setLoading(false);
            return;
          }
  
          if (result.data.company) {
            setValue("social_reason", result.data.company.name, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("fantasy_name", result.data.alias, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
  
          if (result.data.emails[0] && result.data.emails[0].address !== "") {
            setValue("email", result.data.emails[0].address, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setCompanyEmail(result.data.emails[0].address);
          }
  
          if (result.data.address) {
            setValue("address", result.data.address.street, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("address_number", result.data.address.number, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("district", result.data.address.district, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("zip_code", result.data.address.zip, {
              shouldValidate: true,
              shouldDirty: true,
            });
  
            setZipCode(result.data.address.zip);
  
            setValue("city", result.data.address.city, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("state", result.data.address.state, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
          setHasCnpj(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        clearFields();
  
        toast({
          title: "Não foi localizar este CNPJ",
          description:
            "O CNPJ informado não é válido." +
            "\nEntre em contato com o suporte.",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }
    }
  
    async function handleSaveCompany(data: FormData) {
      console.log(data);
    }
  
    return (
      // convert all declarative tags in components
      <Box
        marginLeft="40px"
        minHeight="800px"
        as="form"
        noValidate
        onSubmit={handleSubmit(handleSaveCompany)}
      >
        {/* convert to breadcrumb */}
        <Flex
          direction="row"
          fontStyle="normal"
          fontWeight="400"
          fontSize="11px"
          lineHeight="150%"
          color="#718096"
          marginTop="30px"
        >
          <Text>Você está aqui: </Text>
          <Text fontWeight="bold">Cadastro da oficina</Text>
        </Flex>
        <Box>
          {/* to do - create a component title */}
          <Text
            fontStyle="normal"
            fontWeight="700"
            fontSize="30px"
            lineHeight="120%"
            color="#3333ff"
            marginTop="15px"
          >
            Cadastro da oficina
          </Text>
        </Box>
        <Flex
          width="98%"
          boxShadow="md"
          background="#fff"
          marginTop="30px"
          padding={6}
          borderRadius="15px"
          direction="column"
        >
          {/* to do subtitle component */}
          <Text
            fontStyle="normal"
            fontWeight="600"
            fontSize="20px"
            lineHeight="132%"
            color="#718096"
          >
            Identificação da oficina
          </Text>
          <Box marginTop="40px">
            <Flex direction="column" width="100%">
              <Box width="25%">
                <Input
                  type="string"
                  label="CNPJ"
                  value={maskedCNPJ}
                  placeholder="__.___.___/____-__"
                  {...register("cpf_cnpj", {
                    onChange: e => handleChange(e),
                    onBlur: e => handleCnpj(e),
                  })}
                  required
                  size="lg"
                  fontWeight="bold"
                  error={errors.cpf_cnpj}
                />
              </Box>
              <Box width="100%">
                <SimpleGrid
                  minChildWidth={{ sm: "240px", md: "240px", lg: "280px" }}
                  spacing={6}
                  marginBottom="20px"
                  marginTop="20px"
                >
                  <Input
                    type="text"
                    label="Razão social"
                    placeholder="Digite aqui"
                    {...register("social_reason")}
                    size="md"
                    required
                    error={errors.social_reason}
                  />
                  <Input
                    type="text"
                    label="Nome fantasia"
                    placeholder="Digite aqui"
                    {...register("fantasy_name")}
                    size="md"
                    error={errors.fantasy_name}
                  />
                  <Input
                    type="text"
                    label="Telefone"
                    value={maskedTelephone1}
                    placeholder="(__)____-____"
                    {...register("telephone1", {
                      onChange: e => handleChangeTelephone1(e),
                    })}
                    size="md"
                    required
                    error={errors.telephone_1}
                  />
                  <Input
                    type="text"
                    label="Celular"
                    value={maskedTelephone2}
                    placeholder="(__)____-____"
                    {...register("telephone2", {
                      onChange: e => handleChangeTelephone2(e),
                    })}
                    size="md"
                    error={errors.telephone_2}
                  />
                  <Input
                    type="text"
                    label="Email"
                    value={companyEmail}
                    placeholder="Digite aqui"
                    {...register("email")}
                    size="md"
                    required
                    error={errors.email}
                  />
                  <Input
                    type="text"
                    label="Site"
                    placeholder="Digite aqui"
                    {...register("site")}
                    size="md"
                    error={errors.site}
                  />
                </SimpleGrid>
                <Divider />
                <Box width="25%" marginTop="20px">
                  <Input
                    type="text"
                    label="CEP"
                    placeholder="__.___/___"
                    value={maskedZipCode}
                    {...register("zip_code", {
                      onChange: e => handleChangeZipCode(e),
                    })}
                    size="lg"
                    fontWeight="bold"
                    error={errors.zip_code}
                  />
                </Box>
                <SimpleGrid
                  minChildWidth={{ sm: "240px", md: "320px", lg: "360px" }}
                  spacing={6}
                  marginBottom="20px"
                  marginTop="20px"
                >
                  <Input
                    type="text"
                    label="Endereço"
                    placeholder="Digite aqui"
                    {...register("address")}
                    size="lg"
                    error={errors.address}
                  />
                  <Input
                    type="text"
                    label="Número"
                    placeholder="Digite aqui"
                    {...register("address_number")}
                    size="lg"
                    error={errors.address_number}
                  />
                  <Input
                    type="text"
                    label="Complemento"
                    placeholder="Digite aqui"
                    {...register("complement")}
                    size="lg"
                    error={errors.complement}
                  />
                  <Input
                    type="text"
                    label="Bairro"
                    placeholder="Digite aqui"
                    {...register("district")}
                    size="lg"
                    error={errors.district}
                  />
                  <Input
                    type="text"
                    label="Cidade"
                    placeholder="Digite aqui"
                    {...register("city")}
                    size="lg"
                    error={errors.city}
                  />
                  <Input
                    type="text"
                    label="Estado"
                    placeholder="Digite aqui"
                    {...register("state")}
                    size="lg"
                    error={errors.state}
                  />
                </SimpleGrid>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex width="98%" justifyContent="flex-end">
          <Button
            colorScheme="blue"
            marginTop="30px"
            marginBottom="30px"
            type="submit"
          >
            Gravar
          </Button>
        </Flex>
      </Box>
    );
  };
  
  export default WorkshopArea;
  