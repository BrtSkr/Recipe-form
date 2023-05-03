import { FormEvent, useState } from "react";
import "./Form.scss";

interface FormData {
    name: string;
    preparation_time: string;
    type: string;
    no_of_slices?: number;
    diameter?: number;
    spiciness_scale?: number;
    slices_of_bread?: number;
}

// Set default values for the form data
const defaultFormData: FormData = {
    name: "",
    preparation_time: "",
    type: "",
    no_of_slices: 1,
    diameter: 0.01,
    spiciness_scale: 1,
    slices_of_bread: 1,
};

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        preparation_time: "",
        type: "",
        no_of_slices: 1,
        diameter: 0.01,
        spiciness_scale: 1,
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // Handle changes to the form inputs
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Handle form submission
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(
                "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            console.log(
                `Response status: ${response.status}`,
                `Response statusText: ${response.statusText}`,
                `Response.ok: ${response.ok}`
            );
            // If the response status is 400 or not ok, show an error message
            if (response.status === 400 || !response.ok) {
                setShowSuccessMessage(false);
                setShowErrorMessage(true);
                return;
            }
            // Otherwise, show a success message and reset the form data
            const data = await response.json();
            console.log(data);
            setFormData(defaultFormData);
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
        } catch (error) {
            console.log(error);
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    };
    // Handle changes to the dish type select input
    const handleDishTypeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFormData({ ...formData, type: event.target.value });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="name">Dish Name</label>
            <input
                type="text"
                id="name"
                name="name"
                minLength={3}
                value={formData.name || ""}
                onChange={handleInputChange}
                required
                placeholder="Dish Name"
            />

            <label htmlFor="preparation_time">Preparation Time</label>
            <input
                type="time"
                id="preparation_time"
                name="preparation_time"
                value={formData.preparation_time || ""}
                onChange={handleInputChange}
                step={1}
                required
            />

            <label htmlFor="type">Dish Type</label>
            <select
                id="type"
                name="type"
                value={formData.type || ""}
                onChange={handleDishTypeChange}
                required
            >
                <option value="">--Select--</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="sandwich">Sandwich</option>
            </select>

            {formData.type === "pizza" && (
                <>
                    <label htmlFor="no_of_slices">Number of Slices</label>
                    <input
                        type="number"
                        id="no_of_slices"
                        name="no_of_slices"
                        min={1}
                        value={formData.no_of_slices || 1}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="diameter">Diameter</label>
                    <input
                        type="number"
                        step="0.01"
                        id="diameter"
                        name="diameter"
                        min={0.01}
                        value={formData.diameter || 0.01}
                        onChange={handleInputChange}
                        required
                    />
                </>
            )}

            {formData.type === "soup" && (
                <>
                    <label htmlFor="spiciness_scale">Spiciness Scale</label>
                    <input
                        type="number"
                        id="spiciness_scale"
                        name="spiciness_scale"
                        value={formData.spiciness_scale || 1}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        required
                    />
                    <br />
                </>
            )}

            {formData.type === "sandwich" && (
                <>
                    <label htmlFor="slices_of_bread">Slices of Bread</label>
                    <input
                        type="number"
                        id="slices_of_bread"
                        name="slices_of_bread"
                        value={formData.slices_of_bread || 1}
                        min={1}
                        onChange={handleInputChange}
                        required
                    />
                    <br />
                </>
            )}
            <button type="submit">
                Submit
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
            {showSuccessMessage && (
                <p className="success-message">Recipe added successfully!</p>
            )}
            {showErrorMessage && (
                <p className="error-message">
                    Error adding recipe. Please try again later.
                </p>
            )}
        </form>
    );
};

export default Form;
