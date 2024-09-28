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
	if(page === "home") return <ContentHome/>;
	if(page === "poem-1") return <ContentPoem1/>;
	if(page === "poem-2") return <ContentPoem2/>;
	if(page === "poem-3") return <ContentPoem3/>;
}


function ContentHome(){
	return (
		<p>
			Small demo bun application testing out JSX server side rendering.
		</p>
	)
}

function ContentPoem1(){
	return (
		<pre>
			{`
				She was a Phantom of delight
				When first she gleamed upon my sight;
				A lovely Apparition, sent
				To be a moment's ornament;
				Her eyes as stars of Twilight fair;
				Like Twilight's, too, her dusky hair;
				But all things else about her drawn
				From May-time and the cheerful Dawn;
				A dancing Shape, an Image gay,
				To haunt, to startle, and way-lay.
				I saw her upon nearer view,
				A Spirit, yet a Woman too!
				Her household motions light and free,
				And steps of virgin-liberty;
				A countenance in which did meet
				Sweet records, promises as sweet;
				A Creature not too bright or good
				For human nature's daily food;
				For transient sorrows, simple wiles,
				Praise, blame, love, kisses, tears, and smiles.
				And now I see with eye serene
				The very pulse of the machine;
				A Being breathing thoughtful breath,
				A Traveller between life and death;
				The reason firm, the temperate will,
				Endurance, foresight, strength, and skill;
				A perfect Woman, nobly planned,
				To warn, to comfort, and command;
				And yet a Spirit still, and bright
				With something of angelic light.
			`}
		</pre>
	)	
}

function ContentPoem2(){
	return (
		<pre>
			{`
				Because I could not stop for Death –
				He kindly stopped for me –
				The Carriage held but just Ourselves –
				And Immortality.

				We slowly drove – He knew no haste
				And I had put away
				My labor and my leisure too,
				For His Civility –

				We passed the School, where Children strove
				At Recess – in the Ring –
				We passed the Fields of Gazing Grain –
				We passed the Setting Sun –

				Or rather – He passed Us –
				The Dews drew quivering and Chill –
				For only Gossamer, my Gown –
				My Tippet – only Tulle –

				We paused before a House that seemed
				A Swelling of the Ground –
				The Roof was scarcely visible –
				The Cornice – in the Ground –

				Since then – 'tis Centuries – and yet
				Feels shorter than the Day
				I first surmised the Horses' Heads
				Were toward Eternity –
			`}
		</pre>
	)	
}

function ContentPoem3(){
	return (
		<pre>
			{`
				Two roads diverged in a yellow wood,
				And sorry I could not travel both
				And be one traveler, long I stood
				And looked down one as far as I could
				To where it bent in the undergrowth;

				Then took the other, as just as fair,
				And having perhaps the better claim,
				Because it was grassy and wanted wear;
				Though as for that the passing there
				Had worn them really about the same,

				And both that morning equally lay
				In leaves no step had trodden black.
				Oh, I kept the first for another day!
				Yet knowing how way leads on to way,
				I doubted if I should ever come back.

				I shall be telling this with a sigh
				Somewhere ages and ages hence:
				Two roads diverged in a wood, and I—
				I took the one less traveled by,
				And that has made all the difference.
			`}
		</pre>
	)	
}