import { renderToStaticMarkup } from "react-dom/server";


const server = Bun.serve({
	fetch: (request: Request) => {
		return router(request.url);
	},
});



function Home() {
	return (
		<>
			<Head/>
			<Title />
			<Navigation />
		</>
	);
}

function Head() {
	return (
		<>
				<link rel="stylesheet" href="/public/index.css" />
				<title>Hello Bun</title>
		</>
	)
}

function Title() {
	return (<h1>Some Poems</h1>);
}

function Navigation() {
	return (
		<ul className="navigation">
			<li><a href="/home">Home</a></li>
			<li><a href="/poem-1">Phantom of Delight</a></li>
			<li><a href="/poem-2">The Road Not Taken</a></li>
			<li><a href="/poem-3">Because I could not stop for Death</a></li>
		</ul>
	)
}