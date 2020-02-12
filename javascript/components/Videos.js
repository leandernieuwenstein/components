import { BaseComponent } from './BaseComponent.js';
import { Paginator } from './Paginator.js';

const VIDEOLINKS = [
	'z8KnVsRUH1Q',
	'9MMOdEJTidc',
	'dJyQiLp2xv4',
	'WtnU36qYYA0',
	'8kfgcvwBhIg',
	'NMQ8G7MqYC4'
];

export class Videos extends BaseComponent  {
	/**
	 * @constructor
	 */
	constructor() {
		super();

		this.state = {
			currentVideoIndex: 0
		};

		this.RequestDraw();
	}

	/**
	 * Draws the component
	 */
	Draw(){
		this.innerHTML = `
			<iframe width="560" height="315" src="https://www.youtube.com/embed/` + VIDEOLINKS[this.state.currentVideoIndex] + `"
				frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen></iframe><br />
			<my-paginator data-page-count="` + VIDEOLINKS.length + `"
				data-current-page="` + this.state.currentVideoIndex + `"></my-paginator>
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
		paginator.OnPageClick = ( videoIndex ) => {
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

customElements.define( 'my-videos', Videos );