// 유기견 데이터 
const dogs = [
    {
        name: "푸들",
        age: "3살",
        description: "사랑스럽고 친근한 성격의 푸들",
        image: "../img/dog-1.jpg",
        id: 1
    },
    {
        name: "진돗개",
        age: "2살",
        description: "강인하고 충성심이 강한 진돗개",
        image: "../img/dog-2.jpg",
        id: 2
    },
    {
        name: "비글",
        age: "5살",
        description: "활발하고 친근한 성격의 비글",
        image: "../img/dog-3.jpg",
        id: 3
    },
    {
        name: "시베리안 허스키",
        age: "4살",
        description: "활발하고 독립적인 성격을 가진 시베리안 허스키",
        image: "../img/dog-4.jpg",
        id: 4
    },
    {
        name: "말티즈",
        age: "1살",
        description: "사랑스럽고 애교 많은 말티즈",
        image: "../img/dog-5.jpg",
        id: 5
    },
    {
        name: "리트리버",
        age: "3살",
        description: "친근하고 충성심이 강한 레트리버",
        image: "../img/dog-6.jpg",
        id: 6
    },
    {
        name: "시추",
        age: "6살",
        description: "작고 귀여운 시추",
        image: "../img/dog-7.jpg",
        id: 7
    },
    {
        name: "로트와일러",
        age: "4살",
        description: "강력하고 용감한 성격의 로트와일러",
        image: "../img/dog-8.jpg",
        id: 8
    },
    {
        name: "닥스훈트",
        age: "3살",
        description: "호기심 많고 용감한 성격을 가진 닥스훈트",
        image: "../img/dog-9.jpg",
        id: 9
    },
    {
        name: "프렌치 불독",
        age: "2살",
        description: "귀엽고 활동적인 프렌치 불독",
        image: "../img/dog-10.jpg",
        id: 10
    },
    {
        name: "프렌치 불독",
        age: "2살",
        description: "귀엽고 활동적인 프렌치 불독",
        image: "../img/dog-11.jpg",
        id: 11
    },
    {
        name: "프렌치 불독",
        age: "2살",
        description: "귀엽고 활동적인 프렌치 불독",
        image: "../img/dog-12.jpg",
        id: 12
    },
    {
        name: "푸들",
        age: "3살",
        description: "사랑스럽고 친근한 성격의 푸들",
        image: "../img/dog-13.jpg",
        id: 13
    },
    {
        name: "진돗개",
        age: "2살",
        description: "강인하고 충성심이 강한 진돗개",
        image: "../img/dog-14.jpg",
        id: 14
    },
    {
        name: "비글",
        age: "5살",
        description: "활발하고 친근한 성격의 비글",
        image: "../img/dog-15.jpg",
        id: 15
    }
];



// 유기견 리스트 렌더링 함수
function renderDogList() {
    const dogItemsContainer = document.getElementById("dog-items");

    dogs.forEach(dog => {
        const dogDiv = document.createElement("div");
        dogDiv.className = "dog-item";
        dogDiv.innerHTML = `
            <img src="${dog.image}" alt="${dog.name}" class="dog-thumbnail">
            <h3>${dog.name}</h3>
            <button onclick="viewDogDetails(${dog.id})">상세 보기</button>
        `;
        dogItemsContainer.appendChild(dogDiv);
    });
}

// 유기견 상세보기 함수
function viewDogDetails(dogId) {
    const selectedDog = dogs.find(dog => dog.id === dogId);

    if (selectedDog) {
        // 유기견 상세 정보 표시
        document.getElementById("dog-image").src = selectedDog.image;
        document.getElementById("dog-name").textContent = selectedDog.name;
        document.getElementById("dog-age").textContent = `나이: ${selectedDog.age}`;
        document.getElementById("dog-description").textContent = selectedDog.description;

        // 상세보기 섹션 표시
        document.getElementById("dog-list").style.display = "none";
        document.getElementById("dog-details").style.display = "block";
    }
}

// 기부하기 버튼 클릭 시 동작하는 함수
function donate() {
    const selectedAmount = document.getElementById("donation-amount").value;
    const selectedDogName = document.getElementById("dog-name").textContent;

    if (selectedAmount && selectedDogName) {
        alert(`${selectedDogName}에게 ${selectedAmount}원을 기부하셨습니다.`);
        // 기부 후 다시 리스트로 돌아가기
        document.getElementById("dog-details").style.display = "none";
        document.getElementById("dog-list").style.display = "block";
    } else {
        alert("기부할 금액을 선택해주세요.");
    }
}

// 돌아가기 버튼 클릭 시 동작하는 함수
function goBack() {
    document.getElementById("dog-details").style.display = "none";
    document.getElementById("dog-list").style.display = "block";
}

// 페이지 로드 시 유기견 리스트 렌더링
window.onload = function() {
    renderDogList();
};
