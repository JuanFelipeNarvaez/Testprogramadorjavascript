import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";

import type { Entrenamiento } from "../interfaces/Entrenamiento";

const entrenamientosRef = collection(db, "entrenamientos");

// Guardar
export const guardarEntrenamiento = async (
  entrenamiento: Entrenamiento
) => {
  await addDoc(entrenamientosRef, entrenamiento);
};

// Obtener en tiempo real
export const escucharEntrenamientos = (
  callback: (entrenamientos: Entrenamiento[]) => void
) => {

  const q = query(
    entrenamientosRef,
    orderBy("fecha", "desc")
  );

  return onSnapshot(q, (snapshot) => {

    const entrenamientos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Entrenamiento[];

    callback(entrenamientos);

  });

};

// Eliminar
export const eliminarEntrenamiento = async (id: string) => {
  await deleteDoc(doc(db, "entrenamientos", id));
};

// Actualizar
export const actualizarEntrenamiento = async (
  entrenamiento: Entrenamiento
) => {

  if (!entrenamiento.id) return;

  const documento = doc(db, "entrenamientos", entrenamiento.id);

  await updateDoc(documento, {
    fecha: entrenamiento.fecha,
    duracion: entrenamiento.duracion,
    distancia: entrenamiento.distancia
  });

};