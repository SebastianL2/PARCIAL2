
/*
function loadAuthors(){
    return new Promise((resolve,reject)=>{
        fetch(API_URL)
            .then(resp => resp.json())
            .then(resp => resolve(resp))
            .catch( err => reject(err))
    })
}
const loadData = ()=>{
    const id = document.getElementById('idAuthor').value    
    const name = document.getElementById('nameAuthor').value    
    const birthday = document.getElementById('birthday').value    

    const data = {"id":`${id}`, "name":`${name}`, "birthday":`${birthday}`}

    return JSON.stringify(data)
}

document.getElementById('btnSend').addEventListener('click',()=>{
    const URL = "http://localhost:3000/authors"

    fetch(URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: loadData()
    }).then( resp => resp.json())
        .then( resp => {
            if( resp.state ){
                alert('Okkk')
            }else{
                alert('Noooo')
            }          
        })
        .catch(err => {
            alert(`Error ${err}`)
        })
})

document.getElementById('btnSend').addEventListener('click',()=>{
    const URL = "http://localhost:3000/authors"

    fetch(URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: loadData()
    }).then( resp => resp.json())
        .then( resp => {
            if( resp.state ){
                alert('Okkk')
            }else{
                alert('Noooo')
            }          
        })
        .catch(err => {
            alert(`Error ${err}`)
        })
})*/



const API_URL ='https://api-dishes.vercel.app/'
let products=[];
let listHTML="";



const getProducts= ()=>{
fetch(API_URL)
.then(response => response.json())
.catch(error => {
    alertManager('error', 'Ocurrión un problema al cargar los productos');
  })
.then(data=>{
    products = data.data;
   
    renderResult(data.data);
    
})
}
getProducts();
const productsList= document.querySelector('#productsList')
const renderResult = (products)=>{

  
    listHTML += `
    <thead>
    <tr>
    <th scope="col">Detalles</th>
    <th scope="col">Id</th>
    <th scope="col">idDish</th>
    <th scope="col">Name</th>
    <th scope="col">Calories</th>
    <th scope="col">Vegetarian</th>
    <th scope="col">value</th>
    <th scope="col">comments</th>
    </tr>
   </thead>
    `
   products.forEach(product=> {
    listHTML += `
    
        <tbody>
        
            <tr>
            <td> <button type="button" onclick="browsePerson()" class="btn btn-primary">Detalles</button></td>
            <td>${product._id}</td>
            <td>${product.idDish}</td>
            <td>${product.name}</td>
            <td>${product.calories}</td>
            <td>${product.isVegetarian ? 'Sí' : 'No'}</td>
            <td>${product.value}</td>
            <td>${product.comments}</td>
        
            
            </tr>
        </tbody>
        
    `
  
   });
   productsList.innerHTML= listHTML;
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

    listHTML += `
    <thead>
    <tr>
    <th scope="col">Detalles</th>
    <th scope="col">Id</th>
    <th scope="col">idDish</th>
    <th scope="col">Name</th>
    <th scope="col">Calories</th>
    <th scope="col">Vegetarian</th>
    <th scope="col">value</th>
    <th scope="col">comments</th>
    </tr>
   </thead>
    `
    console.log("data: ",searchInput);
   products.forEach(product=> {
    if (
        product._id.toString().includes(searchInput)
    ) {
        console.log("data 2: ",searchInput);
    console.log(`${product.name}`);
    listHTML += `
    
        <tbody>
        
            <tr>
            <td> <button type="button" onclick="browsePerson()" class="btn btn-primary">Detalles</button></td>
            <td>${product._id}</td>
            <td>${product.idDish}</td>
            <td>${product.name}</td>
            <td>${product.calories}</td>
            <td>${product.isVegetarian ? 'Sí' : 'No'}</td>
            <td>${product.value}</td>
            <td>${product.comments}</td>
            
            </tr>
        </tbody>
        
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
   
        // Obtener los datos del formulario
        const formData = new FormData(document.querySelector('#formAdd'));
      
        // Verificar si todos los campos del formulario están llenos
        if (
          !formData.get('idDish') ||
          !formData.get('name') ||
          !formData.get('calories') ||
          !formData.get('isVegetarian') ||
          !formData.get('value') ||
          !formData.get('comments')
        ) {
          document.querySelector('#msgFormAdd').innerHTML = '* Llena todos los campos';
          return;
        }

         // Obtener el valor del campo calories



        document.querySelector('#msgFormAdd').innerHTML = '';
      
        // Crear el objeto product con los datos del formulario
        const product = {
            
          idDish: formData.get('idDish'),
          name: formData.get('name'),
          calories: formData.get('calories'),
          isVegetarian: formData.get('isVegetarian') === 'on', // Convertir el valor del checkbox a booleano
          value: formData.get('value'),
          comments: formData.get('comments'),
        };
      
        console.log(product);
      
        // Enviar el objeto product al servidor como una cadena JSON
        fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(product), // Convertir el objeto product en una cadena JSON
          headers: {
            'Content-Type': 'application/json', // Especificar que se está enviando una cadena JSON en el cuerpo de la solicitud
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.state) {
              alertManager('success', 'Plato creado exitosamente.');
              getProducts();
            } else {
              alertManager('error', 'Error al crear el plato.');
            }
          })
          .catch((error) => {
            alertManager('error', 'Ocurrió un problema al crear el plato.');
            console.error('Error:', error);
          });
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