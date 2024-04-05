// update component to use a table instead of a ul
import { Link } from 'react-router-dom'

import "./DataCard.css";

const DataCard = ({apiCards}) => {
    return (
        <div className="data-container dash-elem">

            <table className="api-info-table">
                <thead>
                    <tr>
                        <th 
                            scope="col"
                            className="section-header">Name</th>
                        <th 
                            scope="col"
                            className="section-header">Type</th>
                        <th 
                            scope="col"
                            className="section-header">Mana Cost</th>
                        <th 
                            scope="col"
                            className="section-header">Power</th>
                        <th 
                            scope="col"
                            className="section-header">Toughness</th>
                    </tr>
                </thead>


                <tbody>
                    {apiCards ? apiCards.map((card, index) => {
                        return (
                            <tr key={`card-${index}`}>
                                <td 
                                    className="table-elem">
                                    <Link 
                                        to={`/card-info/${index}`}
                                        state={card}
                                        className='text'>
                                        {card.name ? card.name : "N/A"}
                                    </Link>
                                </td>
                                <td 
                                    className="table-elem">{card.type ? card.type : "N/A"}</td>
                                <td 
                                    className="table-elem">{card.manaCost ? card.manaCost : "N/A"}</td>
                                <td 
                                    className="table-elem">{card.power ? card.power : "N/A"}</td>
                                <td 
                                    className="table-elem">{card.toughness ? card.toughness : "N/A"}</td>
                            </tr>
                        );
                    }) : null}
                </tbody>

            </table>
        </div>
    );
}

export default DataCard;