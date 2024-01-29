import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const Show = () => {
  const [products, setProducts] = useState([]);
  const productsCollection = collection(db, "products");
  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(products)
  }

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
    await deleteDoc(productDoc)
    getProducts()
  }

  const confirmDelete = (id) => {
    MySwal.fire({
      title: "Eliminar el producto?",
      text: "No podras revertir estos cambios despues!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire({
          title: "Deleted!",
          text: "El producto se ha eliminado extiosamente!",
          icon: "success"
        });
      }
    });
  }

  useEffect(() => {
    getProducts();
  },);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className="d-grid gap-2 mx-auto">
            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
          </div>
          <div className='col'>
            <table className='table table-dark table-hover '>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link to={`/edit/${product.id}`} className='btn btn-light'>
                        <i className="fa-regular fa-pen-to-square"></i> Edit
                      </Link>
                      <button onClick={() => { confirmDelete(product.id) }} className='btn btn-danger'>
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;