import { useState, useEffect } from 'react';

const FormComponent = ({ formData, setFormData }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
            })
            .catch((error) => console.error('Error fetching countries:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        console.log('Submitting form data:', formData); // Debugging log
        fetch('http://localhost:3000/api/forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Form submitted successfully:', data);
                alert('Form submitted successfully!');
            })
            .catch((error) => console.error('Error submitting form:', error));
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <section className="py-16 px-4 lg:px-6">
                <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-4xl font-bold text-[#263238] mb-6">
                        Submit Your <span className="text-[#4caf4f]">Country Preferences</span>
                    </h1>
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="countries" className="block text-[#263238] font-medium mb-2">
                                Choose a Country:
                            </label>
                            <select
                                name="countries"
                                id="countries"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value, dreamCountry: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4caf4f]"
                            >
                                <option value="">Select a country</option>
                                {countries.map((country, index) =>
                                    country?.name?.common ? (
                                        <option key={index} value={country.name.common}>
                                            {country.name.common}
                                        </option>
                                    ) : null
                                )}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="reason" className="block text-[#263238] font-medium mb-2">
                                Reason:
                            </label>
                            <textarea
                                id="reason"
                                name="reason"
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#4caf4f]"
                                rows="5"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label htmlFor="visited" className="text-[#263238] font-medium">
                                Visited:
                            </label>
                            <input
                                type="checkbox"
                                id="visited"
                                name="visited"
                                checked={formData.visited || false}
                                onChange={(e) => setFormData({ ...formData, visited: e.target.checked })}
                                className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4caf4f]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#4caf4f] hover:bg-[#388e3b] text-white px-6 py-3 rounded font-medium transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default FormComponent;