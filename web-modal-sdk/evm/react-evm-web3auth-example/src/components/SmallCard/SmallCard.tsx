import React from 'react'
import { Link } from 'react-router-dom'

import MarketIcon from '../../assets/images/market.svg'

import './smallCards.css'

const SmallCard = (name: any, averagePrice: any, place: any) => {
  return (
    <Link to="/" className="small-cards">
      <figure className="small-cards__image-container">
        <img src="" alt="product" />
      </figure>
      <div className="small-cards__information">
        <h2 className="small-cards__information__title">{name}</h2>
        <p className="small-cards__information__description">{averagePrice} average</p>
        <div className="small-cards__information__container">
          <figure className="small-cards__information__market-icon">
            <img src={MarketIcon} alt="market-icon" />
          </figure>
          <p className="small-cards__information__description">{place} place</p>
        </div>
      </div>
    </Link>
  )
}

export default SmallCard