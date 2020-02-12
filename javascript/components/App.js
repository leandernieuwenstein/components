import { SideMenu } from './SideMenu.js';
import { Videos } from './Videos.js';
import { Images } from './Images.js';

const PAGES = {
	VIDEOS: 'videos',
	IMAGES: 'images'
};

class App extends HTMLElement  {
	constructor() {
		super();

		this.state = {
			page: PAGES.VIDEOS
		};

		this.Draw();
	}

	Draw(){
		let content = '';
		switch( this.state.page ){
			case PAGES.VIDEOS:
				content = `<my-videos></my-videos>`;
				break;
			case PAGES.IMAGES:
				content = `<my-images></my-images>`;
				break;
		}

		this.innerHTML = `
			<my-side-menu id="sideMenu" data-selected-link="` + this.state.page + `">
				<a data-target="` + PAGES.VIDEOS + `"><span>Videos</span></a>
				<a data-target="` + PAGES.IMAGES + `">Images</a>
			</my-side-menu>
			<div class="content">
				` + content + `
			</div>
			<div class="clear"></div>
		`;

		this.BindEvents();
	}

	BindEvents(){
		this.querySelector( '#sideMenu' ).OnSelectedLinkChange = ( url ) => {
			this.HandleSideMenuOnSelectedLinkChange( url );
		};
	}

	HandleSideMenuOnSelectedLinkChange( url ){
		this.state.page = url;
		this.Draw();
	}
}

customElements.define( 'my-app', App );