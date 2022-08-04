import {
    Box,
    Button,
    Divider,
    Flex,
    SimpleGrid,
    Text,
    Checkbox
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";
import { Select } from "../components/Form/Select";
import { Datepicker } from "../components/Form/Datepicker";
import FileUpload from "../components/Form/FileUpload";

interface FormData {
    description: string;
    category: string;
    provider?: string;
    account?: string;
    competenceDate: Date;
    expirationDate: Date;
    value: string;
    paymentInstallment?: string;
    repetitionsNumber?: number;
    payment?: boolean;
    paymentDate?: Date;
    fee?: string;
    interest?: string;
    paymentMethod?: string;
    paidAmount?: string;
}

const AddPayment: React.FC = () => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const [competenceDate, setCompetenceDate] = useState<Date>(new Date());
    const [expirationDate, setExpirationDate] = useState<Date>(new Date());
    const [paymentDate, setPaymentDate] = useState<Date>(new Date());
    const [payment, setPayment] = useState<boolean>(false);
    const addPayment = (data: FormData) => console.log(data);

    return (
        <Box
            marginLeft="40px"
            minHeight="800px"
            as="form"
            marginBottom={6}
            noValidate
            onSubmit={handleSubmit(addPayment)}
        >
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
                <Text textDecoration="underline">Financeiro / Contas a pagar</Text>
                <Text> &gt; </Text>
                <Text fontWeight="bold">Adicionar pagamento</Text>
            </Flex>
            <Box>
                <Text
                    fontStyle="normal"
                    fontWeight="700"
                    fontSize="30px"
                    lineHeight="120%"
                    color="#3333ff"
                    marginTop="15px"
                >
                    Financeiro
                </Text>
            </Box>
            <Flex
                width="98%"
                boxShadow="md"
                background="#fff"
                marginTop="30px"
                paddingTop={6}
                paddingX={6}
                paddingBottom={0}
                borderRadius="15px"
                direction="column"
            >
                <Flex
                    direction="row"
                    fontStyle="normal"
                    fontWeight="400"
                    fontSize="20px"
                    lineHeight="132%"
                    color="black">
                    <Text textDecoration="underline">Contas a pagar</Text>
                    <Text> &gt; </Text>
                    <Text
                        fontWeight="600"
                    >
                        Adicionar pagamento
                    </Text>
                </Flex>
                <Text
                    color="#E53E3E"
                    fontStyle="italic"
                    fontWeight="500"
                    fontSize="12px"
                    lineHeight="132%"
                    marginTop="40px"
                >*Dados obrigatórios</Text>
                <Box>
                    <Flex direction="column" width="100%">
                        <Box width="100%">
                            <SimpleGrid
                                minChildWidth={{ sm: "240px", md: "280px", lg: "360px", xl: "400px"}}
                                spacingX={{ sm: 10, md: 20, lg: 32, xl: 40}}
                                spacingY={8}
                                marginBottom="40px"
                                marginTop="30px"
                            >
                                <Input
                                    type="text"
                                    label="Descrição:"
                                    placeholder="Digite aqui"
                                    {...register("description", { required: true, maxLength: 18 })}
                                    size="md"
                                    required
                                    error={errors.description}
                                />
                                <Select
                                    label="Categoria:"
                                    values={["Água"]}
                                    {...register("category", { required: true })}
                                    size="md"
                                    required
                                    error={errors.category}
                                />
                                <Select
                                    label="Fornecedor:"
                                    values={["agência"]}
                                    {...register("provider")}
                                    size="md"
                                    error={errors.provider}
                                />
                                <Select
                                    label="Conta:"
                                    values={["Administrativo"]}
                                    {...register("account")}
                                    size="md"
                                    error={errors.account}
                                />
                                <Datepicker
                                    label="Data Competência:"
                                    date={competenceDate}
                                    onDateChange={(e) => {
                                        setCompetenceDate(e);
                                    }}
                                    {...register("competenceDate", { required: true })}
                                    required
                                    size="md"
                                />
                                <Datepicker
                                    label="Data Vencimento:"
                                    date={expirationDate}
                                    onDateChange={(e) => {
                                        setExpirationDate(e);
                                    }}
                                    {...register("expirationDate", { required: true })}
                                    required
                                    size="md"
                                />
                                <Input
                                    type="text"
                                    label="Valor:"
                                    placeholder="Digite aqui"
                                    {...register("value", { required: true, maxLength: 18 })}
                                    size="md"
                                    required
                                    error={errors.value}
                                />
                            </SimpleGrid>
                            <Divider />
                            <SimpleGrid
                                minChildWidth={{ sm: "240px", md: "280px", lg: "360px", xl: "400px"}}
                                spacingX={{ sm: 10, md: 20, lg: 32, xl: 40}}
                                spacingY={8}
                                marginBottom="30px"
                                marginTop="30px"
                            >
                                <Select
                                    label="Pagamento parcelado:"
                                    values={["Paypal", "Cartão de débito", "Cartão de crédito"]}
                                    {...register("paymentInstallment")}
                                    size="md"
                                    error={errors.address}
                                />
                                <Box>
                                    <Input
                                        type="text"
                                        label="Quantidade de repetições:"
                                        placeholder="Digite aqui"
                                        {...register("repetitionsNumber")}
                                        size="md"
                                        maxW="150px"
                                        error={errors.repetitionsNumber}
                                    />
                                </Box>
                            </SimpleGrid>
                            <Divider />
                            <Box marginY="30px">
                                <Checkbox
                                    color="#718096"
                                    isChecked={payment}
                                    {...register("payment", {
                                        onChange: e => setPayment(e.target.checked)
                                    })}
                                    size="md"
                                    error={errors.payment}
                                >
                                    Pago
                                </Checkbox>
                            </Box>
                            <SimpleGrid
                                minChildWidth={{ sm: "240px", md: "280px", lg: "360px", xl: "400px"}}
                                spacingX={{ sm: 10, md: 20, lg: 32, xl: 40}}
                                spacingY={8}
                                marginBottom="30px"
                            >
                                <Datepicker
                                    label="Data pagamento:"
                                    date={paymentDate}
                                    onDateChange={(e) => {
                                        setPaymentDate(e);
                                    }}
                                    {...register("paymentDate")}
                                    size="md"
                                />
                                <Input
                                    type="text"
                                    label="Desconto / Taxas:"
                                    placeholder="Digite aqui"
                                    {...register("fee", { maxLength: 18 })}
                                    size="md"
                                    error={errors.fee}
                                />
                                <Input
                                    type="text"
                                    label="Juros / Multas:"
                                    placeholder="Digite aqui"
                                    {...register("interest", { maxLength: 18 })}
                                    size="md"
                                    error={errors.interest}
                                />
                                <Select
                                    label="Forma de pagamento:"
                                    values={["pagamento"]}
                                    {...register("paymentMethod")}
                                    size="md"
                                    error={errors.paymentMethod}
                                />
                                <Input
                                    type="text"
                                    label="Valor Pago:"
                                    placeholder="Digite aqui"
                                    {...register("paidAmount", { maxLength: 18 })}
                                    size="md"
                                    error={errors.paidAmount}
                                />
                            </SimpleGrid>
                            <FileUpload
                                label="Anexo:"
                                accept="image/*"
                                multiple
                                register={register("file_")}
                            >
                                <Button
                                    color="blue"
                                    backgroundColor="transparent"
                                    _hover={{ border: "none" }}
                                    _focus={{ border: "none" }}
                                    fontSize="12px"
                                    fontWeight={600}
                                >
                                    + ADICIONAR ANEXO
                                </Button>
                            </FileUpload>
                            <Button
                                colorScheme="blue"
                                marginTop="30px"
                                marginBottom="30px"
                                type="submit"
                            >
                                Salvar
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default AddPayment;
