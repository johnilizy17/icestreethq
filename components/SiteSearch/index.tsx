import React from 'react'
import SearchBar from '../SearchBar/indext'
import SearchResultItem from './components/SearchResultItem'

const SiteSearch = () => {

    const handleSearchChange = (searchValue: string) => {

    }

    return (
        <div className={'w-full bg-white relative'} >
            <SearchBar onSearchChange={handleSearchChange} showButton={true} placeholder="Search on this site" />

            {/* <div className='lg:pt-[40px] px-8 w-full h-[300px] overflow-y-scroll absolute z-50 rounded-[5px] top-full left-0 shadow-xl bg-white' >
                <SearchResultItem
                    imageUrl="/images/items/g1.png"
                    altText="G4"
                    title="1 liter of groundnut oil"
                />
            </div> */}
        </div>
    )
}

export default SiteSearch