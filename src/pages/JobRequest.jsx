import { useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { AiOutlineUserDelete } from 'react-icons/ai';

const JobRequest = () => {
  const [jobRequests, setJobRequests] = useState([
    { id: 1, name: 'John Doe',  job: 'Plumbing', address: '123 Street, City', phone: '1234567890', status: 'Pending' },
    { id: 2, name: 'Jane Smith',  job: 'Electrical Repair', address: '456 Avenue, Town', phone: '9876543210', status: 'Pending' },
    { id: 3, name: 'Michael Johnson',  job: 'Painting', address: '789 Road, Village', phone: '5678901234', status: 'Pending' },
  ]);

  const handleAccept = (id) => {
    setJobRequests(jobRequests.map(request =>
      request.id === id ? { ...request, status: 'Accepted' } : request
    ));
  };

  const handleReject = (id) => {
    setJobRequests(jobRequests.map(request =>
      request.id === id ? { ...request, status: 'Rejected' } : request
    ));
  };

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Job Requests</strong>
      <div className="overflow-x-auto mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Job</th>
              <th className="py-2">Address</th>
              <th className="py-2">Phone Number</th>
              <th className="py-2">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobRequests.map(request => (
              <tr key={request.id}>
                <td className="py-2">{request.id}</td>
                <td className="py-2">{request.name}</td>
                <td className="py-2">{request.job}</td>
                <td className="py-2">{request.address}</td>
                <td className="py-2">{request.phone}</td>
                <td>
                  <span 
                    className={`inline-block py-1 px-2 rounded ${request.status === 'Pending' ? 'bg-rose-200 text-rose-700' : 'bg-teal-200 text-teal-700'}`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="py-2">
                  {request.status === 'Pending' && (
                    <>
                      <button className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded font-bold mr-1" onClick={() => handleAccept(request.id)}><GiConfirmed /></button>
                      <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold" onClick={() => handleReject(request.id)}><AiOutlineUserDelete /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobRequest;
