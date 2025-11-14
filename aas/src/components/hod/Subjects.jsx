import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Subjects() {
  const [subjects, setSubjects] = useState([])
  const [filteredSubjects, setFilteredSubjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    credits: '',
    semester: '',
    description: ''
  })

  useEffect(() => {
    const savedSubjects = localStorage.getItem('hod_subjects_v1')
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects))
    } else {
      const defaultSubjects = [
        { code: 'EE101', title: 'Circuit Theory', credits: '4', semester: '1', description: 'Basic circuit analysis' },
        { code: 'EE201', title: 'Electronics', credits: '4', semester: '2', description: 'Electronic devices and circuits' }
      ]
      setSubjects(defaultSubjects)
      localStorage.setItem('hod_subjects_v1', JSON.stringify(defaultSubjects))
    }
  }, [])

  useEffect(() => {
    if (subjects.length > 0) {
      localStorage.setItem('hod_subjects_v1', JSON.stringify(subjects))
    }
  }, [subjects])

  useEffect(() => {
    let filtered = subjects

    if (searchTerm) {
      filtered = filtered.filter(subject =>
        subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (semesterFilter) {
      filtered = filtered.filter(subject => subject.semester === semesterFilter)
    }

    setFilteredSubjects(filtered)
  }, [subjects, searchTerm, semesterFilter])

  const handleAddSubject = () => {
    setEditingSubject(null)
    setFormData({
      code: '',
      title: '',
      credits: '',
      semester: '',
      description: ''
    })
    setShowModal(true)
  }

  const handleEditSubject = (subject) => {
    setEditingSubject(subject)
    setFormData(subject)
    setShowModal(true)
  }

  const handleDeleteSubject = (code) => {
    if (window.confirm('Are you sure you want to delete this subject? This cannot be undone.')) {
      setSubjects(subjects.filter(s => s.code !== code))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingSubject) {
      setSubjects(subjects.map(s => 
        s.code === editingSubject.code ? formData : s
      ))
    } else {
      if (subjects.some(s => s.code === formData.code)) {
        alert('A subject with this code already exists!')
        return
      }
      setSubjects([...subjects, formData])
    }
    
    setShowModal(false)
    setFormData({
      code: '',
      title: '',
      credits: '',
      semester: '',
      description: ''
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-red-800 text-white py-6 px-8 border-b-2 border-red-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Subject Management</h1>
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
            <h2 className="text-red-800 text-2xl font-bold">Subjects & Curriculum</h2>
            <button onClick={handleAddSubject} className="bg-red-800 text-white border-2 border-red-800 px-5 py-2 font-semibold hover:bg-white hover:text-red-800 transition-colors">
              <i className="fas fa-plus"></i> Add Subject
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[250px]">
              <input
                type="text"
                placeholder="Search subjects by code or name..."
                className="w-full px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
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
            {filteredSubjects.length > 0 ? (
              <table className="w-full bg-white border-collapse">
                <thead className="bg-red-800 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Code</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Title</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Credits</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Semester</th>
                    <th className="px-4 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map((subject) => (
                    <tr key={subject.code} className="hover:bg-gray-50">
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{subject.code}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{subject.title}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{subject.credits}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{subject.semester}</td>
                      <td className="px-4 py-4 border-b border-gray-200">
                        <button
                          onClick={() => handleEditSubject(subject)}
                          className="px-3 py-2 border border-red-800 bg-white text-red-800 cursor-pointer mr-2 text-sm hover:bg-red-800 hover:text-white transition-colors"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteSubject(subject.code)}
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
                No subjects found. Add one using the button above.
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
                {editingSubject ? 'Edit Subject' : 'Add Subject'}
              </h3>
              <button className="text-2xl text-red-800 hover:text-red-700 w-8 h-8 flex items-center justify-center" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="subCode" className="mb-2 font-semibold text-red-800">Subject Code*</label>
                <input
                  type="text"
                  id="subCode"
                  required
                  disabled={editingSubject !== null}
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="subTitle" className="mb-2 font-semibold text-red-800">Title*</label>
                <input
                  type="text"
                  id="subTitle"
                  required
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="subCredits" className="mb-2 font-semibold text-red-800">Credits*</label>
                <input
                  type="number"
                  id="subCredits"
                  required
                  min="0"
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="subSemester" className="mb-2 font-semibold text-red-800">Semester*</label>
                <select
                  id="subSemester"
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
              <div className="flex flex-col col-span-1 md:col-span-2">
                <label htmlFor="subDesc" className="mb-2 font-semibold text-red-800">Short Description</label>
                <input
                  type="text"
                  id="subDesc"
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 border-2 border-red-800 bg-white text-red-800 font-semibold hover:bg-red-800 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 border-2 border-red-800 bg-red-800 text-white font-semibold hover:bg-white hover:text-red-800 transition-colors">
                  {editingSubject ? 'Save' : 'Add'} Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Subjects
