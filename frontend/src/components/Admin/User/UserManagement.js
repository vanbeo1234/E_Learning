// File: components/UserManagement/UserManagement.jsx
// Mô tả: Component React quản lý người dùng với các chức năng tìm kiếm, thêm, chỉnh sửa, vô hiệu hóa/kích hoạt người dùng, và phân trang.
// Tích hợp API để lấy danh sách người dùng, thêm và cập nhật thông tin. Sử dụng CSS từ adum.css để định dạng giao diện.

import React, { useState, useEffect, useCallback } from 'react';
import AddUserModal from './Function/Add'; // Modal để thêm người dùng mới
import EditUserModal from './Function/Edit'; // Modal để chỉnh sửa thông tin người dùng
import './adum.css'; // File CSS chứa các class như user-management-card, table-container, modal, btn, v.v.
import { toast } from 'react-toastify'; // Thư viện hiển thị thông báo (toast) cho thành công/lỗi
import 'react-toastify/dist/ReactToastify.css'; // CSS của react-toastify

// Component chính: UserManagement
const UserManagement = () => {
  
  // --- State ---

  // Quản lý trạng thái mở/đóng modal thêm người dùng
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  // Quản lý trạng thái mở/đóng modal chỉnh sửa người dùng
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Trang hiện tại trong phân trang
  const [currentPage, setCurrentPage] = useState(1);

  // Số lượng người dùng hiển thị mỗi trang (cố định là 10)
  const [itemsPerPage] = useState(10);

  // Trạng thái checkbox "chọn tất cả" trong bảng
  const [selectAll, setSelectAll] = useState(false);

  // Danh sách ID của người dùng được chọn qua checkbox
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Tiêu chí tìm kiếm (tên, ngày sinh, vai trò, trạng thái)
  const [searchCriteria, setSearchCriteria] = useState({ name: '', dob: '', role: '', status: '' });

  // Dữ liệu form cho thêm/chỉnh sửa người dùng, chứa thông tin chi tiết
  const [formData, setFormData] = useState({
    id: null, // Mã người dùng
    name: '', // Họ và tên
    email: '', // Email
    password: '', // Mật khẩu
    confirmPassword: '', // Xác nhận mật khẩu
    gender: '', // Giới tính (Nam/Nữ)
    phone: '', // Số điện thoại
    phoneCode: '+84', // Mã vùng điện thoại (mặc định +84)
    address: '', // Địa chỉ
    dob: '', // Ngày sinh
    role: '', // Vai trò (Học viên/Giảng viên/Quản lý)
    status: 'Hoạt động', // Trạng thái (Hoạt động/Không hoạt động)
    experience: 0, // Số năm kinh nghiệm
    certifications: [] // Danh sách chứng chỉ
  });

  // Danh sách người dùng đã lọc từ API
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Danh sách chứng chỉ khả dụng để chọn trong modal
  const availableCertificates = ["Chứng chỉ A", "Chứng chỉ B", "Chứng chỉ C"];

  // --- API Config ---

  // URL API để gọi các endpoint
  const API_URL = 'http://localhost:8081/v1/api/user';

  // Token xác thực lấy từ localStorage
  const token = localStorage.getItem('access_token');

  // --- Helper Functions ---

  // Hàm chuyển đổi ngày sang định dạng ISO (YYYY-MM-DD) để gửi API
  const convertToISODate = (inputDate) => {
    if (!inputDate) return '';
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Hàm lấy danh sách người dùng từ API dựa trên tiêu chí tìm kiếm và phân trang
  const fetchUsers = useCallback(async () => {
    try {
      // Tạo query params từ searchCriteria và phân trang
      const params = new URLSearchParams({
        name: searchCriteria.name,
        dateOfBirth: searchCriteria.dob,
        roleId: searchCriteria.role === 'Giảng viên' ? 2 : searchCriteria.role === 'Học viên' ? 3 : searchCriteria.role === 'Quản lý' ? 1 : '',
        statusCode: searchCriteria.status === 'Hoạt động' ? 'ACTIVE' : searchCriteria.status === 'Không hoạt động' ? 'INACTIVE' : '',
        page: currentPage - 1, // API thường bắt đầu từ 0
        size: itemsPerPage
      });
      const res = await fetch(`${API_URL}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` } // Gửi token xác thực
      });
      const json = await res.json();
      setFilteredUsers(json.data); // Cập nhật danh sách người dùng
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Lỗi khi lấy danh sách người dùng!');
    }
  }, [searchCriteria, currentPage, itemsPerPage, token]);

  // --- Effects ---

  // Gọi fetchUsers khi searchCriteria, currentPage, itemsPerPage hoặc token thay đổi
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // --- Handlers ---

  // Xử lý thêm người dùng mới qua API
  const handleAddUser = async () => {
    const roleId = formData.role === "Giảng viên" ? 2 : formData.role === "Học viên" ? 3 : 1; // Chuyển vai trò sang ID
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
      ...(roleId === 1 ? { createdBy: "admin" } : {}), // Thêm createdBy nếu là Quản lý
    };

    try {
      const res = await fetch("http://localhost:8081/v1/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Token từ localStorage
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.warn("🧾 Registration response:\n", JSON.stringify(data, null, 2)); // Log phản hồi API

      if (data.errorStatus === 900) { // Kiểm tra trạng thái thành công
        toast.success("Thêm người dùng thành công!");
        fetchUsers(); // Làm mới danh sách
        setAddModalOpen(false); // Đóng modal
        resetForm(); // Reset form
      } else {
        toast.error(data.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error("Error in handleAddUser:", err);
      toast.error("Lỗi mạng hoặc token không hợp lệ. Vui lòng đăng nhập lại.");
    }
  };

  // Thêm chứng chỉ vào formData (tối đa 10 chứng chỉ)
  const addCertificate = (certificate) => {
    if (formData.certifications.length < 10 && !formData.certifications.includes(certificate)) {
      setFormData(prev => ({ ...prev, certifications: [...prev.certifications, certificate] }));
    }
  };

  // Xóa chứng chỉ khỏi formData
  const removeCertificate = (certificate) => {
    setFormData(prev => ({ ...prev, certifications: prev.certifications.filter(item => item !== certificate) }));
  };

  // Chọn/tắt chọn tất cả người dùng trong bảng
  const toggleSelectAll = () => {
    setSelectedUsers(selectAll ? [] : filteredUsers.map(u => u.id));
    setSelectAll(!selectAll);
  };

  // Xử lý chọn từng người dùng qua checkbox
  const handleCheckboxChange = (id) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
  };

  // Mở modal chỉnh sửa và điền dữ liệu người dùng
  const handleEditUser = (user) => {
    setFormData(user);
    setEditModalOpen(true);
  };

  // Cập nhật thông tin người dùng qua API
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
        fetchUsers(); // Làm mới danh sách
        setEditModalOpen(false); // Đóng modal
        resetForm(); // Reset form
        toast.success("Cập nhật người dùng thành công!");
      } else {
        toast.error(data.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      console.error('Update user error:', error);
      toast.error("Lỗi khi cập nhật người dùng!");
    }
  };

  // Cập nhật tiêu chí tìm kiếm khi người dùng nhập
  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  // Kích hoạt tìm kiếm, reset về trang 1
  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers();
  };

  // Reset form về trạng thái mặc định
  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      phone: '',
      phoneCode: '+84',
      address: '',
      dob: '',
      role: '',
      status: 'Hoạt động',
      experience: 0,
      certifications: []
    });
  };

  // Chuyển trang phân trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Vô hiệu hóa các người dùng được chọn
  const disableSelected = () => {
    const updated = filteredUsers.map(user => 
      selectedUsers.includes(user.id) ? { ...user, status: 'Không hoạt động' } : user
    );
    setFilteredUsers(updated);
    setSelectedUsers([]);
    setSelectAll(false);
    toast.success("Vô hiệu hóa người dùng thành công!");
  };

  // Kích hoạt các người dùng được chọn
  const enableSelected = () => {
    const updated = filteredUsers.map(user => 
      selectedUsers.includes(user.id) ? { ...user, status: 'Hoạt động' } : user
    );
    setFilteredUsers(updated);
    setSelectedUsers([]);
    setSelectAll(false);
    toast.success("Kích hoạt người dùng thành công!");
  };

  // --- Phân trang ---

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Lấy danh sách người dùng cho trang hiện tại
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- Render ---

  return (
    // Container chính của component
    <div className="user-management-container">
      <div className="user-management-content">
        {/* Card chứa toàn bộ nội dung quản lý người dùng */}
        <div className="user-management-card">
          {/* Form tìm kiếm với grid layout */}
          <div className="user-management-search-form">
          <label htmlFor="name" className="align-left">
            Họ và tên:
            <input 
              type="text" 
              name="name" 
              placeholder="Họ và tên" 
              value={searchCriteria.name} 
              onChange={handleSearchChange} 
            />
          </label>
          <label htmlFor="dob" className="shift-right">
            Ngày sinh:
            <input 
              type="date" 
              name="dob" 
              value={searchCriteria.dob} 
              onChange={handleSearchChange} 
            />
          </label>
          <label htmlFor="role" className="shift-right">
            Vai trò:
            <select 
              name="role" 
              value={searchCriteria.role} 
              onChange={handleSearchChange}
            >
              <option value="">Tất cả</option>
              <option value="Học viên">Học viên</option>
              <option value="Giảng viên">Giảng viên</option>
              <option value="Quản lý">Quản lý</option>
            </select>
          </label>
          <label htmlFor="status" className="align-right">
            Trạng thái:
            <select 
              name="status" 
              value={searchCriteria.status} 
              onChange={handleSearchChange}
            >
              <option value="">Tất cả</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Không hoạt động">Không hoạt động</option>
            </select>
          </label>
        </div>

          {/* Các nút hành động: Thêm, Vô hiệu hóa, Kích hoạt, Tìm kiếm */}
          <div className="user-management-action-buttons">
              <button className="btn btn-green" onClick={() => setAddModalOpen(true)}>
                Thêm
              </button>
              <button className="btn btn-red" onClick={disableSelected}>
                Vô hiệu hóa
              </button>
              <button className="btn btn-yellow" onClick={enableSelected}>
                Kích hoạt
              </button>
              <button className="btn btn-blue" onClick={handleSearch}>
                Tìm kiếm
              </button>
        </div>

          {/* Container bảng với overflow-x để responsive */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <input 
                      type="checkbox" 
                      checked={selectAll} 
                      onChange={toggleSelectAll} 
                    />
                  </th>
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
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedUsers.includes(user.id)} 
                        onChange={() => handleCheckboxChange(user.id)} 
                      />
                    </td>
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
                      <i 
                        className="fas fa-pencil-alt icon-edit" 
                        onClick={() => handleEditUser(user)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nút phân trang */}
          <div className="pagination-buttons">
            <button 
              onClick={() => handlePageChange(1)} 
              disabled={currentPage === 1}
            >
              «
            </button>
            {[...Array(totalPages).keys()].map(number => (
              <button 
                key={number + 1} 
                onClick={() => handlePageChange(number + 1)} 
                className={currentPage === number + 1 ? 'active' : ''}
              >
                {number + 1}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(totalPages)} 
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>

      {/* Modal thêm người dùng */}
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

      {/* Modal chỉnh sửa người dùng */}
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