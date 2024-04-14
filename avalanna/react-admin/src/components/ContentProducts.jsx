import React from 'react';
import {useState, useEffect} from "react";
import { Route, Routes, Link } from "react-router-dom"


function ContentProducts(){
    const [products, setProducts] = useState([]);
    const [keys, setKeys] = useState([])
    const [page, setPage]=useState("1");
    const [lastProduct, setLastProduct] = useState({})
    const [fetchResponse, setFetchResponse] = useState({})

    const getLastProduct = async (response)=>{
      if (response.next) {
        const resp = await fetch(`https://8v2lk96m-3000.brs.devtunnels.ms/api/products/`)
        const allProducts = await resp.json()
        
        const products = allProducts.products
        const recentProduct = products[products.length - 1]
        console.log("hola recentProduct ACAAA", recentProduct);
      }
    }

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
             setFetchResponse(products)
             const arrayProducts = products.products
            setProducts(arrayProducts)
            const newKeys = Object.keys(products.products[0])
             newKeys.pop()
             newKeys.pop()
            const onlyKeys = newKeys.filter(key=> key != "description")
            setKeys(onlyKeys)
            const lastCreated = arrayProducts[arrayProducts.length - 1]
            console.log("a ver length", (arrayProducts.length));
            console.log("LAST CREATED", lastCreated);
            setLastProduct(lastCreated)
           
        } catch (error) {
            console.log(error);
        }}

        getProducts()
        getLastProduct(fetchResponse)

    },[page])


    
    console.log("esto es keys", keys);
    console.log("esto es products", products);
    console.log("lastProduct",lastProduct);
    
    
    return (
        <React.Fragment>
          {products.length > 0 ? (
		  <main className="dashboard__main">
      

        <h1> PRODUCTOS</h1>
        <div>
  <button><a href="/products/formCreate">Crear producto</a></button>
</div>

<table className="dashboard__main__table">
  <thead className="dashboard__main__table__thead">
    <tr>
     { keys.map((propiedad, i)=> { 
        return(
        <th key={propiedad+i}>
           {propiedad.toUpperCase()}
        </th>)
         })}
          <th> DETAIL </th>
    </tr>
  </thead>
  <tbody className="dashboard__main__table__tbody">
  {products.map((obj, i)=> { 
  return(
      <tr className="dashboard__main__table__tbody__fila" key={i+obj}>
        {keys.map((prop,i)=> {
            return(
            prop == "image" ? ( 
              <td className='dashboard__main__table__tbody__fila-td-img' key={i+prop}> <img src={`${obj.image}`} alt={`${obj.image}`}/> </td>
            ) : (
                prop == "id" ? (
                <td className='dashboard__main__table__tbody__fila-td-id' key={i+prop}>
                   {obj.id}
                </td>
                ):(
                <td key={i+prop}>
                   {obj[prop]}
                </td>
                )
            ))})}

                    <td className="dashboard__main__table__tbody__buttons"  key={obj+i}>
                      
                      <Link to={`${obj.detail}`}>
                      <i className="fa-solid fa-eye"></i>
                        
                    </Link>
                    </td>
      </tr>
      )})}
  </tbody>
</table>


<div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Producto creado recientemente</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={lastProduct.image} alt="imagen"/>
                    </div>
                    <p>{lastProduct.id}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
                </div>
            </div>
        </div>


        <div className='products__main__section-div-buttons'>
        {fetchResponse.previous != null ? (
            <>
            <button onClick={minusOne}>Anterior</button>
            </>
        ):(
            <>
            
            </>
        )}
        {fetchResponse.next != null ? (
            <>
            <button onClick={plusOne}>Siguiente</button>
            </>
        ):(
            <>
        
            </>
        )}
        </div> 
      
</main>
) : (
       <main className="dashboard__main">
        <h1>Cargando...</h1>
       </main> 
)}

        </React.Fragment>
    )
}
export default ContentProducts;