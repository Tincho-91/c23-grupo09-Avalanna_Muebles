import React from 'react';
import {useState, useEffect} from "react";

function LastProduct(){
    const [product,setProduct]= useState({});

    useEffect(()=>{
        const getProduct = async () =>{
            try {
            const resp = await fetch(`https://8v2lk96m-3000.brs.devtunnels.ms/api/products/`)
            const products = await resp.json()

            const id = +products.count
            console.log("id", id);
            const response = await fetch(`https://8v2lk96m-3000.brs.devtunnels.ms/api/products/detail/${id}`)
            const prod = await response.json()
             setProduct(prod)
            } catch (error) {
                console.log(error);
            }
        }
        getProduct()
    }, [])


    return(
       <>
       
<div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Producto creado recientemente</h5>
                </div>
                <div className="card-body">
                    { product.name ? (
                        <>
                    <div className="text-center">
                      <h3>{product.name}</h3>
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={product.imageUrl} alt="imagen"/>
                    </div>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href={product.detail}>Ver detalle</a>
                    </>
                    ) : (
                        <h3>Cargando...</h3>
                    )}
                </div>
            </div>
        </div>
        </>
    )
    
}

export default LastProduct;
