import React from 'react';
import { Product, FooterBanner, HeroBanner } from '../components';
import Brand from '../components/Brand';
import Machine from '../components/Machine';
import { client } from '../lib/client';

const Home = ({ products, bannerData, brandsData, machineData }) => {
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

        <div className='machine'>
          <div className='maylike-products-container track'>
            {brandsData.map((item) => (
              <Brand key={item._id} brand={item} />
            ))}
          </div>
        </div>

        <div className='machine-heading'>
          <h2>Best coffee makers</h2>
        </div>

        <div className='products-container'>
          {machineData?.map((machine) => <Machine key={machine._id} machine={machine} /> )}
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

  const machineQuery = '*[_type == "machine"]';
  const machineData = await client.fetch(machineQuery);

  return {
    props: { products, bannerData, brandsData, machineData }
  }
}

export default Home;