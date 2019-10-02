import React, { Component } from 'react';
import './DummyCard.scss';


const image: string = "https://i.travelapi.com/hotels/1000000/20000/18100/18096/c25fd3bd_z.jpg";
const starIcon = require("../../assets/images/icons/star_icon.svg");
const foodIcon = require("../../assets/images/icons/food_icon.svg");

class DummyCard extends Component {

    render() {
        return (
            <div className="otravo-box-with-border otravo-card">
                <div className="otravo-card-image">
                    <figure className="otravo-card-photo">
                        <img src={image}/>
                    </figure>
                </div>
                <div className="otravo-card-info">
                    <div className="otravo-title">International Place Hotel</div>
                    <div>
                        <img className="otravo-card-star" src={starIcon}/>
                        <img className="otravo-card-star" src={starIcon}/>
                        <img className="otravo-card-star" src={starIcon}/>
                        <img className="otravo-card-star" src={starIcon}/>
                        <img className="otravo-card-star" src={starIcon}/>
                    </div>
                    <div className="otravo-card-description">
                        Boa Viagem, Recife - Mostrar en el mapa
                    </div>
                    <div>
                        a 9 km del centro Cerca de la playa
                    </div>
                    <div className="otravo-card-ammenities">
                        <img className="otravo-card-amenity" src={foodIcon}/>
                        <img className="otravo-card-amenity" src={foodIcon}/>
                        <img className="otravo-card-amenity" src={foodIcon}/>
                    </div>
                    <div className="otra-card-others">
                        ¡Incluye desayuno!<br/>
                        Sin riesgos: puedes cancelar más tarde<br/>
                        Sin pago por adelantado
                    </div>
                </div>
                <div className="otravo-card-pricing">
                    <div className="otravo-card-strikeout-price">394.54 EUR</div>
                    <div className="otravo-card-stay-price">247.57 EUR</div>
                    <div className="otravo-label">Por noche, 2 adultos, 1 niño</div>
                    <div className="otravo-margin-top-30">
                        <button>Ver detalle</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DummyCard;
