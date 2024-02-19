const rootElement = document.getElementById("root");
let total = 0;

const skeletonComponent = () => `
<header id="myHeader"></header>
<main id="myMain"></main>
<footer id="myFooter"></footer>
`;

const headerComponent = () => `

<div class="logo">
    <p>Burger Land</p>
</div>

<div class="navbars">
    <ul class="navigators">
        <li class="about"><a>About</a></li>
        <li class="menu"><a>Menu</a></li>
    </ul>  
</div>
`;

const mainComponent = () => `
<div class="textbox">
    <h1>🍔Welcome to Burger Land!🍔</h1>
    <p>Where every bite is an adventure! Our chefs craft <strong>mouthwatering, locally-sourced </strong>burgers using only the freshest ingredients. From classic cheeseburgers to gourmet specialties, there's something for everyone. <strong>Feeling bold?</strong> Try our signature Burger Land Challenge! Whether dining in or ordering online, every burger is a journey of flavor and satisfaction. Welcome to <strong>Burger Land</strong>: Where Every Bite is an Adventure! 🎉</p>
</div>
<div class="picture">
    <img src="images/wallpaper.jpg" alt="burger">
</div>
`;

const footerComponent = () => `<h5>The Team Project</h2>`;

const aboutComponent = () => `
<div class="about-text">
    <p>Burger Land was born from a shared <strong>love for burgers</strong> and a dream to create an online community for burger enthusiasts. In 2019, it started as a small online platform for sharing recipes and tips. As the community grew, so did the vision. In 2020, the <strong>Burger Land Marketplace</strong> launched, offering a variety of burger-related products. In 2021, the Burger Builder tool was introduced, allowing users to create custom burgers and order them from local joints. Today, Burger Land is a <strong>thriving community and marketplace</strong> for burger lovers. Join us and make every bite an adventure! 🍔🎉</p>
</div>
`;

const burgersComponent = () => {
  return burgers
    .map(
      (burger) =>
        `<div class="burgercard">
          <img src=${burger.img} alt="pizza">
          <h2>${burger.name}</h2>
          <h4>${burger.price}</h4>
          <h3>${burger.meat_patty_weight}</h3>
          <p>${burger.topping}</p>
      </div>`
    )
    .join("");
};

const burgerContainerComponent = () => `<div class="burger-container"></div>`;

const cartComponent = () => `
<div class="row">
    <div class="col-25">
        <div class="container">
            <h4>Cart
                <span class="cart-price" style="color:black">
                    <i class="fa fa-shopping-cart"></i>
                </span>
            </h4>
            <div class="cart-container">
            <div class="burger-name"></div>
            <div class="burger-price"></div>
        </div>
        <hr>
        <p>Total 
            <span class="price" style="color:black">
                <b>$0</b>
            </span>
        </p>
    </div>
</div>

<div class="col-75">
    <div class="container">
        
        <form class="form">
            <div class="row">
                <div class="col-50">
                    <h3>Billing Address</h3>
                    <label for="fname"><i class="fa fa-user"></i> Full Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="John M. Doe" required>
                    <label for="email"><i class="fa fa-envelope"></i> Email</label>
                    <input type="text" id="email" name="email" placeholder="john@example.com" required>
                    <label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
                    <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" required>
                    <label for="city"><i class="fa fa-institution"></i> City</label>
                    <input type="text" id="city" name="city" placeholder="New York" required>

                    <div class="row">
                        <div class="col-50">
                            <label for="state">State</label>
                            <input type="text" id="state" name="state" placeholder="NY" required>
                        </div>
                        <div class="col-50">
                            <label for="zip">Zip</label>
                            <input type="text" id="zip" name="zip" placeholder="10001" required>
                        </div>
                    </div>
                </div>

                </div>
                <button class="btn">Checkout</button>
        </form>
    </div>
</div>
`;

const burgerNameComponent = (burgerH2) => `<div>${burgerH2}</div>`;

const burgerPriceComponent = (burgerH4) => `<div>$${burgerH4}</div>`;

const burgerTotal = (newTotal) => `<div>$${newTotal}</div>`;

function init() {
  rootElement.insertAdjacentHTML("beforeend", skeletonComponent());

  const headerElement = document.querySelector("#myHeader");
  const mainElement = document.querySelector("#myMain");
  const footerElement = document.querySelector("#myFooter");

  headerElement.insertAdjacentHTML("beforeend", headerComponent());
  mainElement.insertAdjacentHTML("beforeend", mainComponent());
  footerElement.insertAdjacentHTML("beforeend", footerComponent());

  const logoElement = document.querySelector(".logo");
  logoElement.addEventListener("click", () => {
    window.location = "/burger_webshop_frontend_only/";
  });

  const aboutElement = document.querySelector(".about");
  aboutElement.addEventListener("click", () => {
    mainElement.innerHTML = "";
    mainElement.insertAdjacentHTML("beforeend", aboutComponent());
  });

  const menuElement = document.querySelector(".menu");
  menuElement.addEventListener("click", () => {
    mainElement.innerHTML = "";
    mainElement.insertAdjacentHTML("beforeend", burgerContainerComponent());
    mainElement.insertAdjacentHTML("beforeend", cartComponent());

    const burgerContainerElement = document.querySelector(".burger-container");
    const burgerNameElement = document.querySelector(".burger-name");
    const burgerPriceElement = document.querySelector(".burger-price");
    const burgerTotalElement = document.querySelector(".price");

    const burgerCards = burgersComponent();
    burgerContainerElement.insertAdjacentHTML("beforeend", burgerCards);

    const burgercardElements = document.querySelectorAll(".burgercard");
    burgercardElements.forEach((burgercardElement) =>
      burgercardElement.addEventListener("click", (event) => {
        const burgercardData = event.currentTarget;
        const burgerH2 = burgercardData.querySelector("h2").innerText;
        const burgerH4 = parseFloat(
          burgercardData.querySelector("h4").innerText
        );

        burgerNameElement.insertAdjacentHTML(
          "beforeend",
          burgerNameComponent(burgerH2)
        );
        burgerPriceElement.insertAdjacentHTML(
          "beforeend",
          burgerPriceComponent(burgerH4)
        );

        const newTotal = (total += burgerH4);
        burgers.push(burgerH2);

        burgerTotalElement.innerHTML = burgerTotal(newTotal);
      })
    );
    const checkoutButton = document.querySelector(".btn");
    checkoutButton.addEventListener("click", () => {
      const formData = new FormData(document.querySelector(".form"));
      const billingAddress = Object.fromEntries(formData.entries());
      const order = {
        burgers: burgerNameElement.innerText,
        billingAddress: billingAddress,
        total: total,
      };
      localStorage.setItem("order", JSON.stringify(order));
      console.log("Order placed:", order);
      alert("Order placed successfully!");
    });
  });
}
init();
