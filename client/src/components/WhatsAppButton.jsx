import React from 'react'
export default function WhatsAppButton({number, message}){
  const cleaned = (number || '').replace(/[^+0-9]/g,'');
  const url = cleaned ? `https://wa.me/${cleaned}?text=${encodeURIComponent(message||'Hello')}` : '#';
  return (
    <a href={url} target="_blank" rel="noreferrer" className="fixed right-6 bottom-6 bg-green-500 text-white p-3 rounded-full shadow-lg">
      WhatsApp
    </a>
  )
}
