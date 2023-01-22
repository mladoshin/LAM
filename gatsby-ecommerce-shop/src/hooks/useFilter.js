import React, {useState, useEffect} from 'react'
import config from '../config.json'

const compare = {
    [config.sortOrder.DESC]: 1,
    [config.sortOrder.ASC]: -1,
}

function useFilter({ products, filter }) {
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [filterState, setFilterState] = useState(config.filters);
    const [sortState, setSortState] = useState({sort: config.sort.BY_POPULARITY, order: config.sortOrder.DESC})

    useEffect(()=>{
        console.log("Filtering products...")
        console.log(filterState)
    }, [filterState])

    useEffect(()=>{
        const sorted = [...filteredProducts]
        sorted.sort(compareFunction)
        setFilteredProducts(sorted)
    }, [sortState])

    const compareFunction = (a, b) => {
        if (sortState.sort === config.sort.BY_PRICE){
            return a.price < b.price ? compare[sortState.order] : -1*compare[sortState.order]
        }else if(sortState.sort === config.sort.BY_DATE){
            return new Date(a.createdAt) < new Date(b.createdAt) ? compare[sortState.order] : -1*compare[sortState.order]
        }
    }

    const filterTick = (e, categoryIndex, labelIndex) => {
        const filterStateCopy = [...filterState];
        filterStateCopy[categoryIndex].items[labelIndex].value = e.target.checked;
        setFilterState(filterStateCopy);
    };

    const resetFilter = () => {
        const filterStateCopy = [...filterState];
        for (let x = 0; x < filterStateCopy.length; x++) {
            for (let y = 0; y < filterStateCopy[x].items.length; y++) {
                filterStateCopy[x].items[y].value = false;
            }
        }
        setFilterState(filterStateCopy);
    };

    return { filteredProducts, filterTick, resetFilter, filterState, sortState, setSortState }
}

export default useFilter