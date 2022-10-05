import React from 'react';
import { Product, FooterBanner, HeroBanner } from '../components';
import Brand from '../components/Brand';
import { client } from '../lib/client';

const Home = ({ products, bannerData, brandsData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className='products-heading'>
        <h2>Best selling products</h2>
      </div>

      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product={product} /> )}
      </div>

      <div className='products-heading'>
        <h2>Best brands</h2>
      </div>

      <div className='products-container'>
        {brandsData?.map((brand) => <Brand key={brand._id} brand={brand} /> )}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const queryBrands = '*[_type == "brand"]';
  const brandsData = await client.fetch(queryBrands);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData, brandsData }
  }
}

export default Home;