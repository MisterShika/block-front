import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/register")({
  component: Register,
});


function Register() {
    const [registrationData, setRegistrationData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(registrationData.email)) {
        setError("Invalid email")
        return
        }

        if (registrationData.password !== registrationData.confirmPassword) {
        setError("Passwords do not match")
        return
        }

        try {
            const response = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                username: registrationData.username,
                email: registrationData.email,
                password: registrationData.password,
                }),
            })
            
            const data = await response.json()

            if (response.ok) {
                navigate({ to: "/mypage" })
            } else {
                setError(data.message || "Registration failed")
            }
        } catch {
        setError("Unable to connect to the server.")
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={registrationData.username} onChange={(e) => setRegistrationData({...registrationData, username: e.target.value})} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={registrationData.email} onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={registrationData.password} onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})} />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input type="password" name="confirmPassword" value={registrationData.confirmPassword} onChange={(e) => setRegistrationData({...registrationData, confirmPassword: e.target.value})} />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <span>Already have an account? <Link to="/login" search={{ redirect: undefined }}>Login</Link></span>
        </div>
    )
}