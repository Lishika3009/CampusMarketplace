import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Addproduct.css"

function AddProduct() {
    const navigate = useNavigate();
    const [userlocation, setlocation] = useState('');
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimageUrl, setPImageUrl] = useState('');
    const [pimage2Url, setPImage2Url] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const handleApi = () => {
            const formData = new FormData();
            formData.append('pname', pname)
            formData.append('pdesc', pdesc)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('pimage', pimageUrl);
            formData.append('pimage2', pimage2Url);
            formData.append('userId', localStorage.getItem('userId'))
            formData.append('userlocation',userlocation)

            const url =  'http://localhost:3001/addproduct';
            axios.post(url, formData)
                .then((res) => {
                    if (res.data.message) {
                        alert(res.data.message); 
                        navigate('/home')
                        alert('Product will be added once approved');
                    }
                })
                .catch((err) => {
                    alert(err)
                })
    }
    return (
        <div>
            <Header />
            <div className="p-3">
                <h2> Add Product Details Here: </h2>
                <label> Product Name </label>
                <input className="form-control product-form" type="text" value={pname}
                    onChange={(e) => { setpname(e.target.value) }} />
                <label> Product Description </label>
                <input className="form-control product-form" type="text" value={pdesc}
                    onChange={(e) => { setpdesc(e.target.value) }} />
                <label> Product Price</label>
                <input className="form-control product-form" type="text" value={price}
                    onChange={(e) => { setprice(e.target.value) }} />
                
                <label> Product Category </label>
                <select className="form-control product-form" value={category}
                    onChange={(e) => { setcategory(e.target.value) }}>
                    <option> Electronics </option>
                    <option> Clothing </option>
                    <option> Groceries </option>
                    <option> Food Item </option>
                    <option> Books </option>
                </select>
                <label> Product Image 1 </label>
                <input
                    className="form-control product-form" 
                    type="file"
                    files={pimageUrl}
                    onChange={(e) => setPImageUrl(e.target.files[0])}
                />
                <label> Product Image 2</label>
                <input
                    className="form-control product-form"
                    type="file"
                    files={pimage2Url}
                    onChange={(e) => setPImage2Url(e.target.files[0])} 
                />
                {/* <label> Product Second Image </label>
                <input className="form-control" type="file"
                    onChange={(e) => {
                        setpimage2(e.target.files[0])
                    }} /> */}
                <button onClick={handleApi} className="btn btn-primary mt-3"> SUBMIT </button>
            </div>
        </div>
    )
}
export default AddProduct;