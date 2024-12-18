 // 물품 리스트를 저장하는 배열
const productList = [
    {
        title: "DIY 반려견 장난감",
        materials: "양말, 실, 바늘",
        description: "오래된 양말로 만드는 반려견 장난감입니다.",
        steps: "1. 양말을 준비한다. 2. 실로 꼬아 고정한다.",
        link: "https://www.youtube.com/watch?v=UxAyBUQ3fMY",
        image: "../img/dog-toy.jpg"
    },
    {
        title: "반려견용 침대 만들기",
        materials: "옷, 쿠션",
        description: "헌 옷을 활용한 간단한 침대 만들기.",
        steps: "1. 쿠션을 감싼다. 2. 옷을 사용하여 고정한다.",
        link: "https://www.youtube.com/shorts/s953FwizUOY",
        image: "../img/dog-clothes.jpg"
    }
];

// "물품 추가하기" 버튼 클릭 시 폼 표시
document.getElementById("show-form-btn").addEventListener("click", () => {
    document.getElementById("product-form").style.display = "block";
});

// 이미지 미리보기 기능
document.getElementById("product-image").addEventListener("change", function(event) {
    const reader = new FileReader();
    reader.onload = function(e) {
        // 미리보기 이미지 표시
        const imagePreview = document.getElementById("product-image-preview");
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block"; // 이미지 미리보기 보이기
    };
    reader.readAsDataURL(event.target.files[0]);
});

// 물품 항목을 추가하는 함수
function addProduct() {
    const title = document.getElementById("product-title").value.trim();
    const materials = document.getElementById("product-materials").value.trim();
    const description = document.getElementById("product-description").value.trim();
    const steps = document.getElementById("product-step-number").value.trim();
    const link = document.getElementById("product-link").value.trim();
    const imageFile = document.getElementById("product-image").files[0]; // 이미지 파일 가져오기

    // 필드가 비어 있는 경우 경고 메시지 표시
    if (!title || !materials || !description || !steps) {
        alert("모든 필드를 작성한 후 추가해 주세요.");
        return;
    }

    // 이미지 파일이 선택되었으면 그 파일을 사용하고, 그렇지 않으면 기본 이미지 설정
    let imageUrl = "";
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imageUrl = event.target.result;
            addToProductList(title, materials, description, steps, link, imageUrl);
        };
        reader.readAsDataURL(imageFile);
    } else {
        imageUrl = "../img/dog-toy.jpg"; // 기본 이미지 URL
        addToProductList(title, materials, description, steps, link, imageUrl);
    }

    // 입력 필드 초기화
    document.getElementById("product-title").value = '';
    document.getElementById("product-materials").value = '';
    document.getElementById("product-description").value = '';
    document.getElementById("product-step-number").value = '';
    document.getElementById("product-link").value = '';
    document.getElementById("product-image").value = ''; // 이미지 필드 초기화

    // 성공 메시지 alert 창으로 표시
    alert("물품을 추가하였습니다!");

    // 물품 추가 폼 숨기기
    document.getElementById("product-form").style.display = "none";
}

// 물품 리스트에 추가된 데이터를 표시하는 함수
function addToProductList(title, materials, description, steps, link, imageUrl) {
    const newProduct = {
        title: title,
        materials: materials,
        description: description,
        steps: steps,
        link: link,
        image: imageUrl
    };

    // 물품 배열에 새 항목 추가
    productList.push(newProduct);

    // 물품 목록 갱신
    renderProductList();
}

// 물품 목록을 화면에 렌더링하는 함수
function renderProductList() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = '';  // 기존 목록 초기화

    productList.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";

        const title = document.createElement("h3");
        title.textContent = product.title;

        const description = document.createElement("p");
        description.textContent = product.description;

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.title;
        productImage.style.width = "100%";  // 이미지 크기 자동 조정

        const detailsButton = document.createElement("button");
        detailsButton.textContent = "자세히 보기";
        detailsButton.className = "details-button";

        // 상세 정보 (처음에는 숨김 처리 후 버튼 클릭 시 보이도록 설정)
        const detailsContainer = document.createElement("div");
        detailsContainer.className = "details-container";
        detailsContainer.style.display = "none";

        const materials = document.createElement("p");
        materials.textContent = "재료: " + product.materials;

        const steps = document.createElement("p");
        steps.textContent = "순서: " + product.steps;

        const link = document.createElement("a");
        link.href = product.link;
        link.textContent = "유튜브 또는 블로그 링크";
        link.target = "_blank";

        detailsContainer.appendChild(materials);
        detailsContainer.appendChild(steps);
        detailsContainer.appendChild(link);

        // "자세히 보기" 버튼 이벤트 리스너 추가
        detailsButton.addEventListener("click", () => {
            detailsContainer.style.display = detailsContainer.style.display === "none" ? "block" : "none";
        });

        productItem.appendChild(productImage);
        productItem.appendChild(title);
        productItem.appendChild(description);
        productItem.appendChild(detailsButton);
        productItem.appendChild(detailsContainer);
        productsContainer.appendChild(productItem);
    });
}

// 페이지가 로드되면 기존 물품을 렌더링
window.onload = function() {
    renderProductList();
};

// "물품 추가" 버튼에 이벤트 리스너 추가
document.getElementById("add-product-btn").addEventListener("click", addProduct);