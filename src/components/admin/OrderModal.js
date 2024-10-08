import React, { useState } from "react";
import { FaUser, FaBox, FaTimes, FaSave } from "react-icons/fa";

const OrderDetailsModal = ({ order, onClose, onUpdate }) => {
  const [trackingNumber] = useState(order ? order.trackingNumber : ""); // Track as read-only
  const [status, setStatus] = useState(order ? order.status : "");

  if (!order) return null;

  const handleUpdate = () => {
    onUpdate({ ...order, status }); // No need to update trackingNumber since it's read-only
    // Optionally close modal here if needed
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-11/12 max-w-5xl gap-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Details</h2>
          <button onClick={onClose} className="text-gray-500">
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-2">
          {/* Left Column */}
          <div className="pr-4">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FaBox className="text-blue-500 mr-2" />
                <p className="font-semibold">Tracking ID:</p>
                <span className="ml-2">{trackingNumber}</span> {/* Display-only */}
              </div>
              <div className="flex items-center mb-2">
                <FaUser className="text-gray-500 mr-2" />
                <p className="text-sm text-gray-700">Customer: {order.customer.name}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaUser className="text-gray-500 mr-2" />
                <p className="text-sm text-gray-700">Email: {order.customer.email}</p>
              </div>
            </div>

            <h3 className="font-semibold mb-2">Pickup Location:</h3>
            <p>{`${order.pickupAddress.street}, ${order.pickupAddress.city}, ${order.pickupAddress.state}, ${order.pickupAddress.postalCode}, ${order.pickupAddress.country}`}</p>

            <h3 className="font-semibold mb-2 mt-4">Dropoff Location:</h3>
            <p>{`${order.dropoffAddress.street}, ${order.dropoffAddress.city}, ${order.dropoffAddress.state}, ${order.dropoffAddress.postalCode}, ${order.dropoffAddress.country}`}</p>
          </div>

          {/* Right Column */}
          <div className="pl-4 border-l border-gray-300">
            <h3 className="font-semibold mb-2 mt-4">Package Details:</h3>
            <p>Weight: {order.packageDetails.weight} kg</p>
            <p>Dimensions: {order.packageDetails.dimensions.length} x {order.packageDetails.dimensions.width} x {order.packageDetails.dimensions.height} cm</p>
            <p>Description: {order.packageDetails.description}</p>

            <h3 className="font-semibold mb-2 mt-4">Order Status:</h3>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="border border-gray-300 rounded p-1 w-full mb-4"
            >
              <option value="pending">Pending</option>
              <option value="in transit">In-Transit</option>
              {/* Add more statuses as needed */}
            </select>

            <h3 className="font-semibold mb-2 mt-4">Order History:</h3>
            <ul>
              {order.history.map((event) => (
                <li key={event._id} className="mb-2">
                  <p>{event.event}</p>
                  <p className="text-xs text-gray-500">{new Date(event.updatedAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Centered Save Changes Button */}
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleUpdate} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <FaSave className="inline mr-1" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;