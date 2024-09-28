import { renderToStaticMarkup } from "react-dom/server";


const server = Bun.serve({
	fetch: (request: Request) => {
		return router(request.url);
	},
});


type Page = "home" | "poem-1" | "poem-2" | "poem-3";

function router(url: string): Response {
	const { pathname } = new URL(url);

	switch(pathname){
		case "/public/index.css": return new Response(Bun.file("." + pathname));
		case "/":
		case "/home": return toResponse(Home({ page: "home" }));
		case "/poem-1": return toResponse(Home({ page: "poem-1" }));
		case "/poem-2": return toResponse(Home({ page: "poem-2" }));
		case "/poem-3": return toResponse(Home({ page: "poem-3" }));
		default: return new Response("not found", { status: 404 });
	}
}

function toResponse(component: JSX.Element): Response {
	return new Response(renderToStaticMarkup(component), {
		headers: {
			"Content-Type": "text/html"
		}
	})
}

function Home({ page }: { page: Page }) {
	return (
		<>
			<Head/>
			<Title />
			<Navigation />
			<Content page={page}/>
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

function Content({ page }: { page: Page }){
	return <>{page} under construction</>
}