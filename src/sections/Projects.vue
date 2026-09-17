<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from "@/app/useReveal.ts"
import ProjectModal from "@/components/ProjectModal.vue"
import type { ProjectItem } from "@/types/project"

useReveal('.projects')

const isModalOpen = ref(false)
const selectedProject = ref<ProjectItem | null>(null)

const projectList: ProjectItem[] = [
  {
    id: 1,
    category: 'sauna',
    categoryLabel: 'SPA & Релакс',
    title: 'Модульная Hi-Tech баня с панорамной террасой',
    specs: '7.5×3.0 м • Срок: 12 дней • Парная из термолипы • Выносная топка',
    price: 'от 480 000 ₽',
    buildTime: '10–14 дней',
    dimensions: '7.5 × 3.0 м',
    mainImage: '/banya5.jpg',
    gallery: ['/banya1.jpg', '/banya4.jpg', '/banya-inside4.jpg', '/banya_inside2.jpg'],
    description: 'Всесезонный модульный банный комплекс в скандинавском кубизме. Полноценная комната отдыха, санузел и спа-парная с можжевеловым панно.',
    features: [
      'Утепление 150 мм плитами Knauf Nord (зимний контур)',
      'Панно из реликтового можжевельника со скрытой LED-подсветкой',
      'Выносная топка с террасы: чистый пол без золы и дыма',
      'Панорамное остекление со стеклопакетом с терморазрывом'
    ]
  },
  {
    id: 2,
    category: 'carport',
    categoryLabel: 'Карпорты',
    title: 'Капитальный автомобильный навес в стиле Шале',
    specs: '6.0×5.0 м • Срок: 5 дней • Клееный брус • Мягкая кровля',
    price: 'от 190 000 ₽',
    buildTime: '4–6 дней',
    dimensions: '6.0 × 5.0 м',
    mainImage: '/carport1.jpg',
    gallery: ['/carport1.jpg'],
    description: 'Двускатный навес для парковки внедорожника. Открытые мощные стропильные фермы из клееного бруса с подшивом доской.',
    features: [
      'Силовые стойки 150×150 мм с металлическими анкерными опорами',
      'Расчетная снеговая нагрузка до 250 кг/м² для условий МО',
      'Кровельное покрытие: бесшумная гибкая черепица Технониколь',
      'Тонировка защитным маслом в цвет фасада дома'
    ]
  },
  {
    id: 3,
    category: 'terrace',
    categoryLabel: 'Террасы & Веранды',
    title: 'Придомовая терраса на сваях с Х-ограждением',
    specs: '8.0×3.5 м • Срок: 6 дней • Х-образные перила • Лиственница',
    price: 'от 140 000 ₽',
    buildTime: '5–7 дней',
    dimensions: '8.0 × 3.5 м',
    mainImage: '/veranda3.jpg',
    gallery: ['/veranda3.jpg', '/veranda2.jpg','/veranda4.jpg', '/veranda1.jpg'],
    description: 'Фасадная открытая галерея-веранда для отдыха. Оснащена классическими скандинавскими ограждениями крест-накрест и маршевой лестницей.',
    features: [
      'Основание: стальные винтовые сваи d=108 мм с антикоррозийным грунтом',
      'Настил пола: палубная доска из сибирской лиственницы со скрытым крепежом',
      'Смонтированная водосточная система с желобом и отводом',
      'Антисептическая защита балок основания в 2 слоя'
    ]
  },
  {
    id: 4,
    category: 'hozblok',
    categoryLabel: 'Хозпостройки',
    title: 'Теплый каркасный хозблок-мастерская Hi-Tech',
    specs: '5.0×2.4 м • Срок: 4 дня • Утепление 100 мм • Сейф-дверь',
    price: 'от 110 000 ₽',
    buildTime: '3–5 дней',
    dimensions: '5.0 × 2.4 м',
    mainImage: '/hozblok-pro4.jpg',
    gallery: ['/hozblok-pro4.jpg', '/hozblokPRO1.jpg', '/hozblok_besedka2.jpg', '/hozblok_besedka3.jpg', '/hozblok-besedka4.jpg'],
    description: 'Современная постройка для мастерской, хранения газонокосилки или квадроцикла. Комбинированный фасад: дерево + профлист Антрацит.',
    features: [
      'Металлическая взломостойкая дверь с замком 3-го класса',
      'Окно ПВХ с поворотно-откидным механизмом для проветривания',
      'Удобный заездной трап-пандус для тяжелой садовой техники',
      'Подготовка трасс под настенные бра и внутренние розетки'
    ]
  }
]

const openDetails = (item: ProjectItem) => {
  selectedProject.value = item
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedProject.value = null
}
</script>

<template>
  <section id="projects" class="projects" data-reveal-stagger >
    <div class="projects__content">
      <p class="projects__subtitle">НАШЕ ПОРТФОЛИО</p>
      <h2 class="projects__title">Пространства, в которых всё продумано до мелочей</h2>
      <p class="projects__description">
        Реализованные объекты в коттеджных поселках Москвы и Московской области. Нажмите на проект, чтобы увидеть комплектацию.
      </p>
    </div>

    <div class="projects__slider">
      <article
          v-for="item in projectList"
          :key="item.id"
          class="projects__card"
          @click="openDetails(item)"
      >
        <div class="projects__card-media">
          <img :src="item.mainImage" :alt="item.title" loading="lazy" />
        </div>

        <div class="projects__card-body">
          <h3 class="projects__card-title">{{ item.categoryLabel }}</h3>
          <p class="projects__card-specs">{{ item.specs }}</p>

          <div class="projects__card-btn">
            <span>Подробнее о проекте</span>
            <span class="arrow">→</span>
          </div>
        </div>
      </article>
    </div>

    <!-- Модальное окно с деталями -->
    <ProjectModal
        :is-open="isModalOpen"
        :project="selectedProject"
        @close="closeModal"
    />
  </section>
</template>

<style scoped lang="scss">
@use "@/styles/_tokens" as *;

.projects {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  background: $text-main;
  color: $bg-light;
  padding: 32px;
  border-radius: $radius-card;
  overflow: hidden;

&__content {
  flex: 0 0 340px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

  &__subtitle {
    margin: 0;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    opacity: 0.7;
    text-transform: uppercase;
  }

  &__title {
    margin: 0;
    font-size: 1.8rem;
    line-height: 1.25;
  }

  &__description {
    margin: 0;
    font-size: 0.95rem;
    opacity: 0.8;
    line-height: 1.5;
  }

  &__slider {
    flex: 1;
    min-width: 0;
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    padding-bottom: 8px;

    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__card {
    flex: 0 0 280px;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.25s ease, border-color 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      border-color: rgba(255, 255, 255, 0.25);

    .projects__card-btn .arrow {
      transform: translateX(4px);
    }
    }
  }

  &__card-media {
    width: 100%;
    height: 180px;
    overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

    .projects__card:hover & img {
      transform: scale(1.05);
    }
  }

  &__card-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__card-title {
    margin: 0 0 8px;
    font-size: 1.2rem;
    font-weight: 600;
  }

  &__card-specs {
    margin: 0 0 16px;
    font-size: 0.85rem;
    line-height: 1.4;
    opacity: 0.75;
    flex-grow: 1;
  }

  &__card-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: auto;
    color: inherit;
    font-size: 0.875rem;
    font-weight: 500;

  .arrow {
    transition: transform 0.2s ease;
  }
  }
}

@media (max-width: 960px) {
  .projects {
    flex-direction: column;

  &__content {
    flex: none;
    width: 100%;
  }

    &__slider {
      width: 100%;
    }
  }
}
</style>