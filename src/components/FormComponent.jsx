import { useState } from 'react'
import {useEffect} from 'react'



const FormComponent = ({ formData, setFormData }) => {

    
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const countriesArray = data;
            console.log(countriesArray);
        })
        .catch(error => console.error('Error fetching countries:', error));


    return (
        <div>
            <form>
                <label for='Dream Country'>Choose a Country: </label>
                <select name = "countries" id = "countries">

                </select>

            </form>



        </div>
    )


}