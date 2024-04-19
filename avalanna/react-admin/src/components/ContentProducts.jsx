import React from 'react';
import {useState, useEffect} from "react";
import { Route, Routes, Link } from "react-router-dom"
import LastProduct from './LastProduct';


function ContentProducts(){
    const [products, setProducts] = useState([]);
    const [keys, setKeys] = useState([])
    const [page, setPage]=useState("1");
    const [fetchResponse, setFetchResponse] = useState({})


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
            const resp = await fetch(`https://966v15r3-3000.brs.devtunnels.ms/api/products/?page=${page}`)
            console.log("page", page);
             const products = await resp.json()
             console.log("resp:",resp);
             console.log("esto es products", products);
             setFetchResponse(products)
             const arrayProducts = products.products
            setProducts(arrayProducts)
            const newKeys = Object.keys(products.products[0])
        
            const onlyKeys = newKeys.filter(key=> key != "description" && key != "detail")
            setKeys(onlyKeys)
            
           
        } catch (error) {
            console.log(error);
        }}
        window.scrollTo(0, 0);
        getProducts()
        

    },[page])
    


    
    console.log("esto es keys", keys);
    console.log("esto es products", products);

    
    
    return (
        <React.Fragment>
          {products.length > 0 ? (
		  <main className="dashboard__main">
      

        <h1> PRODUCTOS</h1>
        <div>
  <button className='dashboard__main-div-button'><Link to="http://localhost:3000/products/formCreate">Crear producto</Link></button>
</div>
<section>
<table className="dashboard__main__table">
  <thead className="dashboard__main__table__thead">
    <tr>
     { keys.map((propiedad, i)=> { 
        return(
          propiedad == "associations" ? (
            <th key={propiedad+i}>
              CATEGORIE
         </th>
        ) : ( 
          <th key={propiedad+i}>
          {propiedad.toUpperCase()}
       </th>)
        )
         })}
          <th> ACTIONS </th>
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
                  prop == "associations" ? (
                    <td key={i+prop}>
                    {obj.associations[0].categories.name}
                 </td>
                  ) : (
                <td key={i+prop}>
                   {obj[prop]}
                </td>
                  )
                )
  ))})}

                    <td className="dashboard__main__table__tbody__buttons"  key={obj+i}>
                      
                      <Link to={`${obj.detail}`}>
                      <i className="fa-solid fa-eye"></i>
                    </Link>

                    <Link to={`http://localhost:3000/products/formEdit/${obj.id}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    </td>
      </tr>
      )})}
  </tbody>
</table>

<LastProduct />


</section>

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