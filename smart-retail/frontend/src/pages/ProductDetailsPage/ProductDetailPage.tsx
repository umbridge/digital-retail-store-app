import React, {   useState } from 'react'
import './ProductDetailPage.scss';

import { Link } from 'react-router-dom';

// import { useTranslation } from 'react-i18next';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ProductDetailsPage from '../productDetailsContent/ProductDetailsPage';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'; 


function ProductDetailPage( ) {

  // const currentUser = AuthService.getCurrentUser();
  //const id = 5;

  // let productID = useParams();
  
  const [imageUrl, setImageUrl] = useState("");
  

  
  // const [product, setProduct] = useState({});
  // const [productDetails, setProductDetails] = useState({
  //   product_name: " ",

  //   description: " ",

  //   price: 0,

  //   category: " ",


  // });


  // const { t } = useTranslation();
  // useEffect(() => {
  //   //${url.ProductDetailsService}${productID.id}

  //   axios.get(url.ProductService + url.ProductDetails + productID.category + "/" + productID.id).then((res) => {
  //     const prod = res.data;

  //     setProductDetails(prod.productInfo);

  //   });
  // }, []);

 


  const pullImageUrl = (data) => {
    setImageUrl(data);
  }



  return (
    <div className="product-details-page">
      <HeaderComponent/>
      <div className="product-detail-header">
        
        <div className="header-sub-title">
            <div className="sub-title-left"><a href="/digitailvr/scan"><ArrowBackIosIcon sx={{color:"#1C37C5"}}/></a></div>
            <div className="sub-title">PRODUCT DETAILS</div>
            <div className="sub-title-right"></div>
        </div>
      </div>
       
      <div className="prod-image-container">
        <img src={imageUrl} alt='prod-img' className='product-image'/>
      </div>

      <div className="opacity-container">

      </div>

      <div className="product-info-container">
        <ProductDetailsPage func={pullImageUrl}/>        
      </div>
      {/* <div><SimilarProducts/></div> */}
      
      <div className="product-detail-footer">
        <Link to="/virtual-try-on" style={{display:'flex',justifyContent:'center',marginTop:'14px',width:'100%'}}>
          <button className="virtualButton">TRY ON VIRTUALLY</button>
        </Link>
        
      </div>
    </div>
  )
}

export default ProductDetailPage