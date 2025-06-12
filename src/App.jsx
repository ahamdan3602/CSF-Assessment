import { useState } from 'react'
import FormComponent from './components/FormComponent.jsx'

function App() {
  const [formData, setFormData] = useState({ country: '' })

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Country Form</h1>
      <FormComponent formData={formData} setFormData={setFormData} />
    </div>
  )
}

export default App;