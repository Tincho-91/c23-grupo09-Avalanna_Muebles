import React from 'react';
import {useState, useEffect} from "react";
import { Route, Routes, Link } from "react-router-dom"

function ContentUsers(){
    const [users, setUsers] = useState([]);
    const [page, setPage]=useState("1");

    const plusOne = (e)=>{
        e.preventDefault()
        setPage(+page+1)
    }

    const minusOne = (e)=>{
        e.preventDefault()
        setPage(+page-1)
    }

    useEffect(()=>{

       const getUsers = async () =>{
        try {
            const resp = await fetch(`https://8v2lk96m-3000.brs.devtunnels.ms/api/users/all?page=${page}`)
          console.log("page", page);
             const usuarios = await resp.json()
             console.log("resp:",resp);
             console.log("esto es usuarios",usuarios);
            setUsers(usuarios.users)
           
        } catch (error) {
            console.log(error);
        }}

        getUsers()
    },[page])

    
    console.log("usuarios: ", users);
    
    return (
        <React.Fragment>
			
<main className="products__main">
{users.length > 0 ?(

<section className="products__main__section">
    <h1>Nuestros usuarios</h1>
    {users.map((user,i)=>{
    
        return(
            
         <article className="products__main__section__article" key={i+user}>
            
            <div className="products__main__section__article__a" id="products__main__section__article_div">
                
                <img src={`${user.profileImage}`} alt=""/>
        
                <div className="products__main__section__div">
                    <h3> {user.nameAndSurname} </h3>
                    <p className="tachado products__main__descuento-p"> ID: {user.id}  </p>
                        <p className="tachado products__main__descuento-p "> {user.email}  </p>
                        <div>
                        <Link  to={`http://localhost:3000/users/editar/${user.id}`}>
                        <p className=" see-profile products__main__descuento-p"> Ver perfil </p>
                         </Link>
                         <form action={`http://localhost:3000/users/delete/${user.id}?_method=DELETE`} method="POST">
                                <button type="submit" className="eliminar form__dashboard_users-delete"> <p className=" see-profile products__main__descuento-p">  Eliminar perfil </p>
                                </button>
                              </form>
                              </div>
                        
                </div>
            </div>
        </article>
    )})}
    <div className='products__main__section-div-buttons'>
        {users.previous != null ? (
            <>
            <button onClick={minusOne}>Anterior</button>
            </>
        ):(
            <>
            
            </>
        )}
        {users.next != null ? (
            <>
            <button onClick={plusOne}>Siguiente</button>
            </>
        ):(
            <>
        
            </>
        )}
        </div>
</section>
) : (
    <section className="products__main__section">
    <h1>Cargando...</h1>
    </section>
)}
</main>


        </React.Fragment>
    )
}
export default ContentUsers;