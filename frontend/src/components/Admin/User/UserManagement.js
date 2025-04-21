// File: components/UserManagement/UserManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import AddUserModal from './Function/Add';
import EditUserModal from './Function/Edit';
import '../Style/adum.css'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManagement = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({ name: '', dob: '', role: '', status: '' });
  const [formData, setFormData] = useState({
    id: null, name: '', email: '', password: '', confirmPassword: '', gender: '', phone: '', phoneCode: '+84',
    address: '', dob: '', role: '', status: 'Hoạt động', experience: 0, certifications: []
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const availableCertificates = ["Chứng chỉ A", "Chứng chỉ B", "Chứng chỉ C"];

  const API_URL = 'http://localhost:8081/v1/api/user';
  const token = localStorage.getItem('access_token');

  const convertToISODate = (inputDate) => {
    if (!inputDate) return '';
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
 
  const fetchUsers = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        name: searchCriteria.name,
        dateOfBirth: searchCriteria.dob,
        roleId: searchCriteria.role === 'Giảng viên' ? 2 : searchCriteria.role === 'Học viên' ? 3 : searchCriteria.role === 'Quản lý' ? 1 : '',
        statusCode: searchCriteria.status === 'Hoạt động' ? 'ACTIVE' : searchCriteria.status === 'Không hoạt động' ? 'INACTIVE' : '',
        page: currentPage - 1,
        size: itemsPerPage
      });
      const res = await fetch(`${API_URL}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      setFilteredUsers(json.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [searchCriteria, currentPage, itemsPerPage, token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


const handleAddUser = async () => {
  const roleId =
    formData.role === "Giảng viên"
      ? 2
      : formData.role === "Học viên"
      ? 3
      : 1; // Mặc định 'Quản lý'

  const body = {
    userCode: formData.id,
    name: formData.name,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword || formData.password,
    gender: formData.gender === "Nam" ? 1 : 0,
    dateOfBirth: convertToISODate(formData.dob),
    address: formData.address,
    phone: `${formData.phoneCode}${formData.phone}`,
    roleId: roleId,
    statusCode: formData.status === "Hoạt động" ? "ACTIVE" : "INACTIVE",
    certification: formData.certifications.join(","),
    ...(roleId === 1 ? { createdBy: "admin" } : {}),
  };

  try {
    const res = await fetch("http://localhost:8081/v1/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    //  Log toàn bộ phản hồi rõ ràng
    console.warn("🧾 Registration response:\n", JSON.stringify(data, null, 2));

    //  Thành công
    if (data.errorStatus === 900) {
      toast.success("Thêm người dùng thành công!");
      fetchUsers();
      setAddModalOpen(false);
      resetForm();
    } else {
      toast.error(data.message || "Đăng ký thất bại!");
    }
  } catch (err) {
    console.error(" Error in handleAddUser:", err);
    toast.error("Lỗi mạng hoặc token không hợp lệ. Vui lòng đăng nhập lại.");
  }
};

  
  const addCertificate = (certificate) => {
    if (formData.certifications.length < 10 && !formData.certifications.includes(certificate)) {
      setFormData(prev => ({ ...prev, certifications: [...prev.certifications, certificate] }));
    }
  };

  const removeCertificate = (certificate) => {
    setFormData(prev => ({ ...prev, certifications: prev.certifications.filter(item => item !== certificate) }));
  };

  const toggleSelectAll = () => {
    setSelectedUsers(selectAll ? [] : filteredUsers.map(u => u.id));
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
  };

  const handleEditUser = (user) => {
    setFormData(user);
    setEditModalOpen(true);
  };

  const handleUpdateUser = async () => {
    try {
      const updatePayload = {
        userCode: formData.id,
        phone: formData.phone,
        address: formData.address,
        statusCode: formData.status === 'Hoạt động' ? 'ACTIVE' : 'INACTIVE',
        experience: formData.experience,
        certification: formData.certifications.join(',')
      };
      const res = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload)
      });
      const data = await res.json();
      if (data.errorStatus === 900) {
        fetchUsers();
        setEditModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers();
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', email: '', password: '', confirmPassword: '', gender: '', phone: '', phoneCode: '+84', address: '', dob: '', role: '', status: 'Hoạt động', experience: 0, certifications: [] });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const disableSelected = () => {
    const updated = filteredUsers.map(user => selectedUsers.includes(user.id) ? { ...user, status: 'Không hoạt động' } : user);
    setFilteredUsers(updated);
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const enableSelected = () => {
    const updated = filteredUsers.map(user => selectedUsers.includes(user.id) ? { ...user, status: 'Hoạt động' } : user);
    setFilteredUsers(updated);
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div className="user-management-container">
      <div className="user-management-content">
        <div className="user-management-card">
          <div className="user-management-search-form">
            <label htmlFor="name">Họ và tên:<input type="text" name="name" placeholder="Họ và tên" value={searchCriteria.name} onChange={handleSearchChange} /></label>
            <label htmlFor="dob">Ngày sinh:<input type="date" name="dob" value={searchCriteria.dob} onChange={handleSearchChange} /></label>
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
                  <th>Kinh nghiệm</th>
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

