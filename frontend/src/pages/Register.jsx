import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async (e) => {

    e.preventDefault()

    try {

      const { data } = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/auth/register`,

        {
          name,
          email,
          password,
        }

      )

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      )

      alert("Registration Successful")

      navigate("/")

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      )

    }

  }

  return (

    <div className="bg-gray-50 min-h-screen flex justify-center items-center px-6">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-green-700 mb-10">

          Register

        </h1>

        <form
          onSubmit={submitHandler}
          className="space-y-6"
        >

          {/* NAME */}

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border p-4 rounded-2xl outline-none"
            required
          />

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-4 rounded-2xl outline-none"
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-4 rounded-2xl outline-none"
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-2xl text-xl font-bold hover:bg-green-700"
          >

            Register

          </button>

        </form>

        {/* LOGIN */}

        <p className="text-center mt-6 text-gray-600">

          Already Have Account?

          <Link
            to="/login"
            className="text-green-700 font-bold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  )
}

export default Register