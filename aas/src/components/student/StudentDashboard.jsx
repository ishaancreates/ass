import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function StudentDashboard() {
  const [upcomingClasses, setUpcomingClasses] = useState([])
  const [notifications, setNotifications] = useState([])
  const [currentClassIndex, setCurrentClassIndex] = useState(0)

  useEffect(() => {
    // Load from localStorage or use defaults
    const savedClasses = localStorage.getItem('student_upcoming_classes')
    if (savedClasses) {
      setUpcomingClasses(JSON.parse(savedClasses))
    } else {
      const defaultClasses = [
        { time: '10:20 - 11:10 AM', subject: 'EM&I', teacher: 'By Bhagat Sir' },
        { time: '11:10 - 12:00 PM', subject: 'Data Structures', teacher: 'By Kumar Ma\'am' },
        { time: '01:00 - 02:00 PM', subject: 'Digital Electronics', teacher: 'By Sharma Sir' }
      ]
      setUpcomingClasses(defaultClasses)
      localStorage.setItem('student_upcoming_classes', JSON.stringify(defaultClasses))
    }

    const savedNotifications = localStorage.getItem('student_notifications')
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    } else {
      const defaultNotifications = [
        { title: 'Test announcement', content: 'Helloooo', date: '27 days ago', from: 'HOD' }
      ]
      setNotifications(defaultNotifications)
      localStorage.setItem('student_notifications', JSON.stringify(defaultNotifications))
    }
  }, [])

  const handlePrevClass = () => {
    setCurrentClassIndex((prev) => (prev > 0 ? prev - 1 : upcomingClasses.length - 1))
  }

  const handleNextClass = () => {
    setCurrentClassIndex((prev) => (prev < upcomingClasses.length - 1 ? prev + 1 : 0))
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Navigate to home
      window.location.href = '/'
    }
  }

  const currentClass = upcomingClasses[currentClassIndex]

  const menuItems = [
    { icon: 'fa-check-circle', label: 'Attendance', link: '/student-dashboard/attendance' },
    { icon: 'fa-book', label: 'Syllabus', link: '/student-dashboard/syllabus' },
    { icon: 'fa-clipboard-list', label: 'Assignments', link: '/student-dashboard/assignments' },
    { icon: 'fa-bell', label: 'Notifications', link: '/student-dashboard/notifications' },
    { icon: 'fa-bullhorn', label: 'Circulars', link: '/student-dashboard/circulars' },
    { icon: 'fa-calendar-alt', label: 'Events', link: '/student-dashboard/events' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-6 py-5    ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold text-green-900">Hello, Ishaan</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-3">
        {/* Upcoming Classes Section */}
        <section className="mb-3">
          <h2 className="text-xl font-bold text-green-900 mb-2">Upcoming Classes</h2>
          {upcomingClasses.length > 0 && currentClass ? (
            <div className="bg-gray-100 p-2 relative">
              <button 
                onClick={handlePrevClass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-green-900 text-2xl hover:text-green-700"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              <div className="text-center">
                <p className="text-green-900 text-lg mb-2">{currentClass.time}</p>
                <h3 className="text-4xl font-bold text-green-900 mb-2">{currentClass.subject}</h3>
                <p className="text-green-900 text-lg">{currentClass.teacher}</p>
              </div>

              <button 
                onClick={handleNextClass}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-green-900 text-2xl hover:text-green-700"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          ) : (
            <div className="bg-gray-100 p-8 text-center">
              <p className="text-green-900">No upcoming classes</p>
            </div>
          )}
        </section>

        {/* Latest Notifications Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-green-900">Latest Notifications</h2>
            <Link to="/student-dashboard/notifications" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.slice(0, 3).map((notification, index) => (
                <div key={index} className="border-2 border-gray-200 p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-info-circle text-green-900 text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-green-900 mb-1">{notification.title}</h3>
                      <p className="text-green-900 mb-2">{notification.content}</p>
                      <p className="text-sm text-gray-500">{notification.date}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-2 border-gray-200 p-8 text-center">
                <p className="text-gray-500">No notifications yet</p>
              </div>
            )}
          </div>
        </section>

        {/* Menu Buttons Grid */}
        <section>
          <div className="grid grid-cols-6 md:grid-cols-6 gap-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="bg-white border-2 border-green-900 p-6 text-center hover:bg-green-900 hover:text-white transition-all hover:-translate-y-1 group"
              >
                <i className={`fas ${item.icon} text-4s`}></i>
                <span className="font-semibold text-lg">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center py-6">
          <p className="text-green-900 font-semibold mb-1">Department of Electrical Engineering</p>
          <p className="text-sm text-gray-500">© 2025 Team AAS</p>
        </footer>
      </main>
    </div>
  )
}

export default StudentDashboard
