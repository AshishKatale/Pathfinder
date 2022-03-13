import { NavLink, Route, Routes } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import "./Navbar.css"
import Home from "./Home";
import DFS from "../algorithms/DFS";
import BFS from "../algorithms/BFS";
import GBFS from "../algorithms/GBFS";
import Dijkstra from "../algorithms/Dijkstra";
import { default as BiDirSearch } from "../algorithms/Bidirectional";

const Navbar = () => {

	return (
		<Router>
			<nav id="nav" className="navbar">
				<NavLink to="/"
					className={({ isActive }) => isActive ? "activeNavlink" : "navlink"}
					title={"Home"}
				>
					HOME
				</NavLink>
				<NavLink
					to="/bfs"
					className={({ isActive }) => isActive ? "activeNavlink" : "navlink"}
					title={"Breadth First Search"}
				>
					BFS
				</NavLink>
				<NavLink
					to="/dfs"
					className={({ isActive }) => isActive ? "activeNavlink" : "navlink"}
					title={"Depth First Search"}
				>
					DFS
				</NavLink>
				<NavLink
					to="/dijkstra"
					className={({ isActive }) => isActive ? "activeNavlink" : "navlink"}
					title={"Dijkstra's Algrorithm"}
				>
					Dijkstra
				</NavLink>
				<NavLink
					to="/gbfs"
					className={({ isActive }) => isActive ? "activeNavlink" : "navlink"}
					title={"Greedy Best First Search"}
				>
					GBFS
				</NavLink>
				<NavLink
					to="/bidirectional"
					className={({ isActive }) => isActive ? "activeNavlink" : "navlink"}
					title={"Bidirectional Search"}
				>
					Bidirectional
				</NavLink>
			</nav>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/bfs" element={<BFS />}></Route>
				<Route path="/dfs" element={<DFS />}></Route>
				<Route path="/dijkstra" element={<Dijkstra />}></Route>
				<Route path="/gbfs" element={<GBFS />}></Route>
				<Route path="/bidirectional" element={<BiDirSearch />}></Route>
			</Routes>
		</Router>
	);
}

export default Navbar;



