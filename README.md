# Web components
### Pros
- No framework
- Create your own HTML tag
### Cons
- Polyfill required if you want to support all browsers
- Can't easily pass big chunks of data to components
	- String attributes are only good for small chunks of data
	- When using props you have to make sure you don't get unnecessary redraws (pretty easy though), and it negates some of the benefits of having your own custom html tag
	- Passing data by adding children is messy