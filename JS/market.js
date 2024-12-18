// 상품 리스트 배열 초기화
const items = [
    {
        name: "귀여운 강아지 옷",
        price: "20000",
        description: "강아지를 위한 귀여운 옷",
        image: "../img/dog-clothes.jpg"
    },
    {
        name: "튼튼한 강아지 장난감",
        price: "5000",
        description: "강아지의 스트레스 해소에 도움이 되는 장난감",
        image: "../img/dog-toy.jpg"
    },
    {
        name: "항상 필요한 밥그릇",
        price: "25000",
        description: "강아지의 맛있는 식사를 책임지겠습니다",
        image: "../img/dog-bowl.jpg"
    }
];

// 상품 목록 표시 함수
function renderItems() {
    const itemList = document.getElementById("item-list");
    itemList.innerHTML = ""; // 기존 목록 초기화

    // items 배열을 반복하여 각 상품 표시
    items.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";

        // 상품 정보 표시
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>${item.price} 원</p>
        `;
        itemDiv.onclick = function () {
            viewItem(index);
        };
        itemList.appendChild(itemDiv);
    });
}

// 상품 상세 보기 함수
function viewItem(index) {
    const item = items[index];
    
    // 상세보기 모달에 상품 정보 표시
    const modal = document.getElementById("view-modal");
    const viewItemName = document.getElementById("view-item-name");
    const viewItemPrice = document.getElementById("view-item-price");
    const viewItemDescription = document.getElementById("view-item-description");
    const viewItemImage = document.getElementById("view-item-image");

    viewItemName.textContent = item.name;
    viewItemPrice.textContent = `가격: ${item.price} 원`;
    viewItemDescription.textContent = item.description;
    viewItemImage.src = item.image;

    modal.style.display = "block";
}

// 상품 추가 모달
const modal = document.getElementById("modal");
const addItemBtn = document.getElementById("add-item-btn");
const closeModal = document.querySelector(".close");
const closeViewModal = document.getElementById("view-close");

// 모달 열기
addItemBtn.onclick = function() {
    modal.style.display = "block";
};

// 모달 닫기
closeModal.onclick = function() {
    modal.style.display = "none";
};

// 상세보기 모달 닫기
closeViewModal.onclick = function() {
    document.getElementById("view-modal").style.display = "none";
};

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target === modal || event.target === document.getElementById("view-modal")) {
        modal.style.display = "none";
        document.getElementById("view-modal").style.display = "none";
    }
};

// 상품 추가 및 저장 기능
document.getElementById("save-item-btn").onclick = function() {
    const itemName = document.getElementById("item-name").value;
    const itemPrice = document.getElementById("item-price").value;
    const itemDescription = document.getElementById("item-description").value;
    const itemImageInput = document.getElementById("item-image");

    let imageSrc = "../img/Home.png"; // 기본 이미지 경로 설정
    if (itemImageInput.files && itemImageInput.files[0]) {
        imageSrc = URL.createObjectURL(itemImageInput.files[0]);
        // 이미지 미리보기 추가 (선택적으로)
        document.getElementById("image-preview").src = imageSrc;
    }

    // 가격 입력 값이 숫자인지 확인
    if (isNaN(itemPrice) || itemPrice <= 0) {
        alert("가격은 숫자로 입력해주세요.");
        return;
    }

    if (itemName && itemPrice && itemDescription) {
        // 새로운 상품을 items 배열에 추가
        items.push({
            name: itemName,
            price: itemPrice,
            description: itemDescription,
            image: imageSrc // 기본 이미지 경로 설정
        });

        // 상품 목록 갱신
        renderItems();

        // 상품 등록 완료 알림
        alert("상품이 등록되었습니다!");

        // 모달 닫기 및 입력 필드 초기화
        modal.style.display = "none";
        document.getElementById("item-name").value = "";
        document.getElementById("item-price").value = "";
        document.getElementById("item-description").value = "";
        document.getElementById("item-image").value = "";
        document.getElementById("image-preview").src = ""; // 미리보기 초기화
    } else {
        alert("모든 항목을 입력해주세요.");
    }
};

// 페이지 로드 시 기본 목록 렌더링
renderItems();
