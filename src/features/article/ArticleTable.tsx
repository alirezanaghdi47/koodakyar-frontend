import {useContext} from "react";
import Link from "next/link";

//===== libraries =====//
import {createColumnHelper} from "@tanstack/table-core";
import {IconButton, Typography, Tooltip, Container} from "@mui/material";
import {FiEdit2, FiEye, FiTrash2} from "react-icons/fi";

//===== utils =====//
import {convertLanguage} from "@/utils/functions";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {convertType} from "@/utils/functions";

//===== modules =====//
import Table from "@/components/ui/Table";

// @ts-ignore
const ArticleTable = ({tableData}) => {

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
        columnHelper.accessor(row => row.title, {
            id: 'title',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    عنوان
                </Typography>
            ),
            cell: info => (
                <Tooltip title={info.getValue()}>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        className="text-truncate text-truncate__1"
                    >
                        {info.getValue()}
                    </Typography>
                </Tooltip>
            ),
            width: 150,
        }),
        columnHelper.accessor(row => row.slug, {
            id: 'slug',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    عنوان ( انگلیسی )
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
        columnHelper.accessor(row => row.type, {
            id: 'type',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    نوع
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {convertType(info.getValue())}
                </Typography>
            ),
            width: 150,
        }),
        columnHelper.accessor(row => row.category, {
            id: 'category',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    دسته بندی
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {info.getValue()?.title}
                </Typography>
            ),
            width: 150,
        }),
        columnHelper.accessor(row => row.language, {
            id: 'language',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    زبان
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {convertLanguage(info.getValue())}
                </Typography>
            ),
            width: 100,
        }),
        columnHelper.accessor(row => row.user, {
            id: 'user',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    فرستنده
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {info.getValue()?.userName}
                </Typography>
            ),
            width: 200,
        }),
        columnHelper.accessor(row => row.authors, {
            id: 'authors',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    نویسنده یا نویسندگان
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
            width: 250,
        }),
        columnHelper.accessor(row => row.isConfirmed, {
            id: 'isConfirmed',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    منتشر
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {info.getValue() ? "شده" : "نشده"}
                </Typography>
            ),
            width: 100,
        }),
        columnHelper.accessor(row => row.date, {
            id: 'date',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    تاریخ انتشار
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
        columnHelper.accessor(row => row.isSuggested, {
            id: 'isSuggested',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    پیشنهادی
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {info.getValue() ? "بله" : "خیر"}
                </Typography>
            ),
            width: 100,
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
                            href={process.env.NEXT_PUBLIC_DOMAIN + "/article/" + info?.row?.original?.type + "/" + info?.row?.original?.slug}
                            style={{marginLeft: 8}}
                        >
                            <FiEye size={16}/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="ویرایش">
                        <IconButton
                            color="secondary"
                            onClick={() => _onOpenModal("edit", info?.row?.original)}
                            style={{marginLeft: 8}}
                        >
                            <FiEdit2 size={16}/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="حذف">
                        <IconButton
                            color="secondary"
                            onClick={() => _onOpenModal("delete", info?.row?.original)}
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

export default ArticleTable;