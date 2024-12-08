const money = 16000;
let currentMoney = document.getElementById("money");
currentMoney.textContent = money;

// Ürünleri grid sistem olarak yerleştireceğimiz container
const content = document.querySelector("#container");

// json dosyamızdaki ürünlere istek atıyoruz ve container içine tek tek hepsini yerleştiriyoruz
// 18. Satırda hangi count değerini azaltacağımızı bilmemiz için o counta seçilen ürünün index'ini atayacağız
fetch('items.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach((data, index) => {
            content.innerHTML += `<div class="box">
               <img src="${data.image}" alt="${data.name}">
                <div class="text">
                    <h1 id="item-name">${data.name}</h1>
                    <h2 id="item-price">${data.price}₺</h2>
                </div>
                <div class="input">
                    <button class="decrease-btn" data-index="${index}">-</button>
                    <span id="item-count-${index}">${data.count}</span>
                    <button class="increase-btn" data-index="${index}">+</button>
                </div>
            </div>`;
        });

        // Butonlarımızı seçtik
        const decreaseBtns = document.querySelectorAll(".decrease-btn");
        const increaseBtns = document.querySelectorAll(".increase-btn");

        decreaseBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                const countSpan = document.querySelector(`#item-count-${index}`);
                let currentCount = parseInt(countSpan.textContent);

                if (currentCount === 0) {
                    console.log("Azaltamazsın");
                } else {
                    currentCount--;
                    countSpan.textContent = currentCount;
                    let newMoney = parseInt(currentMoney.textContent);
                    newMoney = newMoney + parseInt(data[index].price);
                    currentMoney.textContent = newMoney;
                    console.log("azaldı");
                }

            })
        });

        increaseBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                const countSpan = document.querySelector(`#item-count-${index}`);
                let currentCount = parseInt(countSpan.textContent);
                
                let newMoney = parseInt(currentMoney.textContent);
                    if (newMoney < data[index].price) {
                        console.log("Bu ürünü alamazsın")
                    }else {
                        newMoney = newMoney - data[index].price;
                        currentMoney.textContent = newMoney;
                        currentCount++;
                        countSpan.textContent = currentCount;
                    }
            });
        });

    })
    .catch((error) => console.error('Hata:', error));

