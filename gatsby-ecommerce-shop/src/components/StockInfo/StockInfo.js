import React from 'react'

function StockInfo({ stock }) {
    return (
        <span style={{ color: stock ? "#7f7f7f": "#f21827", fontSize: ".875rem", lineHeight: "1.25rem"}}>
            {stock ? "В наличии" : "Нет в наличии"}
        </span>
    )
}

export default StockInfo