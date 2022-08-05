import {
    Box,
    Button,
    Flex,
    SimpleGrid,
    Text,
    Spacer,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { Column } from "react-table";
import { Select } from "../components/Form/Select";
import { Datepicker } from "../components/Form/Datepicker";
import { DataTable } from "../components/Table/index";
import ApexChart from "../components/Chart/index";
import { ChartData } from "../components/Chart/types";

interface DataInterface {
    date: string;
    receipt: string;
    payment: string;
    balance: string;
}

export default function Cash() {
    const [pageSize, setPageSize] = useState<number>(3);
    const [category, setCategory] = useState<string>("Vendas");
    const [date, setDate] = useState<Date>(new Date());
    const chartData: ChartData = {
        labels: [
            new Date("2021-01-01T14:00:00.000Z"),
            new Date("2021-01-29T14:00:00.000Z"),
            new Date("2021-03-04T14:00:00.000Z"),
            new Date("2021-03-20T14:00:00.000Z"),
            new Date("2021-05-01T14:00:00.000Z"),
            new Date("2021-05-18T14:00:00.000Z")
        ],
        series: [
            {
                label: "Pagamentos",
                color: "#EF3226",
                values: [15, 20, 25, 23, 18, 10]
            },
            {
                label: "Recebimentos",
                color: "#10D482",
                values: [3.5, 10.5, 14.443, 20, 29, 40]
            }
        ]
    };
    const interval = {
        start: new Date("2021-01-01T00:00:00.000Z"),
        end: new Date("2021-12-31T23:59:59.000Z")
    };
    const columns: Array<Column<DataInterface>> = useMemo(
        () => [
            {
                Header: "DATA",
                accessor: "date",
            },
            {
                Header: "RECEBIMENTOS",
                accessor: "receipt",
            },
            {
                Header: "PAGAMENTOS",
                accessor: "payment",
            },
            {
                Header: "SALDO",
                accessor: "balance",
            },
        ],
        []
    )

    const data: Array<DataInterface> = useMemo(
        () => [
            {
                date: "14/01/2022",
                receipt: "R$ 0,00",
                payment: "R$ 0,00",
                balance: "R$130,00",
            },
            {
                date: "14/01/2022",
                receipt: "R$ 0,00",
                payment: "R$ 0,00",
                balance: "R$130,00",
            },
            {
                date: "14/01/2022",
                receipt: "R$ 0,00",
                payment: "R$ 0,00",
                balance: "R$130,00",
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
                <Text fontWeight="bold">Financeiro / Fluxo de caixa</Text>
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
                paddingBottom={10}
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
                        Fluxo de caixa
                    </Text>
                </Flex>
                <Flex
                    bgColor="#EEEEEE"
                    px={10}
                    paddingTop={3}
                    paddingBottom={5}
                    borderRadius={8}
                    mt={8}
                    mb={10}
                >
                    <SimpleGrid
                        minChildWidth={{ sm: "240px", md: "240px", lg: "240px" }}
                        spacing={6}
                        width="50%"
                    >
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
                    >
                        Filtrar
                    </Button>
                </Flex>
                <ApexChart chartData={chartData} interval={interval} />
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
                    marginBottom={6}
                >
                    Total do período (01/09/2020 - 31/01/2022)
                </Text>

                <Flex>
                    <Spacer />
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
                    <DataTable columns={columns} data={data} pageSize={pageSize} />
                </Flex>
            </Flex>
        </Box>
    );
}
