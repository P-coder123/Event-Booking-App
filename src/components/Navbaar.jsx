import { Link } from "react-router-dom"

export default function Navbaar() {
  return (
    
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
       <h1 className="text-xl font-bold">🎉 Event Booking</h1>
       <div className="space-x-6">
         <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/admin" className="hover:text-gray-200">Admin</Link>

       </div>

    </nav>
  );
}
