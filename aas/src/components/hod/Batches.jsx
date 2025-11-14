import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Batches() {
  const [batches, setBatches] = useState([])
  const [filteredBatches, setFilteredBatches] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [yearFilter, setYearFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingBatch, setEditingBatch] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    year: '',
    start: '',
    end: '',
    active: 'true'
  })

  useEffect(() => {
    const savedBatches = localStorage.getItem('hod_batches_v1')
    if (savedBatches) {
      setBatches(JSON.parse(savedBatches))
    } else {
      const defaultBatches = [
        { id: 'B2024-A', name: 'Batch A', year: '2024', start: '', end: '', active: 'true' },
        { id: 'B2025-B', name: 'Batch B', year: '2025', start: '', end: '', active: 'true' }
      ]
      setBatches(defaultBatches)
      localStorage.setItem('hod_batches_v1', JSON.stringify(defaultBatches))
    }
  }, [])

  useEffect(() => {
    if (batches.length > 0) {
      localStorage.setItem('hod_batches_v1', JSON.stringify(batches))
    }
  }, [batches])

  useEffect(() => {
    let filtered = batches

    if (searchTerm) {
      filtered = filtered.filter(batch =>
        batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batch.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (yearFilter) {
      filtered = filtered.filter(batch => batch.year === yearFilter)
    }

    setFilteredBatches(filtered)
  }, [batches, searchTerm, yearFilter])

  const handleAddBatch = () => {
    setEditingBatch(null)
    setFormData({
      id: '',
      name: '',
      year: '',
      start: '',
      end: '',
      active: 'true'
    })
    setShowModal(true)
  }

  const handleEditBatch = (batch) => {
    setEditingBatch(batch)
    setFormData(batch)
    setShowModal(true)
  }

  const handleDeleteBatch = (id) => {
    if (window.confirm('Are you sure you want to delete this batch? This cannot be undone.')) {
      setBatches(batches.filter(b => b.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingBatch) {
      setBatches(batches.map(b => 
        b.id === editingBatch.id ? formData : b
      ))
    } else {
      if (batches.some(b => b.id === formData.id)) {
        alert('A batch with this ID already exists!')
        return
      }
      setBatches([...batches, formData])
    }
    
    setShowModal(false)
    setFormData({
      id: '',
      name: '',
      year: '',
      start: '',
      end: '',
      active: 'true'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-red-800 text-white py-6 px-8 border-b-2 border-red-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Batch Management</h1>
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
            <h2 className="text-red-800 text-2xl font-bold">Active Batches</h2>
            <button onClick={handleAddBatch} className="bg-red-800 text-white border-2 border-red-800 px-5 py-2 font-semibold hover:bg-white hover:text-red-800 transition-colors">
              <i className="fas fa-plus"></i> Add Batch
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[250px]">
              <input
                type="text"
                placeholder="Search batches by name or id..."
                className="w-full px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border-2 border-red-800 bg-white text-red-800 cursor-pointer focus:outline-none focus:border-red-700"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="">All Years</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border-2 border-red-800">
            {filteredBatches.length > 0 ? (
              <table className="w-full bg-white border-collapse">
                <thead className="bg-red-800 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Batch ID</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Name</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Year</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Start Date</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">End Date</th>
                    <th className="px-4 py-4 text-left font-semibold border-r border-red-700">Active</th>
                    <th className="px-4 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBatches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{batch.id}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{batch.name}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{batch.year}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{batch.start || '-'}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{batch.end || '-'}</td>
                      <td className="px-4 py-4 border-b border-r border-gray-200 text-red-800">{batch.active === 'true' ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-4 border-b border-gray-200">
                        <button
                          onClick={() => handleEditBatch(batch)}
                          className="px-3 py-2 border border-red-800 bg-white text-red-800 cursor-pointer mr-2 text-sm hover:bg-red-800 hover:text-white transition-colors"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteBatch(batch.id)}
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
                No batches found. Add one using the button above.
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
                {editingBatch ? 'Edit Batch' : 'Add Batch'}
              </h3>
              <button className="text-2xl text-red-800 hover:text-red-700 w-8 h-8 flex items-center justify-center" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="batchId" className="mb-2 font-semibold text-red-800">Batch ID*</label>
                <input
                  type="text"
                  id="batchId"
                  required
                  disabled={editingBatch !== null}
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 font-semibold text-red-800">Name*</label>
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
                <label htmlFor="year" className="mb-2 font-semibold text-red-800">Year*</label>
                <select
                  id="year"
                  required
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                  <option value="">Select Year</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="start" className="mb-2 font-semibold text-red-800">Start Date</label>
                <input
                  type="date"
                  id="start"
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.start}
                  onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="end" className="mb-2 font-semibold text-red-800">End Date</label>
                <input
                  type="date"
                  id="end"
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.end}
                  onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="active" className="mb-2 font-semibold text-red-800">Active</label>
                <select
                  id="active"
                  className="px-3 py-2 border-2 border-red-800 text-base focus:outline-none focus:border-red-700"
                  value={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.value })}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 border-2 border-red-800 bg-white text-red-800 font-semibold hover:bg-red-800 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 border-2 border-red-800 bg-red-800 text-white font-semibold hover:bg-white hover:text-red-800 transition-colors">
                  {editingBatch ? 'Save' : 'Add'} Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Batches
