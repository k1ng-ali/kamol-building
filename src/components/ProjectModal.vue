<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { ProjectItem } from '@/types/project'

const props = defineProps<{
  project: ProjectItem | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const activeImage = ref<string>('')

// Обновляем главное фото при открытии
watch(
    () => props.project,
    (newVal) => {
      if (newVal) {
        activeImage.value = newVal.mainImage
      }
    },
    { immediate: true }
)

const closeModal = () => {
  emit('close')
}

// Закрытие по ESC
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

const orderProject = () => {
  if (!props.project) return
  const text = `Здравствуйте, Камол! Интересует проект «${props.project.title}» (${props.project.dimensions}). Подскажите актуальные сроки монтажа и смету под ключ.`
  window.open(`https://wa.me/79995761997?text=${encodeURIComponent(text)}`, '_blank')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen && project" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-card">
          <button type="button" class="modal-close" aria-label="Закрыть" @click="closeModal">
            ✕
          </button>

          <div class="modal-grid">
            <!-- Левая колонка: Галерея проекта -->
            <div class="modal-media">
              <div class="modal-media__main">
                <img :src="activeImage" :alt="project.title" />
              </div>
              <div v-if="project.gallery.length > 1" class="modal-media__thumbs">
                <button
                    v-for="(img, idx) in project.gallery"
                    :key="idx"
                    type="button"
                    class="thumb-btn"
                    :class="{ active: activeImage === img }"
                    @click="activeImage = img"
                >
                  <img :src="img" :alt="`${project.title} фото ${idx + 1}`" />
                </button>
              </div>
            </div>

            <!-- Правая колонка: Подробные характеристики -->
            <div class="modal-info">
              <span class="project-tag">{{ project.categoryLabel }}</span>
              <h2 class="project-title">{{ project.title }}</h2>
              <p class="project-desc">{{ project.description }}</p>

              <div class="project-metrics">
                <div class="metric">
                  <span class="metric__label">Размеры</span>
                  <span class="metric__val">{{ project.dimensions }}</span>
                </div>
                <div class="metric">
                  <span class="metric__label">Срок монтажа</span>
                  <span class="metric__val">{{ project.buildTime }}</span>
                </div>
                <div class="metric">
                  <span class="metric__label">Бюджет</span>
                  <span class="metric__val highlight">{{ project.price }}</span>
                </div>
              </div>

              <div class="project-features">
                <span class="features-title">Что входит в комплектацию:</span>
                <ul class="features-list">
                  <li v-for="(feat, idx) in project.features" :key="idx">
                    {{ feat }}
                  </li>
                </ul>
              </div>

              <div class="modal-actions">
                <button type="button" class="btn-order" @click="orderProject">
                  Обсудить этот проект в WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use "@/styles/_tokens" as *;

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(17, 20, 24, 0.75);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  position: relative;
  width: 100%;
  max-width: 980px;
  max-height: 90vh;
  background: $surface-white;
  border-radius: $radius-card;
  box-shadow: $shadow-subtle;
  overflow-y: auto;
  padding: clamp(20px, 3vw, 36px);

  /* Скрываем скроллбар */
  scrollbar-width: thin;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: $radius-pill;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: $bg-light;
  color: $text-main;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: $bg-dark;
    color: $surface-white;
  }
}

.modal-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 36px;

  @media (max-width: $bp-tablet) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.modal-media {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__main {
    width: 100%;
    height: 340px;
    border-radius: 16px;
    overflow: hidden;
    background: $bg-light;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: $bp-mobile) {
      height: 240px;
    }
  }

  &__thumbs {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 4px;

    .thumb-btn {
      flex: 0 0 74px;
      height: 56px;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid transparent;
      padding: 0;
      background: none;
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.2s ease;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &.active,
      &:hover {
        opacity: 1;
        border-color: $text-main;
      }
    }
  }
}

.modal-info {
  display: flex;
  flex-direction: column;

  .project-tag {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $accent-bronze;
    margin-bottom: 6px;
  }

  .project-title {
    font-size: clamp(1.4rem, 1.2rem + 1vw, 1.9rem);
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 12px;
    color: $text-main;
  }

  .project-desc {
    color: $text-muted;
    font-size: 0.95rem;
    line-height: 1.55;
    margin: 0 0 20px;
  }

  .project-metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    background: $bg-light;
    border-radius: 14px;
    padding: 12px 16px;
    margin-bottom: 20px;

    .metric {
      display: flex;
      flex-direction: column;
      gap: 4px;

      &__label {
        font-size: 0.75rem;
        color: $text-muted;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      &__val {
        font-size: 0.95rem;
        font-weight: 600;
        color: $text-main;

        &.highlight {
          color: $text-main;
          font-weight: 700;
        }
      }
    }
  }

  .project-features {
    margin-bottom: 24px;

    .features-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: $text-main;
      display: block;
      margin-bottom: 8px;
    }

    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;

      li {
        font-size: 0.88rem;
        color: $text-muted;
        position: relative;
        padding-left: 18px;

        &::before {
          content: '•';
          position: absolute;
          left: 4px;
          color: $accent-bronze;
        }
      }
    }
  }

  .modal-actions {
    margin-top: auto;

    .btn-order {
      width: 100%;
      padding: 14px 20px;
      background: $bg-dark;
      color: $bg-light;
      border: none;
      border-radius: $radius-pill;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #2a2e35;
        transform: translateY(-2px);
      }
    }
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>