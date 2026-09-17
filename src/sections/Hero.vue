<script setup lang="ts">
import { useReveal} from "@/app/useReveal.ts";
useReveal('.hero');
const heroImage = `${import.meta.env.BASE_URL}hero-bg.jpg`

</script>

<template>
  <section class="hero">

    <!-- Фоновое изображение с градиентной маской -->
    <div class="hero__media" >
      <img
          :src="heroImage"
          alt="Модульная Hi-Tech баня с панорамным остеклением"
          class="hero__img"
          data-reveal-scale
      />
      <div class="hero__overlay"></div>
    </div>

    <!-- Контентная безопасная зона (Safe Area) -->
    <div class="hero__container" >
      <div class="hero__content" data-reveal-stagger>
        <h1 class="hero__title">
          Архитектура загородного комфорта, созданная на десятилетия
        </h1>

        <p class="hero__subtitle">
          Проектируем и строим модульные бани, автомобильные навесы и террасы под ключ в Москве и МО.
          Без наценок компаний и скрытых переплат.
        </p>

        <div class="hero__actions">
          <a href="#projects" class="hero__btn hero__btn--glass">
            Смотреть выполненные проекты  →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/styles/_tokens" as *;

.hero {
  position: relative;
  width: 100%;
  min-height: 70svh; // Адаптивная высота под мобильные браузеры
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: $radius-card;

  &__media {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    // Фокусируемся на фасаде бани и отсекаем нижний мусор на земле
    object-position: 1% 45%;

    @media (max-width: 768px) {
      object-position: 52% 10%;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    // Многослойный градиент: слева глубина под текст, снизу мягкое затемнение
    background:
        linear-gradient(
                to right,
                rgba(17, 20, 24, 0.92) 0%,
                rgba(17, 20, 24, 0.75) 35%,
                rgba(17, 20, 24, 0.2) 70%,
                transparent 100%
        ),
        linear-gradient(
                to top,
                rgba(17, 20, 24, 0.85) 0%,
                transparent 40%
        );

    @media (max-width: 768px) {
      // Для мобилок затемняем весь верхний блок под текст
      background: linear-gradient(
              to top,
              rgba(17, 20, 24, 0.9) 0%,
              rgba(17, 20, 24, 0.65) 50%,
              rgba(17, 20, 24, 0.3) 100%
      );
    }
  }

  &__container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 100px 24px 60px;

    @media (max-width: 768px) {
      padding: 90px 16px 0;
      margin-bottom: 0;
    }
  }

  &__content {
    max-width: 580px; // Ограничиваем ширину, чтобы не закрывать фасад бани
  }

  &__badge {
    display: inline-block;
    padding: 6px 14px;
    margin-bottom: 20px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #F7F8FA;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 100px;
  }

  &__title {
    font-size: clamp(2.1rem, 1.4rem + 3vw, 3.6rem);
    line-height: 1.1;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    margin-bottom: 20px;
  }

  &__subtitle {
    font-size: clamp(0.95rem, 0.9rem + 0.2vw, 1.05rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 32px;
  }

  &__actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 28px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    border-radius: 100px;
    transition: all 0.25s ease;

    &--primary {
      background: #FFFFFF;
      color: #141619;

      &:hover {
        background: #ECEFF3;
        transform: translateY(-2px);
      }
    }

    &--glass {
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);

      &:hover {
        background: rgba(255, 255, 255, 0.16);
        transform: translateY(-2px);
      }
    }

    @media (max-width: 480px) {
      width: 100%;
    }
  }
}
</style>