import React, { useState } from 'react'
import api from '../services/api'

export default function Booking() {
  const [form, setForm] = useState({ offering_id: '', customer_name: '', customer_contact: '', start_at: '', end_at: '' })
  const [message, setMessage] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')
    try {
      await api.post('/vendor/appointments/book', form)
      setMessage('Appointment booked!')
    } catch (err) {
      setMessage('Booking failed')
    }
  }

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="offering_id" placeholder="Offering ID" className="border p-2 w-full" value={form.offering_id} onChange={handleChange} required />
        <input name="customer_name" placeholder="Your Name" className="border p-2 w-full" value={form.customer_name} onChange={handleChange} required />
        <input name="customer_contact" placeholder="Contact Info" className="border p-2 w-full" value={form.customer_contact} onChange={handleChange} required />
        <input name="start_at" type="datetime-local" className="border p-2 w-full" value={form.start_at} onChange={handleChange} required />
        <input name="end_at" type="datetime-local" className="border p-2 w-full" value={form.end_at} onChange={handleChange} required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Book</button>
      </form>
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  )
}
