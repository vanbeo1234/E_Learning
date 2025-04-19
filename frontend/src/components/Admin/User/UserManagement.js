// File: components/UserManagement/UserManagement.jsx
import React, { useState } from 'react';
import AddUserModal from './Function/Add';
import EditUserModal from './Function/Edit';
import UserSearchForm from './Function/Search';
import './adum.css';

const UserManagement = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({ name: '', dob: '', role: '', status: '' });
  const [formData, setFormData] = useState({
    id: null, name: '', email: '', password: '', gender: '', phone: '', phoneCode: '+84', address: '', dob: '', role: '', status: 'Hoạt động', experience: 0, certifications: []
  });
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', role: 'Giảng viên', email: 'nguyenvana@example.com', phone: '0901234567', address: 'Hà Nội', gender: 'Nam', dob: '1990-01-01', status: 'Hoạt động', experience: 2, certifications: ['AWS', 'OCPJP'] },
    { id: 2, name: 'Trần Thị B', role: 'Học viên', email: 'tranthib@example.com', phone: '0902345678', address: 'Hồ Chí Minh', gender: 'Nữ', dob: '1995-05-15', status: 'Không hoạt động', experience: 0, certifications: [] },
    { id: 3, name: 'Lê Văn C', role: 'Quản lý', email: 'levanc@example.com', phone: '0903456789', address: 'Đà Nẵng', gender: 'Nam', dob: '1985-08-20', status: 'Hoạt động', experience: 10, certifications: ['PMP', 'Scrum Master'] },
    { id: 4, name: 'Phạm Thị D', role: 'Giảng viên', email: 'phamthid@example.com', phone: '0904567890', address: 'Hải Phòng', gender: 'Nữ', dob: '1988-12-12', status: 'Hoạt động', experience: 5, certifications: ['TOEFL', 'IELTS'] }
  ]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const availableCertificates = ["Chứng chỉ A", "Chứng chỉ B", "Chứng chỉ C"];

  const addCertificate = (certificate) => {
    if (formData.certifications.length < 10 && !formData.certifications.includes(certificate)) {
      setFormData(prev => ({ ...prev, certifications: [...prev.certifications, certificate] }));
    }
  };

  const removeCertificate = (certificate) => {
    setFormData(prev => ({ ...prev, certifications: prev.certifications.filter(item => item !== certificate) }));
  };

  const toggleSelectAll = () => {
    if (!selectAll) {
      setSelectedUsers(filteredUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
  };

  const handleAddUser = () => {
    const newUser = { ...formData, id: users.length + 1 };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setAddModalOpen(false);
    resetForm();
  };

  const handleEditUser = (user) => {
    setFormData(user);
    setEditModalOpen(true);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map(user => user.id === formData.id ? formData : user);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setEditModalOpen(false);
    resetForm();
  };

  const disableSelected = () => {
    const updatedUsers = users.map(user =>
      (selectAll || selectedUsers.includes(user.id))
        ? { ...user, status: 'Không hoạt động' }
        : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const enableSelected = () => {
    const updatedUsers = users.map(user =>
      (selectAll || selectedUsers.includes(user.id))
        ? { ...user, status: 'Hoạt động' }
        : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = users.filter(user =>
      (!searchCriteria.name || user.name.includes(searchCriteria.name)) &&
      (!searchCriteria.dob || user.dob === searchCriteria.dob) &&
      (!searchCriteria.role || user.role === searchCriteria.role) &&
      (!searchCriteria.status || user.status === searchCriteria.status)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', email: '', password: '', gender: '', phone: '', phoneCode: '+84', address: '', dob: '', role: '', status: 'Hoạt động', experience: 0, certifications: [] });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="user-management-container">
      <div className="user-management-content">
        <div className="user-management-card">
          <div className="user-management-search-form">
            <label htmlFor="name">Họ và tên:<input type="text" name="name" placeholder="Họ và tên" value={searchCriteria.name} onChange={handleSearchChange} /></label>
            <label htmlFor="dob">Ngày sinh:<input type="date" name="dob" placeholder="Ngày sinh" value={searchCriteria.dob} onChange={handleSearchChange} /></label>
            <label htmlFor="role">Vai trò:<select name="role" value={searchCriteria.role} onChange={handleSearchChange}>
              <option value="">Tất cả</option>
              <option value="Học viên">Học viên</option>
              <option value="Giảng viên">Giảng viên</option>
              <option value="Quản lý">Quản lý</option>
            </select></label>
            <label htmlFor="status">Trạng thái:<select name="status" value={searchCriteria.status} onChange={handleSearchChange}>
              <option value="">Tất cả</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Không hoạt động">Không hoạt động</option>
            </select></label>
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
            <label htmlFor="itemsPerPage" style={{ padding: '5px' }}>Hiển thị danh mục</label>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" checked={selectAll} onChange={toggleSelectAll} /></th>
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
                  <th>Tính năng</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleCheckboxChange(user.id)} /></td>
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
                    <td><i className="fas fa-pencil-alt icon-edit" onClick={() => handleEditUser(user)}></i></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-buttons">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>&laquo;</button>
            {[...Array(totalPages).keys()].map(number => (
              <button key={number + 1} onClick={() => handlePageChange(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>{number + 1}</button>
            ))}
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>&raquo;</button>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddUserModal
          formData={formData}
          setFormData={setFormData}
          handleAddUser={handleAddUser}
          setAddModalOpen={setAddModalOpen}
          availableCertificates={availableCertificates}
          addCertificate={addCertificate}
          removeCertificate={removeCertificate}
        />
      )}

      {isEditModalOpen && (
        <EditUserModal
          formData={formData}
          setFormData={setFormData}
          handleUpdateUser={handleUpdateUser}
          setEditModalOpen={setEditModalOpen}
          availableCertificates={availableCertificates}
          addCertificate={addCertificate}
          removeCertificate={removeCertificate}
        />
      )}
    </div>
  );
};

export default UserManagement;
