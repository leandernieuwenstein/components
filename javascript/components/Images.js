import { BaseComponent } from './BaseComponent.js';
import { PaginatorComponent } from './Paginator.js';

const IMAGES = [
	'img/img1.jpg',
	'img/img2.jpg',
	'img/img3.jpg'
];

export class ImagesComponent extends BaseComponent  {
	/**
	 * @param {HTMLElement} root
	 * @constructor
	 */
	constructor( root ) {
		super( root );

		this.state = {
			currentImgIndex: 0
		};

		this.children = {
			paginator: {}
		};
	}

	/**
	 * Draws the component
	 */
	Draw(){
		this.root.innerHTML = `
			<img src="` + IMAGES[this.state.currentImgIndex] + `" /><br />
			<div class="paginatorComponent"></div>
		`;

		this.children.paginator = new PaginatorComponent( this.root.querySelector( '.paginatorComponent' ) );
		this.children.paginator.SetPageCount( IMAGES.length );
		this.children.paginator.SetCurrentPage( this.state.currentImgIndex );
		this.children.paginator.Mount();

		this.BindEvents();
	}

	/**
	 * Binds the events
	 */
	BindEvents(){
		this.children.paginator.OnNext = () => {
			this.HandlePaginatorOnNext();
		};
		this.children.paginator.OnPrevious = () => {
			this.HandlePaginatorOnPrevious();
		};
		this.children.paginator.OnPageClick = ( imgIndex ) => {
			this.HandlePaginatorOnPageClick( imgIndex );
		};
	}

	/**
	 * Handles the OnNext event from the Paginator child component
	 */
	HandlePaginatorOnNext(){
		if( this.state.currentImgIndex < IMAGES.length - 1 )
			this.state.currentImgIndex++;

		this.RequestDraw();
	}

	/**
	 * Handles the OnPrevious event from the Paginator child component
	 */
	HandlePaginatorOnPrevious(){
		if( this.state.currentImgIndex > 0 )
			this.state.currentImgIndex--;

		this.RequestDraw();
	}

	/**
	 * Handles the OnPageClick event from the Paginator child component
	 * @param {int} imgIndex
	 */
	HandlePaginatorOnPageClick( imgIndex ){
		this.state.currentImgIndex = imgIndex;
		this.RequestDraw();
	}
}