//===== libraries =====//
import {Container, Tabs, Tab} from "@mui/material";
import {FiLock, FiUser} from "react-icons/fi";

// @ts-ignore
const ProfileTabs = ({page, setPage}) => {

    const sections = [
        {id: 1, title: "اطلاعات کاربری", icon: <FiUser size={20}/>},
        {id: 2, title: "امنیت و رمزعبور", icon: <FiLock size={20}/>},
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

            <Tabs
                variant="standard"
                value={page}
                onChange={(e, newValue) => setPage(newValue)}
            >
                {
                    sections.map((sectionItem, index) =>
                        <Tab
                            key={index}
                            icon={sectionItem.icon}
                            iconPosition="start"
                            label={sectionItem.title}
                            value={index}
                            style={{width: "max-content"}}
                        />
                    )
                }
            </Tabs>

        </Container>
    )
}

export default ProfileTabs;