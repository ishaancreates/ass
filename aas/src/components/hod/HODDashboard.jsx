import { Link } from 'react-router-dom'

function HODDashboard() {
  const stats = [
    { number: 245, label: 'Total Students' },
    { number: 18, label: 'Faculty Members' },
    { number: 6, label: 'Active Batches' },
    { number: 24, label: 'Subjects' }
  ]

  const managementCards = [
    { 
      icon: 'fa-user-graduate', 
      title: 'Students', 
      description: 'Manage student records',
      link: '/hod-dashboard/students'
    },
    { 
      icon: 'fa-chalkboard-teacher', 
      title: 'Faculty', 
      description: 'Manage faculty members',
      link: '/hod-dashboard/faculty'
    },
    { 
      icon: 'fa-users', 
      title: 'Batches', 
      description: 'Manage class batches',
      link: '/hod-dashboard/batches'
    },
    { 
      icon: 'fa-book', 
      title: 'Subjects', 
      description: 'Manage subjects & curriculum',
      link: '/hod-dashboard/subjects'
    },
    { 
      icon: 'fa-clipboard-check', 
      title: 'Attendance', 
      description: 'View attendance reports',
      link: '/hod-dashboard/attendance'
    },
    { 
      icon: 'fa-tasks', 
      title: 'Assignments', 
      description: 'Monitor assignments',
      link: '/hod-dashboard/assignments'
    },
    { 
      icon: 'fa-calendar-alt', 
      title: 'Timetable', 
      description: 'Manage class schedules',
      link: '/hod-dashboard/timetable'
    },
    { 
      icon: 'fa-bullhorn', 
      title: 'Announcements', 
      description: 'Post announcements',
      link: '/hod-dashboard/announcements'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-red-800 text-white py-1 px-8 border-b-2 border-red-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">HOD Dashboard</h1>
            <h2 className="text-lg opacity-90">Department of Electrical Engineering</h2>
          </div>
          <Link to="/" className="bg-white text-red-800 border-2 border-white px-5 py-2 font-semibold hover:bg-red-800 hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto my-8 px-4">
        <section className="mb-12">
          <h2 className="text-red-800 text-2xl font-bold mb-6">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white border-2 border-red-800 p-6 text-center hover:bg-gray-50 transition-colors">
                <div className="text-4xl font-bold text-red-800 mb-2">{stat.number}</div>
                <div className="text-red-800 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-red-800 text-2xl font-bold mb-6">Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {managementCards.map((card, index) => (
              <Link 
                key={index} 
                to={card.link} 
                className="bg-white border-2 border-red-800 p-6 text-center hover:bg-red-800 hover:text-white transition-all hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-red-800 group-hover:bg-white flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${card.icon} text-2xl text-white group-hover:text-red-800`}></i>
                </div>
                <h3 className="text-red-800 group-hover:text-white font-bold mb-2">{card.title}</h3>
                <p className="text-red-800 group-hover:text-white text-sm">{card.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default HODDashboard
