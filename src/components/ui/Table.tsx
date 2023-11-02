import {useState} from "react";

//===== libraries =====//
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import SimpleBar from "simplebar-react";
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    IconButton,
    Stack,
    Box
} from "@mui/material";
import {FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp} from "react-icons/fi";
const TablePaginationActions = ({count, page, rowsPerPage, onPageChange}) => {

    const handleBackButtonClick = (event: any) => onPageChange(event, page - 1);
    const handleNextButtonClick = (event: any) => onPageChange(event, page + 1);

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{marginRight: 8}}
        >

            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
            >
                <FiChevronRight size={20}/>
            </IconButton>

            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                <FiChevronLeft size={20}/>
            </IconButton>

        </Stack>
    )
}

const Table = ({data, columns}) => {

    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {sorting},
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const {pageSize, pageIndex} = table.getState().pagination;

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="end"
            width="100%"
            gap={2}
        >

            <SimpleBar
                autoHide={false}
                style={{width: "100%"}}
            >

                <TableContainer
                    component="table"
                    style={{borderRadius: 8}}
                >

                    <TableHead>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                    <TableRow key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map(header => (
                                                    <TableCell
                                                        key={header.id}
                                                        style={{
                                                            minWidth: header.column.columnDef?.width,
                                                            maxWidth: header.column.columnDef?.width,
                                                            width: header.column.columnDef?.width,
                                                        }}
                                                    >
                                                        <Box
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "start",
                                                                alignItems: "center",
                                                                cursor: header.column.getCanSort() ? "pointer" : "default"
                                                            }}
                                                            {...{onClick: header.column.getToggleSortingHandler()}}
                                                        >

                                                            {
                                                                header.isPlaceholder ? null : flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )
                                                            }
                                                            {
                                                                {
                                                                    asc: <FiChevronUp
                                                                        size={16}
                                                                        color="#1f2937"
                                                                        style={{marginRight: 8}}
                                                                    />,
                                                                    desc: <FiChevronDown
                                                                        size={16}
                                                                        color="#1f2937"
                                                                        style={{marginRight: 8}}
                                                                    />,
                                                                }
                                                                    [header.column.getIsSorted() as string] ?? null
                                                            }
                                                        </Box>
                                                    </TableCell>
                                                )
                                            )
                                        }
                                    </TableRow>
                                )
                            )
                        }
                    </TableHead>

                    <TableBody>
                        {
                            table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id}>
                                        {
                                            row.getVisibleCells().map(cell => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                )
                                            )
                                        }
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>

                </TableContainer>

            </SimpleBar>

            <TablePagination
                labelRowsPerPage="نمایش :"
                labelDisplayedRows={({from, to, count}) => `${count} / ${from}-${to}`}
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={table.getFilteredRowModel().rows.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                showFirstButton={false}
                showLastButton={false}
                SelectProps={{
                    IconComponent: FiChevronDown,
                    variant: "outlined",
                    size: "small",
                    MenuProps: {
                        elevation: 2
                    }
                }}
                onPageChange={(_, page) => table.setPageIndex(page)}
                onRowsPerPageChange={e => {
                    const size = e.target.value ? Number(e.target.value) : 10
                    table.setPageSize(size)
                }}
                ActionsComponent={TablePaginationActions}
            />

        </Stack>
    )
}

export default Table;