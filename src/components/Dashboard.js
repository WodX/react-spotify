import React, { useEffect, useState } from "react";
import { getCurrentUserInfo, getCurrentUserAlbums, getCurrentUserPlaylists, getFeaturePlaylists } from "../api/spotify";
import List from "./List";

const Dashboard = () => {
	const [user, setUser] = useState({});
	const [albums, setAlbums] = useState([]);
	const [playlists, setPlaylists] = useState([]);
	const [fPlaylists, setFPlaylists] = useState([]);

	useEffect(() => {
		getCurrentUserInfo().then((info) => {
			setUser(info);
		});

		getCurrentUserAlbums().then((albums) => {
			setAlbums(albums.items);
		});

		getCurrentUserPlaylists().then((playlists) => {
			setPlaylists(playlists.items);
		});

		getFeaturePlaylists().then((data) => {
			data.json().then((feature) => {
				setFPlaylists(feature.playlists.items);
			})
		});

	}, []);


  return (
    <div className="container">
			<p>User Info</p>
			{Object.keys(user).length > 0 && (
				<div className="user-info">
					<img src={user.images[0].url} alt="profile_image" width={200} />
					<div>
						<p><b>Name:</b> {user.display_name}</p>
						<p><b>Email:</b> {user.email}</p>
						<p><b>Product:</b> {user.product}</p>
						<p><b>Followers:</b> {user.followers.total}</p>
						<p><b>Profile:</b> <a href={user.external_urls.spotify}>{user.external_urls.spotify}</a></p>
					</div>
				</div>
			)}
			<List title="Featured Playlists" data={fPlaylists}/>
			<List title="My Albuns" data={albums}/>
			<List title="My Playlists" data={playlists}/>
    </div>
  );
};

export default Dashboard;