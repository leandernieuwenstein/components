import { BaseComponent } from './BaseComponent.js';
import { SideMenuComponent } from './SideMenu.js';
import { VideosComponent } from './Videos.js';
import { ImagesComponent } from './Images.js';
import { Page } from '../dataObjects/Page.js';


const PAGES = [
	new Page(
		'videos',
		'Videos',
		'VideosComponent'
	),
	new Page(
		'images',
		'Images',
		'ImagesComponent'
	)
];


export class App extends BaseComponent  {
	/**
	 * @param {HTMLElement} root
	 * @constructor
	 */
	constructor( root ) {
		super( root );

		this.state = {
			currentPageIndex: 0
		};

		this.children = {
			sideMenu: {},
			content: {}
		};
	}

	/**
	 * Draws the component
	 * @override
	 */
	Draw(){
		let contentComponentName = PAGES[this.state.currentPageIndex].componentName;

		this.root.innerHTML = `
			<div class="sideMenu"></div>
			<div class="content">
				<div class="` + contentComponentName + `"></div>
			</div>
			<div class="clear"></div>
		`;

		this.children.sideMenu = new SideMenuComponent( this.root.querySelector( '.sideMenu' ) )
		this.children.sideMenu.SetPages( PAGES );
		this.children.sideMenu.SetCurrentPage( this.state.currentPageIndex );
		this.children.sideMenu.Mount();

		switch( contentComponentName ){
			case 'VideosComponent':
				this.children.content = new VideosComponent( this.root.querySelector( '.VideosComponent' ) );
				break;
			case 'ImagesComponent':
				this.children.content = new ImagesComponent( this.root.querySelector( '.ImagesComponent' ) );
				break;
		}
		this.children.content.Mount();

		this.BindEvents();
	}

	/**
	 * Binds the events
	 */
	BindEvents(){
		this.children.sideMenu.OnSelectedLinkChange = ( url ) => {
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