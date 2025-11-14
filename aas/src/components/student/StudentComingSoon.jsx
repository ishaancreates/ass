import { Link, useLocation } from 'react-router-dom'

function StudentComingSoon() {
  const location = useLocation()
  const section = location.pathname.split('/').pop()
  
  const sectionTitles = {
    attendance: 'Attendance',
    syllabus: 'Syllabus',
    assignments: 'Assignments',
    notifications: 'Notifications',
    circulars: 'Circulars',
    events: 'Events'
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-green-900 text-white py-6 px-8 border-b-2 border-green-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">{sectionTitles[section] || 'Coming Soon'}</h1>
            <h2 className="text-lg opacity-90">Student Portal</h2>
          </div>
          <Link to="/student-dashboard" className="bg-white text-green-900 border-2 border-white px-5 py-2 font-semibold hover:bg-green-900 hover:text-white transition-colors">
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto my-8 px-4">
        <div className="text-center py-16 px-8">
          <div className="w-16 h-16 bg-green-900 flex items-center justify-center mx-auto mb-8">
            <i className="fas fa-tools text-2xl text-white"></i>
          </div>
          <h2 className="text-green-900 text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-green-900 text-lg">
            This feature is currently under development.
          </p>
        </div>
      </main>
    </div>
  )
}

export default StudentComingSoon
