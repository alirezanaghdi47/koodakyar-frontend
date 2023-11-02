import {useState, SyntheticEvent} from "react";

//===== libraries =====//
import {BreakPointHooks} from "@react-hooks-library/core";
import {Container, Stack, Accordion, AccordionSummary, AccordionDetails, Grid, Box} from "@mui/material";
import {FiChevronDown} from "react-icons/fi";

//===== utils =====//
import {breakpoints} from "@/utils/constants";

//===== variables =====//
const questionAnswers = [
    {
        id: 1,
        title: "سوال سوال سوال سوال سوال سوال سوال سوال سوال سوال سوال",
        value: "جواب جواب جواب جواب جواب جواب جواب"
    },
    {
        id: 2,
        title: "سوال سوال سوال سوال سوال سوال سوال سوال سوال سوال سوال",
        value: "جواب جواب جواب جواب جواب جواب جواب"
    },
    {
        id: 3,
        title: "سوال سوال سوال سوال سوال سوال سوال سوال سوال سوال سوال",
        value: "جواب جواب جواب جواب جواب جواب جواب"
    },
    {
        id: 4,
        title: "سوال سوال سوال سوال سوال سوال سوال سوال سوال سوال سوال",
        value: "جواب جواب جواب جواب جواب جواب جواب"
    },
    {
        id: 5,
        title: "سوال سوال سوال سوال سوال سوال سوال سوال سوال سوال سوال",
        value: "جواب جواب جواب جواب جواب جواب جواب"
    },
]

const AboutUsQA = () => {

    const {useSmaller} = BreakPointHooks(breakpoints);
    const isTablet = useSmaller("md");

    const [expanded, setExpanded] = useState<string | false>('panel1');

    const handleChange = (panel: number) => (event: SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Container
            maxWidth="md"
            style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "start",
            }}
        >

            <Stack
                direction="column"
                gap={1}
                justifyContent="center"
                alignItems="center"
                width='100%'
            >

                {
                    questionAnswers.map(questionAnswersItem =>
                        <Accordion
                            key={questionAnswersItem.id}
                            expanded={expanded === questionAnswersItem.id}
                            onChange={handleChange(questionAnswersItem.id)}
                        >
                            <AccordionSummary expandIcon={<FiChevronDown size={20}/>}>
                                {questionAnswersItem.title}
                            </AccordionSummary>
                            <AccordionDetails>
                                {questionAnswersItem.value}
                            </AccordionDetails>
                        </Accordion>
                    )
                }

            </Stack>

        </Container>
    )
}

export default AboutUsQA;