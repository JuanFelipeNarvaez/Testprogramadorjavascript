<script setup lang="ts">
import type { Entrenamiento } from "../interfaces/Entrenamiento";

defineProps<{
  entrenamiento: Entrenamiento;
}>();

const emit = defineEmits<{
  (e: "editar", entrenamiento: Entrenamiento): void;
  (e: "eliminar", id: string): void;
}>();
</script>

<template>
  <div class="card">
    <div class="info">
      <p><strong>📅 Fecha:</strong> {{ entrenamiento.fecha }}</p>
      <p><strong>⏱ Duración:</strong> {{ entrenamiento.duracion }} minutos</p>
      <p><strong>🏃 Distancia:</strong> {{ entrenamiento.distancia }} km</p>
    </div>

    <div class="acciones">
      <button @click="emit('editar', entrenamiento)">
        ✏️ Editar
      </button>

      <button
        class="eliminar"
        @click="emit('eliminar', entrenamiento.id!)"
      >
        🗑 Eliminar
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  padding: 18px;
  margin-top: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
}

.info p {
  margin: 8px 0;
}

.acciones {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.eliminar {
  background: #e74c3c;
  color: white;
}
</style>