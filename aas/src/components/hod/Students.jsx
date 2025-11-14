import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Students() {
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [batchFilter, setBatchFilter] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    batch: '',
    semester: '',
    email: '',
    phone: ''
  })

  // Load students from localStorage
  useEffect(() => {
    const savedStudents = localStorage.getItem('hod_students_v1')
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    } else {
      const defaultStudents = [
        { rollNo: '101', name: 'John Doe', batch: '2024', semester: '5', email: 'john@example.com', phone: '9876543210' },
        { rollNo: '102', name: 'Jane Smith', batch: '2024', semester: '5', email: 'jane@example.com', phone: '9876543211' }
      ]
      setStudents(defaultStudents)
      localStorage.setItem('hod_students_v1', JSON.stringify(defaultStudents))
    }
  }, [])

  // Save students to localStorage whenever they change
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('hod_students_v1', JSON.stringify(students))
    }
  }, [students])

  // Filter students based on search and filters
  useEffect(() => {
    let filtered = students

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (batchFilter) {
      filtered = filtered.filter(student => student.batch === batchFilter)
    }

    if (semesterFilter) {
      filtered = filtered.filter(student => student.semester === semesterFilter)
    }

    setFilteredStudents(filtered)
  }, [students, searchTerm, batchFilter, semesterFilter])

  const handleAddStudent = () => {
    setEditingStudent(null)
    setFormData({
      rollNo: '',
      name: '',
      batch: '',
      semester: '',
      email: '',
      phone: ''
    })
    setShowModal(true)
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
    setFormData(student)
    setShowModal(true)
  }

  const handleDeleteStudent = (rollNo) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.rollNo !== rollNo))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingStudent) {
      setStudents(students.map(s => 
        s.rollNo === editingStudent.rollNo ? formData : s
      ))
    } else {
      if (students.some(s => s.rollNo === formData.rollNo)) {
        alert('A student with this roll number already exists!')
        return
      }
      setStudents([...students, formData])
    }
    
    setShowModal(false)
    setFormData({
      rollNo: '',
      name: '',
      batch: '',
      semester: '',
      email: '',
      phone: ''
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-red-800 text-white py-1 px-8 border-b-2 border-red-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Student Management</h1>
            <h2 className="text-lg opacity-90">Department of Electrical Engineering</h2>
          </div>
          <Link to="/hod-dashboard" className="bg-white text-red-800 border-2 border-white px-5 py-2 font-semibold hover:bg-red-800 hover:text-white transition-colors">
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto my-8 px-4">
        <section className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-red-800 text-2xl font-bold">Student Records</h2>
            <button onClick={handleAddStudent} className="bg-red-800 text-white border-2 border-red-800 px-5 py-2 font-semibold hover:bg-white hover:text-red-800 transition-colors">
              <i className="fas fa-plus"></i> Add Student
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[250px]">
              <input
                type="text"
                placeholder="Search students..."
                className="w-full px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border-2 border-red-800 bg-white text-red-800 cursor-pointer focus:outline-none focus:border-red-700"
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
              >
                <option value="">All Batches</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <select
                className="px-3 py-2 border-2 border-red-800 bg-white text-red-800 cursor-pointer focus:outline-none focus:border-red-700"
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
              >
                <option value="">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border-2 border-red-800">
            {filteredStudents.length > 0 ? (
              <table className="w-full bg-white border-collapse">
                <thead className="bg-red-800 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Roll No</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Name</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Batch</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Semester</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Email</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Phone</th>
                    <th className="px-4 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.rollNo} className="hover:bg-gray-50">
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{student.rollNo}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{student.name}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{student.batch}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{student.semester}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{student.email}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{student.phone}</td>
                      <td className="px-4 py-4 border-b border-gray-200">
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="px-3 py-2 border border-red-800 bg-white text-red-800 cursor-pointer mr-2 text-sm hover:bg-red-800 hover:text-white transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.rollNo)}
                          className="px-3 py-2 border border-red-800 bg-white text-red-800 cursor-pointer text-sm hover:bg-red-800 hover:text-white transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 py-8 text-center">
                No students found. Add some using the button above.
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white p-8 max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto border-2 border-red-800" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-red-800">
                {editingStudent ? 'Edit Student' : 'Add Student'}
              </h3>
              <button className="text-2xl text-red-800 hover:text-red-700 w-8 h-8 flex items-center justify-center" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="rollNo" className="mb-2 font-semibold text-red-800">Roll Number*</label>
                <input
                  type="text"
                  id="rollNo"
                  required
                  disabled={editingStudent !== null}
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 font-semibold text-red-800">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="batch" className="mb-2 font-semibold text-red-800">Batch*</label>
                <select
                  id="batch"
                  required
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.batch}
                  onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                >
                  <option value="">Select Batch</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="semester" className="mb-2 font-semibold text-red-800">Semester*</label>
                <select
                  id="semester"
                  required
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-semibold text-red-800">Email*</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-2 font-semibold text-red-800">Phone*</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  pattern="[0-9]{10}"
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 border-2 border-red-800 bg-white text-red-800 font-semibold hover:bg-red-800 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 border-2 border-red-800 bg-red-800 text-white font-semibold hover:bg-white hover:text-red-800 transition-colors">
                  {editingStudent ? 'Update' : 'Add'} Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Students
