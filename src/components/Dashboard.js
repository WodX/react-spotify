import React, { useEffect, useState } from "react";
import { getCurrentUserInfo, getCurrentUserAlbums, getCurrentUserPlaylists, getFeaturePlaylists, getNewReleases, searchPlaylist, getCurrentUserArtists } from "../api/spotify";
import List from "./List";

const Dashboard = () => {
	const [user, setUser] = useState({});
	const [albums, setAlbums] = useState([]);
	const [playlists, setPlaylists] = useState([]);
	const [artists, setArtists] = useState([]);
	const [fPlaylists, setFPlaylists] = useState([]);
	const [releases, setReleases] = useState([]);
	const [searchParam, setSearchParam] = useState("");
	const [searchData, setSearchData] = useState();

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

		getCurrentUserArtists().then(({artists}) => {
			setArtists(artists.items);
		});

		getFeaturePlaylists().then((feature) => {
			setFPlaylists(feature.playlists.items);
		});

		getNewReleases().then((inside_release) => {
			setReleases(inside_release.albums.items);
		});

	}, []);


	return (
		<div className="container">
			<h1>User Info</h1>
			<hr/>
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
			<h1>Search</h1>
			<hr/>
			<div>
				<input type="text" onChange={(event) => {setSearchParam(event.target.value)}} placeholder="Search Playlist"/>
				<button onClick={() => {searchPlaylist(searchParam).then((data) => {setSearchData(data)})}}>Search</button>
			</div>
			{searchData && (
				<div>
					<p>My search</p>
					<List title="Playlists" data={searchData.playlists.items} route="playlist" />
					<List title="Albums" data={searchData.albums.items} route="album" />
					<List title="Artists" data={searchData.artists.items} route="artist" />
				</div>
			)}
			<h1>Browse</h1>
			<hr/>
			<List title="Featured Playlists" data={fPlaylists} route="playlist" />
			<List title="New Releases" data={releases} route="album" />
			<h1>My Library</h1>
			<hr/>
			<List title="My Albuns" data={albums} route="album" />
			<List title="My Playlists" data={playlists} route="playlist" />
			<List title="My Artists" data={artists} route="artist" />
		</div>
	);
};

export default Dashboard;