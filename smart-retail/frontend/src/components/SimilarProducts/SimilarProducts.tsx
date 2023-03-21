import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import similarproduct from './../../assets/images/Similar-product.png';
import './SimilarProducts.scss';
import url from "../../config/SpringboorServiceUrl.json";
import { BiRupee } from "react-icons/bi";


interface SimProdDetails {
    id: number;
    product_id: {
        id : number;
        information: {
            name : string;
            description : string;
            category : string;
            price : number;
        }
    }
    price: number;
    color: string;
    image_url: string;
  }

const SimilarProducts = (props) => {
    // const mockyURL = "https://run.mocky.io/v3/f05a3f5e-4319-4f3f-ba8d-fce0bf5c180b";
    // const mockyURL = "https://run.mocky.io/v3/4d5fdac2-ecee-423f-aefa-504c849ce489";
    // const simprodURL = url.ProductService+"/api/similarProducts/Shirt/purple/4000/roundneck,fullsleeve,male"
    
    // const navigate = useNavigate();
    const [similarProductsArray, setSimilarProductsArray] = useState<SimProdDetails[]>([]);
    // const [len, setLen] = useState<number>(0);

    useEffect(() => {
        //console.log("in useEffect");
        
        axios.get(url.ProductService+url.VariantById+ props.variantId).then((res) =>{
            // console.log(res)
            axios.get(url.ProductService+url.SimilarProducts + res.data.data.category + "/" + res.data.data.color + "/" + res.data.data.price + "/" +  res.data.data.product_tag +"/" + res.data.data.id).then((res) => {
                const simProds = res.data.data;
                // console.log(res.data.data);
                setSimilarProductsArray(simProds);
                // setLen(similarProductsArray.length);
                //console.log(similarProductsArray);
            }).catch((err) => {
                setSimilarProductsArray([]);
                //console.log("error occurred");
            });
        })
    }, [props.variantId]);


    const handleNavigation = (key: number) => {
        
        const prodCategory = similarProductsArray[key].product_id.information.category;
        const prodId = String(similarProductsArray[key].id)+props.size;
        
        window.location.assign(`/digitailvr/productDetails/${prodCategory}/${prodId}`);
    }


    return (
        <div className='sim-prod'>
            <hr className='similar-prod-separator'/>
            <div className='sim-prod-head' >Similar Products</div>
            {similarProductsArray.length > 0 ?
                <div className='sim-prod-grid' >
                    {similarProductsArray.map((prod, index) => {
                        if (index % 2 === 0) {
                            return (
                                <div className='sim-prod-row' key={index}>
                                    <div className='sim-prod-col' onClick={() => { handleNavigation(index) }} >
                                        <div className='sim-prod-img'><img src={similarProductsArray[index].image_url} alt='product-img' style={{height:'171px',width:'146px'} }/></div>
                                        <div className='sim-prod-brand'>{similarProductsArray[index].product_id.information.name}</div>
                                        <div className='sim-prod-price'><BiRupee/>{similarProductsArray[index].price}</div>
                                    </div>
                                    {((index + 1) < similarProductsArray.length) ?
                                        <div className='sim-prod-col' onClick={() => { handleNavigation(index + 1) }} >
                                            <div className='sim-prod-img'><img src={similarProductsArray[index+1].image_url} alt='product-img' style={{height:'171px',width:'146px'}}/></div>
                                            <div className='sim-prod-brand'>{similarProductsArray[index + 1].product_id.information.name}</div>
                                            <div className='sim-prod-price'><BiRupee/>{similarProductsArray[index + 1].price}</div>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                            );
                        }
                    })}

                </div>
                : <></>}
        </div>
    );
}

export default SimilarProducts;
