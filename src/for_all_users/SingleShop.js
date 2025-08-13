import { useParams } from "react-router-dom";
import { safeBase64Decode } from "../common_component/EnEdUtils";
import WithoutCategory from "./shop_pages/WithoutCategory";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import WithCategory from "./shop_pages/WithCategory";
import Loader from "../common_component/Loader";


function SingleShop() {
    const param = useParams();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [pageIsReady, setPageIsReady] = useState(false);
    const username = safeBase64Decode(param.owner_username);
    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`/categories/${username}`)

                setCategories(data.categories);
                setPageIsReady(true);
            }
        )()

        getProducts()

    }, [])

   async function getProducts() {
        const { data } = await axios.get(`/products/${username}`) 
        setProducts(data.products);

    }

    return (
        <>
            <div className="users-pages">
                <Navbar />
                {
                    pageIsReady?
                    categories.length > 0 ?
                    <WithCategory products={products} categories={categories} />
                    : 
                    <WithoutCategory products={products} />
                    :<Loader/>
                }
                <Footer />
            </div>
        </>
    )
}

export default SingleShop