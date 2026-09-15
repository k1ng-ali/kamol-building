<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReveal } from "@/app/useReveal.ts"    

useReveal('.calculator')    

interface Option {
  id: string
  label: string
  basePrice: number
}

const buildTypes: Option[] = [
  { id: 'sauna', label: 'SPA-баня Hi-Tech', basePrice: 480000 },
  { id: 'carport', label: 'Навес для авто', basePrice: 190000 },
  { id: 'terrace', label: 'Терраса / Веранда', basePrice: 140000 },
  { id: 'hozblok', label: 'Теплый хозблок', basePrice: 110000 },
]

const sizeOptions = [
  { id: 's', label: 'До 15 м²', mult: 1.0 },
  { id: 'm', label: '15 – 25 м²', mult: 1.4 },
  { id: 'l', label: '25 – 40 м²', mult: 1.9 },
  { id: 'xl', label: 'Более 40 м²', mult: 2.5 },
]

const foundationOptions = [
  { id: 'screw', label: 'Винтовые сваи (рекомендуется)', price: 35000 },
  { id: 'block', label: 'Бетонные блоки', price: 15000 },
  { id: 'ready', label: 'Свой готовый фундамент', price: 0 },
]

const selectedType = ref<string>('sauna')
const selectedSize = ref<string>('s')
const selectedFoundation = ref<string>('screw')
const userPhone = ref<string>('')

const calculatedTotal = computed(() => {
  const currentType = buildTypes.find(t => t.id === selectedType.value) || buildTypes[0]
  const currentSize = sizeOptions.find(s => s.id === selectedSize.value) || sizeOptions[0]
  const currentFound = foundationOptions.find(f => f.id === selectedFoundation.value) || foundationOptions[0]

  const raw = Math.round(currentType.basePrice * currentSize.mult + currentFound.price)
  return raw.toLocaleString('ru-RU')
})

const sendToWhatsApp = () => {
  const typeLabel = buildTypes.find(t => t.id === selectedType.value)?.label
  const sizeLabel = sizeOptions.find(s => s.id === selectedSize.value)?.label
  const foundLabel = foundationOptions.find(f => f.id === selectedFoundation.value)?.label

  const text = `Здравствуйте, Камол! Рассчитал предварительную стоимость на сайте:\n` +
      `• Постройка: ${typeLabel}\n` +
      `• Размер: ${sizeLabel}\n` +
      `• Фундамент: ${foundLabel}\n` +
      `• Ориентировочная сумма: от ${calculatedTotal.value} ₽\n` +
      `• Контактный телефон: ${userPhone.value || 'не указан'}\n\n` +
      `Подскажите, возможен ли выезд на замер?`

  window.open(`https://wa.me/79995761997?text=${encodeURIComponent(text)}`, '_blank')
}
</script>

<template>
  <section id="calculator" class="calculator" data-reveal-stagger>
    <div class="calculator__header">
      <span class="section-overline">ОНЛАЙН-РАСЧЕТ</span>    
      <h2 class="section-title">Рассчитайте предварительную смету за 1 минуту</h2>    
      <p class="calculator__desc">
        Выберите ключевые параметры постройки, чтобы оценить бюджет с учетом материалов и сборки под ключ.
      </p>
    </div>

    <div class="calculator__grid">
      <div class="calculator__form">
        <div class="field-group">
          <label class="field-label">1. Тип конструкции</label>
          <div class="chips-list">
            <button
                v-for="type in buildTypes"
                :key="type.id"
                type="button"
                class="chip"
                :class="{ active: selectedType === type.id }"
                @click="selectedType = type.id"
            >
              {{ type.label }}
            </button>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">2. Площадь объекта</label>
          <div class="chips-list">
            <button
                v-for="size in sizeOptions"
                :key="size.id"
                type="button"
                class="chip"
                :class="{ active: selectedSize === size.id }"
                @click="selectedSize = size.id"
            >
              {{ size.label }}
            </button>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">3. Тип основания</label>
          <div class="chips-list">
            <button
                v-for="found in foundationOptions"
                :key="found.id"
                type="button"
                class="chip"
                :class="{ active: selectedFoundation === found.id }"
                @click="selectedFoundation = found.id"
            >
              {{ found.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="calculator__summary">
        <div class="summary-box">
          <span class="summary-caption">Ориентировочная стоимость:</span>
          <div class="summary-price">от {{ calculatedTotal }} ₽</div>
          <p class="summary-note">
            Включает комплект материалов, доставку по МО, монтаж и гарантию 3 года по договору    .
          </p>

          <div class="summary-action">
            <input
                v-model="userPhone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                class="summary-input"
            />
            <button type="button" class="summary-btn" @click="sendToWhatsApp">
              Получить точную смету в WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/styles/_tokens" as *;    

.calculator {
  background: $surface-white;    
  border-radius: $radius-card;    
  padding: clamp(24px, 4vw, 48px);
  margin-top: 4rem;
  box-shadow: $shadow-subtle;    

&__header {
  max-width: 680px;
  margin-bottom: 2.5rem;
}

  &__desc {
    color: $text-muted;    
    margin: 8px 0 0;
    line-height: 1.6;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 40px;

    @media (max-width: $bp-desktop) {    
      grid-template-columns: 1fr;
    }
  }

  .field-group {
    margin-bottom: 28px;

    .field-label {
      display: block;
      font-size: 0.95rem;
      font-weight: 600;
      color: $text-main;    
      margin-bottom: 12px;
    }
  }

  .chips-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .chip {
      background: $bg-light;    
      border: 1px solid rgba(0, 0, 0, 0.06);
      color: $text-main;    
      padding: 10px 18px;
      border-radius: $radius-pill;    
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }

      &.active {
        background: $bg-dark;    
        color: $bg-light;    
        border-color: $bg-dark;    
      }
    }
  }

  &__summary {
    .summary-box {
      background: $bg-dark;    
      color: $bg-light;    
      border-radius: $radius-card;    
      padding: clamp(24px, 3vw, 36px);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;

      .summary-caption {
        font-size: 0.85rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.65);
      }

      .summary-price {
        font-size: clamp(2rem, 1.5rem + 1.5vw, 2.8rem);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin: 8px 0 12px;
        color: $surface-white;    
      }

      .summary-note {
        font-size: 0.85rem;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.7);
        margin: 0 0 28px;
      }

      .summary-action {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .summary-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: $radius-pill;    
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.08);
          color: $surface-white;    
          font-size: 0.95rem;
          outline: none;
          box-sizing: border-box;

          &::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }

          &:focus {
            border-color: rgba(255, 255, 255, 0.4);
          }
        }

        .summary-btn {
          width: 100%;
          padding: 15px 20px;
          background: $surface-white;    
          color: $bg-dark;    
          border: none;
          border-radius: $radius-pill;    
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;

          &:hover {
            background: #ECEFF3;
            transform: translateY(-2px);
          }
        }
      }
    }
  }
}
</style>