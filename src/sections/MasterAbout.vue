<script setup lang="ts">
import { useReveal } from "@/app/useReveal.ts"  

useReveal('.master-about')  

const guarantees = [
  {
    title: 'Прямая работа без посредников',
    desc: 'Лично руковожу раскроем материала, сборкой каркаса и монтажом. Никаких наценок прорабов и офисного персонала.'
  },
  {
    title: 'Поэтапная оплата по факту',
    desc: 'Оплата делится на прозрачные этапы: закупка материалов, каркас под крышу и итоговая приемка по акту    .'
  },
  {
    title: 'Полная автономность на участке',
    desc: 'Приезжаем со своим инструментом, крепежом и бензогенератором — можем монтировать объект даже в чистом поле.'
  },
  {
    title: 'Фиксация сметы в договоре',
    desc: 'Сумма, утвержденная на этапе замера, окончательная    . Скрытые доплаты за расходники полностью исключены.'
  }
]
</script>

<template>
  <section id="about" class="master-about">
    <div class="master-about__grid">
      <div class="master-about__media" data-reveal-left>  
        <img
            src="/carport1.jpg"
            alt="Камол — мастер каркасного и металлического строительства"
            class="master-about__img"
        />
        <div class="master-about__badge">
          <span class="badge-num">7+</span>
          <span class="badge-txt">лет опыта в строительстве по Москве и МО</span>
        </div>
      </div>

      <div class="master-about__content" data-reveal-right>  
        <span class="section-overline">ОТВЕТСТВЕННОСТЬ И НАДЕЖНОСТЬ</span>    
        <h2 class="section-title">Строим так, чтобы нас рекомендовали соседям</h2>    
        <p class="master-about__lead">
          Меня зовут Камол. Я мастер загородного строительства. С 2017 года возвожу объекты, которые выдерживают любые подмосковные снегопады и ветра, сохраняя геометрию и внешний вид.
        </p>

        <div class="guarantees-list" data-reveal-stagger>  
          <div v-for="(item, idx) in guarantees" :key="idx" class="guarantee-item">
            <span class="guarantee-num">0{{ idx + 1 }}</span>
            <div class="guarantee-body">
              <h3 class="guarantee-title">{{ item.title }}</h3>
              <p class="guarantee-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/styles/_tokens" as *;   

.master-about {
  margin-top: 5rem;

  &__grid {
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    gap: 48px;
    align-items: center;

    @media (max-width: $bp-desktop) {   
      grid-template-columns: 1fr;
    }
  }

  &__media {
    position: relative;
    border-radius: $radius-card;   
    overflow: hidden;
    max-height: 620px;

    .master-about__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .master-about__badge {
      position: absolute;
      bottom: 24px;
      left: 24px;
      right: 24px;
      background: rgba(20, 22, 25, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      color: $surface-white;   

    .badge-num {
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.03em;
      color: $surface-white;   
    }

      .badge-txt {
        font-size: 0.85rem;
        line-height: 1.35;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  &__content {
    .master-about__lead {
      color: $text-muted;   
      font-size: 1.05rem;
      line-height: 1.6;
      margin: 12px 0 28px;
    }
  }

  .guarantees-list {
    display: flex;
    flex-direction: column;
    gap: 18px;

    .guarantee-item {
      display: flex;
      gap: 18px;
      align-items: flex-start;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);

      .guarantee-num {
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: $accent-bronze;   
        padding-top: 2px;
      }

      .guarantee-title {
        margin: 0 0 6px;
        font-size: 1.05rem;
        font-weight: 600;
        color: $text-main;   
      }

      .guarantee-desc {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.5;
        color: $text-muted;   
      }
    }
  }
}
</style>