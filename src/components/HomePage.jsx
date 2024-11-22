import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVenderProduct } from '../Slice/VenderSlice';
import { getadminCategory, getadminBrand } from '../Slice/AdminSlice';
import '../App.css'; // Import your custom styles
import { useNavigate, useParams } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const { venderData } = useSelector((state) => state.vendor);
  const { adminData, BrandData } = useSelector((state) => state.Admin);
  
  useEffect(() => {
    dispatch(getVenderProduct());
    dispatch(getadminCategory());
    dispatch(getadminBrand());
  }, [dispatch]);


  const id=useParams()
  const navigate=useNavigate()
  const subpage = (id) => {
    navigate(`/category/${id}`); 
  };
  return (
    <div className="container-fluid">
      {/* Categories Section */}
      <div className="row my-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Categories</h2>
          <div className="card-container d-flex flex-wrap justify-content-center">
            {adminData?.map((item, index) => (
              <div className="flip-card mx-3 my-2" key={index} onClick={() => subpage(item._id)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={item?.product_image}
                      alt={item?.name}
                      className="img-fluid category-image"
                    />
                    <h5 className="mt-2">{item?.name}</h5>
                  </div>
                  <div className="flip-card-back">
                  <img
                      src={item?.product_image}
                      alt={item?.name}
                      className="img-fluid category-image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brands Section */}
     <div className="container-fluid">
     <div className="row my-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Brands</h2>
          <div class="slider">
  <div class="slide-track">
    {BrandData?.map((item, index) => (
 <div class="slide" key={index}>
 <img src={item?.Brand_image} height="100" width="200" alt="" />
</div>            ))}
  </div>
</div>
        </div>
      </div>
     </div>



    </div>
  );
};

export default HomePage;
