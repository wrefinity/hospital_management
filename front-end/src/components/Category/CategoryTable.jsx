import React from 'react';


const CategoryTable = ({ catData, onDelete }) => {
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">All Categories</h5>

          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">CreatedBy</th>
                <th scope="col">Description</th>
                <th scope="col">Controls</th>
              </tr>
            </thead>
            <tbody>
              {catData.map((category, index) => (
                <tr key={index}>
                  <td>
                    {index}
                  </td>
                  <td>
                    {category?.name}
                  </td>
                  <td>
                    {category?.userId?.username}
                  </td>
                  <td> {category.desc}</td>
                  <td>
                    <button type="button" class="btn btn-danger ms-2" onClick={() => {
                      if (window.confirm('Are you sure you want to delete this category?')) {
                        onDelete(category._id);
                      }
                    }}><i class="bi bi-exclamation-octagon"></i>
                    </button>


                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
