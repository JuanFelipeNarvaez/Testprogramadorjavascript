<script setup lang="ts">
import { ref, watch } from "vue";
import type { Entrenamiento } from "../interfaces/Entrenamiento";
import {
  guardarEntrenamiento,
  actualizarEntrenamiento
} from "../services/entrenamientoService";

const props = defineProps<{
  entrenamientoEditar: Entrenamiento | null;
}>();

const emit = defineEmits<{
  (e: "cancelar"): void;
}>();

const entrenamiento = ref<Entrenamiento>({
  fecha: "",
  duracion: 0,
  distancia: 0,
});

watch(
  () => props.entrenamientoEditar,
  (nuevo) => {
    if (nuevo) {
      entrenamiento.value = { ...nuevo };
    } else {
      entrenamiento.value = {
        fecha: "",
        duracion: 0,
        distancia: 0,
      };
    }
  },
  { immediate: true }
);

const guardar = async () => {
  try {
    if (entrenamiento.value.id) {
      await actualizarEntrenamiento(entrenamiento.value);
      alert("Entrenamiento actualizado correctamente.");
    } else {
      await guardarEntrenamiento(entrenamiento.value);
      alert("Entrenamiento registrado correctamente.");
    }

    entrenamiento.value = {
      fecha: "",
      duracion: 0,
      distancia: 0,
    };

    emit("cancelar");
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error.");
  }
};

const cancelar = () => {
  entrenamiento.value = {
    fecha: "",
    duracion: 0,
    distancia: 0,
  };

  emit("cancelar");
};
</script>

<template>
  <div class="formulario">
    <h2>
      {{ entrenamiento.id ? "Editar Entrenamiento" : "Registro de Entrenamientos" }}
    </h2>

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
        <label>Duración</label>
        <input
          type="number"
          min="1"
          v-model.number="entrenamiento.duracion"
          required
        />
      </div>

      <div>
        <label>Distancia</label>
        <input
          type="number"
          step="0.1"
          min="0"
          v-model.number="entrenamiento.distancia"
          required
        />
      </div>

      <button type="submit">
        {{ entrenamiento.id ? "Actualizar entrenamiento" : "Guardar entrenamiento" }}
      </button>

      <button
        v-if="entrenamiento.id"
        type="button"
        @click="cancelar"
      >
        Cancelar
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

form{
  display:flex;
  flex-direction:column;
  gap:15px;
}

button{
  width:100%;
  padding:12px;
  border:none;
  border-radius:8px;
  cursor:pointer;
  background-color: #28a745;
  color :white;
}

label{
    display:block;
    margin-bottom:5px;
    font-weight:bold;
}

input{
    width:100%;
    padding:10px;
    border:1px solid #ccc;
    border-radius:8px;
    box-sizing:border-box;
}
</style>