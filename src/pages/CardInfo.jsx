import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import "./CardInfo.css";

const CardInfo = () => {
    const card = useLocation().state;
    return (
        <>
            <Header />
            <h1 className="page-title">Card Info</h1>
            <div className="card-info dash-elem">
                <img 
                    src={card.imageUrl} 
                    alt={card.name}
                    className="card-img" />
                <div className="info-container">
                    <h2 className="card-name">{card.name}</h2>
                    <p className="card-text">
                        <b>Artist: </b>
                        {card.artist}
                    </p>

                    <div className="flex" style={{width: "90%"}}>
                        <p className="card-text">
                            <b>Type: </b>
                            {card.type}
                        </p>
                        <p className="card-text">
                            <b>Colors: </b>
                            {card.colors ? card.colors.join(", ") : 'N/A'}
                        </p>
                    </div>

                    <p className="card-text">
                        <b>Description: </b>
                        {card.text}
                    </p>

                    <div className="flex" style={{width: "90%"}}>
                        <p className="card-text">
                            <b>Power: </b>
                        {card.power ? card.power : 'N/A'}
                        </p>
                        <p className="card-text">
                            <b>Toughness: </b>
                        {card.toughness ? card.toughness : 'N/A'}
                        </p>
                    </div>

                    <p className="card-text">Mana Cost: {card.manaCost}</p>
                </div>
            </div>
        </>
    );

}

export default CardInfo;