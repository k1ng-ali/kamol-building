<script setup lang="ts">
import { ref, watch } from 'vue'

const isMenuOpen = ref(false)

const navLinks = [
  { label: 'Проекты', href: '#projects' },
  { label: 'Этапы', href: '#steps' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'О мастере', href: '#about' },
  { label: 'Контакты', href: '#contacts' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Блокируем скролл страницы, когда открыта мобильная шторка
watch(isMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const openWhatsApp = () => {
  closeMenu()
  window.open('https://wa.me/79995761997?text=Здравствуйте!%20Хочу%20обсудить%20проект', '_blank')
}
</script>

<template>
  <header class="header">
    <a href="#" class="logo" @click="closeMenu">
      <span class="logo__title">Kamol Builds</span>
    </a>

    <!-- Десктопная навигация -->
    <nav class="nav-desktop">
      <ul class="nav__list">
        <li v-for="link in navLinks" :key="link.href" class="nav__list-item">
          <a :href="link.href" class="nav__link">{{ link.label }}</a>
        </li>
      </ul>
    </nav>

    <!-- Десктопная кнопка -->
    <button type="button" class="cta-button desktop-only" @click="openWhatsApp">
      Связаться
    </button>

    <!-- Кнопка-гамбургер (Mobile) -->
    <button
        type="button"
        class="burger-btn"
        :class="{ active: isMenuOpen }"
        aria-label="Меню"
        @click="toggleMenu"
    >
      <span class="burger-line"></span>
      <span class="burger-line"></span>
    </button>

    <!-- Мобильное меню-шторка -->
    <Transition name="drawer">
      <div v-if="isMenuOpen" class="mobile-drawer">
        <nav class="mobile-nav">
          <ul class="mobile-nav__list">
            <li v-for="link in navLinks" :key="link.href" class="mobile-nav__item">
              <a :href="link.href" class="mobile-nav__link" @click="closeMenu">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="mobile-drawer__footer">
          <button type="button" class="cta-button full-width" @click="openWhatsApp">
            Обсудить проект в WhatsApp
          </button>
        </div>
      </div>
    </Transition>

    <!-- Затемняющий оверлей -->
    <Transition name="fade">
      <div v-if="isMenuOpen" class="mobile-overlay" @click="closeMenu"></div>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
@use "@/styles/_tokens" as *;

.header {
  position: sticky;
  top: 0;
  z-index: 500;
  background: rgba(247, 248, 250, 0.85); // Стеклянный фон под цвет $bg-light
  backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px clamp(16px, 3vw, 32px);
  margin-bottom: 12px;

  .logo {
    text-decoration: none;
    color: $text-main;
    z-index: 599;

    &__title {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
  }

  /* Десктопное меню */
  .nav-desktop {
    @media (max-width: $bp-tablet) {
      display: none;
    }

    .nav__list {
      display: flex;
      align-items: center;
      gap: 2.2rem;
      list-style: none;
      margin: 0;
      padding: 0;

      .nav__link {
        text-decoration: none;
        color: $text-main;
        font-size: 0.95rem;
        font-weight: 500;
        transition: color 0.2s ease;

        &:hover {
          color: $accent-bronze;
        }
      }
    }
  }

  .cta-button {
    border: none;
    background: $bg-dark;
    color: $bg-light;
    padding: 10px 22px;
    border-radius: $radius-pill;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;

    &:hover {
      background: #2a2e35;
      transform: translateY(-1px);
    }

    &.full-width {
      width: 100%;
      padding: 14px 20px;
    }
  }

  .desktop-only {
    @media (max-width: $bp-tablet) {
      display: none;
    }
  }

  /* Кнопка-гамбургер */
  .burger-btn {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 601;
    padding: 8px;

    @media (max-width: $bp-tablet) {
      display: flex;
    }

    .burger-line {
      display: block;
      width: 100%;
      height: 2px;
      background: $text-main;
      border-radius: 2px;
      transition: transform 0.25s ease, opacity 0.25s ease;
    }

    &.active {
      .burger-line:first-child {
        transform: translateY(4px) rotate(45deg);
      }
      .burger-line:last-child {
        transform: translateY(-4px) rotate(-45deg);
      }
    }
  }

  /* Мобильная шторка меню */
  .mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 82%;
    max-width: 320px;
    height: 100dvh;
    background: $surface-white;
    z-index: 600;
    padding: 90px 24px 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.08);

    .mobile-nav {
      &__list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      &__link {
        text-decoration: none;
        color: $text-main;
        font-size: 1.25rem;
        font-weight: 600;
        display: block;
        transition: color 0.2s ease;

        &:active {
          color: $accent-bronze;
        }
      }
    }
  }

  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(17, 20, 24, 0.45);
    backdrop-filter: blur(4px);
    z-index: 599;
  }
}

/* Анимации шторки и оверлея */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>