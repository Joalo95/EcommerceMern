import React, { useState } from 'react'
import { Input } from '@chakra-ui/react'

const Search = ({ history }) => {
    const [keyword, setkeyword] = useState('')
    const Handlesearch = (e) => {
        if (keyword.trim() && e.which == 13) {
            history.push(`/search/${keyword}`)
        } else {
        }
    }
    return (
        <div className='Searcharea'>
            <Input size="lg" value={keyword} onChange={e => setkeyword(e.target.value)} onKeyPress={Handlesearch} bgColor='white' placeholder="Búsqueda" />
        </div>
    )
}

export default Search