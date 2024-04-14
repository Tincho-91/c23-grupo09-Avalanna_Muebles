import React from 'react';
import {useState, useEffect} from "react";
import { Route, Routes, Link } from "react-router-dom"
import CardLastProduct from './LastProduct';

function ContentProducts(){
    const [products, setProducts] = useState([]);
    const [keys, setKeys] = useState([])
    const [page, setPage]=useState("1");
    const [recentProduct, setLastProduct] = useState({})

    const plusOne = (e)=>{
        e.preventDefault()
        setPage(+page+1)
    }

    const minusOne = (e)=>{
        e.preventDefault()
        setPage(+page-1)
    }

    useEffect(()=>{

       const getProducts = async () =>{
        try {
            const resp = await fetch(`https://8v2lk96m-3000.brs.devtunnels.ms/api/products/?page=${page}`)
          console.log("page", page);
             const products = await resp.json()
             console.log("resp:",resp);
             console.log("esto es products", products);
            setProducts(products.products)
            const newKeys = Object.keys(products.products[0])
             newKeys.pop()
             newKeys.pop()
            const onlyKeys = newKeys.filter(key=> key != "description")
            setKeys(onlyKeys)
           const lastCreated = products[products.length - 1]
           console.log("LAST CREATED", lastCreated);
           setLastProduct(lastCreated)
        } catch (error) {
            console.log(error);
        }}

        getProducts()
    },[page])
    
    console.log("esto es keys", keys);
    console.log("esto es products", products);
    console.log("recenetPRODUCT",recentProduct);
    
    
    return (
        <React.Fragment>
		  <main className="dashboard__main">
        <h1> PRODUCTOS</h1>
        <div>
  <button><a href="/products/formCreate">Crear producto</a></button>
</div>

<table className="dashboard__main__table">
  <thead className="dashboard__main__table__thead">
    <tr>
     { keys.map(propiedad=> { 
        return(
        <th>
           {propiedad.toUpperCase()}
        </th>)
         })}
          <th> DETAIL </th>
    </tr>
  </thead>
  <tbody className="dashboard__main__table__tbody">
  {products.map(obj=> { 
  return(
      <tr className="dashboard__main__table__tbody__fila">
        {keys.map(prop=> {
            return(
            prop == "image" ? ( 
              <td className='dashboard__main__table__tbody__fila-td-img'> <img src={`${obj.image}`} alt={`${obj.image}`}/> </td>
            ) : (
                prop == "id" ? (
                <td className='dashboard__main__table__tbody__fila-td-id'>
                   {obj.id}
                </td>
                ):(
                <td>
                   {obj[prop]}
                </td>
                )
            ))})}

                    <td className="dashboard__main__table__tbody__buttons">
                      
                      <Link to={`${obj.detail}`}>
                      <i className="fa-solid fa-eye"></i>
                        
                    </Link>
                    </td>
      </tr>
      )})}
  </tbody>
</table>

<div>
< CardLastProduct {...recentProduct} key={recentProduct} />
</div>

      </main>



        </React.Fragment>
    )
}
export default ContentProducts;