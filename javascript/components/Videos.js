import { Paginator } from './Paginator.js';

const VIDEOLINKS = [
	'z8KnVsRUH1Q',
	'9MMOdEJTidc',
	'dJyQiLp2xv4',
	'WtnU36qYYA0',
	'8kfgcvwBhIg',
	'NMQ8G7MqYC4'
];

export class Videos extends HTMLElement  {
	constructor() {
		super();

		this.state = {
			currentVideo: 0
		};

		this.Draw();
	}

	Draw(){
		this.innerHTML = `
			<iframe width="560" height="315" src="https://www.youtube.com/embed/` + VIDEOLINKS[this.state.currentVideo] + `"
				frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen></iframe><br />
			<my-paginator data-amout-of-pages="` + VIDEOLINKS.length + `"
				data-current-page="` + this.state.currentVideo + `"></my-paginator>
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
		paginator.OnPageClick = ( videoIndex ) => {
			this.HandlePaginatorOnPageClick( videoIndex );
		};
	}

	HandlePaginatorOnNext(){
		if( this.state.currentVideo < VIDEOLINKS.length - 1 )
			this.state.currentVideo++;

		this.Draw();
	}

	HandlePaginatorOnPrevious(){
		if( this.state.currentVideo > 0 )
			this.state.currentVideo--;

		this.Draw();
	}

	HandlePaginatorOnPageClick( videoIndex ){
		this.state.currentVideo = videoIndex;
		this.Draw();
	}
}

customElements.define( 'my-videos', Videos );