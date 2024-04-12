import React from 'react';
import {useState, useEffect} from "react";
import { Route, Routes, Link } from "react-router-dom"

function ContentUsers(){
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        
       const getUsers = async () =>{
        try {
            const resp = await fetch("https://8v2lk96m-3000.brs.devtunnels.ms/api/users/all?page=1")
          
             const usuarios = await resp.json()
             console.log("resp:",resp);
             console.log("esto es usuarios",usuarios);
            setUsers(usuarios.users)
        } catch (error) {
            console.log(error);
        }}

        getUsers()
    },[])

    
    console.log("usuarios: ", users);
    
    return (
        <React.Fragment>
			
<main className="products__main">

<section className="products__main__section">
    <h1>Nuestros usuarios</h1>
    {users.map((user,i)=>{
    
        return(
         <article className="products__main__section__article" key={i+user}>
            
            <div className="products__main__section__article__a" id="products__main__section__article_div">
                
                <img src={`${user.profileImage}`} alt=""/>
        
                <div className="products__main__section__div">
                    <h3> {user.nameAndSurname} </h3>
                    
                        <p className="tachado products__main__descuento-p"> {user.email}  </p>
                        <p></p>
                        <Link  to={`http://localhost:3000/users/editar/${user.id}`}>
                        <p className="tachado products__main__descuento-p"> Ver perfil </p>
                         </Link>
                        
                </div>
            </div>
        </article>
    )})}
        
    
</section>

</main>


        </React.Fragment>
    )
}
export default ContentUsers;