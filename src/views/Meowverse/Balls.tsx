import Ball from "../../components/Ball";

const Balls: React.FC = () => {
    return (
        <div>
            <Ball className="mx-2" color="#FFC4D6" size={15} />
            <Ball className="mx-2" color="#FFC4D6" size={15} />
            <Ball className="mx-2" color="#FFC4D6" size={15} />
        </div>
    );
}

export default Balls;