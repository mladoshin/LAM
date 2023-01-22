import React, { useEffect, useState } from 'react'
import Icon from '../Icons/Icon';
import * as styles from "./SortDropdown.module.css";
import Config from "../../config.json"
import capitilize from '../../helpers/capitilize';

const options = Object.values(Config.sort).map(sk => ({ sort: sk, order: Config.sortOrder.DESC }))

function SortDropdown({ sortState, setSortState, showSort, setShowSort }) {

    useEffect(() => {
        window.addEventListener('mouseup', (e) => {
            const path = e.composedPath()
            const el = document.getElementById("sort-dropdown")

            if (path.indexOf(el) === -1) {
                // close
                setShowSort(false)
                console.log(path)
            } else {
                setShowSort(true)
            }

        })
    }, [])


    function toggleOrder() {
        const state = { ...sortState }
        state.order = state.order === Config.sortOrder.DESC ? Config.sortOrder.ASC : Config.sortOrder.DESC
        console.log(state)
        setSortState(state)
    }

    function setSortOrder(idx){
        const state = options[idx]
        setSortState(state)
    }

    console.log(sortState)

    return (
        <>
            <div
                className={`${styles.iconContainer} ${styles.sortContainer}`}
                id="sort-dropdown"
            >
                <span>Sort by</span>
                <Icon symbol={'caret'} />
                <SortPanel open={showSort} options={options} state={sortState} toggleOrder={toggleOrder} setSortOrder={setSortOrder}/>
            </div>

        </>
    )
}

function SortPanel({ open, options, state, toggleOrder, setSortOrder }) {

    return (
        <div className={`${styles.panel} ${open ? styles.open : ''}`}>
            {options.map((opt, idx) => (
                <div
                    key={opt.sort}
                    className={`${styles.item} ${state.sort === opt.sort ? styles.active_item : ''}`}
                    onClick={() => state.sort === opt.sort ? toggleOrder() : setSortOrder(idx)}
                >
                    <span>{capitilize(opt.sort)}</span>

                    {state.sort === opt.sort && <span>{state.order === Config.sortOrder.DESC ? '↓' : '↑'}</span>}

                </div>
            ))}
        </div>
    )
}

export default SortDropdown