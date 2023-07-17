import React, { useRef, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Image } from '@chakra-ui/react'
import HashLoader from "react-spinners/HashLoader";
import './aboutcss.css'

const About = () => {
    const Line = useRef(null);
    const text = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            Line.current.classList.add('lineon')
            text.current.classList.add('titleon');
        }, 5)
        return () => {

        }
    }, [])

    return (

        <>
            <Helmet>
                <title>Sobre Nosotros</title>
            </Helmet>


            <div className='headingA'>
                <div className='line' ref={Line}>
                </div>
                <h1 className='title' ref={text}>Sobre Nosotros</h1>
            </div>
            <div className='Content1'>
                <div className='text'>
                    <h1>
                        Porqué?
                    </h1>
                    <p>
                        Somos más que una plataforma de ecommerce, somos un puente entre nuestros
                        clientes y los productos que buscan. Nuestra visión es liderar el mercado
                        online con un servicio rápido, fácil y seguro, que se adapta a las necesidades
                        y preferencias de nuestros usuarios. Para ello, nos apoyamos en una amplia red
                        de vendedores en todo el país que nos permite ofrecer los mejores precios y lo
                        más cerca posible de su ubicación. Así, no solo brindamos soluciones a nuestros
                        clientes, sino que también fomentamos el crecimiento del comercio electrónico
                        en el país.
                    </p>
                </div>

                <div className='imagecontainer'>
                    <div className='Imageabt'>
                        <Image className='mImage' boxSize='400px' objectFit="cover" src='https://images.unsplash.com/photo-1614771637369-ed94441a651a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80' alt="" />
                    </div>
                </div>
            </div>
            <div className='Content2'>

                <div className='imagecontainer'>
                    <div className='Imageabt'>
                        <Image className='mImage' boxSize='400px' objectFit="cover" src='https://images.unsplash.com/photo-1614038276039-667c23bc32fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=389&q=80' alt="" />
                    </div>
                </div>
                <div className='text'>
                    <h1>
                        Cómo?
                    </h1>
                    <p>
                        Nuestra misión es crear un vínculo entre nuestros clientes y los productos que
                        buscan, basado en la responsabilidad, la sostenibilidad y la eficiencia. Para
                        ello, impulsamos el consumo local, respaldando a los emprendedores que ofrecen
                        productos de calidad y que se alinean con nuestro valor de cuidar el medio
                        ambiente. Asimismo, nos actualizamos constantemente con las nuevas tecnologías,
                        buscando siempre optimizar la experiencia de compra de nuestros usuarios y
                        ofrecerles un servicio personalizado, seguro y confiable.
                    </p>
                </div>
            </div>
        </>

    )
}

export default About
