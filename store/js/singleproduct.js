const singleProduct_ = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let product_id = urlParams.get("product_id");
  console.log(product_id);

  console.log(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  fetch(`https://dummyjson.com/products/${product_id}`, config)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let single = `
            <ul style="display:flex; list-style-type:none;height:700px">
              <li><img src=${data.images[0]}
                    id="image"></li>
              <li >
                  <h1 id="city" class="mt-5"> ${data.title}</h1>
                  <p id="price">Description: ${data.description}</p>
                  <p id="tax">Price: $ ${data.price}</p>
                  <p id="color">Rating: ${data.rating} /5</p>
                  <button type="submit" id="cart" style="width:500px">Add to cart</button>
              </li>      
              </ul>      
            `;

      document.querySelector(".single").innerHTML = single;
    });
};

singleProduct_();
