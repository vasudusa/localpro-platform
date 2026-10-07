import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Offerings() {
  const [offerings, setOfferings] = useState([])
  useEffect(() => {
    api.get('/vendor/offerings').then(res => setOfferings(res.data)).catch(() => setOfferings([]))
  }, [])
  return (
    <div>
      <h2>Offerings</h2>
      <ul className="space-y-2">
        {offerings.length === 0 && <li>No offerings found.</li>}
        {offerings.map(o => (
          <li key={o.id} className="border p-3 rounded">
            <div className="font-bold">{o.title}</div>
            <div>{o.description}</div>
            <div className="text-sm text-gray-500">Price: ${o.price} | Duration: {o.duration_minutes} min</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
