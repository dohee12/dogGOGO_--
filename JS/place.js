let map;  // 지도 객체
let markers = [];  // 마커 배열
let infoWindows = [];  // 정보창 배열
let places = [];  // 장소 정보 배열

function initMap() {
    const centerPosition = { lat: 37.3593, lng: 126.9005 }; // 기본 위치 (군포시)
    const mapOption = {
        center: centerPosition,  // 지도의 중심 위치 설정
        zoom: 13,  // 지도 확대 비율
        draggable: true,  // 지도 드래그 가능 여부
        scrollwheel: true,  // 마우스 휠로 확대/축소 가능 여부
        gestureHandling: "greedy",  // 모바일에서의 제스처 조작 방식 설정
    };

    map = new google.maps.Map(document.getElementById("map"), mapOption); // 지도 객체 생성

    // 고정된 장소 정보 (직접 입력한 장소)
    places = [
        // hotal
        { name: "박준 애견호텔", lat: 37.261980, lng: 127.030212, category: "hotal", address: "경기도 수원시 팔달구 인계동 1135", image: "../img/house-icon.jpg", description: "전화상담이 친절" },
        { name: "넌나의가족", lat: 37.293841, lng: 126.864428, category: "hotal", address: "경기도 안산시 상록구 본오1동 870-9", image: "../img/house-icon.jpg", description: "넘 좋아요" },
        { name: "꼬몽애견유치원호텔", lat: 37.285459, lng: 126.819968, category: "hotal", address: "경기도 화성시 꽃내음1길, 19-18 송산프라자 7층", image: "../img/house-icon.jpg"},
        { name: "욜로는 겁쟁이", lat: 37.200848, lng: 126.979154, category: "hotal", address: "경기도 화성시 정남면 세자로 317-47", image: "../img/house-icon.jpg", description: "가격이 저렴하고 쾌적합니다" },
        { name: "독스타", lat: 37.210870, lng: 126.776089, category: "hotal", address: "경기도 화성시 마도면 두곡리 284-2", image: "../img/house-icon.jpg", description: "실내가 넓고 높아 쾌적합니다" },
        // food
        { name: "솔향기 항아리 바베큐 식당", lat: 37.332332, lng: 126.927973, category: "food", address: "경기도 군포시 번영로 184", image: "../img/food-icon.jpg"},
        { name: "참고기", lat: 37.336102, lng: 126.906066, category: "food", address: "경기도 군포시 속달동 206-1", image: "../img/food-icon.jpg", description: "분위기 좋은 강아지 동반 식당" },
        { name: "누리달", lat: 37.330217, lng: 126.916504, category: "food", address: "경기도 군포시 대야동 215-7", image: "../img/food-icon.jpg"},
        { name: "카페1퍼센트", lat: 37.330105, lng: 126.915534, category: "food", address: "경기도 군포시 대야2로 143번지 미드빌 101호", image: "../img/food-icon.jpg"},
        { name: "펀비어킹 군포 대야미역점", lat: 37.327565, lng: 126.917846, category: "food", address: "경기도 군포시 대야동 654-9", image: "../img/food-icon.jpg"},
        // playground & cafe
        { name: "비숲", lat: 37.326543, lng: 126.889260, category: "playground", address: "군포시 둔대동 423-28번지 1층", image: "../img/playground-icon.jpg", description: "적당히 넓고 커피와 음식도 맛있어요" },
        { name: "퍼피포레스트", lat: 37.309488, lng: 126.919030, category: "playground", address: "군포시 송부로12번길 46", image: "../img/playground-icon.jpg", description: "강아지들이 뛰어 놀기 최적의 장소예요" },
        { name: "멍쓰런", lat: 37.345098, lng: 126.850152, category: "playground", address: "경기도 안산시 상록구 가루개로 165-5", image: "../img/playground-icon.jpg", description: "애들이 좋아해요" },
        { name: "넌나의가족", lat: 37.293841, lng: 126.864428, category: "playground", address: "경기도 안산시 상록구 본오1동 870-9", image: "../img/playground-icon.jpg", description: "넘 좋아요" },
        { name: "아루스(애견카페)", lat: 37.252279, lng: 126.915877, category: "playground", address: "경기도 화성시 매송면 화성로 2298-8", image: "../img/playground-icon.jpg", description: "오랜만에 가도 아직도 깔끔한 소형견 위주 카페" },
        // hospital
        { name: "솔 동물의료센터", lat: 37.360356, lng: 126.922501, category: "hospital", address: "경기도 군포시 산본동 1147번지 금강2단지 주상복합아파트 상가 1층", image: "../img/hospital-icon.jpg", description: "넘 좋은 수의사 분들이 있어요" },
        { name: "스누피동물병원", lat: 37.361528, lng: 126.934961, category: "hospital", address: "경기도 군포시 산본동 1132", image: "../img/hospital-icon.jpg"},
        { name: "참동물의료센터", lat: 37.320693, lng: 126.836135, category: "hospital", address: "경기도 안산시 단원구 고잔동 고잔로 88 2층", image: "../img/hospital-icon.jpg"},
        { name: "프라하동물병원", lat: 37.344498, lng: 126.939297, category: "hospital", address: "경기도 군포시 당동 974-4", image: "../img/hospital-icon.jpg"},
        { name: "라포레동물메디컬센터", lat: 37.322455, lng: 126.949854, category: "hospital", address: "경기도 의왕시 삼동 471-39", image: "../img/hospital-icon.jpg"},
        // beauty
        { name: "마리애견미용", lat: 37.331529, lng: 126.915865, category: "beauty", address: "경기도 군포시 대야미동 636-8", image: "../img/beauty-icon.jpg"},
        { name: "포캣멍", lat: 37.309363, lng: 126.851046, category: "beauty", address: "경기도 안산시 상록구 이동 715-4번지 센타프라자 2층 205호", image: "../img/beauty-icon.jpg"},
        { name: "바둑아놀자", lat: 37.339055, lng: 126.828669, category: "beauty", address: "경기도 안산시 단원구 와동 와동로 80", image: "../img/beauty-icon.jpg"},
        { name: "오제이애견샵", lat: 37.314226, lng: 126.839819, category: "beauty", address: "경기도 안산시 단원구 고잔동 760-2", image: "../img/beauty-icon.jpg"},
        { name: "폼나고폼나개", lat: 37.361194, lng: 126.938583, category: "beauty", address: "제분산상가동 1층 12호 번영로550번길7 군포시 경기도", image: "../img/beauty-icon.jpg"},
    ];

    // 마커 색상 
    const categoryColors = {
        hotal: "32CD32", // green
        food: "FFD700", // yellow
        playground: "4682B4", // blue
        hospital: "8A2BE2", // purple
        beauty: "FF1493", // deep pink 
    };

    // 마커 추가
    places.forEach((place, index) => {
        const color = categoryColors[place.category] || "000000"; // 기본 색상

        const marker = new google.maps.Marker({
            position: { lat: place.lat, lng: place.lng }, // 마커의 위치
            map: map, // 마커가 표시될 지도 객체
            title: place.name, // 마커의 타이틀 (마우스를 올리면 표시됨)
            icon: {
                path: google.maps.SymbolPath.CIRCLE, // 원 형태로 마커 표시
                fillColor: `#${color}`, // 카테고리에 맞는 색상 설정
                fillOpacity: 1, // 색상 채우기 불투명도 설정
                strokeColor: "#FFFFFF", // 마커 테두리 색상
                strokeWeight: 2, // 마커 테두리 두께
                scale: 8, // 마커 크기
            }
        });

        // 정보창 생성
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <h3>${place.name}</h3>
                <p><strong>카테고리:</strong> ${place.category}</p> <!-- 카테고리 추가 -->
                <p>${place.description || ''}</p>
                <p><strong>주소:</strong> ${place.address}</p>
            `
        });

        // 마커 클릭 시 정보창 열기
        marker.addListener("click", () => {
            closeAllInfoWindows(); // 기존 열려있는 정보창 닫기
            infoWindow.open(map, marker); // 현재 마커의 정보창 열기
        });

        // 마커와 카테고리 정보 저장
        markers.push(marker);
        infoWindows.push(infoWindow);
    });

    // 장소 목록 업데이트 함수 호출 (초기 모든 장소 표시)
    updatePlaceList(places);
}

// 모든 정보창을 닫는 함수
function closeAllInfoWindows() {
    infoWindows.forEach(infoWindow => infoWindow.close());
}

// 장소 목록을 HTML에 업데이트하는 함수
function updatePlaceList(filteredPlaces) {
    const placesList = document.getElementById("places-list"); // 장소 목록을 표시할 HTML 요소
    placesList.innerHTML = ''; // 기존 리스트 초기화

    // 필터링된 장소들을 목록에 추가
    filteredPlaces.forEach((place, index) => {
        const listItem = document.createElement("li"); // 새로운 목록 항목 생성

        // 장소 목록 클릭 시 해당 장소의 마커로 이동하도록 수정
        listItem.innerHTML = `
            <a href="#" onclick="showPlaceOnMap(${index})">
                <img src="${place.image || '../img/default.jpg'}" alt="${place.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                ${place.name}
            </a>
            <br>
            <span>${place.address}</span>
        `;

        placesList.appendChild(listItem); // 목록 항목을 HTML 요소에 추가
    });
}

// 장소 목록에서 클릭한 장소로 지도를 이동시키고 마커 정보 표시
function showPlaceOnMap(index) {
    const place = places[index];

    // 지도에서 해당 장소로 이동
    map.panTo(new google.maps.LatLng(place.lat, place.lng));
    map.setZoom(15); // 확대 비율 설정

    // 해당 장소의 마커를 찾아 클릭 이벤트를 트리거
    const marker = markers[index];
    google.maps.event.trigger(marker, "click");
}

// 카테고리 필터링 함수
function filterPlaces(category) {
    // 선택된 카테고리에 맞는 장소 필터링
    const filteredPlaces = places.filter(place => category === '' || place.category === category);

    // 지도에서 마커를 필터링하여 표시/숨기기
    markers.forEach((marker, index) => {
        if (category === '' || places[index].category === category) {
            marker.setMap(map);  // 카테고리에 맞는 마커만 지도에 표시
        } else {
            marker.setMap(null);  // 해당 카테고리가 아닐 경우 마커 숨기기
        }
    });

    // 필터링된 장소 목록 업데이트
    updatePlaceList(filteredPlaces);
}