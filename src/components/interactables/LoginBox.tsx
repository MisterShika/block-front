import { useState } from "react";
export default function LoginBox() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
        }),
        });

        const data = await response.json();

        if (response.ok) {
        setMessage(data.token); // or data.message
        } else {
        setMessage(data.message);
        }
    };

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}