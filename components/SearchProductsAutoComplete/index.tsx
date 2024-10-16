import debounce from "lodash/debounce"
import { useEffect, useMemo, useState } from 'react'
import { getSearchResult } from '../../services/productService'
import SearchBar from '../SearchBar/indext'
import { convertToNumber } from '../utils/index.util'
import ProductSearchResultItem from './ProductSearchResultItem'


interface Props {
    handleProductClicked?: Function
}

const SearchProductAutoComplete = ({ handleProductClicked = () => 1 }: Props) => {
    const [productResults, setProductResult] = useState<ProductDetailsType[]>([])
    const [searchValue, setSearchValue] = useState('');

    const debounceSearch = useMemo(() => {
        return debounce(async () => {
            try {
                const result = await getSearchResult(searchValue)
                setProductResult(result)
            }
            catch (err) {
                console.log(err)
            }

        }, 100)
    }, [searchValue])


    const handleSearchChange = (searchValue: string) => {
        setSearchValue(searchValue);
        debounceSearch()
    };

    useEffect(() => {
        return debounceSearch.cancel();
    })


    return (
        <div className={'w-full bg-white'} >
            <SearchBar onSearchChange={handleSearchChange} />

            <div className='lg:pt-[40px] w-full h-[300px] overflow-y-scroll' >

                {productResults.map((product: any) => {
                    return (
                        <ProductSearchResultItem
                            key={product?._id}
                            price={convertToNumber(product.price)}
                            id={product?._id}
                            imageUrl={product.image}
                            name={product.itemName}
                            handleClick={handleProductClicked} />
                    )
                })}



            </div>
        </div>
    )
}

export default SearchProductAutoComplete