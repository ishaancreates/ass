import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'
import HODDashboard from './components/hod/HODDashboard'
import Students from './components/hod/Students'
import Faculty from './components/hod/Faculty'
import Batches from './components/hod/Batches'
import Subjects from './components/hod/Subjects'
import Timetable from './components/hod/Timetable'
import ComingSoon from './components/hod/ComingSoon'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">AAS</h1>
          <p className="text-sm mt-1">Attendance & Assessment System</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            Welcome to AAS
          </h2>
          <p className="text-lg text-black">
            College Attendance Tracking & Management System
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="border-2 border-black p-6 bg-white hover:bg-gray-50 transition-colors">
            <h3 className="text-xl font-bold text-black mb-3">
              Track Attendance
            </h3>
            <p className="text-black">
              Monitor and record student attendance across all classes and sessions.
            </p>
          </div>

          <div className="border-2 border-black p-6 bg-white hover:bg-gray-50 transition-colors">
            <h3 className="text-xl font-bold text-black mb-3">
              Generate Reports
            </h3>
            <p className="text-black">
              Create detailed attendance reports for students, classes, and departments.
            </p>
          </div>

          <div className="border-2 border-black p-6 bg-white hover:bg-gray-50 transition-colors">
            <h3 className="text-xl font-bold text-black mb-3">
              Manage Records
            </h3>
            <p className="text-black">
              Efficiently manage student and faculty records in one centralized system.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-12">
          <button className="bg-white text-black px-8 py-3 border-2 border-black font-semibold hover:bg-black hover:text-white transition-colors">
            Student Login
          </button>
          <button className="bg-white text-black px-8 py-3 border-2 border-black font-semibold hover:bg-black hover:text-white transition-colors">
            Faculty Login
          </button> 
          <button 
            onClick={() => navigate('/hod-dashboard')}
            className="bg-white text-black px-8 py-3 border-2 border-black font-semibold hover:bg-black hover:text-white transition-colors"
          >
            HOD Login
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-6 px-6 mt-16 border-t-2 border-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">© 2025 AAS - Attendance & Assessment System</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hod-dashboard" element={<HODDashboard />} />
        <Route path="/hod-dashboard/students" element={<Students />} />
        <Route path="/hod-dashboard/faculty" element={<Faculty />} />
        <Route path="/hod-dashboard/batches" element={<Batches />} />
        <Route path="/hod-dashboard/subjects" element={<Subjects />} />
        <Route path="/hod-dashboard/timetable" element={<Timetable />} />
        <Route path="/hod-dashboard/attendance" element={<ComingSoon />} />
        <Route path="/hod-dashboard/assignments" element={<ComingSoon />} />
        <Route path="/hod-dashboard/announcements" element={<ComingSoon />} />
      </Routes>
    </Router>
  )
}

export default App

