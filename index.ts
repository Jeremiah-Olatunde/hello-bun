
const server = Bun.serve({
	fetch: (_request: Request) => new Response("Hello Bun!"),
});
