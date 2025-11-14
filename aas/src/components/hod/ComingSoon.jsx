import { Link, useParams } from 'react-router-dom'

function ComingSoon() {
  const { section } = useParams()
  
  const sectionTitles = {
    faculty: 'Faculty Management',
    batches: 'Batch Management',
    subjects: 'Subject Management',
    attendance: 'Attendance Reports',
    assignments: 'Assignment Monitoring',
    timetable: 'Timetable Management',
    announcements: 'Announcements'
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-red-800 text-white py-6 px-8 border-b-2 border-red-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">{sectionTitles[section] || 'Coming Soon'}</h1>
            <h2 className="text-lg opacity-90">Department of Electrical Engineering</h2>
          </div>
          <Link to="/hod-dashboard" className="bg-white text-red-800 border-2 border-white px-5 py-2 font-semibold hover:bg-red-800 hover:text-white transition-colors">
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto my-8 px-4">
        <div className="text-center py-16 px-8">
          <div className="w-16 h-16 bg-red-800 flex items-center justify-center mx-auto mb-8">
            <i className="fas fa-tools text-2xl text-white"></i>
          </div>
          <h2 className="text-red-800 text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-red-800 text-lg">
            This feature is currently under development.
          </p>
        </div>
      </main>
    </div>
  )
}

export default ComingSoon
