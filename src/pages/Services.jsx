import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const Services = () => {
  const initialServiceState = [
    { id: 1, servicename: "Ac Repair", servicecategory: "fgbnjng", price: 5 },
    { id: 2, servicename: "Plumbing", servicecategory: "hnhnmmn", price: 5 },
    { id: 3, servicename: "Washing", servicecategory: "rhgutguu", price: 5 },
    { id: 4, servicename: "Pest Control", servicecategory: "gngnng", price: 5 },
  ];

  const [services, setServices] = useState(initialServiceState);
  const [editedService, setEditedService] = useState(null);
  const [inputState, setInputState] = useState({});

  const serviceSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const servicename = form.servicename.value;
    const servicecategory = form.servicecategory.value;
    const price = form.price.value;
    const description = form.description.value;

    const newService = {
      id: services.length + 1,
      servicename,
      servicecategory,
      price,
      description,
      image: "",
    };

    const addedService = [...services, newService];

    setServices(addedService);
    form.reset();
  };

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const editbuttonHander = (id) => {
    setEditedService(id);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  const saveService = (id) => {
    const updatedServices = services.map((service) => {
      if (service.id === id) {
        service.price = inputState.price || service.price;
        service.servicename = inputState.servicename || service.servicename;
        service.servicecategory = inputState.servicecategory || service.servicecategory;
      }
      return service;
    });

    setServices(updatedServices);
    setEditedService(null);
    setInputState({});
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="mb-4">
        <strong className="text-gray-700 font-medium mb-2">
          Insert Service
        </strong>
        <div className="bg-gray-100 p-4 rounded-sm flex flex-col items-start">
          <form onSubmit={serviceSubmit}>
            <input
              type="text"
              name="servicename"
              placeholder="Service Name"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
            />
            <input
              type="text"
              name="servicecategory"
              placeholder="Service Category"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
            />
            <input
              type="number"
              name="price"
              placeholder="Service Price"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
            />
            <textarea
              name="description"
              placeholder="Service Description"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2 h-32 resize-y"
            />
            <div className="flex flex-col w-1/2 m-5 mb-2 ">
              <label htmlFor="image" className="mb-1 text-gray-700 font-bold">
                Add Image
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                id="image"
                className="border border-gray-400 p-2"
              />
            </div>

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded m-5"
              type="submit"
            >
              Add Service
            </button>
          </form>
        </div>
      </div>

      <strong className="text-gray-700 font-medium">View Services</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>Service Name</th>
              <th>Service Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>
                  {editedService === service.id ? (
                    <input
                      type="text"
                      name="servicename"
                      defaultValue={service.servicename}
                      onChange={inputHandler}
                    />
                  ) : (
                    service.servicename
                  )}
                </td>
                <td>
                  {editedService === service.id ? (
                    <input
                      type="text"
                      name="servicecategory"
                      defaultValue={service.servicecategory}
                      onChange={inputHandler}
                    />
                  ) : (
                    service.servicecategory
                  )}
                </td>
                <td>
                  {editedService === service.id ? (
                    <input
                      type="number"
                      name="price"
                      defaultValue={service.price}
                      onChange={inputHandler}
                    />
                  ) : (
                    service.price
                  )}
                </td>
                <td>
                  {editedService === service.id ? (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded font-bold mr-1"
                      onClick={() => saveService(service.id)}
                    >
                      <RxUpdate />
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                      onClick={() => editbuttonHander(service.id)}
                    >
                      <AiFillEdit />
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold"
                    onClick={() => handleDelete(service.id)}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;