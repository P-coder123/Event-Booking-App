import React, { useState } from "react";

const EventCard = ({ event }) => {
  return (
    <div className="space-y-6">
      {/* 🔽 Filter Buttons */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Search Box */}
        <div className="flex items-center w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Capacity Filter */}
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Capacity</option>
            <option value="available">Seats Available</option>
            <option value="full">Full Capacity</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Apply Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition">
          Apply Filters
        </button>
      </div>

      {/* 🔽 Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {event.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 flex flex-col"
          >
            {/* Event Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {event.name}
            </h2>

            {/* Event Details */}
            <div className="text-gray-600 text-sm flex-1">
              <p>
                <strong>Date:</strong> {new Date(event.date).toLocaleString()}
              </p>
              <p>
                <strong>Capacity:</strong> {event.capacity}
              </p>
              <p>
                <strong>Booked:</strong> {event.bookedSeats}
              </p>
              <p>
                <strong>Canceled:</strong> {event.isCanceled ? "Yes" : "No"}
              </p>

              {event.isCanceled && (
                <>
                  <p>
                    <strong>Canceled At:</strong>{" "}
                    {new Date(event.canceledAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Canceled By:</strong> {event.canceledBy || "N/A"}
                  </p>
                </>
              )}
            </div>

            {/* Book Button */}
            {!event.isCanceled && (
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition">
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
