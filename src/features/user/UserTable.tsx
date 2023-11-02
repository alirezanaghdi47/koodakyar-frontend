import {useContext} from "react";

//===== libraries =====//
import {createColumnHelper} from "@tanstack/table-core";
import {IconButton, Typography, Tooltip, Container} from "@mui/material";
import {FiEdit2, FiTrash2} from "react-icons/fi";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {convertRole} from "@/utils/functions";

//===== modules =====//
import Table from "@/components/ui/Table"
const UserTable = ({tableData}) => {

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
        columnHelper.accessor(row => row.userName, {
            id: 'userName',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    نام کاربری
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
        columnHelper.accessor(row => row.email, {
            id: 'email',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    ایمیل
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
            width: 200,
        }),
        columnHelper.accessor(row => row.phoneNumber, {
            id: 'phoneNumber',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    شماره همراه
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
        columnHelper.accessor(row => row.role, {
            id: 'role',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    نقش
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {convertRole(info.getValue())}
                </Typography>
            ),
            width: 100,
        }),
        columnHelper.accessor(row => row.isActive, {
            id: 'isActive',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    وضعیت
                </Typography>
            ),
            cell: info => (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-truncate text-truncate__1"
                >
                    {info.getValue() ? "فعال" : "غیر فعال"}
                </Typography>
            ),
            width: 100,
        }),
        columnHelper.accessor(row => row.createDate, {
            id: 'createDate',
            header: () => (
                <Typography
                    variant="body2"
                    color="textPrimary"
                    fontWeight="bold"
                    className="text-truncate text-truncate__1"
                >
                    تاریخ عضویت
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

export default UserTable;