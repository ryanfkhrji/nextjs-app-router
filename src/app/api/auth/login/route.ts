import { NextResponse, NextRequest } from "next/server";

// Kirim response JSON
export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log(req);

  return NextResponse.json({ status: 200, message: "Success", data: req });
}

// Login handler
// export async function POST(request: NextRequest) {
//   const req = await request.json();

//   if (req.email === "admin@gmail.com" && req.password === "admin123") {
//     return NextResponse.json({ message: "Login successful", data: req }, { status: 200 });
//   } else {
//     return NextResponse.json(
//       { message: "Invalid email or password", data: {} },
//       { status: 401 }
//     );
//   }
// }

