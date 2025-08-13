import { useEffect, useState } from "react";
import axios from "axios";

function useProductAndCategory(owner_username) {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    useEffect(() => {
            (
                async () => {
                    const { data } = await axios.get(`/categories/${owner_username}`)
    
                    setCategories(data.categories);
                }
            )()
    
            getProducts()
            getAllProducts()
            getAllCategories()
    
        }, [])
    
       async function getProducts() {
            const { data } = await axios.get(`/products/${owner_username}`) 
            setProducts(data.products);
    
        }

        async function getAllProducts(params) {
            const { data } = await axios.get("all-products") 
            setAllProducts(data.all_products);
        }

        async function getAllCategories() {
            const {data} = await axios.get("all-categories")
            setAllCategories(data.categories)
        }
    return { products, categories, allProducts, allCategories };
}

export default useProductAndCategory