import React from 'react';
import PropTypes from "prop-types"


function CardLastProduct(props){
    return(
        <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">Producto creado recientemente</h5>
            </div>
            <div className="card-body">
                <div className="text-center">
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={props.image} alt="imagen"/>
                </div>
                <p>{props.description}</p>
                <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail{props.detail}</a>
            </div>
        </div>
    </div>
    )
}


CardLastProduct.propTypes = {
    atritutes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image:PropTypes.string.isRequired, 
        detail: PropTypes.string.isRequired
    })
}



export default CardLastProduct;