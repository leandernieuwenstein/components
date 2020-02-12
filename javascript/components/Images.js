import { Paginator } from './Paginator.js';

const IMAGES = [
	'img/img1.jpg',
	'img/img2.jpg',
	'img/img3.jpg'
];

export class Images extends HTMLElement  {
	constructor() {
		super();

		this.state = {
			currentImg: 0
		};

		this.Draw();
	}

	Draw(){
		this.innerHTML = `
			<img src="` + IMAGES[this.state.currentImg] + `" /><br />
			<my-paginator data-amout-of-pages="` + IMAGES.length + `"
				data-current-page="` + this.state.currentImg + `"></my-paginator>
		`;

		this.BindEvents();
	}

	BindEvents(){
		let paginator = this.querySelector( 'my-paginator' );
		paginator.OnNext = () => {
			this.HandlePaginatorOnNext();
		};
		paginator.OnPrevious = () => {
			this.HandlePaginatorOnPrevious();
		};
		paginator.OnPageClick = ( imgIndex ) => {
			this.HandlePaginatorOnPageClick( imgIndex );
		};
	}

	HandlePaginatorOnNext(){
		if( this.state.currentImg < IMAGES.length - 1 )
			this.state.currentImg++;

		this.Draw();
	}

	HandlePaginatorOnPrevious(){
		if( this.state.currentImg > 0 )
			this.state.currentImg--;

		this.Draw();
	}

	HandlePaginatorOnPageClick( imgIndex ){
		this.state.currentImg = imgIndex;
		this.Draw();
	}
}

customElements.define( 'my-images', Images );