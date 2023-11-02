import {useContext} from "react";
import Image from "next/image";
import Link from "next/link";

//===== libraries =====//
import {createColumnHelper} from "@tanstack/table-core";
import {IconButton, Typography, Tooltip, Box, Container} from "@mui/material";
import {FiEdit2, FiEye, FiTrash2} from "react-icons/fi";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {convertPlace} from "@/utils/functions";

//===== modules =====//
import Table from "@/components/ui/Table";

// @ts-ignore
const BannerTable = ({tableData}) => {

    const columnHelper = createColumnHelper();
    const {_onOpenModal} = useContext(PortalContext);

    const tableColumns = [
        columnHelper.accessor(row => row.number, {
            id: '#',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    #
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {info.getValue()}
                </Typography>
            ),
            width: 50,
        }),
        columnHelper.accessor(row => row.thumbnail, {
            id: 'thumbnail',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    نمایه
                </Typography>
            ),
            cell: info => info.getValue() ? (

                <Box style={{maxWidth: 120}}>

                    <Box className="aspect-ratio aspect-ratio__3-1">
                        <Image
                            src={info.getValue()}
                            alt="نمایه"
                            fill
                            style={{borderRadius: 8}}
                        />
                    </Box>

                </Box>
            ) : (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    ----------
                </Typography>
            ),
            width: 150,
        }),
        columnHelper.accessor(row => row.place, {
            id: 'place',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    محل نمایش
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {convertPlace(info.getValue())?.title}
                </Typography>
            ),
            width: 200,
        }),
        columnHelper.accessor(row => row.source, {
            id: 'source',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    منبع
                </Typography>
            ),
            cell: info => info.getValue() ? (
                <Tooltip title={decodeURI(info.getValue())}>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        className="text-truncate text-truncate__1"
                    >
                        {decodeURI(info.getValue())}
                    </Typography>
                </Tooltip>
            ) : (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    ----------
                </Typography>
            ),
            width: 200,
        }),
        columnHelper.accessor(row => row.updateDate, {
            id: 'updateDate',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    تاریخ ویرایش
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {info.getValue()}
                </Typography>
            ),
            width: 150,
        }),
        columnHelper.accessor(row => null, {
            id: 'action',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    نوار ابزار
                </Typography>
            ),
            cell: info => (
                <>

                    <Tooltip title="مشاهده">
                        <IconButton
                            color="secondary"
                            LinkComponent={Link}
                            href={process.env.NEXT_PUBLIC_DOMAIN + convertPlace(info.row.original.place)?.value}
                            style={{marginLeft: 8}}
                        >
                            <FiEye size={16}/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="ویرایش">
                        <IconButton
                            color="secondary"
                            onClick={() => _onOpenModal("edit-1", info.row.original)}
                            style={{marginLeft: 8}}
                        >
                            <FiEdit2 size={16}/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="حذف">
                        <IconButton
                            color="secondary"
                            onClick={() => _onOpenModal("delete", info.row.original)}
                        >
                            <FiTrash2 size={16}/>
                        </IconButton>
                    </Tooltip>

                </>
            ),
            width: 150,
        }),
    ];

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
            }}
        >

            {/* table */}
            <Table
                data={tableData}
                columns={tableColumns}
            />

        </Container>
    )
}

export default BannerTable;