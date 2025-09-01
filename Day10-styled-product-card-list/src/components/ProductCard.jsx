export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl hover:scale-105 transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-44 object-cover rounded-xl"
      />
      <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
      <p className="text-gray-500 text-sm mt-1">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold text-green-600">
          ${product.price}
        </span>
        <button className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
}