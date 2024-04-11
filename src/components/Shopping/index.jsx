import React, { useEffect, useState } from "react";
import axios from "axios";

const Shopping = () => {
  const url =
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
  const [dataObj, setData] = useState([]);
  const [categories, setCategories] = useState({});
  const [search , setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchInfo = async () => {
    const { data } = await axios.get(url);
    const categoryNames = {};
    data.categories.forEach((category) => {
      categoryNames[category.category_name] = true;
    });
    setCategories(categoryNames);
    setData(data.categories);
  };
  
  useEffect(() => {
    fetchInfo();
  }, []);
  const removeItem = (id) => {
    const oldCart = [...cart];
    oldCart.splice(id, 1);
    setCart(oldCart);
  };
  const addToCart = (id,pimage,product,pprice) => {
    alert("item added to cart please scroll down");
    
    setTotal(total + parseInt(pprice));
    setCart([...cart,{id,pimage,product,pprice}]);
};

  const toggleCategories = (categoryName) =>
    setCategories({ ...categories, [categoryName]: !categories[categoryName] });

  const getTotal = () => cart.reduce((accumulator, current) => {
    return accumulator + parseInt(current.pprice)
  }, 0)

  return (
    <div className="App bg-gray-100">
      <div className="font-bold text-5xl text-center p-8">Cloth Store</div>
      
      <input type="text" className="h-12 focus:outline-none border border-black ml-8 p-2 rounded" placeholder="Search"  onChange={(e) => setSearch(e.target.value)} />
      
      {dataObj.map((category , k) => (
          <button key={k} onClick={() => toggleCategories(category.category_name)} className={`px-10 py-2 border border-black m-4 ${categories[category.category_name] ? "bg-black text-white" : ""}`}>
            {category.category_name}
          </button>
      ))}
      
      {/* , search.toLowerCase() === '' ? category : category.category.category_products.title.toLowerCase().includes(search) */}
      {dataObj.filter(category => categories[category.category_name]).map((item, i) => {
        // console.log(item.category_products.title);
        const products = search ? item.category_products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()) || product.vendor.toLowerCase().includes(search.toLowerCase())) : item.category_products;
        return (
          <>
            <div
              className="datacard flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 m-4 "
              key={i}
            >
              {products.map((innerdata, index) => {
              // { item.category_products.map((innerdata, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-start mb-4 border bg-white rounded p-2"
                  >
                    <div>
                      <img className="h-[500px] w-full rounded" src={innerdata.image} />
                    </div>
                    <div className="flex flex-col items-start p-4">
                      <div className="text-lg font-semibold">
                        {" "}
                        {innerdata.title}
                      </div>
                      <div className="text-lg">Price: {innerdata.price}</div>
                      <div className="text-lg"> {innerdata.vendor}</div>
                      <div className="text-lg"> {innerdata.badge_text}</div>
                      <div className="w-full">
                        <button className="bg-zinc-300 hover:bg-zinc-400 py-2 rounded w-full " onClick={() => addToCart(innerdata.id,innerdata.image,innerdata.title,innerdata.price)}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
            </div>
            
          </>
        );
        
      })}
      <div className="bg-white">
               <div className="text-5xl p-8">Cart</div>
               <div className="flex justify-evenly">
                      <div>Product Image</div>
                      <div>Product Name</div>
                      <div>Product Price</div>
                      <div></div>
                    </div>
            <div>
                {cart.map((item, i) => (
                  <>

                    <div className="flex justify-evenly items-center m-4">
                      <div className="h-16 w-16"><img className="h-16 w-10" src={item.pimage} alt="" /></div>


                      <div className="w-36" key={item.id}>{item.product}</div>
                      <div>{item.pprice}</div>
                      <div><button className="bg-zinc-300 px-6 py-1 rounded hover:bg-zinc-400" onClick={() => removeItem(i)}>REMOVE</button></div>
                    </div>
                    </>
                    ))
                  }
                  {cart.length && <div className="text-right">{getTotal()} {total}</div>}
            </div>
            </div>
     
    </div>
  );
};

export default Shopping;
