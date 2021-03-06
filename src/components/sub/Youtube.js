import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../common/Layout';
import Popup from '../common/Popup';

function Youtube() {
	const vidData = useSelector((store) => store.youtubeReducer.youtube);
	const pop = useRef(null);
	const [index, setIndex] = useState(0);

	return (
		<>
			<Layout name={'Youtube'} pic={'/img/pic6.jpg'}>
				{vidData.map((item, idx) => {
					let desc = item.snippet.description;
					let desc_len = desc.length;
					let date = item.snippet.publishedAt;

					return (
						<article
							key={idx}
							onClick={() => {
								setIndex(idx);
								pop.current.open();
							}}>
							<div className='inner'>
								<div className='pic'>
									<img src={item.snippet.thumbnails.medium.url} />
								</div>
								<h2>{item.snippet.title}</h2>
								<p>{desc_len > 200 ? desc.substr(0, 200) + '...' : desc}</p>
								<span>{date.split('T')[0]}</span>
							</div>
						</article>
					);
				})}
			</Layout>

			<Popup ref={pop}>
				{vidData.length !== 0 && <iframe src={'https://www.youtube.com/embed/' + vidData[index].snippet.resourceId.videoId} frameBorder='0'></iframe>}
				<span onClick={() => pop.current.close()}>close</span>
			</Popup>
		</>
	);
}

export default Youtube;
