<script setup lang="ts">
import { ref } from 'vue'
import { useReveal} from "@/app/useReveal.ts";

useReveal('.building-step-section');

interface AccordionItem {
  id: number
  title: string
  desc: string
}

const steps: AccordionItem[] = [
  {
    id: 1,
    title: '01. Консультация и выезд на замер',
    desc: 'Выезжаем на участок по Москве и МО до 120 км от МКАД, фиксируем перепады высот лазерным уровнем, подбираем оптимальный фундамент (сваи или блоки).'
  },
  {
    id: 2,
    title: '02. Расчет сметы и Согласования',
    desc: 'Формируем детальную смету с фиксированной ценой, которая не меняется в процессе стройки. Согласовываем материалы каркаса и кровли.'
  },
  {
    id: 3,
    title: '03. Производство и раскрой',
    desc: 'Готовим сухой строганный пиломатериал и силовой металлокаркас на собственном оборудовании, исключая брак и щели.'
  },
  {
    id: 4,
    title: '04. Монтаж на участке (от 3 до 10 дней)',
    desc: 'Быстрая чистая сборка с соблюдением снеговых нагрузок Подмосковья (до 250 кг/м²).'
  },
  {
    id: 5,
    title: '05. Сдача объекта и гарантия 3 года',
    desc: 'Приемка по акту выполненных работ. Финальный расчет только после проверки всех узлов заказчиком.'
  }
]

// ID активного элемента
const activeId = ref<number | null>(1)

const toggleItem = (id: number) => {
  activeId.value = activeId.value === id ? null : id
}

// Хуки для плавной анимации высоты через JS Transition
const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0px'
  element.offsetHeight // форсируем reflow
  element.style.height = `${element.scrollHeight}px`
}

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  element.offsetHeight // форсируем reflow
  element.style.height = '0px'
}
</script>

<template>
  <div id="steps" class="building-step-section">
    <div class="left-content" data-reveal-left>
      <p class="sub-title">ПОДХОД К СТРОИТЕЛЬСТВУ</p>
      <h2 class="title">От первого эскиза — к безупречной сдаче объекта</h2>
      <p class="desc">
        Полный цикл работ одной бригадой: от лазерного замера участка до чистовой уборки территории.
      </p>

      <div class="accardion" data-reveal-stagger>
        <div
            v-for="item in steps"
            :key="item.id"
            class="item"
            :class="{ active: activeId === item.id }"
        >
          <!-- Клик по шапке переключает состояние -->
          <button
              type="button"
              class="item__header"
              @click="toggleItem(item.id)"
          >
            <span class="item__title">{{ item.title }}</span>
            <span class="item__icon" :class="{ rotated: activeId === item.id }">▾</span>
          </button>

          <!-- Плавное раскрытие блока -->
          <Transition
              name="accordion"
              @enter="onEnter"
              @after-enter="onAfterEnter"
              @leave="onLeave"
          >
            <div v-show="activeId === item.id" class="item__collapse">
              <p class="item__desc">
                {{ item.desc }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <div class="right-content" data-reveal-right>
      <div class="media">
        <img
            src="/hozblokPRO1.jpg"
            alt="Современный ХозБлок в Hi-Tech стиле"
            class="img-fluid"
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/tokens" as *;

.building-step-section {
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
  padding: 24px;
  gap: 2rem;

  @media (max-width: $bp-tablet) {
    flex-direction: column;
  }

  .left-content {
    display: flex;
    flex-direction: column;
    flex: 1;

    .sub-title {
      margin: 0;
      color: $text-muted;
    }

    .title {
      margin-top: 0;
      margin-bottom: 5px;
    }

    .desc {
      margin-bottom: 1.5rem;
    }

    .accardion {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .item {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        padding-bottom: 10px;

        &__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: none;
          border: none;
          padding: 8px 0;
          text-align: left;
          cursor: pointer;
          font: inherit;
        }

        &__title {
          font-weight: 600;
          font-size: 1.05rem;
          color: $text-main;
        }

        &__icon {
          font-size: 1.2rem;
          line-height: 1;
          color: $text-muted;
          transition: transform 0.3s ease;

          &.rotated {
            transform: rotate(180deg);
          }
        }

        &__collapse {
          overflow: hidden;
          transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        &__desc {
          margin: 8px 0 4px 0;
          color: $text-muted;
          line-height: 1.6;
        }
      }
    }
  }

  .right-content {
    flex: 1;

    .media {
      display: flex;
      width: 100%;
      height: 100%;
      max-height: 600px;
      overflow: hidden;
      border-radius: $radius-card;

      .img-fluid {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
}
</style>