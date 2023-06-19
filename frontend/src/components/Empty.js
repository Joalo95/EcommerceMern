import React, { useState } from 'react'
import { ReactComponent as EmptyS } from "./Empty.svg"
import { Link } from "react-router-dom";
import { RiArrowRightSLine, TiArrowRight, BsArrowBarRight } from "react-icons/all";


const Empty = () => {
    const [arrow, setarrow] = useState(false)
    return (
        <div className='Emptycart'>
            <EmptyS className='illustration' />
            <div className='textempty'>
                <h1>
                    Wow, un carrito tan vacío
                </h1>

                <Link to='/shop' className='goshop' onMouseOver={() => { setarrow(true) }} onMouseLeave={() => { setarrow(false) }}>
                    Ir a comprar
                    {!arrow ? <RiArrowRightSLine className='arrow' /> : <BsArrowBarRight className='arrow' />}
                </Link>
            </div>



        </div>
    )
}

export default Empty
