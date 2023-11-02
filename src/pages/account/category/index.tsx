import {useContext} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {IconButton, Tooltip} from "@mui/material";
import {FiPlus} from "react-icons/fi";

//===== services =====//
import {getAllCategory} from "@/services/categoryService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== layouts =====//
import AccountLayout from "@/layouts/AccountLayout";

//===== components =====//
import {Heading} from "@/components/ui/Heading";
import {TablePlaceholder} from "@/components/ui/Placeholder";
import {TableEmpty} from "@/components/ui/Empty";

//===== features =====//
import CategoryTable from "@/features/category/CategoryTable";

const AddCategoryModal = dynamic(() => import("@/features/category/AddCategoryModal") , {ssr: false});
const EditCategoryModal = dynamic(() => import("@/features/category/EditCategoryModal") , {ssr: false});
const DeleteCategoryDialog = dynamic(() => import("@/features/category/DeleteCategoryDialog") , {ssr: false});

//===== assets =====//
import empty from "@/assets/images/empty.svg";

const Category = () => {

    const {data: session} = useSession();
    const {_onOpenModal} = useContext(PortalContext);

    const {
        isFetching: categoriesIsFetching,
        isError: categoriesIsError,
        data: categories
    } = useQuery(
        ["getAllCategory"],
        // @ts-ignore
        () => getAllCategory({adminRole: session?.user?.role, limit: 10000, offset: 0}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(session?.user?.role)
        }
    );

    return (
        <AccountLayout>

            <Head>
                <title>دسته بندی ها</title>
            </Head>

            {/* heading */}
            <Heading
                title='دسته بندی ها'
                color="black"
                button={
                    <Tooltip title="افزودن">
                        <IconButton
                            color="secondary"
                            onClick={() => _onOpenModal("add-1")}
                        >
                            <FiPlus size={20}/>
                        </IconButton>
                    </Tooltip>
                }
            />

            {/* table */}
            <>
                {
                    !categoriesIsFetching && !categoriesIsError && categories?.data.length > 0 && (
                        <CategoryTable tableData={categories?.data}/>
                    )
                }
            </>

            {/* table placeholder */}
            <>
                {
                    categoriesIsFetching && !categoriesIsError && (
                        <TablePlaceholder/>
                    )
                }
            </>

            {/* table empty */}
            <>
                {
                    !categoriesIsFetching && (categoriesIsError || categories?.data.length === 0) && (
                        <TableEmpty
                            message='دسته بندی یافت نشد'
                            image={empty}
                        />
                    )
                }
            </>

            {/* add modal */}
            <AddCategoryModal/>

            {/* edit modal */}
            <EditCategoryModal/>

            {/* delete dialog */}
            <DeleteCategoryDialog/>

        </AccountLayout>
    )
}

export default Category;
