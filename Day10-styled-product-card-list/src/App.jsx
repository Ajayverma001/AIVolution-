import ProductCard from "./components/ProductCard";

export default function App() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Noise-cancelling over-ear headphones",
      price: 82,
      image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Smartwatch",
      description: "Track your fitness and notifications",
      price: 67,
      image: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      description: "RGB wired gaming mouse",
      price: 45,
      image: "https://images.unsplash.com/photo-1676129678107-fb33cf89e4f0?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      description: "Backlit keyboard with blue switches",
      price: 75,
      image: "https://images.unsplash.com/photo-1672211775632-bcb4b68eb2bd?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
     {
      id: 5,
      name: "gaming monitor",
      description: "32 4K QD-OLED Gaming Monitor 240Hz refresh rate",
      price: 99,
      image: "https://i.rtings.com/assets/pages/I3j8zFmb/best-uw-gaming-monitors-20230802-medium.jpg?format=auto",
    },
    {
      id: 6,
      name: "gaming cpu",
      description: "Liquid-Cooled Gaming cpu",
      price: 133,
      image: "https://images.unsplash.com/photo-1658673609646-9c7ba9514b89?q=80&w=3133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    
    
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Styled Product Card List</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}