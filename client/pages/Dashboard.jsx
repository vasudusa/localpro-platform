import React from 'react'
export default function Dashboard() {
  return (
    <div>
      <h2>Vendor Dashboard</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Overview of your offerings</li>
        <li>Manage appointments</li>
        <li>View transactions</li>
        <li>Update settings (WhatsApp, theme, hours)</li>
      </ul>
      <p className="text-gray-500">(Feature pages to be implemented)</p>
    </div>
  )
}
