import Link from "next/link";

//===== libraries =====//
import {Breadcrumbs as MuiBreadcrumbs, Button, Container} from "@mui/material";
import {FiChevronLeft} from "react-icons/fi";
const Breadcrumbs = ({links}) => {

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            {/* breadcrumbs */}
            <MuiBreadcrumbs
                separator={<FiChevronLeft size={16}/>}
                style={{width: "100%"}}
            >

                {
                    links.map(link =>
                        <Button
                            key={link.id}
                            variant="text"
                            color="secondary"
                            component={Link}
                            href={link.href}
                            size="small"
                            style={{
                                width: "max-content",
                                minWidth: "unset"
                            }}
                        >
                            {link.title}
                        </Button>
                    )
                }

            </MuiBreadcrumbs>

        </Container>
    )
}

export default Breadcrumbs;