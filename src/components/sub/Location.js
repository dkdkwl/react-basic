import React, { useRef, useEffect, useState } from 'react';

function Location() {
	const { kakao } = window;
	const path = process.env.PUBLIC_URL;
	const info = [
		{
			title: '송내역',
			latlag: new kakao.maps.LatLng(37.487626, 126.753045),
			imgSrc: path + '/img/marker1.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '강남 포스코 사거리',
			latlag: new kakao.maps.LatLng(37.506354, 127.055006),
			imgSrc: path + '/img/marker2.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '청담역',
			latlag: new kakao.maps.LatLng(37.51912, 127.051937),
			imgSrc: path + '/img/marker3.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];

	//useRef로 가상DOM참조
	const frame = useRef(null);
	const container = useRef(null);

	//렌더링에 관여하는 주요 state관리
	const [map, setMap] = useState(null);
	const [traffic, setTraffic] = useState(false);
	const [index, setIndex] = useState(2);
	const [mapInfo] = useState(info);

	//index state가 변경될때마다 지도 다시그리고 마커 다시 출력
	useEffect(() => {
		frame.current.classList.add('on');

		//맵 화면 출력
		const option = {
			center: mapInfo[index].latlag,
			level: 3,
		};
		const mapInstance = new kakao.maps.Map(container.current, option);

		//마커 출력
		new kakao.maps.Marker({
			map: mapInstance,
			position: mapInfo[index].latlag,
			title: mapInfo[index].title,
			image: new kakao.maps.MarkerImage(
				mapInfo[index].imgSrc,
				mapInfo[index].imgSize,
				mapInfo[index].imgPos
			),
		});

		setMap(mapInstance);
	}, [index]);

	//트래픽활성 함수
	const handleTraffic = () => {
		if (map) {
			traffic
				? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
	};

	//traffic state가 변경될때마사 실행 트래픽 오버레이 레이어 표시
	useEffect(() => {
		handleTraffic();
	}, [traffic]);

	//state값 변경에 따라 렌더링될 가상DOM
	return (
		<section className='location' ref={frame}>
			<div className='inner'>
				<h1>Location</h1>

				<div id='map' ref={container}></div>

				<button onClick={() => setTraffic(!traffic)}>
					{traffic ? 'traffic ON' : 'traffic OFF'}
				</button>

				<ul>
					{/* 버튼 클릭시 index state 변경 */}
					<li onClick={() => setIndex(0)}>송내역 보기</li>
					<li onClick={() => setIndex(1)}>포스코 사거리 보기</li>
					<li onClick={() => setIndex(2)}>청담역 보기</li>
				</ul>
			</div>
		</section>
	);
}

export default Location;
