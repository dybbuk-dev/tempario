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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Grid,
    GridItem,
    Link,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { Column } from "react-table";
import { Select } from "../components/Form/Select";
import { Input } from "../components/Form/Input";
import { Datepicker } from "../components/Form/Datepicker";
import { DataTable } from "../components/Table/index";

interface DataInterface {
    date: string;
    status: string;
    category: string;
    costCenter: string;
    value: string;
    installment: string;
    actions: string;
}

export default function Receive() {
    const [pageSize, setPageSize] = useState<number>(3);
    const [checkedItems, setCheckedItems] = useState<boolean[]>([true, true, true]);
    const [status, setStatus] = useState<string[]>(["A receber", "Recebida", "Em atraso"]);
    const [costCenter, setCostCenter] = useState<string>("");
    const [category, setCategory] = useState<string>("Água");
    const [date, setDate] = useState<Date>(new Date());
    const { isOpen, onOpen, onClose } = useDisclosure()
    const columns: Array<Column<DataInterface>> = useMemo(
        () => [
            {
                Header: "VENCIMENTO",
                accessor: "date",
            },
            {
                Header: "STATUS",
                accessor: "status",
            },
            {
                Header: "CATEGORIA",
                accessor: "category",
            },
            {
                Header: "CENTRO DE CUSTOS",
                accessor: "costCenter",
            },
            {
                Header: "VALOR",
                accessor: "value",
            },
            {
                Header: "PARCELAS",
                accessor: "installment",
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
                date: "02/08/2022",
                status: "Recebida",
                category: "Vendas",
                costCenter: "Administrativo",
                value: "R$130,00",
                installment: "1/5",
                actions: "",
            },
            {
                date: "03/08/2022",
                status: "Recebida",
                category: "Vendas",
                costCenter: "Administrativo",
                value: "R$890,00",
                installment: "2/1",
                actions: "",
            },
            {
                date: "16/01/2022",
                status: "A receber",
                category: "Vendas",
                costCenter: "Administrativo",
                value: "R$984,00",
                installment: "3/1",
                actions: "",
            },
            {
                date: "17/01/2022",
                status: "A receber",
                category: "Vendas",
                costCenter: "Administrativo",
                value: "R$345,00",
                installment: "2/2",
                actions: "",
            },
            {
                date: "18/01/2022",
                status: "Em atraso",
                category: "Vendas",
                costCenter: "Administrativo",
                value: "R$900,00",
                installment: "1/3",
                actions: "",
            },
            {
                date: "19/01/2022",
                status: "Em atraso",
                category: "Vendas",
                costCenter: "Administrativo",
                value: "R$120,00",
                installment: "1/2",
                actions: "",
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
                <Text fontWeight="bold">Financeiro / Contas a receber</Text>
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
                        Contas a receber
                    </Text>
                    <Spacer />
                    <Link href="/receive/create" _hover={{ textDecoration: "none" }}>
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
                            <Image boxSize="20px" mr={2} src="assets/images/icons/add.png" alt="add" />
                            Adicionar pagamento
                        </Button>
                    </Link>
                </Flex>
                <Flex
                    bgColor="#EEEEEE"
                    px={10}
                    paddingTop={3}
                    paddingBottom={5}
                    borderRadius={8}
                    my={8}
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
                            value={costCenter}
                            onChange={(e) => {
                                setCostCenter(e.target.value);
                            }}
                        />
                        <Select
                            name="categry"
                            label="Categoria:"
                            size="lg"
                            values={["Vendas"]}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
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
                        onClick={onOpen}
                    >
                        Filtrar
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader fontSize="4xl" fontWeight="700" textAlign="center" marginTop="6">A pagar - Parcelas</ModalHeader>
                            <ModalCloseButton fontSize="24px" color="#3333FF" top="20px" right="25px" />
                            <ModalBody>
                                <Flex direction="column">
                                    <Box width="200px">
                                        <Select
                                            name="actions"
                                            size="lg"
                                            width="100%"
                                            values={["editar", "excluir"]}
                                        />
                                    </Box>
                                    <DataTable columns={columns} data={data} pageSize={pageSize} costCenter={costCenter} category={category} date={date} />
                                </Flex>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>
                <Flex>
                    <Box width="200px">
                        <Select
                            name="actions"
                            size="lg"
                            width="100%"
                            values={["editar", "excluir"]}
                        />
                    </Box>
                    <Spacer />
                    <CheckboxGroup>
                        <Stack spacing={7} paddingEnd={7} direction={["column", "row"]}>
                        <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={(e) => {
                                    setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2]]);
                                    (e.target.checked === true) ? setStatus(["A receber", status[1], status[2]]) :
                                    setStatus(["", status[1], status[2]]);
                                }}
                                size="lg"
                            >
                                A receber
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => {
                                    setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2]]);
                                    (e.target.checked === true) ? setStatus([status[0], "Recebida", status[2]]) :
                                    setStatus([status[0], "", status[2]]);
                                }}
                                size="lg"
                            >
                                Recebidas
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[2]}
                                onChange={(e) => {
                                    setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked]);
                                    (e.target.checked === true) ? setStatus([status[0], status[1], "Em atraso"]) :
                                    setStatus([status[0], status[1], ""]);
                                }}
                                size="lg"
                            >
                                Em atraso
                            </Checkbox>
                        </Stack>
                    </CheckboxGroup>
                    <Box width="200px">
                        <Select
                            name="pagination"
                            size="lg"
                            width="100%"
                            onChange={(e) => {
                                setPageSize(Number(e.target.value))
                            }}
                            values={[3, 5, 10, 25]}
                            placeholder=" por página"
                        />
                    </Box>
                </Flex>
                <Flex>
                    <DataTable columns={columns} data={data} pageSize={pageSize} status={status} />
                </Flex>
            </Flex>
            <Flex
                width="98%"
                boxShadow="md"
                background="#fff"
                marginTop="40px"
                padding={6}
                borderRadius="15px"
                direction="column"
                marginBottom="20px"
            >
                <Text
                    fontStyle="normal"
                    fontWeight="600"
                    fontSize="20px"
                    lineHeight="132%"
                    color="#718096"
                >
                    Total do período (01/09/2020 - 31/01/2022)
                </Text>
                <Grid
                    fontSize="16px"
                    marginTop="50px"
                    templateColumns="repeat(8, 1fr)"
                    templateRows="repeat(4, 1fr)"
                    gap={3}
                    marginBottom="8px"
                >
                    <GridItem colSpan={3} rowSpan={1}>
                        <Text fontWeight="400" color="#718096">Pagas:</Text>
                        <Text fontWeight="600">R$ 1.000,00</Text>
                    </GridItem>
                    <GridItem colSpan={5} rowSpan={1}>
                        <Text fontWeight="400" color="#718096">Número de lançamentos:</Text>
                        <Text fontWeight="600">1</Text>
                    </GridItem>
                    <GridItem colSpan={3} rowSpan={1}>
                        <Text fontWeight="400" color="#718096">A pagar:</Text>
                        <Text fontWeight="600">R$ 0,00</Text>
                    </GridItem>
                    <GridItem colSpan={5} rowSpan={1}>
                        <Text fontWeight="400" color="#718096">Número de lançamentos selecionados:</Text>
                        <Text fontWeight="600">0</Text>
                    </GridItem>
                    <GridItem colSpan={3} rowSpan={1}>
                        <Text fontWeight="400" color="#718096">Vencidas:</Text>
                        <Text fontWeight="600">R$ 0,00</Text>
                    </GridItem>
                    <GridItem colSpan={5} rowSpan={1}>
                        <Text fontWeight="400" color="#718096">Total de lançamentos selecionados:</Text>
                        <Text fontWeight="600">R$ 0,00</Text>
                    </GridItem>
                    <GridItem colSpan={3} rowSpan={1}>
                        <Text fontWeight="400" color="#718096">Total de pagamentos:</Text>
                        <Text fontWeight="600">R$ 1.000,00</Text>
                    </GridItem>
                </Grid>
            </Flex>
        </Box>
    );
}
