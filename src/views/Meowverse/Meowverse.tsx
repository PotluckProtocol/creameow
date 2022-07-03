import styled from "styled-components";
import Title, { TitleType } from "../../components/Title";
import Balls from "./Balls";
import Lock from "./Lock";
import Phase from "./Phase";

export type MeowverseProps = {
    className?: string;
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
    className
}) => {
    return (
        <Container className={className}>
            <Title className="mb-8" type={TitleType.Meowverse} />

            <CollectionName className="mb-8">• CREAMEOW •</CollectionName>

            <div className="flex justify-between items-center">
                <div>
                    <Phase
                        title="PHASE 1"
                        description={(
                            <>
                                Generative PFP<br />
                                5,555 total supply
                            </>
                        )}
                    />
                </div>
                <Balls />
                <div>
                    <Phase
                        title="PHASE 2"
                        description={(
                            <>
                                Creameow S.E<br />
                                (Special edition)
                            </>
                        )}
                    />
                </div>
                <Balls />
                <Lock />
            </div>

        </Container>
    );
}

export default Meowverse;