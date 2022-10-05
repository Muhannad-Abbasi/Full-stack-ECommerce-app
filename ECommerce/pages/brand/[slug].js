import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import Brand from '../../components/Brand';
import { useStateContext } from '../../context/StateContext';

const BrandDetails = ({ brand, brands }) => {
  const { image, name, details, price } = brand;
  console.log(brand)
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(brand, qty);
    setShowCart(true);
  }

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img 
              src={urlFor(image && image[index])}
              className='product-detail-image'
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details</h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span
                className='minus'
                onClick={decQty}
              >
                <AiOutlineMinus />
              </span>
              <span
                className='num'
              >
                {qty}
              </span>
              <span
                className='plus'
                onClick={incQty}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(brand, qty)}
            >
              Add to Cart
            </button>
            <button
              type='button'
              className='buy-now'
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {brands.map((item) => (
              <Brand key={item._id} brand={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "brand"] {
    slug {
      current
    }
  }`

  const brands = await client.fetch(query);

  const paths = brands.map((brand) => ({
    params: {
      slug: brand.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "brand" && slug.current == '${slug}'][0]`;
  const brandsQuery = '*[_type == "brand"]'

  const brand = await client.fetch(query);
  const brands = await client.fetch(brandsQuery);

  return {
    props: { brand, brands }
  }
}

export default BrandDetails;