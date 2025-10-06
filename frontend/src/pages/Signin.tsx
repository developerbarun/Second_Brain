import { useRef, useEffect } from "react";
// import { Button } from "../components/Button";
// import { Input } from "../components/Input";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/signin",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 px-4">
      <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-10 max-w-md w-full text-center text-white">
        <h1 className="text-4xl font-bold mb-3">Welcome Back 👋</h1>
        <p className="text-sm text-gray-200 mb-8">
          Sign in to your Second Brain
        </p>

        <div className="space-y-4">
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 bg-white/80 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-white/80 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
          />

          <button
            onClick={signin}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-purple-500/40"
          >
            Sign In
          </button>
        </div>

        <p className="text-gray-200 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-yellow-300 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};



// import { useRef, useEffect } from "react";
// import { Button } from "../components/Button";
// import { Input } from "../components/Input";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const Signin = () => {
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   async function signin() {
//     const username = usernameRef.current?.value;
//     const password = passwordRef.current?.value;

//     try {
//       const response = await axios.post(
//         import.meta.env.VITE_BACKEND_URL + "/api/v1/user/signin",
//         { username, password }
//       );

//       const jwt = response.data.token;
//       localStorage.setItem("token", jwt);

//       navigate("/dashboard");
//     } catch (error) {
//       alert("Invalid username or password");
//     }
//   }

//   return (
//     <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
//       <div className="bg-white rounded-xl border min-w-48 p-8">
//         <Input reference={usernameRef} placeholder="Username" />
//         <Input reference={passwordRef} placeholder="Password" />
//         <div>
//           <Button
//             loading={false}
//             varient="primary"
//             text="Signin"
//             fullWidth={true}
//             size="md"
//             onClick={signin}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };





// // import { useRef } from "react";
// // import { Button } from "../components/Button"
// // import { Input } from "../components/Input"
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // export const Signin = () => {

// //     const usernameRef = useRef<HTMLInputElement>(null);
// //     const passwordRef = useRef<HTMLInputElement>(null);

// //     const navigate = useNavigate();

// //     async function signin(){
// //         const username = usernameRef.current?.value;
// //         const password = passwordRef.current?.value;
// //         const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/user/signin",{
// //             username,
// //             password
// //         })
// //         const jwt = response.data.token;
// //         localStorage.setItem("token",jwt);
// //         navigate("/dashboard")
// //     }

// //     return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
// //         <div className="bg-white rounded-xl border min-w-48 p-8">
// //             <Input reference={usernameRef} placeholder="username"/>
// //             <Input reference={passwordRef}  placeholder="password"/>
// //             <div>
// //                 <Button loading = {false} varient="primary" text="Signin" fullWidth={true} size="md" onClick={signin}/>
// //             </div>
// //         </div>
// //     </div>
// // }