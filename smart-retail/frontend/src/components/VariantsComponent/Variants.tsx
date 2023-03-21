import React, { useState, useEffect } from 'react'
import './Variants.scss'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import ColorDropdownComponent from './ColorDropdownComponent';
import SizeDropdownComponent from './SizeDropdownComponent';
import url from "../../config/SpringboorServiceUrl.json";

function Variants(props) {

    let sizeArr=['XS','S','M','L','XL','XXL']


    const [variants, setVariants] = useState([
        {
            id: 0,
            color: "",
            image_url: "",
            price: 0,
            sizes: [
                { size: "", quantity: 0 }
            ]
        }
    ])
    const [selectedColor, setSelectedColor] = useState(variants[0].color)
    const [selectedSize, setSelectedSize] = useState(sizeArr[props.size-1])

    useEffect(() => {
        // console.log(props.prodId);
        axios.get(url.ProductService+url.ProductDetailsCategory+props.prodId.id)
            .then((res) => {
                //console.log(res.data);
                setVariants(res.data.data);
                setSelectedColor(props.color);
                setSelectedSize(sizeArr[props.size-1]);
                props.func1(res.data.data.filter(variant => variant.color === props.color)[0].image_url);
                props.func2(res.data.data.filter(variant => variant.color === props.color)[0].price);
            })
            .catch((error) => {
                
                setVariants([{
                    id: 0,
                    price: 1200,
                    color: "Black",
                    image_url: "https://imgs.michaels.com/MAM/assets/1/5E3C12034D34434F8A9BAAFDDF0F8E1B/img/4A6C11A35D1249A7AC437B6CCD831B99/M10093625_5.jpg?fit=inside|540:540",
                    sizes: [
                        { size: "XS", quantity: 0 },
                        { size: "S", quantity: 9 },
                        { size: "M", quantity: 7 },
                        { size: "L", quantity: 29 },
                        { size: "XL", quantity: 0 },
                        { size: "XXL", quantity: 11 }
                    ]
                },
                {
                    id: 1,
                    price: 1500,
                    color: "Grey",
                    image_url: "https://5.imimg.com/data5/FO/KL/MY-20299459/mens-grey-plain-round-neck-t-shirt-500x500.jpg",
                    sizes: [
                        { size: "XS", quantity: 0 },
                        { size: "S", quantity: 9 },
                        { size: "M", quantity: 7 },
                        { size: "L", quantity: 29 },
                        { size: "XL", quantity: 0 },
                        { size: "XXL", quantity: 11 }
                    ]
                },
                {
                    id: 3,
                    price: 1100,
                    color: "Purple",
                    image_url: "https://5.imimg.com/data5/FU/PW/MY-48382494/mens-plain-t-shirts-500x500.jpg",
                    sizes: [
                        { size: "XS", quantity: 0 },
                        { size: "S", quantity: 9 },
                        { size: "M", quantity: 7 },
                        { size: "L", quantity: 29 },
                        { size: "XL", quantity: 0 },
                        { size: "XXL", quantity: 11 }
                    ]
                }
                ]);
                setSelectedColor("Black");
                props.func1("https://imgs.michaels.com/MAM/assets/1/5E3C12034D34434F8A9BAAFDDF0F8E1B/img/4A6C11A35D1249A7AC437B6CCD831B99/M10093625_5.jpg?fit=inside|540:540");
                props.func2(1200)
            })
    }, [])


    // const [selectedColor, setSelectedColor] = useState(product.variants[0].color)

    const handleColorChange = (data) => {
        setSelectedColor(data);
        // setSelectedSize(sizeArr[props.size-1]);
        var temp = variants.filter(variant => variant.color === data)
        props.func1(temp[0].image_url);
        props.func2(temp[0].price);
        props.func3(temp[0].id);
        props.func5(temp[0].color);
        

    }

    const handleSizeChange = (data) => {
        setSelectedSize(data);
        props.func4(sizeArr.indexOf(data)+1);
        // var temp = variants.filter(variant => variant.color === data)
        // props.func1(temp[0].image_url);
        // props.func2(temp[0].price);

    }


    // var variants = product.variants

    // console.log(variants[0].color,selectedColor);
    var available_sizes = variants.filter(variant => variant.color === selectedColor)[0].sizes;

    const sizeSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedSize(e.currentTarget.value);
    }

    return (
        <div className="variant-component">
            <div className="color-selection">
                <div className='color-name-display'>
                    <div className="colored-box" style={{ backgroundColor: selectedColor, border:'1px solid #b5a9a9' }}></div>
                    <div className="color-name">
                    <p>{selectedColor}</p>
                    </div>
                </div>
                <ColorDropdownComponent colors={variants} func={handleColorChange}/>
            </div>

            <div className="size-selection">

                <div className="size-content">
                <p>{selectedSize}</p>
                </div>
                
                <SizeDropdownComponent sizes={available_sizes} func={handleSizeChange}/>
                {/* <select name="size-selection" id="size-selection" className='select-size' value={selectedSize} onChange={handleSizeChange}>
                    {
                        available_sizes.map((size, idx) => {
                            return <option value={size.size} key={idx}>
                            {size.size}
                        </option>
                        })
                    }
                </select> */}
            </div>
        </div>
        // <div className='variants-block'>
        //     <div className='variants-color'>
        //         <div className='color-box'>
        //             <div className='colored-box' style={{ backgroundColor: selectedColor }}>

        //             </div>
        //         </div>
        //         <select onChange={handleColorChange} id="color-selection" value={selectedColor} className="color-selection">
        //             {
        //                 variants.map((variant, idx) => {
        //                     // if(variant.color===selectedColor){
        //                     //     setUrlToSend(variant.image_url);
        //                     // }
        //                     return <option value={variant.color}  className='color-selection-options'  key={idx}>{(variant.color.length>7?"..":"")+variant.color.substring(0,7)}</option>
        //                 })
        //             }
        //         </select>
        //     </div>
        //     <div className='variants-sizes'>
        //         <div className='variant'>
        //             <div className='size-select-buttons'>
        // {
        //     available_sizes.map((size, idx) => {
        //         return <div key={idx}>
        //             <button value={size.size} className={`VarBtn sizes ${Number(size.quantity) <1?"disabled":""}`} disabled={Number(size.quantity) < 1} onClick={sizeSelected}>
        //                 <label className='button-label'>{size.size}</label>
        //             </button>
        //         </div>
        //     })
        // }
        //             </div>

        //             <div className='qty-info'>
        //                 {

        //                     available_sizes.filter(size=>size.size===selectedSize && Number(size.quantity)>0).map((size,idx)=>{
        //                         return size.quantity<10?<p id="qty-left" style={{color:"red"}} key={idx}>Only {size.quantity} left !</p>:<p style={{color:"green"}}>Available</p>
        //                     })
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // </div>

    )
}

export default Variants