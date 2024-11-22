import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getVenderProduct } from '../Slice/VenderSlice';
import { getadminCategory, getadminBrand } from '../Slice/AdminSlice';
import '../App.css'; // Import your custom styles
import { useNavigate, useParams } from 'react-router-dom';
const EventPage = () => {
  const dispatch = useDispatch();
  const { adminData, BrandData } = useSelector((state) => state.Admin);
  const { venderData } = useSelector((state) => state.vendor);
 
  const { id } = useParams()
  useEffect(() => {
    dispatch(getVenderProduct(id));
    dispatch(getadminCategory());
    dispatch(getadminBrand());
  }, [dispatch]);


  const navigate = useNavigate()
  const singlepage = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div>
      <div className="container-fluid">
        {/* Categories Section */}
        <div className="row my-5">
          <div className="col-12">
            <h2 className="text-center mb-4">Categories</h2>
            <div className="container">
              <div className="row justify-content-center">
                {venderData?.map((item, index) => (
                  <div className="col-md-4 col-lg-3 mb-4" key={index}>
                    <div className="product-card">
                      <div className="product-image">
                        <img src={item?.product_image} alt={item?.product_name} width={300} />
                        {item?.discount_price && (
                          <span className="discount-badge">

                            {`-${Math.round(((item.discount_price / item.product_price)) * 100)}%`}
                          </span>
                        )}
                      </div>
                      <div className="product-details">
                        <h3 className="product-name">{item?.product_name}</h3>
                        <div className="pricing">
                          {item?.discount_price ? (
                            <>
                              <span className="product-price discounted">{`₹${item.product_price}`}</span>
                              <span className="product-price final-price1">{`₹${item.discount_price}  off`}</span>



                            </>
                          ) : (
                            <span className="product-price final-price">{`₹${item.product_price}`}</span>
                          )}
                        </div>
                        <div className="product-price final-price">
                          {`Total ${Math.round(((item.product_price - item.discount_price)))}`}

                        </div>
                        <button className="add-to-cart-btn" onClick={()=>singlepage(item._id)}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Brands Section */}
      </div>


      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-12">
            <h2 className="text-center mb-4">Brands</h2>
            <div class="slider">
              <div class="slide-track">
                {BrandData?.map((item, index) => (
                  <div class="slide" key={index}>
                    <img src={item?.Brand_image} height="100" width="200" alt="" />
                  </div>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage