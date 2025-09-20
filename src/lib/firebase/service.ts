import app from "./init";
import { getFirestore, collection, getDocs, getDoc, doc, query, where, addDoc, updateDoc } from "firebase/firestore";
import bcrypt from "bcrypt";

interface FirestoreUser {
  id: string;
  email: string;
  fullname?: string;
  role: string;
  password: string;
}

export interface LoginResult {
  status: boolean;
  statusCode: number;
  message: string;
  data?: FirestoreUser;
}

// Tipe data input untuk loginWithGoogle
export interface GoogleLoginData {
  email: string;
  fullname?: string;
  type: "google";
  role?: string;
}

// Tipe hasil return
export interface GoogleLoginResult {
  status: boolean;
  message?: string;
  email: string;
  fullname?: string;
  role: string;
  id: string;
}

export async function retrieveData(collectionName: string) {
  const firestore = getFirestore(app);

  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const firestore = getFirestore(app);

  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function register(
  data: {
    fullname: string;
    email: string;
    password: string;
    role?: string;
  },
) {
  const firestore = getFirestore(app);

  // cek by email
  const q = query(collection(firestore, "users"), where("email", "==", data.email));
  const querySnapshot = await getDocs(q);

  const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (users.length > 0) {
    return { status: true, statusCode: 400, message: "Email already registered" };
  } else {
    data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);
    try {
      await addDoc(collection(firestore, "users"), data);
      return { status: true, statusCode: 200, message: "Register success" };
    } catch (error) {
      return { status: false, statusCode: 400, message: "Register failed", error};
    }
  }
}

export async function login(data: { email: string }): Promise<LoginResult> {
  const firestore = getFirestore(app);

  const q = query(collection(firestore, "users"), where("email", "==", data.email));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<FirestoreUser, "id">) }));

  if (users.length > 0) {
    return {
      status: true,
      statusCode: 200,
      message: "Login success",
      data: users[0],
    };
  } else {
    return {
      status: false,
      statusCode: 400,
      message: "Login failed",
    };
  }
}

export async function loginWithGoogle(data: any, callback: any) {
  const firestore = getFirestore(app);

  const q = query(collection(firestore, "users"), where("email", "==", data.email));
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<FirestoreUser, "id">) }));

  if (user.length > 0) {
    data.role = user[0].role;
    await updateDoc(doc(firestore, "users", user[0].id), data).then(() => {
      callback({status: true, data: data});
    });
  }else {
    data.role = "member";
    await addDoc(collection(firestore, "users"), data).then(() => {
      callback({ status: true, data: data });
    });
  }
}