import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Faculty() {
  const [faculty, setFaculty] = useState([])
  const [filteredFaculty, setFilteredFaculty] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [designationFilter, setDesignationFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: '',
    designation: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    const savedFaculty = localStorage.getItem('hod_faculty_v1')
    if (savedFaculty) {
      setFaculty(JSON.parse(savedFaculty))
    } else {
      const defaultFaculty = [
        { id: 'F01', name: 'Dr. A Kumar', department: 'Electrical', designation: 'Professor', email: 'akumar@example.com', phone: '9876500001' },
        { id: 'F02', name: 'Dr. S Rao', department: 'Electronics', designation: 'Assistant Professor', email: 'srao@example.com', phone: '9876500002' }
      ]
      setFaculty(defaultFaculty)
      localStorage.setItem('hod_faculty_v1', JSON.stringify(defaultFaculty))
    }
  }, [])

  useEffect(() => {
    if (faculty.length > 0) {
      localStorage.setItem('hod_faculty_v1', JSON.stringify(faculty))
    }
  }, [faculty])

  useEffect(() => {
    let filtered = faculty

    if (searchTerm) {
      filtered = filtered.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (deptFilter) {
      filtered = filtered.filter(f => f.department === deptFilter)
    }

    if (designationFilter) {
      filtered = filtered.filter(f => f.designation === designationFilter)
    }

    setFilteredFaculty(filtered)
  }, [faculty, searchTerm, deptFilter, designationFilter])

  const handleAddFaculty = () => {
    setEditingFaculty(null)
    setFormData({
      id: '',
      name: '',
      department: '',
      designation: '',
      email: '',
      phone: ''
    })
    setShowModal(true)
  }

  const handleEditFaculty = (fac) => {
    setEditingFaculty(fac)
    setFormData(fac)
    setShowModal(true)
  }

  const handleDeleteFaculty = (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member? This cannot be undone.')) {
      setFaculty(faculty.filter(f => f.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingFaculty) {
      setFaculty(faculty.map(f => 
        f.id === editingFaculty.id ? formData : f
      ))
    } else {
      if (faculty.some(f => f.id === formData.id)) {
        alert('A faculty member with this ID already exists!')
        return
      }
      setFaculty([...faculty, formData])
    }
    
    setShowModal(false)
    setFormData({
      id: '',
      name: '',
      department: '',
      designation: '',
      email: '',
      phone: ''
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-red-800 text-white py-6 px-8 border-b-2 border-red-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Faculty Management</h1>
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
            <h2 className="text-red-800 text-2xl font-bold">Faculty Records</h2>
            <button onClick={handleAddFaculty} className="bg-red-800 text-white border-2 border-red-800 px-5 py-2 font-semibold hover:bg-white hover:text-red-800 transition-colors">
              <i className="fas fa-plus"></i> Add Faculty
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[250px]">
              <input
                type="text"
                placeholder="Search faculty..."
                className="w-full px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border-2 border-red-800 bg-white text-red-800 cursor-pointer focus:outline-none focus:border-red-700"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="Electrical">Electrical</option>
                <option value="Electronics">Electronics</option>
                <option value="Computer">Computer</option>
              </select>
              <select
                className="px-3 py-2 border-2 border-red-800 bg-white text-red-800 cursor-pointer focus:outline-none focus:border-red-700"
                value={designationFilter}
                onChange={(e) => setDesignationFilter(e.target.value)}
              >
                <option value="">All Designations</option>
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border-2 border-red-800">
            {filteredFaculty.length > 0 ? (
              <table className="w-full bg-white border-collapse">
                <thead className="bg-red-800 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">ID</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Name</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Department</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Designation</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Email</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Phone</th>
                    <th className="px-4 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFaculty.map((fac) => (
                    <tr key={fac.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{fac.id}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{fac.name}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{fac.department}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{fac.designation}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{fac.email}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{fac.phone || '-'}</td>
                      <td className="px-4 py-4 border-b border-gray-200">
                        <button
                          onClick={() => handleEditFaculty(fac)}
                          className="px-3 py-2 border border-red-800 bg-white text-red-800 cursor-pointer mr-2 text-sm hover:bg-red-800 hover:text-white transition-colors"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteFaculty(fac.id)}
                          className="px-3 py-2 border border-red-800 bg-white text-red-800 cursor-pointer text-sm hover:bg-red-800 hover:text-white transition-colors"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 py-8 text-center">
                No faculty found. Add one using the button above.
              </p>
            )}
          </div>
        </section>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white p-8 max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto border-2 border-red-800" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-red-800">
                {editingFaculty ? 'Edit Faculty' : 'Add Faculty'}
              </h3>
              <button className="text-2xl text-red-800 hover:text-red-700 w-8 h-8 flex items-center justify-center" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="facId" className="mb-2 font-semibold text-red-800">Faculty ID*</label>
                <input
                  type="text"
                  id="facId"
                  required
                  disabled={editingFaculty !== null}
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="facName" className="mb-2 font-semibold text-red-800">Full Name*</label>
                <input
                  type="text"
                  id="facName"
                  required
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="facDept" className="mb-2 font-semibold text-red-800">Department*</label>
                <select
                  id="facDept"
                  required
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Select Department</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Computer">Computer</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="facDesig" className="mb-2 font-semibold text-red-800">Designation*</label>
                <select
                  id="facDesig"
                  required
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                >
                  <option value="">Select Designation</option>
                  <option value="Professor">Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="facEmail" className="mb-2 font-semibold text-red-800">Email*</label>
                <input
                  type="email"
                  id="facEmail"
                  required
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="facPhone" className="mb-2 font-semibold text-red-800">Phone</label>
                <input
                  type="tel"
                  id="facPhone"
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
                  {editingFaculty ? 'Save Changes' : 'Add Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Faculty
