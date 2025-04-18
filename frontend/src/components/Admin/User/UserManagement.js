import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from './Function/Confirm';
import './adum.css'; // Giả sử sử dụng CSS tương tự CourseManagement

const UserManagement = () => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    dateOfBirth: '',
    role: '',
    statusCode: ''
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Gọi API để lấy danh sách người dùng
  const fetchUsers = async (page = 0, size = itemsPerPage) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8081/v1/api/user?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.errorStatus === 900) {
          setUsers(data.data);
          setFilteredUsers(data.data);
          setTotalPages(data.pagination.totalPages);
          setCurrentPage(data.pagination.currentPage + 1);
        } else {
          toast.error(data.message || 'Lỗi khi lấy danh sách người dùng.');
        }
      } else {
        toast.error('Không thể lấy danh sách người dùng. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  useEffect(() => {
    fetchUsers(currentPage - 1, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleAddUser = () => {
    navigate('/add-user');
  };

  const toggleSelectAll = () => {
    if (!selectAll) {
      setSelectedUsers(filteredUsers.map(user => user.userCode));
    } else {
      setSelectedUsers([]);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (userCode) => {
    setSelectedUsers(prev =>
      prev.includes(userCode) ? prev.filter(id => id !== userCode) : [...prev, userCode]
    );
  };

  const handleEditUser = (user) => {
    navigate(`/edit-user/${user.userCode}`);
  };

  const showConfirmModal = (action) => {
    setConfirmAction(() => action);
    setConfirmMessage(action === 'disable'
      ? 'Bạn có chắc muốn vô hiệu hóa các người dùng đã chọn?'
      : 'Bạn có chắc muốn kích hoạt lại các người dùng đã chọn?');
    setConfirmModalOpen(true);
  };

  const hideConfirmModal = () => {
    setConfirmModalOpen(false);
    setConfirmAction(null);
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const statusCode = confirmAction === 'disable' ? 'INACTIVE' : 'ACTIVE';
      const updatePromises = selectedUsers.map(userCode =>
        fetch('http://localhost:8081/v1/api/user/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ userCode, statusCode })
        })
      );

      const responses = await Promise.all(updatePromises);
      const allSuccess = responses.every(res => res.ok);

      if (allSuccess) {
        toast.success('Cập nhật trạng thái thành công!');
        fetchUsers(currentPage - 1, itemsPerPage);
        setSelectedUsers([]);
      } else {
        toast.error('Cập nhật trạng thái thất bại.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
    setConfirmModalOpen(false);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: '0',
        size: itemsPerPage.toString(),
        ...(searchCriteria.name && { name: searchCriteria.name }),
        ...(searchCriteria.dateOfBirth && { dateOfBirth: searchCriteria.dateOfBirth }),
        ...(searchCriteria.role && { roleId: searchCriteria.role === 'Admin' ? '1' : '2' }),
        ...(searchCriteria.statusCode && { statusCode: searchCriteria.statusCode })
      });

      const response = await fetch(`http://localhost:8081/v1/api/user/search?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.errorStatus === 900) {
          setFilteredUsers(data.data);
          setTotalPages(data.pagination.totalPages);
          setCurrentPage(1);
        } else {
          toast.error(data.message || 'Lỗi khi tìm kiếm người dùng.');
        }
      } else {
        toast.error('Không thể tìm kiếm người dùng. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-management-container">
      <ToastContainer />
      <div className="user-management-content">
        <div className="user-management-card">
          <div className="user-management-search-form">
            <label htmlFor="name">Tên người dùng
              <input type="text" name="name" placeholder="Tên người dùng" value={searchCriteria.name} onChange={handleSearchChange} />
            </label>
            <label htmlFor="dateOfBirth">Ngày sinh
              <input type="date" name="dateOfBirth" value={searchCriteria.dateOfBirth} onChange={handleSearchChange} />
            </label>
            <label htmlFor="role">Vai trò
              <select name="role" value={searchCriteria.role} onChange={handleSearchChange}>
                <option value="">Tất cả</option>
                <option value="Admin">Admin</option>
                <option value="Giảng viên">Giảng viên</option>
              </select>
            </label>
            <label htmlFor="statusCode">Trạng thái
              <select name="statusCode" value={searchCriteria.statusCode} onChange={handleSearchChange}>
                <option value="">Tất cả</option>
                <option value="ACTIVE">Hoạt động</option>
                <option value="INACTIVE">Không hoạt động</option>
              </select>
            </label>
          </div>

          <div className="user-management-action-buttons">
            <div>
              <button className="btn btn-green" onClick={handleAddUser}>Thêm</button>
              <button className="btn btn-red" onClick={() => showConfirmModal('disable')}>Vô hiệu hóa</button>
              <button className="btn btn-yellow" onClick={() => showConfirmModal('enable')}>Kích hoạt</button>
              <button className="btn btn-blue" onClick={handleSearch}>Tìm kiếm</button>
            </div>
          </div>

          <div className="user-management-pagination">
            <div>
              <label htmlFor="itemsPerPage" style={{ padding: '5px' }}>Hiển thị danh mục</label>
              <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" id="selectAll" onClick={toggleSelectAll} /></th>
                  <th>STT</th>
                  <th>Mã người dùng</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Ngày sinh</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Kinh nghiệm</th>
                  <th>Chứng chỉ</th>
                  <th>Giới tính</th>
                  <th>Tính năng</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.userCode}>
                    <td><input type="checkbox" className="row-checkbox" checked={selectedUsers.includes(user.userCode)} onChange={() => handleCheckboxChange(user.userCode)} /></td>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{user.userCode}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.dateOfBirth}</td>
                    <td>{user.role}</td>
                    <td className="status">{user.statusCode}</td>
                    <td>{user.experience || 'N/A'}</td>
                    <td>{user.certification || 'N/A'}</td>
                    <td>{user.gender}</td>
                    <td>
                      <i className="fas fa-pencil-alt icon-edit" onClick={() => handleEditUser(user)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-buttons">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>«</button>
            {[...Array(totalPages).keys()].map(number => (
              <button key={number + 1} onClick={() => handlePageChange(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
                {number + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>»</button>
          </div>
        </div>
      </div>

      {isConfirmModalOpen && (
        <ConfirmModal
          message={confirmMessage}
          onConfirm={handleConfirm}
          onCancel={hideConfirmModal}
        />
      )}
    </div>
  );
};

export default UserManagement;