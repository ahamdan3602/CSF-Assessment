import { useState } from 'react'
import FormComponent from './components/FormComponent.jsx'
import CountrySearch from './components/CountrySearch.jsx'

function App() {
  const [formData, setFormData] = useState({ country: '' })

  return (
    <div>
      <CountrySearch />
      <FormComponent formData={formData} setFormData={setFormData} />
    </div>
  )
}

export default App;