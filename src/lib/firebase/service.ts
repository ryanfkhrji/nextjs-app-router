import app from "./init";
import { getFirestore, collection, getDocs, getDoc, doc, query, where, addDoc, updateDoc } from "firebase/firestore";
import bcrypt from "bcrypt";

export interface FirestoreUser {
  id: string;
  email: string;
  fullname?: string;
  role: string;
  password?: string; // opsional saat login google
}

export interface LoginResult {
  status: boolean;
  statusCode: number;
  message: string;
  data?: FirestoreUser;
}

export interface GoogleLoginData {
  email: string;
  fullname?: string;
  type: "google";
  role?: string;
}

export async function retrieveData(collectionName: string) {
  const firestore = getFirestore(app);
  const snapshot = await getDocs(collection(firestore, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function retrieveDataById(collectionName: string, id: string) {
  const firestore = getFirestore(app);
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  return snapshot.data();
}

export async function register(data: { fullname: string; email: string; password: string; role?: string }) {
  const firestore = getFirestore(app);
  const q = query(collection(firestore, "users"), where("email", "==", data.email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0) {
    return { status: true, statusCode: 400, message: "Email already registered" };
  }

  data.role = "member";
  data.password = await bcrypt.hash(data.password, 10);

  try {
    await addDoc(collection(firestore, "users"), data);
    return { status: true, statusCode: 200, message: "Register success" };
  } catch (error) {
    return { status: false, statusCode: 400, message: "Register failed", error };
  }
}

export async function login(data: { email: string }): Promise<LoginResult> {
  const firestore = getFirestore(app);
  const q = query(collection(firestore, "users"), where("email", "==", data.email));
  const snapshot = await getDocs(q);

  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<FirestoreUser, "id">) }));

  if (users.length > 0) {
    return { status: true, statusCode: 200, message: "Login success", data: users[0] };
  }
  return { status: false, statusCode: 400, message: "Login failed" };
}

export async function loginWithGoogle(data: GoogleLoginData, callback: (result: { status: boolean; data: FirestoreUser }) => void) {
  const firestore = getFirestore(app);
  const q = query(collection(firestore, "users"), where("email", "==", data.email));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<FirestoreUser, "id">) }));

  if (users.length > 0) {
    // update fullname jika berbeda
    await updateDoc(doc(firestore, "users", users[0].id), {
      fullname: data.fullname ?? users[0].fullname,
    });
    callback({ status: true, data: users[0] });
  } else {
    const newUser = { ...data, role: "member" };
    const docRef = await addDoc(collection(firestore, "users"), newUser);
    callback({ status: true, data: { id: docRef.id, ...newUser } as FirestoreUser });
  }
}
