import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardProduct from './CardProduct'
import { ListProducts, ListProductByCg, ListProductByFilter, ListProductByPrice } from '../actions/productActions'
import { BsFilter } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import Search from './Search';
import { NumberInput, NumberInputField, FormLabel, Button, Stack, FormControl } from "@chakra-ui/react"
import HashLoader from "react-spinners/HashLoader";
import { Link, Route } from 'react-router-dom'
const ProductsC = ({ match, history }) => {
    const [From, setFrom] = useState(0)
    const [To, setTo] = useState(0)

    let Cg = window.location.search ? window.location.search.split('=')[1] : null
    const keyword = window.location.pathname.split('/')[2]
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const productbycg = useSelector((state) => {
        return state.productbycg
    })
    const productbyfilter = useSelector((state) => {
        return state.productbyfilter
    })
    const productbyprice = useSelector((state) => {
        return state.productbyprice
    })

    const { loading, error, products } = productbycg ? productbycg : productList ? productList : productbyprice;
    useEffect(() => {

        if (Cg) {
            console.log(window.location.search.split('=')[0])
            if (window.location.search.split('=')[0] === '?cg') {
                dispatch(ListProductByCg(Cg))
                console.log(products)

            } else {
                dispatch(ListProductByFilter(Cg))

            }
        } else {
            dispatch(ListProducts(keyword))
        }

    }, [dispatch, Cg, keyword])
    const [showfilter, setshowfilter] = useState(false);
    const [showsearch, setshowsearch] = useState(false);
    const filterfunc = () => {
        setshowfilter(!showfilter);
        if (showsearch) {
            setshowsearch(false)
        }

    }
    const searchfunc = () => {
        setshowsearch(!showsearch);
        if (showfilter) {
            setshowfilter(false)
        }
    }
    const pricehandler = () => {
        dispatch(ListProductByPrice(From, To))
    }

    return (
        <>
            <div className='Cgfilter'>
                <h1>{Cg ? Cg : keyword ? "*" + keyword + "* Search" : 'All'} Productos</h1>
                <div className='filtersbtn '>
                    <button className={`filterbtn ${showfilter ? 'activebtn' : ''}`}
                        onClick={filterfunc} > {showfilter ? <IoMdClose size='20' /> : <BsFilter size='20' />}
                        Filtros
                    </button>

                    <button className={`searchbtn ${showsearch ? 'activebtn' : ''}`} onClick={searchfunc}>{showsearch ? <IoMdClose size='20' /> : <AiOutlineSearch size='20' />}Buscar</button>
                </div>

                <div className='filters'>
                    <ul>
                        <Link className='lined' to='?cg'>Todo</Link>
                        <Link className='lined' to='?cg=Men'>Hombre</Link>
                        <Link className='lined' to='?cg=Women'>Dama</Link>
                        <Link className='lined' to='?cg=Watches'>Relojes</Link>
                        <Link className='lined' to='?cg=Shoes'>Zapatos</Link>
                        <Link to='?cg=Bag' className='lined'>Bolsos</Link>
                    </ul>
                </div>
            </div>
            {showsearch && <Route render={({ history }) => <Search history={history} />} />}
            <div className={`filterarea ${showfilter ? 'filter' : 'filteroff'}`}>
                <div className='sortbydiv'>
                    <h1>Ordenar por</h1>
                    <ul>
                        <Link onClick={() => (setshowfilter(false))} className='lined' to='?filter'>Por defecto</Link>
                        <Link onClick={() => (setshowfilter(false))} className='lined' to='?filter=Rating'>Puntaje</Link>
                        <Link onClick={() => (setshowfilter(false))} className='lined' to='?filter=date'>Fecha</Link>
                        <Link onClick={() => (setshowfilter(false))} className='lined' to='?filter=highprice'>De menor a mayor precio</Link>
                        <Link onClick={() => (setshowfilter(false))} className='lined' to='?filter=lowprice'>De mayor a menor precio</Link>
                    </ul>
                </div>
                <div className='pricediv'>
                    <h1> Precio</h1>
                    <FormControl id="email">
                        <Stack spacing={2}>
                            <FormLabel>Desde :</FormLabel>
                            <NumberInput value={From} bg='white' onChange={(e) => setFrom(e)} borderRadius="md" borderTopRadius="md" borderTopLeftRadius="md">
                                <NumberInputField />
                            </NumberInput>
                            <FormLabel>A :</FormLabel>
                            <NumberInput value={To} bg='white' onChange={(e) => setTo(e)} borderRadius="md" borderTopRadius="md" borderTopLeftRadius="md">
                                <NumberInputField />
                            </NumberInput>
                            <Button onClick={pricehandler} type="submit" colorScheme="teal">Filtrar</Button>
                        </Stack>
                    </FormControl>

                </div>

            </div>
            {loading ?
                <div className='loading'>
                    <HashLoader color={"#fff"} loading={loading} size={40} />
                </div>
                : error ? <h2>{error} </h2>
                    : products.length === 0 ?
                        <h1 className='nothingfound'>Sin Resultados !!!</h1> : <div className='cardsProduct'>
                            {products.map((product) => (
                                <CardProduct key={product._id} product={product} />

                            ))}


                        </div>}

        </>
    )
}

export default ProductsC
