import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector(".header__burger");
    const menu = document.querySelector(".mobile-menu");
    const menuContainer = menu.querySelector(".mobile-menu__container");
    const header = document.querySelector(".header");
    const headerMenu = document.querySelector(".header__col--menu");
    const headerContacts = document.querySelectorAll(".header__contact");
    const headerBtn = document.querySelector(".header__btn");
    const main = document.querySelector("main");
    const backgroundsMd = document.querySelectorAll("[data-md-bg]");
    const backgroundsSm = document.querySelectorAll("[data-sm-bg]");

    main.style.paddingTop = header.clientHeight + "px";

    function openMenu () {
        burger.classList.add("active");
        menu.classList.add("active");
        document.body.classList.add("lock");
    }

    function closeMenu () {
        burger.classList.remove("active");
        menu.classList.remove("active");
        document.body.classList.remove("lock");
    }


    if (window.innerWidth <= 1440) {
        burger.addEventListener("click", () => {
            if (menu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        menuContainer.append(headerMenu);
        menu.style.paddingTop = header.clientHeight + "px";
        main.style.paddingTop = header.getBoundingClientRect().height + "px";
    }

    if (window.innerWidth <= 992) {
        headerContacts.forEach(el => {
            menuContainer.append(el);
        });
        menu.style.paddingTop = header.clientHeight + "px";
        main.style.paddingTop = header.getBoundingClientRect().height + "px";

        backgroundsMd.forEach(el => {
            el.style.backgroundImage = `url(${el.getAttribute("data-md-bg")})`;
        })
    }

    if (window.innerWidth <= 768) {
        menuContainer.append(headerBtn);
        menu.style.paddingTop = header.clientHeight + "px";
        main.style.paddingTop = header.getBoundingClientRect().height + "px";

        backgroundsSm.forEach(el => {
            el.style.backgroundImage = `url(${el.getAttribute("data-sm-bg")})`;
        })
    }

    const teamSlider = new Swiper('.team__slider', {
        slidesPerView: "auto",
        modules: [Navigation, Scrollbar],
        spaceBetween: 25,
        navigation: {
            nextEl: document.querySelector('.team__slider-nav-arrow--next'),
            prevEl: document.querySelector('.team__slider-nav-arrow--prev'),
        },
        scrollbar: {
            el: document.querySelector(".team__slider-scrollbar"),
            hide: false,
        }
    });

    const gallerySlider = new Swiper('.gallery__slider', {
        slidesPerView: "auto",
        modules: [Navigation, Scrollbar],
        spaceBetween: 25,
        navigation: {
            nextEl: document.querySelector('.gallery__slider-nav-arrow--next'),
            prevEl: document.querySelector('.gallery__slider-nav-arrow--prev'),
        },
        scrollbar: {
            el: document.querySelector(".gallery__slider-scrollbar"),
            hide: false,
        }
    });

    const reviewsSlider = new Swiper('.reviews__slider', {
        slidesPerView: "auto",
        modules: [Navigation, Scrollbar],
        spaceBetween: 25,
        navigation: {
            nextEl: document.querySelector('.reviews__slider-nav-arrow--next'),
            prevEl: document.querySelector('.reviews__slider-nav-arrow--prev'),
        },
        scrollbar: {
            el: document.querySelector(".reviews__slider-scrollbar"),
            hide: false,
        }
    });

    const dataTabParent = document.querySelector("[data-tab-parent]");
    const dataTabTitles = document.querySelectorAll("[data-tab-title]");
    const dataTabContents = document.querySelectorAll("[data-tab-content]")

    dataTabTitles.forEach((el, i) => {
        el.addEventListener("click", (e) => {
            if (el.classList.contains("active") === true) {
                dataTabContents[i].style.height = "0px";
                el.classList.remove("active");
                dataTabContents[i].classList.remove("active");
            } else {
                dataTabTitles.forEach((elj, j) => {
                    dataTabContents[j].style.height = 0 + "px";
                    elj.classList.remove("active");
                    dataTabContents[j].classList.remove("active");
                })
                dataTabContents[i].style.height = dataTabContents[i].scrollHeight + "px";
                el.classList.add("active");
                dataTabContents[i].classList.add("active");
            }
        });
    });

    // modals

    const modalCall = document.querySelector(".modal-call");
    const modals = document.querySelectorAll(".modal");
    const modalThanks = document.querySelector(".modal-thanks");
    const modalCloses = document.querySelectorAll(".modal__close");
    const modalCallTrigger = document.querySelectorAll("[data-modal-trigger-call]");

    function closeAllModals () {
        modals.forEach(modal => {
            modal.classList.remove("active");
        })
    }

    modals.forEach(el => {
        el.addEventListener("click", (e) => {
            if (!e.target.closest(".modal__content") || e.target.closest(".modal__close")) {
                closeAllModals();
            } 
        })
    });

    console.log(modalCallTrigger);

    modalCallTrigger.forEach(el => {
        el.addEventListener("click", () => {
            console.log("dds");
            modalCall.classList.add("active");
        })
    });

    const forms = document.querySelectorAll("form");
    const ajaxSend = async (formData) => {
        const response = await fetch("./mail.php", {
            method: "POST",
            body: formData
        });
        if (response.ok) {
            modalForm.classList.remove("show");
            modalSucess.classList.add("show");
        } else {
            modalForm.classList.remove("show");
            modalFailed.classList.add("show");

        }
        return await response.text();
    };

    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            ajaxSend(formData)
                .then((response) => {
                    form.reset();
                })
                .catch((err) => console.error(err))
        });
    });
    
    const anchorLinks = document.querySelectorAll(".header__menu-link");
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            console.log(targetId);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                closeMenu();
                window.scrollTo({
                    top: targetElement.offsetTop - header.clientHeight, 
                    behavior: 'smooth' 
                });
            }
        });
    });

    window.addEventListener("scroll", (e) => {
        anchorLinks.forEach(item => {
            if (scrollY >= document.getElementById(item.getAttribute('href').substring(1)).offsetTop - header.getBoundingClientRect().height) {
                anchorLinks.forEach(el => {
                    el.classList.remove("active");
                })
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    })

});
