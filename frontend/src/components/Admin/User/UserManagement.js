import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AddUserModal from './Function/Add';
import EditUserModal from './Function/Edit';
import '../Style/adum.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManagement = () => {
  // --- State ---
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({ name: '', dob: '', role: '', status: '' });
  const [formData, setFormData] = useState({
    id: '',
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
    certifications: [],
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newlyAddedUserId, setNewlyAddedUserId] = useState(null);

  const availableCertificates = [
    "Chứng chỉ Sư phạm",
    "Chứng chỉ Giảng dạy Quốc tế TESOL",
    "Chứng chỉ IELTS 7.0+",
    "Chứng chỉ TOEFL iBT",
    "Chứng chỉ Quản lý Giáo dục",
    "Chứng chỉ Đào tạo Kỹ năng Mềm",
    "Chứng chỉ Công nghệ Giáo dục",
    "Chứng chỉ Phát triển Chương trình Đào tạo",
    "Chứng chỉ Đánh giá và Kiểm định Chất lượng Giáo dục",
    "Chứng chỉ Huấn luyện Doanh nghiệp"
  ];

  const initialMockUsers = [
    {
      id: "U001",
      name: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
      phone: "+84912345678",
      address: "123 Đường Láng, Hà Nội",
      gender: "Nam",
      dob: "1990-05-15",
      role: "Giảng viên",
      status: "Hoạt động",
      experience: 5,
      certifications: ["Chứng chỉ Sư phạm", "Chứng chỉ TESOL"],
    },
    {
      id: "U002",
      name: "Trần Thị Bình",
      email: "binh.tran@example.com",
      phone: "+84987654321",
      address: "456 Lê Lợi, TP.HCM",
      gender: "Nữ",
      dob: "1995-08-22",
      role: "Học viên",
      status: "Hoạt động",
      experience: 0,
      certifications: [],
    },
    {
      id: "U003",
      name: "Lê Minh Châu",
      email: "chau.le@example.com",
      phone: "+84911223344",
      address: "789 Trần Hưng Đạo, Đà Nẵng",
      gender: "Nam",
      dob: "1985-03-10",
      role: "Quản lý",
      status: "Không hoạt động",
      experience: 10,
      certifications: ["Chứng chỉ Quản lý Giáo dục"],
    },
    {
      id: "U004",
      name: "Phạm Thị Dung",
      email: "dung.pham@example.com",
      phone: "+84955667788",
      address: "101 Nguyễn Huệ, Huế",
      gender: "Nữ",
      dob: "1992-11-30",
      role: "Giảng viên",
      status: "Hoạt động",
      experience: 3,
      certifications: ["Chứng chỉ Sư phạm", "Chứng chỉ IELTS 7.0+"],
    },
  ];

  const [mockUsers, setMockUsers] = useState(initialMockUsers);

  // --- Helper Functions ---
  const convertToISODate = (inputDate) => {
    if (!inputDate) return '';
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchUsers = useCallback((criteria = { name: '', dob: '', role: '', status: '' }) => {
    setIsLoading(true);
    try {
      let users = [...mockUsers];
      users = users.filter(user => {
        const matchesName = criteria.name
          ? user.name.toLowerCase().includes(criteria.name.toLowerCase())
          : true;
        const matchesDob = criteria.dob ? user.dob === convertToISODate(criteria.dob) : true;
        const matchesRole = criteria.role ? user.role === criteria.role : true;
        const matchesStatus = criteria.status ? user.status === criteria.status : true;
        return matchesName && matchesDob && matchesRole && matchesStatus;
      });
      setFilteredUsers(users);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Lỗi khi lấy danh sách người dùng!');
    } finally {
      setIsLoading(false);
    }
  }, [mockUsers]);

  // --- Effects ---
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // --- Handlers ---
  const handleAddUser = async () => {
    try {
      setIsLoading(true);
      if (mockUsers.some(user => user.id === formData.id)) {
        toast.error("Mã định danh đã tồn tại!");
        return;
      }
      if (mockUsers.some(user => user.email === formData.email)) {
        toast.error("Email đã tồn tại!");
        return;
      }

      const newUser = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        phone: `${formData.phoneCode}${formData.phone}`,
        address: formData.address,
        gender: formData.gender,
        dob: convertToISODate(formData.dob),
        role: formData.role,
        status: formData.status,
        experience: Number(formData.experience) || 0,
        certifications: formData.certifications || [],
      };
      setMockUsers(prev => [newUser, ...prev]);
      setNewlyAddedUserId(newUser.id);
      toast.success("Thêm người dùng thành công!");
      const originalCriteria = { ...searchCriteria };
      setSearchCriteria({ name: '', dob: '', role: '', status: '' });
      fetchUsers({ name: '', dob: '', role: '', status: '' });
      setTimeout(() => {
        setSearchCriteria(originalCriteria);
        fetchUsers(originalCriteria);
        setNewlyAddedUserId(null);
      }, 5000);
      setCurrentPage(1);
      setAddModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error in handleAddUser:", err);
      toast.error("Lỗi khi thêm người dùng!");
    } finally {
      setIsLoading(false);
    }
  };

  const addCertificate = (certificate) => {
    if (formData.certifications.length >= 10) {
      toast.error("Không thể thêm quá 10 chứng chỉ!");
      return;
    }
    if (!formData.certifications.includes(certificate)) {
      setFormData(prev => ({ ...prev, certifications: [...prev.certifications, certificate] }));
    } else {
      toast.error("Chứng chỉ đã được chọn!");
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
    setFormData({
      ...user,
      password: '',
      confirmPassword: '',
      phoneCode: user.phone.slice(0, 3) || '+84',
      phone: user.phone.slice(3) || '',
    });
    setEditModalOpen(true);
  };

  const handleUpdateUser = async () => {
    try {
      setIsLoading(true);
      if (mockUsers.some(user => user.email === formData.email && user.id !== formData.id)) {
        toast.error("Email đã tồn tại!");
        return;
      }

      const updatedUsers = mockUsers.map(user =>
        user.id === formData.id
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              phone: `${formData.phoneCode}${formData.phone}`,
              address: formData.address,
              gender: formData.gender,
              dob: convertToISODate(formData.dob),
              role: formData.role,
              status: formData.status,
              experience: Number(formData.experience) || 0,
              certifications: formData.certifications || [],
            }
          : user
      );
      setMockUsers(updatedUsers);
      fetchUsers(searchCriteria);
      setEditModalOpen(false);
      resetForm();
      toast.success("Cập nhật người dùng thành công!");
    } catch (error) {
      console.error('Update user error:', error);
      toast.error("Lỗi khi cập nhật người dùng!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    fetchUsers(searchCriteria);
  };

  const resetForm = () => {
    setFormData({
      id: '',
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
      certifications: [],
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const disableSelected = () => {
    setIsLoading(true);
    const updatedUsers = mockUsers.map(user =>
      selectedUsers.includes(user.id) ? { ...user, status: 'Không hoạt động' } : user
    );
    setMockUsers(updatedUsers);
    setFilteredUsers(prev => prev.map(user =>
      selectedUsers.includes(user.id) ? { ...user, status: 'Không hoạt động' } : user
    ));
    setSelectedUsers([]);
    setSelectAll(false);
    toast.success("Vô hiệu hóa người dùng thành công!");
    setIsLoading(false);
  };

  const enableSelected = () => {
    setIsLoading(true);
    const updatedUsers = mockUsers.map(user =>
      selectedUsers.includes(user.id) ? { ...user, status: 'Hoạt động' } : user
    );
    setMockUsers(updatedUsers);
    setFilteredUsers(prev => prev.map(user =>
      selectedUsers.includes(user.id) ? { ...user, status: 'Hoạt động' } : user
    ));
    setSelectedUsers([]);
    setSelectAll(false);
    toast.success("Kích hoạt người dùng thành công!");
    setIsLoading(false);
  };

  // --- New Logic for Button Disabling ---
  const canDisable = selectedUsers.length > 0 && !selectedUsers.every(id => {
    const user = mockUsers.find(u => u.id === id);
    return user.status === 'Không hoạt động';
  });

  const canEnable = selectedUsers.length > 0 && !selectedUsers.every(id => {
    const user = mockUsers.find(u => u.id === id);
    return user.status === 'Hoạt động';
  });

  // --- Phân trang ---
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = useMemo(() => {
    return filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // --- Render ---
  return (
    <div className="user-management-container">
      {isLoading && <div className="loading-overlay">Đang tải...</div>}
      <div className="user-management-content">
        <div className="user-management-card">
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

          <div className="user-management-action-buttons">
            <button className="btn btn-green" onClick={() => setAddModalOpen(true)}>
              Thêm
            </button>
            <button
              className="btn btn-red"
              onClick={() => {
                if (!canDisable) {
                  toast.error("Tất cả người dùng đã chọn đã bị vô hiệu hóa!");
                  return;
                }
                setActionType('disable');
                setConfirmModalOpen(true);
              }}
              disabled={!canDisable}
            >
              Vô hiệu hóa
            </button>
            <button
              className="btn btn-yellow"
              onClick={() => {
                if (!canEnable) {
                  toast.error("Tất cả người dùng đã chọn đã được kích hoạt!");
                  return;
                }
                setActionType('enable');
                setConfirmModalOpen(true);
              }}
              disabled={!canEnable}
            >
              Kích hoạt
            </button>
            <button className="btn btn-blue" onClick={handleSearch}>
              Tìm kiếm
            </button>
          </div>

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
                  <tr
                    key={user.id}
                    className={user.id === newlyAddedUserId ? 'highlight-new-user' : ''}
                  >
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
                    <td>{user.certifications.join(', ') || 'Không có'}</td>
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

      {isConfirmModalOpen && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <p>Bạn có chắc chắn muốn {actionType === 'disable' ? 'vô hiệu hóa' : 'kích hoạt'} {selectedUsers.length} người dùng đã chọn không?</p>
            <div className="modal-actions">
              <button
                className="btn btn-red"
                onClick={() => setConfirmModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="btn btn-green"
                onClick={() => {
                  if (actionType === 'disable') {
                    disableSelected();
                  } else {
                    enableSelected();
                  }
                  setConfirmModalOpen(false);
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;