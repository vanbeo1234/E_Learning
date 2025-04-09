import React, { useState } from 'react';

const UserManagement = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25); // Default to 25 items per page
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    dob: '',
    role: '',
    status: ''
  });
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    address: '',
    dob: '',
    role: '',
    status: 'Hoạt động',
    experience: 0,
    certifications: []
  });

  const [users, setUsers] = useState([
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
    {
      id: 2,
      name: 'Trần Thị B',
      role: 'Học viên',
      email: 'tranthib@example.com',
      phone: '0902345678',
      address: 'Hồ Chí Minh',
      gender: 'Nữ',
      dob: '1995-05-15',
      status: 'Không hoạt động',
      experience: 0,
      certifications: []
    },
    {
      id: 3,
      name: 'Lê Văn C',
      role: 'Quản lý',
      email: 'levanc@example.com',
      phone: '0903456789',
      address: 'Đà Nẵng',
      gender: 'Nam',
      dob: '1985-08-20',
      status: 'Hoạt động',
      experience: 10,
      certifications: ['PMP', 'Scrum Master']
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      role: 'Giảng viên',
      email: 'phamthid@example.com',
      phone: '0904567890',
      address: 'Hải Phòng',
      gender: 'Nữ',
      dob: '1988-12-12',
      status: 'Hoạt động',
      experience: 5,
      certifications: ['TOEFL', 'IELTS']
    }
  ]);

  const toggleSelectAll = () => {
    if (!selectAll) {
      setSelectedUsers(users.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleAddUser = () => {
    const newUser = { ...formData, id: users.length + 1 };
    setUsers(prev => [...prev, newUser]);
    setAddModalOpen(false);
    resetForm();
  };

  const handleEditUser = (user) => {
    setFormData(user);
    setEditModalOpen(true);
  };

  const handleUpdateUser = () => {
    setUsers(prev => prev.map(u => u.id === formData.id ? formData : u));
    setEditModalOpen(false);
    resetForm();
  };

  const handleDeleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const showConfirmModal = (action) => {
    setCurrentAction(action);
    setConfirmModalOpen(true);
  };

  const hideConfirmModal = () => {
    setConfirmModalOpen(false);
    setCurrentAction(null);
  };

  const disableSelected = () => {
    showConfirmModal(() => {
      const updatedUsers = users.map(user => {
        if (selectAll || selectedUsers.includes(user.id)) {
          return { ...user, status: 'Không hoạt động' };
        }
        return user;
      });
      setUsers(updatedUsers);
      setSelectedUsers([]);
      hideConfirmModal();
    });
  };

  const enableSelected = () => {
    showConfirmModal(() => {
      const updatedUsers = users.map(user => {
        if (selectAll || selectedUsers.includes(user.id)) {
          return { ...user, status: 'Hoạt động' };
        }
        return user;
      });
      setUsers(updatedUsers);
      setSelectedUsers([]);
      hideConfirmModal();
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(prevCriteria => ({
      ...prevCriteria,
      [name]: value
    }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      email: '',
      password: '',
      gender: '',
      phone: '',
      address: '',
      dob: '',
      role: '',
      status: 'Hoạt động',
      experience: 0,
      certifications: []
    });
  };

  const filteredUsers = users.filter(user =>
    (!searchCriteria.name || user.name.includes(searchCriteria.name)) &&
    (!searchCriteria.dob || user.dob === searchCriteria.dob) &&
    (!searchCriteria.role || user.role === searchCriteria.role) &&
    (!searchCriteria.status || user.status === searchCriteria.status)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="user-management-container">
      <div className="user-management-content">
        <div className="user-management-card">
          <div className="user-management-search-form">
            <input type="text" name="name" placeholder="Họ và tên" value={searchCriteria.name} onChange={handleSearchChange} />
            <input type="date" name="dob" placeholder="Ngày sinh" value={searchCriteria.dob} onChange={handleSearchChange} />
            <select name="role" value={searchCriteria.role} onChange={handleSearchChange}>
              <option value="">Vai trò</option>
              <option value="Học viên">Học viên</option>
              <option value="Giảng viên">Giảng viên</option>
              <option value="Quản lý">Quản lý</option>
            </select>
            <select name="status" value={searchCriteria.status} onChange={handleSearchChange}>
              <option value="">Trạng thái</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Không hoạt động">Không hoạt động</option>
            </select>
          </div>
          
          <div className="user-management-action-buttons">
            <div>
              <button className="btn btn-green" onClick={() => setAddModalOpen(true)}>Thêm</button>
              <button className="btn btn-red" onClick={disableSelected}>Vô hiệu hóa</button>
              <button className="btn btn-yellow" onClick={enableSelected}>Kích hoạt</button>
              <button className="btn btn-blue" onClick={handleSearch}>Tìm kiếm</button>
            </div>
          </div>

          <div className="user-management-pagination">
            <div>
              <label htmlFor="itemsPerPage" style={{ padding: '5px' }}>Hiển thị</label>
              <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="25">25</option>
              </select>
              <span style={{ padding: '5px' }}>danh mục</span>
            </div>
          </div>

          <div className="table-container">
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
                    <td><input type="checkbox" className="row-checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleCheckboxChange(user.id)} /></td>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.gender}</td>
                    <td>{user.dob}</td>
                    <td>{user.role}</td>
                    <td className="status">{user.status}</td>
                    <td>{user.experience}</td>
                    <td>{user.certifications.join(', ')}</td>
                    <td>
                      <i className="fas fa-pencil-alt icon-edit" onClick={() => handleEditUser(user)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-buttons">
            <button onClick={() => handlePageChange(1)}>&laquo;</button>
            {[...Array(totalPages).keys()].map(number => (
              <button key={number + 1} onClick={() => handlePageChange(number + 1)}>
                {number + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(totalPages)}>&raquo;</button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div id="addModal" className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="modal-close-btn" onClick={() => setAddModalOpen(false)}>×</span>
            <h2 className="modal-h2">Thêm người dùng mới</h2>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
              <div className="modal-grid">
                <div>
                  <label>Họ và tên</label>
                  <input type="text" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div>
                  <label>Mật khẩu</label>
                  <input type="password" name="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                </div>
                <div>
                  <label>Giới tính</label>
                  <div>
                    <label>
                      <input type="radio" name="gender" value="Nam" checked={formData.gender === 'Nam'} onChange={e => setFormData({ ...formData, gender: e.target.value })} /> Nam
                    </label>
                    <label>
                      <input type="radio" name="gender" value="Nữ" checked={formData.gender === 'Nữ'} onChange={e => setFormData({ ...formData, gender: e.target.value })} /> Nữ
                    </label>
                  </div>
                </div>
                <div>
                  <label>Số điện thoại</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                </div>
                <div>
                  <label>Địa chỉ</label>
                  <input type="text" name="address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div>
                  <label>Ngày sinh</label>
                  <input type="date" name="dob" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} />
                </div>
                <div>
                  <label>Vai trò</label>
                  <select name="role" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                    <option value="Học viên">Học viên</option>
                    <option value="Giảng viên">Giảng viên</option>
                    <option value="Quản lý">Quản lý</option>
                  </select>
                </div>
                <div>
                  <label>Trạng thái</label>
                  <div>
                    <label>
                      <input type="radio" name="status" value="Hoạt động" checked={formData.status === 'Hoạt động'} onChange={e => setFormData({ ...formData, status: e.target.value })} /> Hoạt động
                    </label>
                    <label>
                      <input type="radio" name="status" value="Không hoạt động" checked={formData.status === 'Không hoạt động'} onChange={e => setFormData({ ...formData, status: e.target.value })} /> Không hoạt động
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="modal-button-submit">Thêm</button>
                <button type="reset" className="modal-button-reset" onClick={() => setAddModalOpen(false)}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div id="editModal" className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="modal-close-btn" onClick={() => setEditModalOpen(false)}>×</span>
            <h2 className="modal-h2">Chỉnh sửa người dùng</h2>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
              <div className="modal-grid">
                <div>
                  <label>Họ và tên</label>
                  <input type="text" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div>
                  <label>Số điện thoại</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                </div>
                <div>
                  <label>Địa chỉ</label>
                  <input type="text" name="address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div>
                  <label>Ngày sinh</label>
                  <input type="date" name="dob" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} />
                </div>
                <div>
                  <label>Vai trò</label>
                  <select name="role" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                    <option value="Học viên">Học viên</option>
                    <option value="Giảng viên">Giảng viên</option>
                    <option value="Quản lý">Quản lý</option>
                  </select>
                </div>
                <div>
                  <label>Trạng thái</label>
                  <div>
                    <label>
                      <input type="radio" name="status" value="Hoạt động" checked={formData.status === 'Hoạt động'} onChange={e => setFormData({ ...formData, status: e.target.value })} /> Hoạt động
                    </label>
                    <label>
                      <input type="radio" name="status" value="Không hoạt động" checked={formData.status === 'Không hoạt động'} onChange={e => setFormData({ ...formData, status: e.target.value })} /> Không hoạt động
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-buttons">
                <button type="submit" className="modal-button-submit">Cập nhật</button>
                <button type="reset" className="modal-button-reset" onClick={() => setEditModalOpen(false)}>Hủy</button>
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