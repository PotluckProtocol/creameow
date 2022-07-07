import { useState } from "react";
import styled from "styled-components";
import Collapse from "../../components/Collapse/Collapse";
import Title, { TitleType } from "../../components/Title";
import { FAQItems } from "./FAQItems";

export type FAQProps = {
    viewId: string;
    className?: string;
}

export type FAQItem = {
    id: string;
    title: string;
    content: React.ReactNode;
}

const Container = styled.div`
    max-width: 893px;
    margin-left: auto;
    margin-right: auto;
`;

const FAQ: React.FC<FAQProps> = ({
    viewId,
    className
}) => {

    const [openCollapses, setOpenCollapses] = useState<string[]>([]);

    const createClickHandler = (id: string) => {
        return () => {
            const index = openCollapses.indexOf(id);
            if (index === -1) {
                setOpenCollapses([...openCollapses, id]);
            } else {
                const newOpenCollapses = [...openCollapses];
                newOpenCollapses.splice(index, 1);
                setOpenCollapses(newOpenCollapses);
            }
        }
    }

    return (
        <Container className={className} id={viewId}>
            <Title type={TitleType.FAQ} className="text-center mb-4" />
            {FAQItems.map((item) => (
                <Collapse
                    className={'mb-4'}
                    key={item.id}
                    onClick={createClickHandler(item.id)}
                    open={openCollapses.includes(item.id)}
                    id={item.id}
                    title={item.title}
                    content={item.content}
                />
            ))}
        </Container>
    )

}

export default FAQ;