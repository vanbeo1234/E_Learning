import axiosInstance from "./axiosInstance";

/**
 * Lọc danh sách khóa học kèm phân trang và điều kiện tìm kiếm.
 * @param {Object} params - Các tham số lọc: courseName, instructorName, statusCode, createdBy, pageNumber, pageSize.
 * @returns {Promise<Object>} Kết quả lọc từ backend.
 */
export const filterCourses = async (params) => {
  const res = await axiosInstance.get("/course", { params });
  return res.data;
};

/**
 * Lấy thông tin chi tiết của một khóa học theo courseId.
 * @param {number} courseId - ID khóa học cần lấy chi tiết.
 * @returns {Promise<Object>} Thông tin khóa học từ backend.
 */
export const getCourseDetail = async (courseId) => {
  const res = await axiosInstance.get("/course/detail", { params: { courseId } });
  return res.data;
};

/**
 * Tạo mới một khóa học.
 * @param {Object} courseData - Dữ liệu khóa học cần tạo.
 * @returns {Promise<Object>} Thông tin khóa học đã tạo.
 */
export const createCourse = async (courseData) => {
  const res = await axiosInstance.post("/course", courseData);
  return res.data;
};

/**
 * Cập nhật thông tin khóa học.
 * @param {string} courseCode - Mã khóa học cần cập nhật.
 * @param {Object} courseData - Dữ liệu cập nhật mới.
 * @returns {Promise<Object>} Kết quả cập nhật từ backend.
 */
export const updateCourse = async (courseCode, courseData) => {
  const res = await axiosInstance.put(`/course/${courseCode}`, courseData);
  return res.data;
};
