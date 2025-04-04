import React, { useState } from 'react';
import './admin.css'; // Import your CSS

const UserManagement = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    // Add logic to select or deselect all checkboxes
  };

  const users = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      role: 'Giảng viên',
      email: 'nguyenvana@example.com',
      phone: '0901234567',
      address: 'Hà Nội',
      gender: 'Nam',
      dob: '1990-01-01',
      status: 'Hoạt động',
      experience: 2,
      certifications: ['AWS', 'OCPJP']
    },
    // Add more user data as needed
  ];

  const toggleModal = () => setAddModalOpen(!isAddModalOpen);
  const showEditModal = () => setEditModalOpen(true);
  const hideEditModal = () => setEditModalOpen(false);
  
  const showConfirmModal = (action) => {
    setCurrentAction(action);
    setConfirmModalOpen(true);
  };
  
  const hideConfirmModal = () => {
    setConfirmModalOpen(false);
    setCurrentAction(null);
  };

  const disableSelected = () => {
    // Logic for disabling selected users
    showConfirmModal(() => { /* Disable logic */ hideConfirmModal(); });
  };

  const enableSelected = () => {
    // Logic for enabling selected users
    showConfirmModal(() => { /* Enable logic */ hideConfirmModal(); });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="user-management-container">
      <div className="user-management-content">
        <div className="user-management-card">
          <div className="user-management-search-form">
            <input type="text" placeholder="Họ và tên" />
            <input type="date" placeholder="Ngày sinh" />
            <select>
              <option>Vai trò</option>
              <option>Học viên</option>
              <option>Giảng viên</option>
              <option>Quản lý</option>
            </select>
            <select>
              <option>Trạng thái</option>
              <option>Hoạt động</option>
              <option>Không hoạt động</option>
            </select>
          </div>
          
          <div className="user-management-action-buttons">
            <div>
              <button className="btn btn-green" onClick={toggleModal}>Thêm</button>
              <button className="btn btn-red" onClick={disableSelected}>Vô hiệu hóa</button>
              <button className="btn btn-yellow" onClick={enableSelected}>Kích hoạt</button>
              <button className="btn btn-blue">Tìm kiếm</button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th><input type="checkbox" id="selectAll" onClick={toggleSelectAll} /></th>
                <th>STT</th>
                <th>Mã</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Số năm kinh nghiệm</th>
                <th>Chứng chỉ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td><input type="checkbox" className="row-checkbox" /></td>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.dob}</td>
                  <td>{user.role}</td>
                  <td className="status">{user.status}</td>
                  <td>{user.experience}</td>
                  <td>{user.certifications.join(', ')}</td>
                  <td>
                    <i className="fas fa-pencil-alt icon-edit" onClick={showEditModal}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="user-management-pagination">
            <div>
              <label htmlFor="itemsPerPage">Hiển thị</label>
              <select id="itemsPerPage">
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>25</option>
              </select>
              <span>mục</span>
            </div>
            <div className="pagination-buttons">
              <button onClick={() => handlePageChange(1)}>&laquo;</button>
              {[...Array(Math.ceil(users.length / itemsPerPage)).keys()].map(number => (
                <button key={number + 1} onClick={() => handlePageChange(number + 1)}>
                  {number + 1}
                </button>
              ))}
              <button onClick={() => handlePageChange(Math.ceil(users.length / itemsPerPage))}>&raquo;</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div id="editModal" className="edit-modal" style={{ display: 'flex' }}>
          <div className="edit-container">
            <span className="edit-close-btn" onClick={hideEditModal}>×</span>
            <h2>Chỉnh sửa người dùng</h2>
            {/* Edit form fields go here, replace with dynamic logic as necessary */}
            <div className="edit-form-group">
              <label htmlFor="edit-id">Mã định danh</label>
              <input type="text" id="edit-id" />
              <label htmlFor="edit-phone">Số điện thoại</label>
              <input type="text" id="edit-phone" />
            </div>
            {/* Other fields */}
            <div className="edit-buttons">
              <button className="edit-update">Cập nhật</button>
              <button className="edit-cancel" onClick={hideEditModal}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div id="addModal" className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="modal-close-btn" onClick={toggleModal}>×</span>
            <h2 className="modal-h2">Thêm người dùng mới</h2>
            <form className="modal-form">
              {/* Add form fields for user addition */}
              <div className="modal-buttons">
                <button type="submit" className="modal-button-submit">Thêm</button>
                <button type="reset" className="modal-button-reset" onClick={toggleModal}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div id="confirmModal" className="modal" style={{ display: 'flex' }}>
          <div className="modal-content confirm-modal-content">
            <span className="modal-close-btn" onClick={hideConfirmModal}>×</span>
            <h2 className="modal-h2">Xác nhận hành động</h2>
            <div className="modal-buttons">
              <button className="modal-button-submit" onClick={() => {
                if (currentAction) {
                  currentAction(); // Execute the confirmed action
                }
                hideConfirmModal();
              }}>
                Xác nhận
              </button>
              <button className="modal-button-reset" onClick={hideConfirmModal}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;