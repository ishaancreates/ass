import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Timetable() {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri']
  const dayNames = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri',sat: 'Sat' }
  
  // Edit these time slots as needed - you can add, remove, or modify them
  const times = [
    '09:30 - 10:20',
    '10:20 - 11:10',
    '11:10 - 12:00',
    '12:00 - 12:50',
    '14:00 - 14:50',
    '14:50 - 15:40',
    '15:40 - 16:30'
  ]

  const defaultData = () => {
    const obj = {}
    times.forEach(time => {
      obj[time] = {}
      days.forEach(d => obj[time][d] = '')
    })
    // Sample defaults
    obj[times[0]].mon = 'Circuit Analysis'
    obj[times[0]].wed = 'Electronics Lab'
    obj[times[2]].fri = 'Signals'
    return obj
  }

  const [timetable, setTimetable] = useState(defaultData())

  useEffect(() => {
    const saved = localStorage.getItem('hod_timetable_v1')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setTimetable(Object.assign(defaultData(), parsed))
      } catch (e) {
        console.error('Error loading timetable:', e)
      }
    }
  }, [])

  const handleCellChange = (time, day, value) => {
    const updated = { ...timetable }
    updated[time][day] = value
    setTimetable(updated)
  }

  const handleSave = () => {
    localStorage.setItem('hod_timetable_v1', JSON.stringify(timetable))
    alert('Timetable saved successfully!')
  }

  const handleReset = () => {
    if (window.confirm('Reset to default timetable?')) {
      const defaultTT = defaultData()
      setTimetable(defaultTT)
      localStorage.setItem('hod_timetable_v1', JSON.stringify(defaultTT))
      alert('Reset to default timetable')
    }
  }

  const handleClear = () => {
    if (window.confirm('Clear all timetable entries?')) {
      const emptyTT = {}
      times.forEach(time => {
        emptyTT[time] = {}
        days.forEach(d => emptyTT[time][d] = '')
      })
      setTimetable(emptyTT)
      localStorage.setItem('hod_timetable_v1', JSON.stringify(emptyTT))
      alert('Timetable cleared')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-red-800 text-white py-1 px-8 border-b-2 border-red-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Timetable</h1>
            <h2 className="text-lg opacity-90">Department of Electrical Engineering</h2>
          </div>
          <Link to="/hod-dashboard" className="bg-white text-red-800 border-2 border-white px-5 py-2 font-semibold hover:bg-red-800 hover:text-white transition-colors">
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto my-8 px-4">
        <section className="py-8">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="text-red-800 text-2xl font-bold">Weekly Timetable</h2>
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="bg-red-800 text-white border-2 border-red-800 px-5 py-2 font-semibold hover:bg-white hover:text-red-800 transition-colors"
              >
                Save
              </button>
              <button 
                onClick={handleReset}
                className="bg-white text-red-800 border-2 border-red-800 px-5 py-2 font-semibold hover:bg-red-800 hover:text-white transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={handleClear}
                className="bg-white text-red-800 border-2 border-red-800 px-5 py-2 font-semibold hover:bg-red-800 hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border-2 border-red-800 mb-4">
            <table className="w-full bg-white border-collapse min-w-[800px]">
              <thead className="bg-red-800 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold border-r border-red-700 w-40">Time</th>
                  {days.map(day => (
                    <th key={day} className="px-4 py-4 text-center font-semibold border-r border-red-700 last:border-r-0">
                      {dayNames[day]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map((time, timeIdx) => (
                  <tr key={time} className="hover:bg-gray-50">
                    <th className="px-4 py-4 text-left font-semibold text-red-800 border-b border-r border-gray-200 bg-gray-50">
                      {time}
                    </th>
                    {days.map((day) => (
                      <td 
                        key={`${time}-${day}`}
                        className="px-2 py-2 border-b border-r border-gray-200 last:border-r-0"
                      >
                        <input
                          type="text"
                          value={timetable[time][day]}
                          onChange={(e) => handleCellChange(time, day, e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 focus:outline-none focus:border-red-800 text-red-800"
                          placeholder="Enter subject"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-500 text-sm">
            Tip: Click any cell to edit. Changes are saved to your browser when you click the Save button.
          </p>
        </section>
      </main>
    </div>
  )
}

export default Timetable
