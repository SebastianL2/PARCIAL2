
const API_URL ='https://api-market-bivz.vercel.app/'
let products=[];
let listHTML="";



const getProducts= ()=>{
fetch(`${API_URL}/api/product/`)
.then(response => response.json())
.catch(error => {
    alertManager('error', 'Ocurrión un problema al cargar los productos');
  })
.then(data=>{
    products = data.data;
   console.log(data.data)
    renderResult(data.data);
    
})
}
getProducts();
const productsList= document.querySelector('#productsList')
const renderResult = (products)=>{

  
   products.forEach(product=> {
    listHTML += `
    
        <h5 class="card-title">${product.description}</h5>
        <ul>
        <li>_id: ${product._id}</li>
        <li>Descripcion: ${product.description}</li>
        <li>Precio: ${product.value}</li>
        <li>Caducacion: ${product.dateExpired.slice(0, 10)}</li>
    </ul>
        <div class="container text-end">
      
     
        
    `
  
   });
   productsList.innerHTML= listHTML;
}


const deleteProduct=()=>{
    const productId  = prompt("Ingresa el ID del producto que deseas eliminar:");


    fetch(`${API_URL}/api/product/${productId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          // Producto eliminado exitosamente, puedes mostrar un mensaje o actualizar la página, etc.
          console.log('Producto eliminado correctamente');
        } else {
          // Hubo un error al eliminar el producto, puedes mostrar un mensaje de error, etc.
          console.error('Error al eliminar el producto');
        }
      })
      .catch(error => {
        console.error('Error de red:', error);
      });
}
const browsePerson=()=>{

    const searchInput = document.getElementById('formGroupExampleInput').value;
    // Aquí puedes utilizar el valor de búsqueda para filtrar los productos o hacer lo que necesites
    console.log(searchInput)
    
   
    let listHTML = "";
// ... Código que agrega contenido a listHTML ...
listHTML = ""; // Asignar una cadena vacía para vaciar la variable

// Ahora que listHTML está vacío, el contenido del elemento "productsList" también se borrará
productsList.innerHTML = listHTML;

  
    console.log("data: ",searchInput);
   products.forEach(product=> {
    if (
        product._id.toString().includes(searchInput)
    ) {
        console.log("data 2: ",searchInput);
    console.log(`${product.name}`);
    listHTML += `
    
    <h5 class="card-title">Nombre ${product.name}</h5>
    <ul>
        <li>_id: ${product._id}</li>
        <li>Descripcion: ${product.description}</li>
        <li>Precio: ${product.value}</li>
        <li>Caducacion: ${product.dateExpired.slice(0, 10)}</li>
    </ul>
    <div class="container text-end">
    <button
      class="btn btn-secondary"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#editTeamModal"
      style="background-color: rgb(35, 16, 141);"
    >
      Edit ✏️
    </button>
    <button
      class="btn btn-danger"
      
    >
      Delete 🗑️
    </button>
        
    `
      }
   
   });
   productsList.innerHTML= listHTML;

}
//botones de adicion
const btnAdd = document.querySelector('#btnAdd');
const modalAdd = document.querySelector('#modalAdd');

btnAdd.onclick = () => openModalAdd();

window.onclick = function(event) {
  if (event.target == modalAdd) {
    //modalAdd.style.display = "none";
  }
}

const closeModalAdd = () => {
  modalAdd.style.display = 'none';
}

const openModalAdd = () => {
  modalAdd.style.display = 'block';
}


const createProduct = () => {
   
        const formData = new FormData(document.querySelector('#formAdd'));
       alert("holaa");
        document.querySelector('#msgFormAdd').innerHTML = '';
      
        // Crear el objeto product con los datos del formulario
        const product = {
          
          name: formData.get('name'),
          description: formData.get('description'),
          value: formData.get('value'), // Convertir el valor del checkbox a booleano
          dateExpired: formData.get('dateExpired'),
          
        };
      
        console.log(product);
      
        fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(product),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .catch(error => {
          alertManager('error', error);
          document.querySelector('#formAdd').reset();
          })
          .then(response => {
          alertManager('success', response.mensaje)
        

          })
        
      };
      
  

  const alertManager = (typeMsg, message) => {
    const alert = document.querySelector('#alert');
  
    alert.innerHTML = message || 'Se produjo cambios';
    alert.classList.add(typeMsg);
    alert.style.display = 'block';
  
    setTimeout(() => {
      alert.style.display = 'none';
      alert.classList.remove(typeMsg);
    }, 3500);
  
  }