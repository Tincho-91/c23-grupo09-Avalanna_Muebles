import React from "react";
import {useState, useEffect} from "react";
import { Route, Routes, Link } from "react-router-dom"

function ListCategories() {
 
  const [totalCategories, setTotalCategories] = useState({})
  
  useEffect(()=>{

    const getCategories = async () =>{
     try {
         const resp = await fetch(`https://966v15r3-3000.brs.devtunnels.ms/api/products/`)
         
          const products = await resp.json()
          console.log("products", products.countByCategory);

         setTotalCategories(products.countByCategory);
         
         
        
     } catch (error) {
         console.log(error);
     }}

     getCategories()
     console.log("esto es totalCategories: ", totalCategories);

 },[])
 

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        { !totalCategories.COCINA ?(
 
<>
          <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Total de productos en cada categoría
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
          
       <div className="col-lg-6 mb-4">
          <div className="card bg-dark text-white shadow">
            <div className="card-body"><h3>Cargando...</h3></div>
          </div>
        </div>
           
          </div>
        </div>
        </>

        ) :(
<>
          <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Total de productos en cada categoría
          </h5>
        </div>
        <div className="card-body">
          <div className="row card-row-categorie">
          { Object.entries(totalCategories).map(([prop, value],i)=>{
          return  <div className="col-lg-6 mb-4 container-top-row-card" key={i}>
          <div className="card bg-dark text-white shadow container-top-row-card">
            <div className="card-body top-row-card">{prop}: {value} </div>
          </div>
        </div>
        })}
           
            
          </div>
        </div>
        </>
        )}
        
      </div>
    </div>
  );
}

export default ListCategories;
