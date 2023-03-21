import React, { useState } from 'react'
import './ExpandableDiv.scss'
import AddOutlined from '@mui/icons-material/AddOutlined'
import Remove from '@mui/icons-material/Remove'


function ExpandableDiv() {
    const[expanded,setExpanded]=useState(false);

    const handleCollapsible=(data:string)=>{
        // setExpanded(!expanded);
        var content=document.getElementById(data)!;
        // console.log(content.style.height)
        if(content.style.height==='0px'){
            setExpanded(true)
            content.style.height=content.scrollHeight+'px';
        }
        else{
            setExpanded(false);
            content.style.height=0+'px';
        }
    }
  return (
    // <>
    // <div>
    //     <div className="collapsible" onClick={handleCollapsible}>Open Collapsible</div>
    //     <div className="collapsible-content">
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    //     </div>
    // </div>
    // </>
    <>
    <div className="product-info" onClick={()=>{handleCollapsible('product-info')}}>
        <div>Materials and care information</div>
        <div>{expanded?<Remove/>:<AddOutlined/>}</div>
        
    </div>
    <div className='product-info-content' id="product-info">
       Wash in cold (30°C or below) water, whether using a washing machine or washing by hand. Give garments a gentle stretch when they come out of the wash to get them back into shape. 
    </div>
    </>
  )
}

export default ExpandableDiv