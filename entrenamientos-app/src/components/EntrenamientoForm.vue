<script setup lang="ts">
import { ref } from "vue";
import type { Entrenamiento } from "../interfaces/Entrenamiento";
import { guardarEntrenamiento } from "../services/entrenamientoService";

// Modelo del formulario
const entrenamiento = ref<Entrenamiento>({
  fecha: "",
  duracion: 0,
  distancia: 0,
});

// Guardar entrenamiento
const guardar = async () => {
  try {
    await guardarEntrenamiento(entrenamiento.value);

    alert("Entrenamiento registrado correctamente.");

    // Limpiar formulario
    entrenamiento.value = {
      fecha: "",
      duracion: 0,
      distancia: 0,
    };
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al guardar.");
  }
};
</script>

<template>
  <div class="formulario">
    <h2>Registro de Entrenamientos</h2>

    <form @submit.prevent="guardar">
      <div>
        <label>Fecha</label>

        <input
          type="date"
          v-model="entrenamiento.fecha"
          required
        />
      </div>

      <div>
        <label>Duración (minutos)</label>

        <input
          type="number"
          min="1"
          v-model.number="entrenamiento.duracion"
          required
        />
      </div>

      <div>
        <label>Distancia (km)</label>

        <input
          type="number"
          step="0.1"
          min="0"
          v-model.number="entrenamiento.distancia"
          required
        />
      </div>

      <button type="submit">
        Guardar entrenamiento
      </button>
    </form>
  </div>
</template>

<style scoped>
.formulario {
  max-width: 450px;
  margin: auto;
  padding: 20px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
}

h2{
  text-align:center;
  margin-bottom:20px;
}

form{
  display:flex;
  flex-direction:column;
  gap:15px;
}

label{
  display:block;
  margin-bottom:5px;
  font-weight:bold;
}

input{
  width:100%;
  padding:10px;
  border-radius:8px;
  border:1px solid #ccc;
}

button{
  padding:12px;
  border:none;
  border-radius:8px;
  cursor:pointer;
}
</style>