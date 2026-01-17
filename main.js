const url = "https://www.usinasag.com.br/";
if (window.location.href == "http://www.usinasag.com.br/") {
  window.location.href = url;
} else if (window.location.href == "http://usinasag.com.br/") {
  window.location.href = url;
}

// Função para animar os números com padding
function animateNumbers(element, start, end, duration) {
  const initialText = element.textContent; // Salva o texto inicial

  function padNumber(num, maxLength) {
    return num.toString().padStart(maxLength, "0");
  }

  const maxLength = end.toString().length;

  gsap.fromTo(
    element,
    { textContent: start },
    {
      textContent: end,
      duration: duration,
      ease: "power3.inOut",
      snap: { textContent: 1 },
      onUpdate: function () {
        const currentNumber = padNumber(
          Math.round(this.targets()[0].textContent),
          maxLength
        );
        
        if (end === 8 || end === 3500) {
          if (element.getAttribute("data-static-text")) {
            element.textContent = initialText.replace(/\d+/, "+" + currentNumber);
          } else {
            element.textContent = "+" + currentNumber;
          }
        } else {
          if (element.getAttribute("data-static-text")) {
            element.textContent = initialText.replace(/\d+/, currentNumber);
          } else {
            element.textContent = currentNumber;
          }
        }
      },
    }
  );
  
}

// Função para iniciar a animação quando a div entra na visualização
function observeAndAnimateNumbers() {
  const numbers = document.querySelectorAll(".numeros-card h3");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Ajuste este valor conforme necessário
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        if (!element.classList.contains("animated")) {
          element.classList.add("animated");
          const index = Array.from(numbers).indexOf(element);
          const endValues = [8, 3500, 13, 2, 15]; // Valores finais para cada número
          animateNumbers(element, 0, endValues[index], 3 + index * 0.5); // Durations variando para cada elemento
        }
        observer.unobserve(element); // Pare de observar uma vez que a animação tenha começado
      }
    });
  }, observerOptions);

  numbers.forEach((number) => {
    observer.observe(number);
  });
}

document.addEventListener("DOMContentLoaded", observeAndAnimateNumbers);

const slider = document.querySelector(".row");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.style.cursor = "grab";
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.style.cursor = "grab";
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

