// update component to use a table instead of a ul
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
                    {apiCards ? apiCards.map((cards, index) => {
                        return (
                            <tr key={`card-${index}`}>
                                <td 
                                    className="table-elem">{cards.name ? cards.name : "N/A"}</td>
                                <td 
                                    className="table-elem">{cards.type ? cards.type : "N/A"}</td>
                                <td 
                                    className="table-elem">{cards.manaCost ? cards.manaCost : "N/A"}</td>
                                <td 
                                    className="table-elem">{cards.power ? cards.power : "N/A"}</td>
                                <td 
                                    className="table-elem">{cards.toughness ? cards.toughness : "N/A"}</td>
                            </tr>
                        );
                    }) : null}
                </tbody>

            </table>
        </div>
    );
}

export default DataCard;