import React from 'react'
import { FiFacebook, AiOutlineHeart, AiOutlineInstagram, IoLogoYoutube } from 'react-icons/all';
import { Input, Stack } from '@chakra-ui/react'
import './footercss.css'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="footerCmp">
            <footer>
                <div className="footerCategorie">
                    <h1>Categorías</h1>
                    <ul>
                        <li><Link to='/shop/?cg=Women'>Dama</Link></li>
                        <li><Link to='/shop/?cg=Men'>Hombre</Link></li>
                        <li><Link to='/shop/?cg=Shoes'>Zapatos</Link></li>
                        <li><Link to='/shop/?cg=Watches'>Relojes</Link></li>
                    </ul>
                </div>

                <div className="fooHelp">
                    <h1>Ayuda</h1>
                    <ul>
                        <li>Seguimiento de pedidos</li>
                        <li>Devoluciones</li>
                        <li>Envíos</li>
                        <li>FAQs</li>
                    </ul>
                </div>

                <div className="footerGetInTouch">
                    <h1>Seguínos en las redes</h1>
                    <ul>
                        <li className="footerIcons">
                            <FiFacebook size="25" />
                        </li>
                        <li className="footerIcons">
                            <AiOutlineInstagram size="25" />
                        </li>
                        <li className="footerIcons">
                            <IoLogoYoutube size="25" />
                        </li>
                    </ul>
                </div>

                <div className="footerNews">
                    <h1>Newsletter</h1>
                    <ul>
                        <li>
                            <Stack spacing={3}>
                                <Input variant="flushed" placeholder="email@example.com" size="10" width="200px" />
                            </Stack>
                        </li>
                        <li>
                            <button className="footerBtn">Suscríbete</button>
                        </li>
                    </ul>
                </div>

                <div className="creditsIcons">
                    <ul>
                        <li><img src="https://i.imgur.com/AHCoUZO.png" className="img1" /></li>
                        <li><img src="https://i.imgur.com/JZRipBg.png" className="img2" /></li>
                        <li><img src="https://i.imgur.com/l8OAGyo.png" className="img3" /></li>
                        <li><img src="https://i.imgur.com/IDHC2iv.png" className="img4" /></li>
                    </ul>

                </div>

                <div className="paragraphFooter">
                    <p>Copyright ©2022 All rights reserved</p>
                </div>



            </footer>

        </div>
    )
}

export default Footer;
