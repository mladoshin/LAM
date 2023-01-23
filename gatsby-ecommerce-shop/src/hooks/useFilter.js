import React, { useState, useEffect, useMemo } from 'react'
import config from '../config.json'

const compare = {
    [config.sortOrder.DESC]: 1,
    [config.sortOrder.ASC]: -1,
}


function useFilter({ products, filter, productFilters }) {
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [filterState, setFilterState] = useState(productFilters || config.filters);
    const [sortState, setSortState] = useState({ sort: config.sort.BY_POPULARITY, order: config.sortOrder.DESC })

    useEffect(() => {
        console.log("filterng")
        // console.log(products)
        const temp = [...products]
        const filtered = temp.filter(filterFunction)

        console.log("Filtered")
        console.log(filtered)
        setFilteredProducts(filtered)
    }, [filterState])

    useEffect(() => {
        const sorted = [...filteredProducts]
        sorted.sort(compareFunction)
        setFilteredProducts(sorted)
    }, [sortState])

    const compareFunction = (a, b) => {
        if (sortState.sort === config.sort.BY_PRICE) {
            return a.price < b.price ? compare[sortState.order] : -1 * compare[sortState.order]
        } else if (sortState.sort === config.sort.BY_DATE) {
            return new Date(a.createdAt) < new Date(b.createdAt) ? compare[sortState.order] : -1 * compare[sortState.order]
        }
    }

    const filterFunction = (el) => {
        let ok = true

        filterState.map(filter => {
            const key = filter.category

            const options = filter.items.filter(el => el.value).map(el => el.name)
            // console.log(options)

            if (key == 'color'){
                if (options.indexOf(el.color.split('-')[0]) === -1) {
                    ok = false
                    return
                }
            }else if (key == 'brand'){
                if (options.indexOf(el.company.name) === -1) {
                    ok = false
                    return
                }
            }else if (key == 'category'){
                if(options.indexOf(el.categories[0].name) == -1){
                    ok = false
                    return
                }
            }
        })

        // console.log(ok)
        return ok
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