import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

import type { Entrenamiento } from "../interfaces/Entrenamiento";

const entrenamientosRef = collection(db, "entrenamientos");

export const guardarEntrenamiento = async (
  entrenamiento: Entrenamiento
) => {
  await addDoc(entrenamientosRef, entrenamiento);
};

export const obtenerEntrenamientos = async () => {
  const snapshot = await getDocs(entrenamientosRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Entrenamiento[];
};