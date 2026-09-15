<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="contacts" class="footer">
    <div class="footer__card">
      <div class="footer__top">
        <div class="footer__lead">
          <span class="section-overline footer-light">СВЯЗАТЬСЯ НАПРЯМУЮ</span>
          <h2 class="footer__title">
            Готовы обсудить ваш проект на участке?
          </h2>
          <p class="footer__desc">
            Напишите параметры или пришлите понравившийся эскиз — рассчитаем смету и согласуем бесплатный выезд на замер по Москве и МО.
          </p>
        </div>

        <div class="footer__cta">
          <a
              href="https://wa.me/79995761997"
              target="_blank"
              class="cta-btn cta-btn--wa"
          >
            Написать в WhatsApp
          </a>
          <a
              href="https://t.me/your_telegram"
              target="_blank"
              class="cta-btn cta-btn--tg"
          >
            Telegram-чат
          </a>
        </div>
      </div>

      <div class="footer__info">
        <div class="info-block">
          <span class="info-label">Телефон для связи</span>
          <a href="tel:+79995761997" class="info-val">+7 (999) 576-19-97</a>
        </div>

        <div class="info-block">
          <span class="info-label">География выездов</span>
          <span class="info-val">Москва и МО до 120 км от МКАД</span>
        </div>

        <div class="info-block">
          <span class="info-label">График работы</span>
          <span class="info-val">Ежедневно: 8:00 – 21:00</span>
        </div>
      </div>

      <div class="footer__bottom">
        <span class="copy">© {{ currentYear }} Kamol Builds. Частное строительство.</span>
        <span class="legal">Самозанятый мастер • Договор и гарантия 3 года</span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use "@/styles/_tokens" as *; 

.footer {
  margin-top: 5rem;

  &__card {
    background: $bg-dark; 
    color: $bg-light; 
    border-radius: $radius-card; 
    padding: clamp(28px, 4vw, 56px);
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 36px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: $bp-tablet) { 
      flex-direction: column;
    }
  }

  &__lead {
    max-width: 600px;

    .footer-light {
      color: rgba(255, 255, 255, 0.6);
    }

    .footer__title {
      color: $surface-white; 
      font-size: clamp(1.8rem, 1.3rem + 2vw, 2.7rem);
      line-height: 1.15;
      font-weight: 700;
      letter-spacing: -0.03em;
      margin: 10px 0 16px;
    }

    .footer__desc {
      margin: 0;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
      font-size: 0.95rem;
    }
  }

  &__cta {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 260px;

    @media (max-width: $bp-tablet) { 
      width: 100%;
      flex-direction: row;
    }

    @media (max-width: $bp-mobile) { 
      flex-direction: column;
    }

    .cta-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 24px;
      border-radius: $radius-pill; 
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.2s ease;

      &--wa {
        background: $surface-white; 
        color: $bg-dark; 

        &:hover {
          background: #ECEFF3;
          transform: translateY(-2px);
        }
      }

      &--tg {
        background: rgba(255, 255, 255, 0.1);
        color: $surface-white; 
        border: 1px solid rgba(255, 255, 255, 0.15);

        &:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: translateY(-2px);
        }
      }
    }
  }

  &__info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 36px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    @media (max-width: $bp-tablet) { 
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .info-block {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .info-label {
        font-size: 0.8rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.5);
      }

      .info-val {
        color: $surface-white; 
        font-size: 1rem;
        font-weight: 500;
        text-decoration: none;
      }
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);

    @media (max-width: $bp-tablet) { 
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
    }
  }
}
</style>