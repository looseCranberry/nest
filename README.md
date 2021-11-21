# A Document Builder

Helps with rapid programmatic document creation. Inspired by the Odin Project's library project.

## Example

Assume you wanted to dynamically create a complex structure on the fly, like the following:
```
<article class='book'>
	<header><h1>Book Title</h1></header>
	<section>
		<img src='book.png' width='220px' height='auto' />
		<div>
			<ul>
				<li><h2>Book Author</h2></li>
				<li>Book Pages</li>
				<li>Book ISBN</li>
			</ul>
		</div>
	</section>
</article>
```
This could get complicated with a ton of document element creations and attribute settings.
With nest, this can be done easily and quickly. You can recreate the exact same structure
with the following commands:

```
nest.push("article.book header h1");
nest.text = "Book Title";
nest.cap();
nest.push("section img");
nest.attr(["src=book.png", "width=220px", "height=auto"]); // No need for escaped quotes
nest.cap("img");
nest.push("div ul li h2");
nest.text = "Book Author";
nest.cap("li");
nest.push("li");
nest.text = "Book Pages";
nest.cap("li");
nest.push("li");
nest.text = "Book ISBN";
nest.cap();
document.querySelector("body").appendChild(nest.pop());
```
