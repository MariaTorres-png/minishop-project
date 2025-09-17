const TarjetaProducto = ({ producto, onAgregar }) => (
  <div className="tarjeta-producto">
    <img src={producto.imagen} alt={producto.nombre} />
    <h3>{producto.nombre}</h3>
    <p>{producto.descripcion}</p>
    <p>${producto.precio}</p>
    <button
      onClick={() => {
        console.log("CLICK");
        onAgregar(producto);
      }}
    >
      Agregar al carrito
    </button>
  </div>
);

export default TarjetaProducto;
