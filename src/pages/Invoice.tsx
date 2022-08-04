import {
    Box,
    Button,
    Flex,
    SimpleGrid,
    Text,
    Spacer,
    Image,
    CheckboxGroup,
    Checkbox,
    Stack,
    Link,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { Column } from "react-table";
import { Input } from "../components/Form/Input";
import { Datepicker } from "../components/Form/Datepicker";
import { DataTable } from "../components/Table/index";

interface DataInterface {
    type: string;
    series: string;
    number: number;
    budget: number;
    client: string;
    cnpj: string;
    value: string;
    date: string;
    status: string;
    actions: string;
}

export default function Invoice() {
    const [checkedItems, setCheckedItems] = useState<boolean[]>([true, true, true]);
    const [status, setStatus] = useState<string[]>(["Autorizada", "Cancelada", "Salva"]);
    const [date, setDate] = useState<Date>(new Date());
    const columns: Array<Column<DataInterface>> = useMemo(
        () => [
            {
                Header: "TIPO",
                accessor: "type",
            },
            {
                Header: "SÉRIE",
                accessor: "series",
            },
            {
                Header: "NÚMERO",
                accessor: "number",
            },
            {
                Header: "ORÇAMENTO",
                accessor: "budget",
            },
            {
                Header: "CLIENTE",
                accessor: "client",
            },
            {
                Header: "CNPJ/CPF",
                accessor: "cnpj",
            },
            {
                Header: "VALOR",
                accessor: "value",
            },
            {
                Header: "DATA",
                accessor: "date",
            },
            {
                Header: "STATUS",
                accessor: "status",
            },
            {
                Header: "AÇÕES",
                accessor: "actions"
            },
        ],
        []
    )

    const data: Array<DataInterface> = useMemo(
        () => [
            {
                type: "product",
                series: "S2",
                number: 9002,
                budget: 41,
                client: "Neilor Jobs",
                cnpj: "037.674.446-40",
                value: "R$130,00",
                date: "01/01/2022",
                status: "Salva",
                actions: "yellow"
            },
            {
                type: "product",
                series: "S2",
                number: 9002,
                budget: 41,
                client: "Neilor Jobs",
                cnpj: "037.674.446-40",
                value: "R$130,00",
                date: "01/01/2022",
                status: "Autorizada",
                actions: "green"
            },
            {
                type: "service",
                series: "S2",
                number: 9002,
                budget: 41,
                client: "Neilor Jobs",
                cnpj: "037.674.446-40",
                value: "R$130,00",
                date: "01/01/2022",
                status: "Cancelada",
                actions: "green"
            },
            {
                type: "service",
                series: "S2",
                number: 9002,
                budget: 41,
                client: "Neilor Jobs",
                cnpj: "037.674.446-40",
                value: "R$130,00",
                date: "01/01/2022",
                status: "Salva",
                actions: "yellow"
            },
        ],
        []
    )

    return (
        <Box
            marginLeft="40px"
            minHeight="800px"
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
                <Text fontWeight="bold"> Financeiro / Notas fiscais</Text>
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
                padding={6}
                borderRadius="15px"
                direction="column"
            >
                <Flex>
                    <Text
                        fontStyle="normal"
                        fontWeight="600"
                        fontSize="20px"
                        lineHeight="132%"
                        color="#000"
                    >
                        Notas fiscais
                    </Text>
                    <Spacer />
                    <Link href="/invoice/#" _hover={{ textDecoration: "none" }} marginEnd={6}>
                        <Button
                            borderRadius="6px"
                            border="1px dashed #D8D8D8"
                            color="#718096"
                            colorScheme="whiteAlpha"
                            fontSize="13px"
                            fontWeight="500"
                            lineHeight="17.16px"
                            p={[3, 2]}
                        >
                            <Image boxSize="20px" mr={2} src="assets/images/icons/product-gray.png" alt="add" />
                            Emissão NF produtos
                        </Button>
                    </Link>
                    <Link href="/invoice/#" _hover={{ textDecoration: "none" }}>
                        <Button
                            borderRadius="6px"
                            border="1px dashed #D8D8D8"
                            color="#718096"
                            colorScheme="whiteAlpha"
                            fontSize="13px"
                            fontWeight="500"
                            lineHeight="17.16px"
                            p={[3, 2]}
                        >
                            <Image boxSize="20px" mr={2} src="assets/images/icons/service-gray.png" alt="add" />
                            Emissão NF serviços
                        </Button>
                    </Link>
                </Flex>
                <Flex
                    mt={8}>
                    <Spacer />
                    <CheckboxGroup>
                        <Stack spacing={7} paddingEnd={7} direction={["column", "row"]}>
                            <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={(e) => {
                                    setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2]]);
                                    (e.target.checked === true) ? setStatus(["Autorizada", status[1], status[2]]) :
                                        setStatus(["", status[1], status[2]]);
                                }}
                                size="lg"
                            >
                                Autorizada
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => {
                                    setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2]]);
                                    (e.target.checked === true) ? setStatus([status[0], "Cancelada", status[2]]) :
                                        setStatus([status[0], "", status[2]]);
                                }}
                                size="lg"
                            >
                                Cancelada
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[2]}
                                onChange={(e) => {
                                    setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked]);
                                    (e.target.checked === true) ? setStatus([status[0], status[1], "Salva"]) :
                                        setStatus([status[0], status[1], ""]);
                                }}
                                size="lg"
                            >
                                Salva
                            </Checkbox>
                        </Stack>
                    </CheckboxGroup>
                </Flex>
                <Flex
                    bgColor="#EEEEEE"
                    px={10}
                    paddingTop={3}
                    paddingBottom={5}
                    borderRadius={8}
                    my={4}
                >
                    <SimpleGrid
                        minChildWidth={{ sm: "240px", md: "240px", lg: "240px" }}
                        spacing={6}
                        width="85%"
                    >
                        <Input
                            name="thermos"
                            label="Termo:"
                            placeholder="Digite aqui"
                            size="lg"
                        />
                        <Input
                            name="number"
                            label="Número:"
                            placeholder="Digite aqui"
                            size="lg"
                        />
                        <Datepicker
                            name="date-input"
                            date={date}
                            onDateChange={(e) => {
                                setDate(e);
                            }}
                            label="Data:"
                            size="lg"
                        />
                    </SimpleGrid>
                    <Button
                        colorScheme="blue"
                        marginTop="30px"
                        size="lg"
                        width="100px"
                        marginStart={6}
                    >
                        Filtrar
                    </Button>
                </Flex>
                <Flex>
                    <DataTable columns={columns} data={data} pageSize={4} status={status} />
                </Flex>
            </Flex>
        </Box>
    );
}
