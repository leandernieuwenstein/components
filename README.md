# Components
This is a small test project where I make the same web page with different tools / frameworks. Each branch shows a different implementation.

## ES6
Components written in ES6 without the use of any framework or web components.

### Pros
- No framework
- Works in all major browsers
- Code is very easy to read
### Cons
- No custom HTML tags
- In some cases requires some more lines of code than with frameworks

## Web components
### Pros
- No framework
- Create your own HTML tag
### Cons
- Polyfill required if you want to support all browsers
- Can't easily pass big chunks of data to components
	- String attributes are only good for small chunks of data
	- When using props you have to make sure you don't get unnecessary redraws (pretty easy though), and it negates some of the benefits of having your own custom html tag
	- Passing data by adding children is messy
