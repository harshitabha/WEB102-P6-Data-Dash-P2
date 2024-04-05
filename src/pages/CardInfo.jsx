import { useParams } from "react-router-dom";
import "./CardInfo.css";
import Header from "../components/Header";

const CardInfo = ({cards}) => {
    const params = useParams();
    console.log(cards);
    const card = cards ? cards.displayedCards[params.id] : null;
    console.log(card);

    return (
        <>
            <Header 
                showSearch={false} />
            <h1>{params.id}</h1>
        </>
    );

}

export default CardInfo;