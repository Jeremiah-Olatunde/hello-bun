import { renderToStaticMarkup } from "react-dom/server";


const server = Bun.serve({
	fetch: (request: Request) => {
		return new Response("ok!");
	},
});