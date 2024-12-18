// 음식 리스트를 저장하는 배열
const foodList = [
    {
        title: "닭고기 간식",
        feature: "닭고기, 고구마, 당근",
        description: "강아지를 위한 건강한 닭고기 간식 만들기.",
        usage: "1. 닭고기와 고구마를 작은 조각으로 자른다. 2. 오븐에서 구워준다.",
        link: "https://youtu.be/wDReMFGsxzY?feature=shared",
        image: "../img/dog-bowl.jpg"
    },
    {
        title: "호박 스튜",
        feature: "호박, 닭고기, 당근, 감자",
        description: "강아지를 위한 영양 가득한 호박 스튜 만들기.",
        usage: "1. 모든 재료를 잘게 썬다. 2. 냄비에 재료를 넣고 끓여준다.",
        link: "https://www.youtube.com/watch?v=gkTt0sx23KE",
        image: "../img/dog-bowl.jpg"
    },
    {
        title: "치킨과 고구마 쿠키",
        feature: "치킨, 고구마, 밀가루",
        description: "강아지를 위한 맛있는 쿠키 만들기.",
        usage: "1. 재료를 반죽해서 모양을 만든다. 2. 오븐에 구워준다.",
        link: "https://www.youtube.com/watch?v=aICLLkBs6vE",
        image: "../img/dog-bowl.jpg"
    }
];

// "음식 추가하기" 버튼 클릭 시 폼 표시
document.getElementById("show-form-btn").addEventListener("click", () => {
    document.getElementById("food-form").style.display = "block";
});

// 이미지 미리보기 기능
document.getElementById("food-image").addEventListener("change", function(event) {
    const reader = new FileReader();
    reader.onload = function(e) {
        // 미리보기 이미지 표시
        const imagePreview = document.getElementById("food-image-preview");
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block"; // 이미지 미리보기 보이기
    };
    reader.readAsDataURL(event.target.files[0]);
});

// 음식 항목을 추가하는 함수
function addFood() {
    const title = document.getElementById("food-title").value.trim();
    const feature = document.getElementById("food-materials").value.trim();
    const description = document.getElementById("food-description").value.trim();
    const usage = document.getElementById("food-step-number").value.trim();
    const link = document.getElementById("food-link").value.trim();
    const image = document.getElementById("food-image").files[0]; // 이미지 파일 가져오기

    // 필드가 비어 있는 경우 경고 메시지 표시
    if (!title || !feature || !description || !usage) {
        alert("모든 필드를 작성한 후 추가해 주세요.");
        return;
    }

    // 이미지 파일이 선택되었으면 그 파일을 사용하고, 그렇지 않으면 기본 이미지 설정
    let imageUrl = "";
    if (image) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imageUrl = event.target.result;
            addToFoodList(title, feature, description, usage, link, imageUrl);
        };
        reader.readAsDataURL(image);
    } else {
        imageUrl = "../img/dog-bowl.jpg"; // 기본 이미지 URL
        addToFoodList(title, feature, description, usage, link, imageUrl);
    }

    // 입력 필드 초기화
    document.getElementById("food-title").value = '';
    document.getElementById("food-materials").value = '';
    document.getElementById("food-description").value = '';
    document.getElementById("food-step-number").value = '';
    document.getElementById("food-link").value = '';
    document.getElementById("food-image").value = ''; // 이미지 필드 초기화

    // 성공 메시지 alert 창으로 표시
    alert("음식을 추가하였습니다!");

    // 음식 추가 폼 숨기기
    document.getElementById("food-form").style.display = "none";
}

// 음식 리스트에 추가된 데이터를 표시하는 함수
function addToFoodList(title, feature, description, usage, link, imageUrl) {
    const newFood = {
        title: title,
        feature: feature,
        description: description,
        usage: usage,
        link: link,
        image: imageUrl
    };

    // 음식 배열에 새 항목 추가
    foodList.push(newFood);

    // 음식 목록 갱신
    renderFoodList();
}

// 물품 목록을 화면에 렌더링하는 함수
function renderFoodList() {
    const foodsContainer = document.getElementById("foods");
    foodsContainer.innerHTML = '';  // 기존 목록 초기화

    foodList.forEach((food) => {
        const foodItem = document.createElement("div");
        foodItem.className = "food-item";

        const title = document.createElement("h3");
        title.textContent = food.title;

        const description = document.createElement("p");
        description.textContent = food.description;

        const foodImage = document.createElement("img");
        foodImage.src = food.image;
        foodImage.alt = food.title;
        foodImage.style.width = "100%";  // 이미지 크기 자동 조정

        const detailsButton = document.createElement("button");
        detailsButton.textContent = "자세히 보기";
        detailsButton.className = "details-button";

        // 상세 정보 (처음에는 숨김 처리 후 버튼 클릭 시 보이도록 설정)
        const detailsContainer = document.createElement("div");
        detailsContainer.className = "details-container";
        detailsContainer.style.display = "none";

        const feature = document.createElement("p");
        feature.textContent = "재료: " + food.feature;  // feature 제대로 출력

        const usage = document.createElement("p");
        usage.textContent = "사용법: " + food.usage;  // usage 제대로 출력

        const link = document.createElement("a");
        link.href = food.link;
        link.textContent = "유튜브 또는 블로그 링크";
        link.target = "_blank";

        detailsContainer.appendChild(feature);
        detailsContainer.appendChild(usage);
        detailsContainer.appendChild(link);

        // "자세히 보기" 버튼 이벤트 리스너 추가
        detailsButton.addEventListener("click", () => {
            detailsContainer.style.display = detailsContainer.style.display === "none" ? "block" : "none";
        });

        foodItem.appendChild(foodImage);
        foodItem.appendChild(title);
        foodItem.appendChild(description);
        foodItem.appendChild(detailsButton);
        foodItem.appendChild(detailsContainer);
        foodsContainer.appendChild(foodItem);
    });
}

// 페이지가 로드되면 기존 물품을 렌더링
window.onload = function() {
    renderFoodList();
};

// "음식 추가" 버튼에 이벤트 리스너 추가
document.getElementById("add-food-btn").addEventListener("click", addFood);
