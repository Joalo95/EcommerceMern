import React from 'react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormControl, FormLabel } from "@chakra-ui/react"
const Filter = ({ classac }) => {

    return (
        <div className={`filterarea ${classac}`}>
            <div className='sortbydiv'>
                <h1>Ordenar por</h1>
                <ul>
                    <li className='lined'>Por defecto</li>
                    <li className='lined'>Puntaje</li>
                    <li className='lined'>Fecha</li>
                    <li className='lined'>De menor a mayor precio</li>
                    <li className='lined'>De mayo a menor precio</li>
                </ul>
            </div>
            <div className='pricediv'>
                <h1> Precio</h1>
                <FormControl id="email">
                    <FormLabel>Desde :</FormLabel>
                    <NumberInput bg='white' borderRadius="md" borderTopRadius="md" borderTopLeftRadius="md">
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl id="email">
                    <FormLabel>A :</FormLabel>
                    <NumberInput bg='white' borderRadius="md" borderTopRadius="md" borderTopLeftRadius="md">
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
            </div>
            <div className='colorsdiv'>
                <h1> Color</h1>
                <div className="col" style={{ backgroundColor: 'black' }}></div>NEGRO<br />
                <div className="col" style={{ backgroundColor: 'white' }}></div>BLANCO<br />
                <div className="col" style={{ backgroundColor: 'red' }}></div>ROJO<br />
                <div className="col" style={{ backgroundColor: 'blue' }}></div>AZUL<br />
                <div className="col" style={{ backgroundColor: 'grey' }}></div>GRIS<br />

            </div>

        </div>
    )
}

export default Filter