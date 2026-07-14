import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/login";

export default function LoginBox() {
    const navigate = useNavigate();
    const { redirect } = Route.useSearch();

    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the JWT
                localStorage.setItem("token", data.token);

                // Redirect to the page the user originally wanted,
                // or home if they just visited /login directly.
                navigate({
                    to: redirect || "/",
                });
            } else {
                setMessage(data.message);
            }
        } catch {
            setMessage("Unable to connect to the server.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>

            {message && (
                <p className="mt-2 text-red-500">
                    {message}
                </p>
            )}
        </div>
    );
}