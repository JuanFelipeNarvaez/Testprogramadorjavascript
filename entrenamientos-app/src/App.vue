<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import EntrenamientoForm from "./components/EntrenamientoForm.vue";
import EntrenamientoCard from "./components/EntrenamientoCard.vue";

import type { Entrenamiento } from "./interfaces/Entrenamiento";

import {
  escucharEntrenamientos,
  eliminarEntrenamiento,
} from "./services/entrenamientoService";

const entrenamientos = ref<Entrenamiento[]>([]);
const entrenamientoEditar = ref<Entrenamiento | null>(null);

let unsubscribe: (() => void) | undefined;

onMounted(() => {
  unsubscribe = escucharEntrenamientos((datos) => {
    entrenamientos.value = datos;
  });
});

onUnmounted(() => {
  unsubscribe?.();
});

const editar = (entrenamiento: Entrenamiento) => {
  entrenamientoEditar.value = { ...entrenamiento };
};

const cancelarEdicion = () => {
  entrenamientoEditar.value = null;
};

const eliminar = async (id: string) => {
  if (!confirm("¿Desea eliminar este entrenamiento?")) return;

  await eliminarEntrenamiento(id);

  if (entrenamientoEditar.value?.id === id) {
    entrenamientoEditar.value = null;
  }
};
</script>

<template>
  <div class="contenedor">
    <EntrenamientoForm
      :entrenamiento-editar="entrenamientoEditar"
      @cancelar="cancelarEdicion"
    />

    <h2>Historial de Entrenamientos</h2>

    <EntrenamientoCard
      v-for="entrenamiento in entrenamientos"
      :key="entrenamiento.id"
      :entrenamiento="entrenamiento"
      @editar="editar"
      @eliminar="eliminar"
    />
  </div>
</template>

<style scoped>
.contenedor {
  width: 90%;
  max-width: 900px;
  margin: auto;
  padding: 30px;
}

h2 {
  text-align: center;
  margin-top: 40px;
}
</style>