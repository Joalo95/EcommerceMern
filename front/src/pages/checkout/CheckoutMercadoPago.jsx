import React, { useState, useEffect } from 'react';
import { MercadoPago } from 'mercadopago';
import "./checkoutMercadoPago.css";

const CheckoutMercadoPago = () => {
    const [mercadoPagoPublicKey, setMercadoPagoPublicKey] = useState('');
    const [productCost, setProductCost] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [cardForm, setCardForm] = useState(null);

    useEffect(() => {
        setMercadoPagoPublicKey(document.getElementById('mercado-pago-public-key').value);
        setProductCost(document.getElementById('amount').value);
        setProductDescription(document.getElementById('product-description').innerText);
    }, []);

    useEffect(() => {
        if (mercadoPagoPublicKey) {
            const mercadopago = new MercadoPago(mercadoPagoPublicKey);
            setCardForm(mercadopago.cardForm({
                amount: productCost,
                autoMount: true,
                form: {
                    id: 'form-checkout',
                    cardholderName: {
                        id: 'form-checkout__cardholderName',
                        placeholder: 'Holder name',
                    },
                    cardholderEmail: {
                        id: 'form-checkout__cardholderEmail',
                        placeholder: 'E-mail',
                    },
                    cardNumber: {
                        id: 'form-checkout__cardNumber',
                        placeholder: 'Card number',
                    },
                    cardExpirationMonth: {
                        id: 'form-checkout__cardExpirationMonth',
                        placeholder: 'MM',
                    },
                    cardExpirationYear: {
                        id: 'form-checkout__cardExpirationYear',
                        placeholder: 'YY',
                    },
                    securityCode: {
                        id: 'form-checkout__securityCode',
                        placeholder: 'Security code',
                    },
                    installments: {
                        id: 'form-checkout__installments',
                        placeholder: 'Installments',
                    },
                    identificationType: {
                        id: 'form-checkout__identificationType',
                    },
                    identificationNumber: {
                        id: 'form-checkout__identificationNumber',
                        placeholder: 'Identification number',
                    },
                    issuer: {
                        id: 'form-checkout__issuer',
                        placeholder: 'Issuer',
                    },
                },
                callbacks: {
                    onFormMounted: error => {
                        if (error)
                            return console.warn('Form Mounted handling error:', error);
                        console.log('Form mounted');
                    },
                    onSubmit: event => {
                        event.preventDefault();
                        document.getElementById('loading-message').style.display = 'block';

                        const { paymentMethodId, issuerId, cardholderEmail, amount, token, installments, identificationNumber, identificationType } = cardForm.getCardFormData();

                        fetch('/process_payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body:
                                JSON.stringify({
                                    token,
                                    issuerId,
                                    paymentMethodId,
                                    transactionAmount:
                                        Number(amount),
                                    installments:
                                        Number(installments),
                                    description:
                                        productDescription,
                                    payer:
                                    {
                                        email:
                                            cardholderEmail,
                                        identification:
                                        {
                                            type:
                                                identificationType,
                                            number:
                                                identificationNumber
                                        }
                                    }
                                })
                        })
                            .then(response => response.json())
                            .then(result => {
                                if (!result.hasOwnProperty('error_message')) {
                                    document.getElementById('success-response').style.display = 'block';
                                    document.getElementById('payment-id').innerText = result.id;
                                    document.getElementById('payment-status').innerText = result.status;
                                } else {
                                    document.getElementById('error-response').style.display = 'block';
                                    document.getElementById('error-message').innerText = result.error_message;
                                }
                                document.getElementById('loading-message').style.display = 'none';
                            });
                    }
                }
            }));
        }
    }, [mercadoPagoPublicKey]);

    return (
        <>
            <input id="mercado-pago-public-key" value={mercadoPagoPublicKey} type="hidden" />
            <main>
                <section className="shopping-cart dark">
                    <div className="container container__cart">
                        <div className="block-heading">
                            <h2>Shopping Cart</h2>
                            <p>This is an example of a Mercado Pago integration</p>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="col-md-12 col-lg-8">
                                    <div className="items">
                                        <div className="product">
                                            <div className="info">
                                                <div className="product-details">
                                                    <div className="row justify-content-md-center">
                                                        <div className="col-md-3">
                                                            <img
                                                                className="img-fluid mx-auto d-block image"
                                                                src="img/product.png"
                                                            />
                                                        </div>
                                                        <div className="col-md-4 product-detail">
                                                            <h5>Product</h5>
                                                            <div className="product-info">
                                                                <p>
                                                                    <b>Description: </b>
                                                                    <span id="product-description">Some book</span>
                                                                    <br />
                                                                    <b>Author: </b>Dale Carnegie
                                                                    <br />
                                                                    <b>Number of pages: </b>336
                                                                    <br />
                                                                    <b>Price:</b> $<span id="unit-price">10</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 product-detail">
                                                            <label htmlFor="quantity">
                                                                <h5>Quantity</h5>
                                                            </label>
                                                            <input
                                                                type="number"
                                                                id="quantity"
                                                                value="1"
                                                                min="1"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-4">
                                    <div className="summary">
                                        <h3>Cart</h3>
                                        <div className="summary-item">
                                            <span className="text">Subtotal</span>
                                            <span className="price" id="cart-total"></span>
                                        </div>
                                        <button
                                            className="btn btn-primary btn-lg btn-block"
                                            id="checkout-btn"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Payment */}
                <div className="form-group col-sm-12">
                    <input type="hidden" id="amount" />
                    <input type="hidden" id="description" />
                    <br />
                    <button
                        id="form-checkout__submit"
                        type="submit"
                        className="btn btn-primary btn-block"
                    >
                        Pay
                    </button>
                    <br />
                    <p id="loading-message">Loading, please wait...</p>
                    <br />
                    <a id="go-back">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 10 10"
                            className="chevron-left"
                        >
                            <path
                                fill="#009EE3"
                                fillRule="nonzero"
                                id="chevron_left"
                                d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"
                            ></path>
                        </svg>
                        Go back to Shopping Cart
                    </a>
                </div>

                <section className="payment-form dark">
                    <div className="container__payment">
                        <div className="block-heading">
                            <h2>Card Payment</h2>
                            <p>This is an example of a Mercado Pago integration</p>
                        </div>
                        <div className="form-payment">
                            <div className="products">
                                <h2 className="title">Summary</h2>
                                <div className="item">
                                    <span className="price" id="summary-price"></span>
                                    <p className="item-name">
                                        Book x <span id="summary-quantity"></span>
                                    </p>
                                </div>
                                <div className="total">
                                    Total<span className="price" id="summary-total"></span>
                                </div>
                            </div>
                            <div className="payment-details">
                                <form id="form-checkout">
                                    <h3 className="title">Buyer Details</h3>
                                    <div className="row">
                                        <div className="form-group col">
                                            <input
                                                id="form-checkout__cardholderEmail"
                                                name="cardholderEmail"
                                                type="email"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-sm-5">
                                            <select
                                                id="form-checkout__identificationType"
                                                name="identificationType"
                                                className="form-control"
                                            ></select>
                                        </div>
                                        <div className="form-group col-sm-7">
                                            <input
                                                id="form-checkout__identificationNumber"
                                                name="docNumber"
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <h3 className="title">Card Details</h3>
                                    <div className="row">
                                        <div className="form-group col-sm-8">
                                            <input
                                                id="form-checkout__cardholderName"
                                                name="cardholderName"
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <div className="input-group expiration-date">
                                                <input id="form-checkout__cardExpirationMonth" name="cardExpirationMonth" type="text" className="form-control" />
                                                <span className="date-separator">/</span>
                                                <input id="form-checkout__cardExpirationYear" name="cardExpirationYear" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group col-sm-8">
                                            <input id="form-checkout__cardNumber" name="cardNumber" type="text" className="form-control" />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <input id="form-checkout__securityCode" name="securityCode" type="text" className="form-control" />
                                        </div>
                                        <div id="issuerInput" className="form-group col-sm-12 hidden">
                                            <select id="form-checkout__issuer" name="issuer" className="form-control" >
                                            </select >
                                        </ div >
                                        <div className="form-group col-sm-12" >
                                            <select id="form-checkout__installments" name="installments" type="text" classNam="form-control" >
                                            </select >
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-12">
                                        <input type="hidden" id="amount" />
                                        <input type="hidden" id="description" />
                                        <br />
                                        <button id="form-checkout__submit" type="submit" className="btn btn-primary btn-block">Pay</button>
                                        <br />
                                        <p id="loading-message">Loading, please wait...</p>
                                        <br />
                                        <a id="go-back">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" class="chevron-left">
                                                <path fill="#009EE3" fill-rule="nonzero" id="chevron_left" d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"></path>
                                            </svg>
                                            Go back to Shopping Cart
                                        </a>
                                    </div>
                                </ form >
                            </ div >
                        </ div >
                    </ div >
                </ section >


                {/* Result */}
                <section className="shopping-cart dark">
                    <div className="container container__result">
                        <div className="block-heading">
                            <h2>Payment Result</h2>
                            <p>This is an example of a Mercado Pago integration</p>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="col-md-12 col-lg-12">
                                    <div className="items product info product-details">
                                        <div className="row justify-content-md-center">
                                            <div className="col-md-4 product-detail">
                                                <div className="product-info">
                                                    <div id="fail-response">
                                                        <br />
                                                        <img src="img/fail.png" width="350px" />
                                                        <p className="text-center font-weight-bold">
                                                            Something went wrong
                                                        </p>
                                                        <p id="error-message" className="text-center"></p>
                                                        <br />
                                                    </div>
                                                    <div id="success-response">
                                                        <br />
                                                        <p>
                                                            <b>ID: </b>
                                                            <span id="payment-id"></span>
                                                        </p>
                                                        <p>
                                                            <b>Status: </b>
                                                            <span id="payment-status"></span>
                                                        </p>
                                                        <p>
                                                            <b>Detail: </b>
                                                            <span id="payment-detail"></span>
                                                        </p>
                                                        <br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >
            <footer>
                <div class="footer_logo">
                    <img id="horizontal_logo" src="./horizontal_logo.png" />
                </div>
            </footer>
        </>
    );
};


export default CheckoutMercadoPago;
