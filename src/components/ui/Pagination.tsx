//===== libraries =====//
import {Container, Pagination as MuiPagination} from "@mui/material";
const Pagination = ({pageCount, currentPage, onPaginate}) => {

    return pageCount > 1 && (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <MuiPagination
                color="primary"
                variant="text"
                shape="rounded"
                count={pageCount}
                hidePrevButton
                hideNextButton
                defaultPage={currentPage}
                siblingCount={1}
                page={currentPage || 1}
                onChange={(e, value) => onPaginate(value)}
            />

        </Container>
    )
}

export default Pagination;