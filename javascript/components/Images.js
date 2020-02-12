import { BaseComponent } from './BaseComponent.js';
import { Paginator } from './Paginator.js';

const IMAGES = [
	'img/img1.jpg',
	'img/img2.jpg',
	'img/img3.jpg'
];

export class Images extends BaseComponent  {
	/**
	 * @constructor
	 */
	constructor() {
		super();

		this.state = {
			currentImg: 0
		};

		this.RequestDraw();
	}

	/**
	 * Draws the component
	 */
	Draw(){
		this.innerHTML = `
			<img src="` + IMAGES[this.state.currentImg] + `" /><br />
			<my-paginator data-amout-of-pages="` + IMAGES.length + `"
				data-current-page="` + this.state.currentImg + `"></my-paginator>
		`;

		this.BindEvents();
	}

	/**
	 * Binds the events
	 */
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

	/**
	 * Handles the OnNext event from the Paginator child component
	 */
	HandlePaginatorOnNext(){
		if( this.state.currentImg < IMAGES.length - 1 )
			this.state.currentImg++;

		this.RequestDraw();
	}

	/**
	 * Handles the OnPrevious event from the Paginator child component
	 */
	HandlePaginatorOnPrevious(){
		if( this.state.currentImg > 0 )
			this.state.currentImg--;

		this.RequestDraw();
	}

	/**
	 * Handles the OnPageClick event from the Paginator child component
	 * @param {int} imgIndex
	 */
	HandlePaginatorOnPageClick( imgIndex ){
		this.state.currentImg = imgIndex;
		this.RequestDraw();
	}
}

customElements.define( 'my-images', Images );