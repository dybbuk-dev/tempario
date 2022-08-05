import { useCallback, useEffect } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableProps,
  Checkbox,
  Flex,
  Icon,
  Button,
  Image,
} from "@chakra-ui/react"
import {
  Row,
  IdType,
  Column,
  useTable,
  useSortBy,
  useRowSelect,
  UseRowSelectInstanceProps,
  UseRowSelectRowProps,
  usePagination,
  useGlobalFilter,
} from "react-table"

export type DataTableProps<TableItem extends object> = {
  columns: Column<TableItem>[];
  data: TableItem[];
  pageSize: number;
  selection?: boolean;
  status?: string[];
  costCenter?: string;
  category?: string;
  date?: Date;
} & TableProps;

export function DataTable<TableItem extends object>({
  columns,
  data,
  pageSize,
  status,
  costCenter,
  selection,
  category,
  date,
  ...TableProps
}: DataTableProps<TableItem>) {

  const statusGlobalFilterFunction = useCallback(
    (rows: Row<TableItem>[], ids: IdType<TableItem>[], status: string[]) => {
      return rows.filter(
        (row) => (
          (status[0] !== "" ? row.values["status"].includes(status[0]) : null) ||
          (status[1] !== "" ? row.values["status"].includes(status[1]) : null) ||
          (status[2] !== "" ? row.values["status"].includes(status[2]) : null)
        )
      );
    },
    []
  );

  const generalGlobalFunction = useCallback(
    (rows: Row<TableItem>[], ids: IdType<TableItem>[]) => {
      return rows.filter(
        (row) => row.values
      );
    },
    []
  );

  const modalGlobalFilterFunction = useCallback(
    (rows: Row<TableItem>[], ids: IdType<TableItem>[], filters: { costCenter: string, category: string, date: Date }) => {
      const day: string = String(filters.date.getDay()).padStart(2, "0");
      const month: string = String(filters.date.getMonth() + 1).padStart(2, "0");
      const year: string = String(filters.date.getFullYear());
      const dateString: string = day + "/" + month + "/" + year;
      return rows.filter(
        (row) => (
          row.values["costCenter"].includes(filters.costCenter) &&
          row.values["category"].includes(filters.category) &&
          row.values["date"].includes(dateString)
        )
      );
    },
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      globalFilter: status ? statusGlobalFilterFunction : costCenter ? modalGlobalFilterFunction : generalGlobalFunction
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      selection && selection === true ?
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            width: '0.1%',
            Header: ({
              isAllRowsSelected,
              selectedFlatRows,
              toggleAllRowsSelected,
            }: UseRowSelectInstanceProps<TableItem>) => (
              <Checkbox
                label=""
                isChecked={isAllRowsSelected}
                onChange={(e) => toggleAllRowsSelected(e.target.checked)}
              />
            ),
            Cell: ({ row: { isSelected, toggleRowSelected } }: { row: UseRowSelectRowProps<TableItem> }) => {
              return <Checkbox isChecked={isSelected} onChange={(e) => toggleRowSelected(e.target.checked)} />;
            },
          },
          ...columns,
        ]) :
        hooks.visibleColumns.push((columns) => [...columns]);
    }
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
    setGlobalFilter
  } = tableInstance;

  useEffect(() => {
    setPageSize(pageSize);
  }, [pageSize, setPageSize]);

  useEffect(() => {
    status ? setGlobalFilter(status) : costCenter ? setGlobalFilter({ costCenter, category, date }) : setGlobalFilter(true);
  }, [status, costCenter, category, date, setGlobalFilter]);

  return (
    <TableContainer
      width="100%"
      my="30px"
      mx="0"
    >
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <Th
                  color="#41556F"
                  fontSize="13px"
                  fontWeight="700"
                  {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map(
            (row, i) => {
              prepareRow(row);
              return (
                <Tr
                  fontSize="14px"
                  fontWeight="400"
                  {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    if (cell.column.Header === "STATUS" && selection === true) {
                      return (
                        <Td {...cell.getCellProps()}>
                          <Flex align='center'>
                            <Icon
                              w='20px'
                              h='20px'
                              me='5px'
                              color={
                                cell.value === "Paga" || cell.value === "Recebida"
                                  ? "#10D482"
                                  : cell.value === "Em atraso"
                                    ? "#EF3226"
                                    : cell.value === "A pagar" || cell.value === "A receber"
                                      ? "#EFDB26"
                                      : "white"
                              }
                              viewBox='0 0 200 200'
                            >
                              <path
                                fill='currentColor'
                                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                              />
                            </Icon>
                            {cell.value}
                            <Button
                              borderRadius="6px"
                              border="1px dashed #D8D8D8"
                              backgroundColor="white"
                              minW="20px"
                              width="20px"
                              height="20px"
                              padding="0"
                              marginStart="6px"
                            >
                              <Image src="assets/images/icons/pencil-small.png" boxSize="12px" alt="edit" />
                            </Button>
                          </Flex>
                        </Td>
                      )
                    } else if (cell.column.Header === "TIPO") {
                      return (
                        <Td {...cell.getCellProps()} padding={2}>
                          <Flex justifyContent="center">
                            <Button
                              border="none"
                              padding="0"
                              backgroundColor="transparent"
                            >
                              {cell.value === "product" ? (
                                <Image src="assets/images/icons/product.png" boxSize="21px" alt="edit" />
                              ) : cell.value === "service" ? (
                                <Image src="assets/images/icons/service.png" boxSize="21px" alt="edit" />
                              ) : null}

                            </Button>
                          </Flex>
                        </Td>
                      );
                    } else if (cell.column.Header === "AÇÕES") {
                      return (
                        <Td {...cell.getCellProps()} padding={2}>
                          <Flex>
                            {cell.value === "yellow" ? (
                              <Button
                                border="none"
                                padding="0"
                                backgroundColor="transparent"
                                marginEnd="2px"
                              >
                                <Image src="assets/images/icons/usd-yellow.png" boxSize="21px" alt="edit" />
                              </Button>
                            ) : cell.value === "green" ? (
                              <Button
                                border="none"
                                padding="0"
                                backgroundColor="transparent"
                                marginEnd="2px"
                              >
                                <Image src="assets/images/icons/usd-green.png" boxSize="21px" alt="edit" />
                              </Button>
                            ) : null}
                            <Button
                              border="none"
                              padding="0"
                              backgroundColor="transparent"
                              marginEnd="2px"
                            >
                              <Image src="assets/images/icons/pencil.png" boxSize="21px" alt="edit" />
                            </Button>
                            <Button
                              border="none"
                              padding="0"
                              backgroundColor="transparent"
                            >
                              <Image src="assets/images/icons/trash.png" boxSize="21px" alt="delete" />
                            </Button>
                          </Flex>
                        </Td>
                      )
                    } else {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                      )
                    }
                  })}
                </Tr>
              )
            }
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

