import classNames from "classnames";
import styled from "styled-components";
import Title, { TitleType } from "../../components/Title";
import commonViewClasses from "../commonViewClasses";
import Balls from "./Balls";
import Lock from "./Lock";
import Phase from "./Phase";

export type MeowverseProps = {
    className?: string;
    viewId: string;
}

const Container = styled.div`
    text-align: center;
    max-width: 1020px;
    margin: 0 auto;
    padding-bottom: 6rem;
`;

const CollectionName = styled.h3`
    color: #F9749E;
    font-family: Inter;
    font-weight: bold;
    font-size: 32px;
`;

const Meowverse: React.FC<MeowverseProps> = ({
    className,
    viewId
}) => {
    const classes = classNames(className, ...commonViewClasses);
    return (
        <Container className={classes} id={viewId}>
            <Title className="mb-8" type={TitleType.Meowverse} />

            <CollectionName className="mb-8">• CREAMEOW •</CollectionName>

            <div className="grid grid-cols-1 lg:grid-cols-5">
                <Phase
                    className="text-center lg:text-left"
                    title="PHASE 1"
                    description={(
                        <>
                            Generative PFP<br />
                            5,555 total supply
                        </>
                    )}
                />
                <Balls className="my-12 lg:my-0" />
                <Phase
                    className="text-center lg:text-left"
                    title="PHASE 2"
                    description={(
                        <>
                            Creameow S.E<br />
                            (Special edition)
                        </>
                    )}
                />
                <Balls className="my-12 lg:my-0" />
                <Lock />
            </div>

        </Container>
    );
}

export default Meowverse;