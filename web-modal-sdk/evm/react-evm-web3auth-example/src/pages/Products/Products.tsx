import React from 'react'

import Header from '../../components/Header/Header'
import SmallCard from '../../components/SmallCard/SmallCard'

import Orange from '../../assets/images/orange.jpeg'

import './products.css'

const Products = () => {
  return (
    <div className="products container content-width">
      <Header />
      <ul>
        <li>
          <SmallCard />
        </li>
        {/* <li>
          <SmallCard
          />
        </li>
        <li>
          <SmallCard />
        </li> */}
      </ul>
    </div>
  )
}

export default Products