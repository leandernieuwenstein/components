import { BaseComponent } from './BaseComponent.js';
import { SideMenu } from './SideMenu.js';
import { Videos } from './Videos.js';
import { Images } from './Images.js';
import { Page } from '../dataObjects/Page.js';


const PAGES = [
	new Page(
		'videos',
		'Videos',
		`<my-videos></my-videos>`
	),
	new Page(
		'images',
		'Images',
		`<my-images></my-images>`
	)
];


class App extends BaseComponent  {
	/**
	 * @constructor
	 */
	constructor() {
		super();

		this.state = {
			currentPageIndex: 0
		};

		this.RequestDraw();
	}

	/**
	 * Draws the component
	 * @override
	 */
	Draw(){
		let contentComponent = PAGES[this.state.currentPageIndex].componentTag;

		this.innerHTML = `
			<my-side-menu></my-side-menu>
			<div class="content">
				` + contentComponent + `
			</div>
			<div class="clear"></div>
		`;

		let sideMenu = this.querySelector( 'my-side-menu' );
		sideMenu.SetPages( PAGES );
		sideMenu.SetCurrentPage( this.state.currentPageIndex );

		this.BindEvents();
	}

	/**
	 * Binds the events
	 */
	BindEvents(){
		this.querySelector( 'my-side-menu' ).OnSelectedLinkChange = ( url ) => {
			this.HandleSideMenuOnSelectedLinkChange( url );
		};
	}

	/**
	 * Handles the OnSelectedLinkChange event from the SideMenu child component
	 * @param {int} index
	 */
	HandleSideMenuOnSelectedLinkChange( index ){
		this.state.currentPageIndex = index;
		this.RequestDraw();
	}
}

customElements.define( 'my-app', App );