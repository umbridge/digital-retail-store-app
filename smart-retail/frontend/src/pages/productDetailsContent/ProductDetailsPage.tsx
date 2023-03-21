import React, { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BiRupee } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import "./ProductDetailsPage.scss";
import url from "../../config/SpringboorServiceUrl.json";
import Variants from "../../components/VariantsComponent/Variants";
import { useTranslation } from "react-i18next";
import SizeChart from "../../components/SizeChart/SizeChart";
import 'react-sheet-slide/style.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandableDiv from "../../components/ExpandableDivComponent/ExpandableDiv";
import SimilarProducts from "../../components/SimilarProducts/SimilarProducts";


const ProductDetailsPage = (props) => {
  // const currentUser = AuthService.getCurrentUser();
  //const id = 5;

  let variantId = useParams();

  const [showSizeChart, setShowSizeChart] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [prodPrice, setProdPrice] = useState(0);
  const [accordianExpanded,setAccordianExpanded]=useState(false);
  const[prodIdToSend,setProdID]=useState(-1);
  const[prodColorToSend,setProdColor]=useState("");
  const[selectedVariantId,setSelectedVarinatId]=useState(variantId.id?.substring(0,variantId.id.length-1))
  const[selectedQty,setSelectedQty]=useState(Number);
  const [selectedSize, setSelectedSize] = useState<number>(Number(variantId.id?.substring(variantId.id.length-1,variantId.id.length)));
  
  function showChart() {
    setShowSizeChart(!showSizeChart);
  }

  // const [product, setProduct] = useState({});
  
  const [productDetails, setProductDetails] = useState({
    name: " ",

    description: " ",

    category: " ",

    price: 0

  });


  const { t } = useTranslation();
  useEffect(() => {
    sessionStorage.setItem('barcode',String(variantId.id));
    axios.get(url.ProductService + url.VariantById + (variantId.id?.substring(0,variantId.id.length-1)))
      .then((res) => {

        //console.log('product details is coming');
        //console.log(res);
        var productID = res.data.data.product_id;
        setSelectedQty(res.data.data.sizes[selectedSize-1].quantity);
        setProdID(res.data.data.product_id);
        setProdColor(res.data.data.color);
        sessionStorage.setItem("productImageName",res.data.data.product_id.id+"_"+res.data.data.color)
        // setSelectedSze(res.data.data.size)
        sessionStorage.setItem('category',String(res.data.data.category));
        //console.log(productID);
        axios.get(url.ProductService + url.ProductDetails + res.data.data.category + "/" + productID.id)
        .then((res) => {
          const prod = res.data;

          //console.log(res);

          setProductDetails(prod.information);
          //console.log(prod.productInfo);

        });

      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(()=>{
    props.func(imageUrl);
  },[imageUrl, props])

  useEffect(()=>{
    //console.log(productDetails);
  },[productDetails])

  const [liked, setLiked] = useState(false);
  function toggle() {
    // Toggle the state variable liked
    setLiked(!liked);
  }


  const pullImageUrl = (data) => {
    setImageUrl(data);
  }

  const pullPrice = (data) => {
    setProdPrice(data);
  }

  const pullVariantId=(data)=>{
    setSelectedVarinatId(data);
    sessionStorage.setItem('barcode',String(data)+String(selectedSize));
    axios.get(url.ProductService + url.VariantById + data)
      .then((res) => {
    setSelectedQty(res.data.data.sizes[selectedSize-1].quantity);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const pullSelectedSize = (data) => {
    
    setSelectedSize(data);
    axios.get(url.ProductService + url.VariantById + selectedVariantId)
      .then((res) => {
    setSelectedQty(res.data.data.sizes[data-1].quantity);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const pullSelectedColor =(data) =>{
    sessionStorage.setItem("productImageName",prodIdToSend.id+"_" +data);
  }

  // const pullVariantColor=(data)=>{
  //   setProdColor(data);
  //   sessionStorage.setItem("",prodId)
  // }


  return (
    <div className="productDetailpage">
      <div style={{height:'20px'}}></div>
      <div className="swipe-icon">

      </div>
      <div className="details">
        <div className="productDetails">
          <h3 className="productName">{productDetails.name}</h3>
          
            {/* <h3 className="productName">Cotton t-Shirt</h3> */}

            <div className="price">

              <BiRupee className="rupeeIcon" />

              {prodPrice}


              <p className="mrp">{t("PriceMrpMessage")}</p>


            </div>
        </div>
        <div className="heart-icon" onClick={toggle}>
            {liked === false ? (
              <FavoriteBorderIcon sx={{ color: "#9C1C8F",fontSize:35 }} />
            ) : (
              <FavoriteIcon sx={{ color: "#9C1C8F",fontSize:35 }} />
            )}

          </div>
          
      </div>
      {selectedQty<10 && selectedQty>0?
      <p className="qty_display">Only {selectedQty} available!</p>:<></>}
      <Link to="#" onClick={showChart}>
        <p className="sizeChartLink">SIZE GUIDE</p>
      </Link>
      {showSizeChart === true ? (
        <div className="sizeChart">
          <h3 className="chartLabel">
            SIZE GUIDE{" "}
            <AiOutlineClose className="closeChartIcon" onClick={showChart} />
          </h3>
          <SizeChart type="women" />
          <SizeChart type="men" />
        </div>
      ) : (
        ""
      )}

        {
          prodIdToSend!==-1?<Variants func1={pullImageUrl} func2={pullPrice} func3={pullVariantId} func4={pullSelectedSize} func5={pullSelectedColor} prodId={prodIdToSend} size={variantId.id?.substring(variantId.id.length-1,variantId.id.length)} color={prodColorToSend} />:<></>
        }


      <div className="desc" onClick={()=>{setAccordianExpanded(!accordianExpanded)}}>
        {/* <p>V-neck with long sleeves and shoulder cut</p> */}
        <p>{productDetails.description}  </p>
         <div>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={accordianExpanded? <RemoveIcon sx={{color:'#1C37C5'}}/>:<AddIcon sx={{color:'#1C37C5'}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Material And Care Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      <ExpandableDiv/>
    </div>
      </div>
      <div className="similar-prod-container" style={{paddingBottom:'60px'}}>

      <SimilarProducts size={selectedSize} variantId={selectedVariantId}/>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
