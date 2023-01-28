function generateFilterOptions(node, gender = null) {
    const { filters: filters_json, products } = node
    const colorSet = new Set()
    const brandSet = new Set()
    const extraSets = []

    const filters = filters_json?.strapi_json_value || []

    products.filter(p => !gender || p.collection_gender === gender).forEach(p => {
        colorSet.add(p.color.split('-')[0])
    });

    products.filter(p => !gender || p.collection_gender === gender).forEach(p => {
        brandSet.add(p.company.name)
    });

    filters.forEach(f => {
        const fset = new Set()
        let key = ""

        if (f == 'size') {
            key = 'sizes'
        }

        if (key === "") return;

        products.filter(p => !gender || p.collection_gender === gender).forEach(p => {
            if (!p?.options?.sizes?.length) return;

            p.options?.sizes?.forEach(s => fset.add(s))
        });
        extraSets.push({
            category: f,
            label: 'Размер',
            items: Array.from(fset).sort((a, b) => sortOptions(a, b, f)).map(el => ({ name: el, value: true }))
        })
    })

    console.log(extraSets)


    const allFilters = [
        {
            category: "color",
            label: 'Цвет',
            items: Array.from(colorSet).sort((a, b) => sortOptions(a, b)).map(c => ({ name: c, value: true }))
        },
        {
            category: "brand",
            label: 'Бренд',
            items: Array.from(brandSet).sort((a, b) => sortOptions(a, b)).map(b => ({ name: b, value: true }))
        },
        ...extraSets
    ]

    return allFilters
}

function sortOptions(a, b, category='') {
    if (category == 'size') {
        return +a > +b ? 1 : -1
    }

    return a > b ? 1 : -1
}

module.exports = { generateFilterOptions }