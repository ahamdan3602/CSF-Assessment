import { useState, useEffect } from 'react';

const FormComponent = ({ formData, setFormData }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
            .then(response => response.json())
            .then(data => {
                setCountries(data);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    return (
        <div className="p-8 bg-blue-300 rounded-lg border border-black">
            <form className="flex flex-col gap-4">
                <label htmlFor="countries">Choose a Country: </label>
                <select 
                    name="countries" 
                    id="countries"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-52 h-10 border border-black-500 rounded"
                >
                    <option value=""></option>
                    {countries.map((country, index) =>
                        country?.name?.common ? (
                            <option key={index} value={country.name.common}>
                                {country.name.common}
                            </option>
                        ) : null
                    )}
                </select>
                <label htmlFor="dreamCountry">Reason:</label>
                <textarea
                    id="dreamCountry"
                    name="dreamCountry"
                    value={formData.dreamCountry || ''}
                    onChange={(e) => setFormData({ ...formData, dreamCountry: e.target.value })} 
                    className="w-52 h-52 border border-black-500 rounded resize-none"
                />
                <div className="flex items-center gap-2">
                    <label htmlFor="visited">Visited:</label>
                    <input 
                        type="checkbox"
                        id="visited"
                        name="visited"
                        checked={formData.visited || false}
                        onChange={(e) => setFormData({ ...formData, visited: e.target.checked })} 
                        className="border border-black-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button type="submit" form="formdata" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" value="Submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormComponent;