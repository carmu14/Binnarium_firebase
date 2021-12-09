import React from 'react';
import {firebase} from './firebase'

function App() {

  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')

  React.useEffect (() => {
    //funcion para obtenr datos
    const obtenerDatos = async () => {

      try {

        const db = firebase.firestore()
        const datos = await db.collection('tareas').get()
        //
        const arrayData = datos.docs.map(doc => ({ id: doc.id, ...doc.data()}))

        console.log(arrayData)

        setTareas(arrayData)

      } catch (error) {
        console.log(error)
      }

    }
    obtenerDatos()

  }, [])

  const ejecutarBtn = async (e) => {
    e.preventDefault()

    if(!tarea.trim()) {
      console.log("Esta vacio")
      return
    }
    //Agregar documentos a la db
    try {

      const db = firebase.firestore()
      const nuevaTarea = {
        nombre: tarea,
        fecha: Date.now()
      }

      const data = await db.collection("tareas").add(nuevaTarea)
      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}//resivimos el id de firestore
      ])

    } catch (error) {
      console.log(error)
    }

    console.log(tarea)
  }

  //Eliminar
  const eliminar = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)

    } catch (error) {
      console.log(error)
    }
  }

  //Edicion
  const activarEdicion = (item) => {
    setModoEdicion(true)
    setTarea(item.nombre)
    setId(item.id)
  }
  //Edicion de datos
  const editar = async (e) => {
    e.preventDefault()
    if (!tarea.trim) {
      console.log('vacio')
      return
    }

    try {
      
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).update({
        nombre: tarea
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? {id: item.id, fecha: item.fecha, nombre: tarea} : item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setId('')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mt-3">
      <div className = "row">
        <div className = "col-md-6">
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  {item.nombre}
                  <button 
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => eliminar(item.id)}
                  >
                    ELIMINAR
                  </button>
                  <button 
                    className="btn btn-warning btn-sm float-right mr-2"
                    onClick={() => activarEdicion(item)}
                  >
                    EDITAR
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className = "col-md-6">
         <h3>
           {
             modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
             
           }
         </h3>
         <form onSubmit={modoEdicion ? editar : ejecutarBtn}>
          <input 
            type="text" 
            placeholder="Ingresar Tarea"
            className="form-control mb-2"
            onChange={e => setTarea(e.target.value)}
            value={tarea}
          /> 

          <button
            className={
              modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block' 
            }
            type="submit"
          >
            {
              modoEdicion ? 'EDITAR' : 'EJECUTAR'
            }
          </button>

         </form>
        </div>
      </div>
    </div>
  );
}

export default App;
