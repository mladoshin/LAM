import React, {useState, useEffect} from 'react'
import config from '../config.json'

function useFilter({ products, filter }) {
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [filterState, setFilterState] = useState(config.filters);
    const [sortState, setSortState] = useState({sort: config.sort.BY_POPULARITY, order: config.sortOrder.DESC})

    useEffect(()=>{
        console.log("Filtering products...")
        console.log(filterState)
    }, [filterState])

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