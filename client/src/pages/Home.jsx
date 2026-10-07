import React from 'react'
export default function Home() {
  return (
    <div>
      <h1>Welcome to LocalPro Platform</h1>
      <p className="mb-4">A multi-tenant SaaS for vendors (doctors, advocates, retail, custom) to manage offerings, appointments, and more.</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Book appointments with vendors</li>
        <li>View offerings</li>
        <li>Vendor and Super Admin dashboards</li>
        <li>Subdomain-based multi-tenant support</li>
      </ul>
      <p className="text-gray-500">Try registering as a vendor or login as demo admin after seeding the database.</p>
    </div>
  )
}
