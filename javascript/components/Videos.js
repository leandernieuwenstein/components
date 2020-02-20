import { BaseComponent } from './BaseComponent.js';
import { PaginatorComponent } from './Paginator.js';

const VIDEOLINKS = [
	'z8KnVsRUH1Q',
	'9MMOdEJTidc',
	'dJyQiLp2xv4',
	'WtnU36qYYA0',
	'8kfgcvwBhIg',
	'NMQ8G7MqYC4'
];

export class VideosComponent extends BaseComponent  {
	/**
	 * @param {HTMLElement} root
	 * @constructor
	 */
	constructor( root ) {
		super( root );

		this.state = {
			currentVideoIndex: 0
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
			<iframe width="560" height="315" src="https://www.youtube.com/embed/` + VIDEOLINKS[this.state.currentVideoIndex] + `"
				frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen></iframe><br />
			<div class="paginatorComponent"></div>
		`;

		this.children.paginator = new PaginatorComponent( this.root.querySelector( '.paginatorComponent' ) );
		this.children.paginator.SetPageCount( VIDEOLINKS.length );
		this.children.paginator.SetCurrentPage( this.state.currentVideoIndex );
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
		this.children.paginator.OnPageClick = ( videoIndex ) => {
			this.HandlePaginatorOnPageClick( videoIndex );
		};
	}

	/**
	 * Handles the OnNext event from the Paginator child component
	 */
	HandlePaginatorOnNext(){
		if( this.state.currentVideoIndex < VIDEOLINKS.length - 1 )
			this.state.currentVideoIndex++;

		this.RequestDraw();
	}

	/**
	 * Handles the OnPrevious event from the Paginator child component
	 */
	HandlePaginatorOnPrevious(){
		if( this.state.currentVideoIndex > 0 )
			this.state.currentVideoIndex--;

		this.RequestDraw();
	}

	/**
	 * Handles the OnPageClick event from the Paginator child component
	 * @param {int} videoIndex
	 */
	HandlePaginatorOnPageClick( videoIndex ){
		this.state.currentVideoIndex = videoIndex;
		this.RequestDraw();
	}
}