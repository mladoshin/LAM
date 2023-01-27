import React, {useState, useEffect} from 'react'

function useCart() {
    const [cart, setCart] = useState({
        products: []
    })

    useEffect(()=>{
        //init store
        let cart_st = localStorage.getItem('cart')
        console.log(cart_st)
        if(cart_st){
            //cart already exists
            try{
                cart_st = JSON.parse(cart_st)
                setCart(cart_st)
            }catch(err){
                console.log(err.message)
            }
            
        }else{
            console.log("No local cart found")
            // init a cart in local storage
            localStorage.setItem('cart', JSON.stringify(cart))
        }

    }, [])

    function updateCart(products){
        setCart(c => {
            const tmp = {...c, products}
            console.log(products)
            localStorage.setItem('cart', JSON.stringify(tmp))
            return tmp
        })
    }

    function addProduct(product){
        const {id, name, price, weight, quantity, color, images} = product
        
        console.log(product)
        const products = [...cart.products, product]
        if (name && price >= 0 && quantity >= 0){
            console.log('Adding product')
            updateCart(products)
            // setCart(c => ({...c, products}))
        }
    }

    function removeProduct(args){
        const {rm_id, rm_name, rm_idx} = args
        
        const products = [...cart.products]
        let idx = -1

        if(rm_id){
            idx = products.findIndex(p => p.id === rm_id)
        }else if(rm_name){
            idx = products.findIndex(p => p.name === rm_name)    
        }else if (rm_idx > -1){
            idx = rm_idx
        }

        if (idx !== -1){
            products.splice(idx, 1)
            updateCart(products)
            // setCart(c => ({...c, products}))
        }  
    }

    function updateProduct({idx, product}){
        const products = [...cart.products]
        products[idx] = product
        updateCart(products)
    }

    function setQuantity(product_id, quantity){
        if(quantity <= 0) return;

        const products = [...cart.products]
        const idx = products.findIndex(p => p.id === product_id)

        if(idx == -1) return;

        products[idx].quantity = quantity
        setCart(c => ({...c, products}))
    }

    function setWeight(product_id, weight){
        if(weight <= 0) return;

        const products = [...cart.products]
        const idx = products.findIndex(p => p.id === product_id)

        if(idx == -1) return;

        products[idx].weight = weight
        setCart(c => ({...c, products}))
    }

    function setColor(product_id, color){
        if(!color) return;

        const products = [...cart.products]
        const idx = products.findIndex(p => p.id === product_id)

        if(idx == -1) return;

        products[idx].color = color
        setCart(c => ({...c, products}))
    }

    function getTotal(){
        const total = cart.products.reduce((cur, item) => {
            return cur + item.price*item.quantity
        }, 0)
        
        //update local cart state
        // const totals = {...cart.totals}
        // total.subtotal = total
        // setCart(c => ({...c, totals}))

        return total
    }


    return {cart, addProduct, removeProduct, setQuantity, setWeight, setColor, getTotal, updateProduct}
}

export default useCart