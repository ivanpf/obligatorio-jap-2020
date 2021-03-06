const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json"; //"http://localhost:3000/categorias";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json"; //"http://localhost:3000/producto-publicado";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json"; //"http://localhost:3000/categoria-info";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json"; //"http://localhost:3000/productos";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json"; //"http://localhost:3000/producto-info";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json"; //"http://localhost:3000/producto-info-comentarios";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json"; //"http://localhost:3000/carrito-info";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json"; //"http://localhost:3000/carrito-compra";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

function cerrarSesion() {
  if (sessionStorage.getItem("usuario")) {
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("contrasenia");
    window.location.href = "login.html";
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  var loc = window.location.pathname;
  var dir = loc.substring(loc.length, loc.lastIndexOf('/'));
  if (sessionStorage.getItem("usuario")) {
    if (localStorage.getItem("usuario")) {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (sessionStorage.getItem("usuario") == usuario.username) {
        if (usuario.imagen != "") {
          document.getElementById("ImagenDropdown").setAttribute("src", usuario.imagen);
        }
      }
    } else if (sessionStorage.getItem("googleImage")) {
      document.getElementById("ImagenDropdown").setAttribute("src", sessionStorage.getItem("googleImage"));
    }
    document.getElementById("dropdownMenuButton").innerHTML = sessionStorage.getItem("usuario");
  } else {
    if (dir != "/login.html") {
      window.location.href = "login.html"
    }
  }
});