//Animacoes Swipper
var swiperempresas = new Swiper(".empresas", {
  slidesPerView: 3,
  spaceBetween: 210,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    loop: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiperusinas = new Swiper(".usinas", {
  slidesPerView: 1,
  spaceBetween: 0,
  pagination: {
    el: ".swiper-pagination",
    clickable: false,
  },
  autoplay: {
    delay: 3000, 
    disableOnInteraction: false,
  },
  loop: true,
});

{
}
document.addEventListener("DOMContentLoaded", function () {
  function moveVantagens() {
    const vantagens = document.querySelector(".responsive-vantagens");
    const conteudo = document.querySelector(".responsive-conteudo");
    if (window.innerWidth <= 1360) {
      if (!conteudo.contains(vantagens)) {
        conteudo.appendChild(vantagens);
      }
      // } else {
      //   const section = document.querySelector(".economia-energia-bg");
      //   if (section && !section.contains(vantagens)) {
      //     section.appendChild(vantagens);
      //   }
    }
  }

  window.addEventListener("resize", moveVantagens);
  moveVantagens();
});

window.addEventListener("resize", function () {
  var screenWidth = window.innerWidth;
  var vantagensDiv = document.querySelector(".reduza-custos-vantagens");
  var conteudoDiv = document.querySelector(".reduza-custos-conteudo");

  if (screenWidth < 1359) {
    if (!conteudoDiv.contains(vantagensDiv)) {
      conteudoDiv.appendChild(vantagensDiv);
    }
  } else {
    if (document.querySelector(".reduza-custos-bg").contains(vantagensDiv)) {
      document.querySelector(".reduza-custos-bg").appendChild(vantagensDiv);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  // Selecionando elementos home.
  const elementosHome = gsap.utils.toArray(".sun, .home h1, .home p, .home a");
  // Em seguida, aplicamos a animação a cada elemento
  elementosHome.forEach((elemento, index) => {
    gsap.fromTo(
      elemento,
      {
        y: 100, // Inicia 100 pixels abaixo da posição final (invertido do original para corresponder ao movimento de subida)
        opacity: 0,
      },
      {
        y: 0, // Move para a posição original
        opacity: 1,
        delay: index * 0.3, // Adiciona um atraso baseado no índice para efeito sequencial
        duration: 1.3,
        ease: "power5.out", // Mantendo a mesma função de easing para consistência
      }
    );
  });
  gsap.fromTo(
    ".marcas-conteudo h2 ",
    { y: "70%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".marcas-conteudo h2 ",
        start: "top 100%", // Início da animação quando o topo do elemento atinge 80% da altura da janela de visualização
        end: "bottom 20%", // Fim da animação quando a parte inferior do elemento atinge 20% da altura da janela de visualização
        toggleActions: "play none none none", // Inicia a animação, não a reverte, não a reinicia, não a pausa
      },
    }
  );

  gsap.fromTo(
    ".economia-energia-continuacao h2 ",
    { y: "70%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".economia-energia-continuacao h2 ",
        start: "top 100%", // Início da animação quando o topo do elemento atinge 80% da altura da janela de visualização
        end: "bottom 20%", // Fim da animação quando a parte inferior do elemento atinge 20% da altura da janela de visualização
        toggleActions: "play none none none", // Inicia a animação, não a reverte, não a reinicia, não a pausa
      },
    }
  );

  gsap.fromTo(
    ".numeros-conteudo h2 ",
    { y: "70%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".numeros-conteudo h2 ",
        start: "top 100%", // Início da animação quando o topo do elemento atinge 80% da altura da janela de visualização
        end: "bottom 20%", // Fim da animação quando a parte inferior do elemento atinge 20% da altura da janela de visualização
        toggleActions: "play none none none", // Inicia a animação, não a reverte, não a reinicia, não a pausa
      },
    }
  );



  document.querySelectorAll(".independente-conteudo").forEach((section) => {
    gsap.fromTo(
      section,
      { x: "-20%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: section, // Dinamicamente usa cada seção como seu trigger
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  document.querySelectorAll(".independente-usinas").forEach((section) => {
    gsap.fromTo(
      section,
      { x: "20%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: section, // Dinamicamente usa cada seção como seu trigger
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  gsap.fromTo(
    ".vantagens-competitivas h2 ",
    { y: "70%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".vantagens-competitivas h2 ",
        start: "top 100%", // Início da animação quando o topo do elemento atinge 80% da altura da janela de visualização
        end: "bottom 20%", // Fim da animação quando a parte inferior do elemento atinge 20% da altura da janela de visualização
        toggleActions: "play none none none", // Inicia a animação, não a reverte, não a reinicia, não a pausa
      },
    }
  );

  gsap.fromTo(
    ".economia-energia-vantagens",
    { x: "20%", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".economia-energia-vantagens",
        start: "top 80%", // Início da animação quando o topo do elemento atinge 80% da altura da janela de visualização
        end: "bottom 20%", // Fim da animação quando a parte inferior do elemento atinge 20% da altura da janela de visualização
        toggleActions: "play none none none", // Inicia a animação, não a reverte, não a reinicia, não a pausa
      },
    }
  );

  document.querySelectorAll(".economia-energia-texto").forEach((section) => {
    gsap.fromTo(
      section,
      { x: "-20%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: section, // Dinamicamente usa cada seção como seu trigger
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  gsap.fromTo(
    ".reduza-custos-vantagens",
    { x: "20%", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".reduza-custos-vantagens",
        start: "top 80%", // Início da animação quando o topo do elemento atinge 80% da altura da janela de visualização
        end: "bottom 20%", // Fim da animação quando a parte inferior do elemento atinge 20% da altura da janela de visualização
        toggleActions: "play none none none", // Inicia a animação, não a reverte, não a reinicia, não a pausa
      },
    }
  );

  gsap.fromTo(
    ".melhor-escolha-conteudo h1 ",
    { y: "70%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".melhor-escolha-conteudo h1 ",
        start: "top 100%", // Início da animação quando o topo do elemento atinge 80% da altura da janela de visualização
        end: "bottom 20%", // Fim da animação quando a parte inferior do elemento atinge 20% da altura da janela de visualização
        toggleActions: "play none none none", // Inicia a animação, não a reverte, não a reinicia, não a pausa
      },
    }
  );

  gsap.fromTo(
    ".benefits-section h2 ",
    { y: "70%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".benefits-section h2 ",
        start: "top 100%", // Início da animação quando o topo do elemento atinge 80% da altura da janela de visualização
        end: "bottom 20%", // Fim da animação quando a parte inferior do elemento atinge 20% da altura da janela de visualização
        toggleActions: "play none none none", // Inicia a animação, não a reverte, não a reinicia, não a pausa
      },
    }
  );

  gsap.fromTo(
    ".investor",
    { x: "-20%", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".investor",
        start: "top 70%", // Início da animação quando o topo do elemento atinge 80% da altura da janela de visualização
        end: "bottom 20%", // Fim da animação quando a parte inferior do elemento atinge 20% da altura da janela de visualização
        toggleActions: "play none none none", // Inicia a animação, não a reverte, não a reinicia, não a pausa
      },
    }
  );

  gsap.fromTo(
    ".client",
    { x: "20%", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".client",
        start: "top 70%", // Início da animação quando o topo do elemento atinge 80% da altura da janela de visualização
        end: "bottom 20%", // Fim da animação quando a parte inferior do elemento atinge 20% da altura da janela de visualização
        toggleActions: "play none none none", // Inicia a animação, não a reverte, não a reinicia, não a pausa
      },
    }
  );
});

ScrollTrigger.addEventListener("scrollStart", () => ScrollTrigger.refresh());
