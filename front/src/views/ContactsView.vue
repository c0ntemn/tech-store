<script setup>
import HeaderApi from "../components/Header.vue"
import FooterApi from "../components/Footer.vue"
</script>
<template>
    <HeaderApi />
    <main class="page">
        <div class="container">
            <section id="page-contacts" class="page" >
                <h1 class="page__title">Контакты</h1>
                <p class="page__subtitle">Свяжитесь с нами удобным способом</p>

                <div class="contacts">
                    <div class="contact-info">
                        <div class="contact-info__item">
                            <div class="contact-info__label">Телефон</div>
                            <div class="contact-info__value">+7 (999) 123-45-67</div>
                        </div>
                        <div class="contact-info__item">
                            <div class="contact-info__label">Email</div>
                            <div class="contact-info__value">support@tech-store.ru</div>
                        </div>
                        <div class="contact-info__item">
                            <div class="contact-info__label">Адрес</div>
                            <div class="contact-info__value">Москва, ул. Тверская, 1</div>
                        </div>
                        <div class="contact-info__item">
                            <div class="contact-info__label">Часы работы</div>
                            <div class="contact-info__value">Пн–Вс, 10:00 — 22:00</div>
                        </div>
                    </div>

                    <form id="contactForm" class="form" novalidate>
                        <div class="form__group">
                            <label class="form__label" for="contactName">Имя *</label>
                            <input id="contactName" name="name" class="input" type="text" placeholder="Иван" required />
                            <div class="form__error" data-error-for="name"></div>
                        </div>

                        <div class="form__group">
                            <label class="form__label" for="contactEmail">Email *</label>
                            <input id="contactEmail" name="email" class="input" type="email"
                                placeholder="ivan@example.com" required />
                            <div class="form__error" data-error-for="email"></div>
                        </div>

                        <div class="form__group">
                            <label class="form__label" for="contactSubject">Тема</label>
                            <input id="contactSubject" name="subject" class="input" type="text"
                                placeholder="Вопрос по заказу" />
                        </div>

                        <div class="form__group">
                            <label class="form__label" for="contactMessage">Сообщение *</label>
                            <textarea id="contactMessage" name="message" class="textarea"
                                placeholder="Опишите ваш вопрос..." required></textarea>
                            <div class="form__error" data-error-for="message"></div>
                        </div>

                        <button class="btn" type="submit" id="contactSubmit">Отправить</button>

                        <div id="contactStatus" class="form__status"></div>
                    </form>
                </div>
            </section>
        </div>
    </main>
    <FooterApi />
</template>
