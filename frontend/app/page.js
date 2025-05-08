// 'use client';

// import Link from 'next/link';

// export default function HomePage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
//       <h1 className="text-[35px] font-extrabold mb-10">Welcome to the Task Torch 🔦</h1>

//       <div className="flex flex-col items-center space-y-6">
//         <div>
//           <h2 className="text-[20px] mb-2 font-medium">Login to continue</h2>
//           <Link href="/login">
//             <button className="bg-blue-500 text-white px-6 py-2 rounded border border-blue-500 hover:bg-blue-600 transition">
//               Login
//             </button>
//           </Link>
//         </div>

//         <div>
//           <h2 className="text-[20px] mb-2 font-medium">New here !!</h2>
//           <Link href="/register">
//             <button className="bg-blue-500 text-white px-6 py-2 rounded border border-blue-500 hover:bg-blue-600 transition">
//               Register
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../lib/api'; // Axios instance with credentials

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/profile'); // Adjust path if needed
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-[35px] font-extrabold mb-10">Welcome to the Task Torch 🔦</h1>

      {isLoggedIn ? (
        <Link href="/homePage">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Go to Homepage
          </button>
        </Link>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <div>
            <h2 className="text-[20px] mb-2 font-medium">Login to continue</h2>
            <Link href="/login">
              <button className="bg-blue-500 text-white px-6 py-2 rounded border border-blue-500 hover:bg-blue-600 transition">
                Login
              </button>
            </Link>
          </div>

          <div>
            <h2 className="text-[20px] mb-2 font-medium">New here !!</h2>
            <Link href="/register">
              <button className="bg-blue-500 text-white px-6 py-2 rounded border border-blue-500 hover:bg-blue-600 transition">
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
