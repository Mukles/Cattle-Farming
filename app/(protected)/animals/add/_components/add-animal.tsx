"use client";

import { useState } from "react";

function AddAnimalForm() {
  const [isPurchased, setIsPurchased] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Add New Animal
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Animal Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter animal name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="breed"
              className="block text-sm font-medium text-gray-600"
            >
              Breed
            </label>
            <input
              type="text"
              id="breed"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter breed"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-600"
            >
              Age (in years)
            </label>
            <input
              type="number"
              id="age"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter age"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-600"
            >
              Weight (in kg)
            </label>
            <input
              type="number"
              id="weight"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter weight"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="healthStatus"
              className="block text-sm font-medium text-gray-600"
            >
              Health Status
            </label>
            <select
              id="healthStatus"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Healthy">Healthy</option>
              <option value="Sick">Sick</option>
              <option value="Under Treatment">Under Treatment</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="isPurchased"
              className="block text-sm font-medium text-gray-600"
            >
              Purchased from Market?
            </label>
            <input
              type="checkbox"
              id="isPurchased"
              className="mt-1"
              onChange={(e) => setIsPurchased(e.target.checked)}
            />
          </div>

          {isPurchased && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="purchaseDate"
                  className="block text-sm font-medium text-gray-600"
                >
                  Purchase Date
                </label>
                <input
                  type="date"
                  id="purchaseDate"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="purchasePrice"
                  className="block text-sm font-medium text-gray-600"
                >
                  Purchase Price
                </label>
                <input
                  type="number"
                  id="purchasePrice"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter price"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="seller"
                  className="block text-sm font-medium text-gray-600"
                >
                  Seller/Market Name
                </label>
                <input
                  type="text"
                  id="seller"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter seller or market name"
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
            >
              Add Animal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAnimalForm;
