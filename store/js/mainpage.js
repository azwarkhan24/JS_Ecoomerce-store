let postCount = 1;
let skip = 0;

const getProducts = () => {
  let list = "";
  console.log(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`, config)
    .then((res) => res.json())
    .then((data) => {
      let html = data.products
        .map((item) => {
          return `
            
            <div class="card mb-3 product${item.id}">
        <div class="card-body row" style="overflow-y:hidden">
        <h6></h6>
        <div class="d-flex justify-content-end">
        <i class="fa-regular fa-pen-to-square" onClick="updateProduct(event,${
          item.id
        })" ></i>
        <i class="fa-solid fa-trash ms-3" onclick="deleteProduct(event, ${
          item.id
        })"></i>
        </div><hr>
          <h6 class="card-subtitle text-muted" style="overflow-y:hidden">${item.title}</h6>
          
        </div>
        <img src=${
          item.images[0]
        } alt="product img" width="60%" class='rounded mx-auto d-block'/>
        <div class="card-body">
          <p class="card-text">${item.description}</p>
          <p class="card-text">$ ${item.price}</p>
          <button type="button" class="btn btn-success decoration" onClick="singleProduct(${
            item.id
          })" >View Detail</button>
        </div>
      </div>
      `;
          list += html;
        })
        .join("");
      document.querySelector(".prod").insertAdjacentHTML("beforeend", html);
    });
};

getProducts();

// Delete Product
const deleteProduct = (e, id) => {
  console.log(id);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        document.querySelector(`.product${id}`).remove();
      }
    })
    .then((res) => {
      console.log(res);
    });
};

// Add a Product

const addProduct = () => {
  console.log(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  fetch(`https://dummyjson.com/products/add`, {
    method: "POST",
  })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("this is this");
        let htm = `<div class="card mb-3 ">
       <div class="card-body row">
       <div class="d-flex justify-content-end">
       <i class="fa-regular fa-pen-to-square" ></i>
       <i class="fa-solid fa-trash ms-3"></i>
       </div><hr>
         <h6 class="card-subtitle text-muted">New Product</h6>
         
       </div>
       <img src="../assets/camera.jpg" alt="image to be added" width="60%" class='rounded mx-auto d-block'/>
       <div class="card-body">
         <p class="card-text">camera, in photography, device for recording an image of an object on a light-sensitive surface</p>
         <p class="card-text">$500</p>
         <button type="button" class="btn btn-success decoration">Buy Now</button>
       </div>
     </div>`;
        document.querySelector(".prod").insertAdjacentHTML("beforeend", htm);
      }
    })
    .then((res) => {
      console.log(res);
    });
};

// Update Product

const updateProduct = (e, id) => {
  console.log(id);
  console.log(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  fetch(`https://dummyjson.com/products/${id}`, {
    method: "PUT",
  })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        document.querySelector(`.product${id}`).classList.toggle("editComment");
      }
    })
    .then((res) => {
      console.log(res);
    });
};

// search Product

const searchProduct = () => {
  var search = document.getElementById("searchTxt");
  console.log(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log(search.value);
  fetch(`https://dummyjson.com/products/search?q=${search.value}`, config)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".prod").innerHTML = "";
      let sear = data.products
        .map((item) => {
          return `
            
            <div class="card mb-3">
        <div class="card-body row">
        <h6>${postCount++}</h6>
        <div class="d-flex justify-content-end">
        <i class="fa-regular fa-pen-to-square" onClick="updateProduct(${
          item.id
        })" ></i>
        <i class="fa-solid fa-trash ms-3" onClick="deleteProduct(${
          item.id
        })"></i>
        </div><hr>
          <h6 class="card-subtitle text-muted">${item.title}</h6>
          
        </div>
        <img src=${
          item.images[0]
        } alt="product img" width="60%" class='rounded mx-auto d-block'/>
        <div class="card-body">
          <p class="card-text">${item.description}</p>
          <p class="card-text">$ ${item.price}</p>
          <button type="button" class="btn btn-success decoration" onClick="singleProduct(${
            item.id
          })" >Buy Now</button>
        </div>
      </div>
      `;
        })
        .join("");
      document.querySelector(".prod").insertAdjacentHTML("beforeend", sear);
    });
};

const singleProduct = (i) => {
  console.log("singleProduct", i);
  window.location.href = "./singleproduct.html?product_id=" + i;
};

// categories
const categories = () => {
  console.log(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  fetch("https://dummyjson.com/products/categories", config)
    .then((res) => res.json())
    .then((data) => {
      let list = data
        .map((item, i) => {
          var temp = item;
          return `<li class="sub" onClick="singlecategory('${temp}')" >${item}<i class="fa fa-angle-right float-end me-3"></i></li>`;
        })
        .join("");
      document.querySelector(".list").innerHTML = list;
    });
};
categories();

// by specific category
const singlecategory = (subitem) => {
  console.log("skhdjshdjsdjkfjh", subitem);
  console.log(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  fetch(`https://dummyjson.com/products/category/${subitem}`, config)
    .then((res) => res.json())
    .then((data) => {
      let sub = data.products
        .map((item) => {
          console.log(item);
          return `
              
                <li><a href="#">${item.title}</a></li>
              
            `;
        })
        .join("");
      document.querySelector(".sub-list").innerHTML = sub;
    });
};

// Pagination

function pagination(e) {
  document.querySelector(".prod").innerHTML = "";
  let inner = e.target.innerText;
  console.log(inner);
  if (inner == 1) {
    skip = 0;
    limit = 30;
    getProducts();
  }
  if (inner == 2) {
    skip = 10;
    limit = 60;
    getProducts();
  }
  if (inner == 3) {
    skip = 20;
    limit = 90;
    getProducts();
  }
  console.log(skip, limit);
}


