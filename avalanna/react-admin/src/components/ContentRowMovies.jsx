import React from 'react';
import SmallCard from './SmallCard';
import {useState, useEffect} from "react";

/*  Cada set de datos es un objeto literal */

function ContentRowMovies(){
    const [productsCount, setProductsCount] = useState({})
    const [usersCount, setUsersCount] = useState({})
    const [categoriesCount, setCategoriesCount] = useState({})

    useEffect(()=>{
        const getFetch = async () =>{
            try {
                const respProducts = await fetch(`https://966v15r3-3000.brs.devtunnels.ms/api/products/`)
                const products = await respProducts.json();
                console.log("respProducts", products);

                const respUsers = await await fetch(`https://966v15r3-3000.brs.devtunnels.ms/api/users/all`)
                const users = await respUsers.json()
                console.log("respusers", users);
                const prodObject = {
                    name: "Productos",
                    total: products.count
                }

                setProductsCount(prodObject);

                const usersObject = {
                    name: "Usuarios",
                    total: users.count
                }
                
                setUsersCount(usersObject);
                
                const totalCategories = Object.keys(products.countByCategory)
            
                const catObject = {
                    name: "Categorías",
                    total: totalCategories.length
                }

                setCategoriesCount(catObject)
           
            } catch (error) {
                console.log(error)
            }


        }
        getFetch();
        console.log("productsCount", productsCount);
        console.log("users", usersCount);
        console.log("CATEGORIES", categoriesCount);


    }, [])

    const cartProps = [productsCount, usersCount, categoriesCount]

    return (
    
        <div className="row">
            { !cartProps[0].name ? (
                <h1>Cargando...</h1>
            ) : (
                <>
                {cartProps.map( (responses, i) => {

                    return <SmallCard {...responses} key={i}/>
                
                })}
    </>
            )}
            
        </div>
    )
}

export default ContentRowMovies;